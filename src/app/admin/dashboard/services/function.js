"use server"

import path from 'path';
import { writeFile, unlink } from 'fs/promises';
import prisma from '../../../../../lib/prisma';


// Utility function to generate a slug from a string
const generateSlug = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ''); // Trim leading and trailing hyphens
};

// Utility function to generate a unique slug
const generateUniqueSlug = async (baseSlug) => {
  let slug = baseSlug;
  let count = 1;

  // Check if the slug exists in the database and modify if necessary
  while (await prisma.services.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${count}`;
    count += 1;
  }

  return slug;
};

// Utility function to generate a unique filename for the image
const generateUniqueFilename = (originalName) => {
  const timestamp = Date.now();
  const extension = path.extname(originalName);
  const basename = path.basename(originalName, extension);
  const cleanedBasename = basename.replace(/\s+/g, '_'); // Replace spaces with underscores
  return `${cleanedBasename}-${timestamp}${extension}`;
};


export async function addService(formData) {
  try {
    const title = formData.get('title');
    const description = formData.get('description');
    const imageFile = formData.get('image');
    const bannerImageFile = formData.get('bannerImage');
    const seoTitle = formData.get('seoTitle');
    const seoDescription = formData.get('seoDescription');
    const seoKeywords = formData.get('seoKeywords');

    if (!imageFile || !title) {
      throw new Error('Missing required fields');
    }

    
    // Handle image file upload
    let iconImagePath = '';
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const uniqueFilename = generateUniqueFilename(imageFile.name);
    const filePath = path.join(process.cwd(), "public/uploads/servicesimage/servicesicon", uniqueFilename);
    await writeFile(filePath, buffer);
    iconImagePath = `/uploads/servicesimage/servicesicon/${uniqueFilename}`;


    // Handle banner image file upload if provided
    let bannerImagePath = '';
    if (bannerImageFile) {
      const bannerBuffer = Buffer.from(await bannerImageFile.arrayBuffer());
      const uniqueBannerFilename = generateUniqueFilename(bannerImageFile.name);
      const bannerFilePath = path.join(process.cwd(), "public/uploads/servicesimage/servicesbanner", uniqueBannerFilename);
      await writeFile(bannerFilePath, bannerBuffer);
      bannerImagePath = `/uploads/servicesimage/servicesbanner/${uniqueBannerFilename}`;
    }


    // Write the file to the specified directory
    await writeFile(filePath, buffer);

    // Generate a slug based on the title
    const baseSlug = generateSlug(title);
    const slug = await generateUniqueSlug(baseSlug);

    // Create the new service
    const newService = await prisma.services.create({
      data: {
        title,
        description,
        image: iconImagePath, // Store the relative path to the image
        bannerImage: bannerImagePath,    
        slug,
        seoTitle,
        seoDescription,
        seoKeywords,
      },
    });

    // Handle FAQs, check if FAQs exist
    const faqsRaw = formData.get('faqs');
    if (faqsRaw) {
      const faqs = JSON.parse(faqsRaw); // Ensure `faqs` is parsed correctly from the formData

      // Validate FAQs data structure
      const faqData = faqs.map((faq) => {
        if (!faq.question || !faq.answer) {
          throw new Error('Each FAQ must have a question and answer.');
        }
        return {
          serviceId: newService.id,
          question: faq.question,
          answer: faq.answer,
        };
      });

      // Save FAQs if there are any
      if (faqData.length > 0) {
        await prisma.servicesFaq.createMany({
          data: faqData,
        });
      }
    }

    return newService;
  } catch (error) {
    console.error('Error adding service:', error);
    throw new Error('Failed to add service.');
  }
}




export async function editService(formData, serviceId) {
  try {
    const title = formData.get('title');
    const description = formData.get('description');
    const imageFile = formData.get('image');
    const bannerImageFile = formData.get('bannerImage');
    const seoTitle = formData.get('seoTitle');
    const seoDescription = formData.get('seoDescription');
    const seoKeywords = formData.get('seoKeywords');
    const faqs = JSON.parse(formData.get('faqs')); // Get FAQs from formData

    if (!serviceId) {
      throw new Error('Service ID is required');
    }

    const id = parseInt(serviceId, 10);
    if (isNaN(id)) {
      throw new Error('Invalid Service ID');
    }

    const existingService = await prisma.services.findUnique({
      where: { id },
      include: {
        faqs: true,
      },
    });

    if (!existingService) {
      throw new Error('Service not found');
    }

    // Handle slug generation
    let slug = existingService.slug;
    if (title && title !== existingService.title) {
      const baseSlug = generateSlug(title);
      slug = await generateUniqueSlug(baseSlug);
    }

    // Handle image upload
    let newImagePath = existingService.image;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uniqueFilename = generateUniqueFilename(imageFile.name);
      const filePath = path.join(process.cwd(), "public/uploads/servicesimage/servicesicon", uniqueFilename);
      await writeFile(filePath, buffer);
      newImagePath = `/uploads/servicesimage/servicesicon/${uniqueFilename}`;

      // Delete old image if a new one is uploaded
      const oldImagePath = path.join(process.cwd(), 'public/uploads/servicesimage/servicesicon', path.basename(existingService.image));
      await unlink(oldImagePath).catch((error) => console.error('Error deleting old image:', error));
    }

    // Handle banner image upload
    let newBannerImagePath = existingService.bannerImage;
    if (bannerImageFile && bannerImageFile.size > 0) {
      const bannerBuffer = Buffer.from(await bannerImageFile.arrayBuffer());
      const uniqueBannerFilename = generateUniqueFilename(bannerImageFile.name);
      const bannerFilePath = path.join(process.cwd(), "public/uploads/servicesimage/servicesbanner", uniqueBannerFilename);
      await writeFile(bannerFilePath, bannerBuffer);
      newBannerImagePath = `/uploads/servicesimage/servicesbanner/${uniqueBannerFilename}`;

      // Delete old banner image if a new one is uploaded
      const oldBannerPath = path.join(process.cwd(), 'public/uploads/servicesimage/servicesbanner', path.basename(existingService.bannerImage));
      await unlink(oldBannerPath).catch((error) => console.error('Error deleting old banner image:', error));
    }

    // Update service details
    const updatedService = await prisma.services.update({
      where: { id },
      data: {
        title: title || existingService.title,
        description: description || existingService.description,
        image: newImagePath,
        bannerImage: newBannerImagePath,
        slug,
        seoTitle: seoTitle || existingService.seoTitle,
        seoDescription: seoDescription || existingService.seoDescription,
        seoKeywords: seoKeywords || existingService.seoKeywords,
      },
    });

    // Handle FAQ updates
    const existingFaqIds = existingService.faqs.map(faq => faq.id);
    const incomingFaqIds = faqs.map(faq => faq.id).filter(id => id); // Only include FAQs with an ID (existing ones)

    // 1. Delete FAQs that are no longer present
    const faqsToDelete = existingFaqIds.filter(id => !incomingFaqIds.includes(id));
    await prisma.servicesFaq.deleteMany({
      where: { id: { in: faqsToDelete } },
    });

    // 2. Update existing FAQs
    for (const faq of faqs) {
      if (faq.id) {
        await prisma.servicesFaq.update({
          where: { id: faq.id },
          data: {
            question: faq.question,
            answer: faq.answer,
          },
        });
      }
    }

    // 3. Add new FAQs
    const newFaqs = faqs.filter(faq => !faq.id);
    for (const faq of newFaqs) {
      await prisma.servicesFaq.create({
        data: {
          serviceId: id,
          question: faq.question,
          answer: faq.answer,
        },
      });
    }

    return updatedService;
  } catch (error) {
    console.error('Error editing service:', error);
    throw new Error('Failed to edit service.');
  }
}




export async function deleteService(id) {
  try {
    console.log('Attempting to delete service with ID:', id);

    // Find the service entry along with its FAQs
    const service = await prisma.services.findUnique({ 
      where: { id },
      include: { faqs: true } // Include FAQs
    });

    if (!service) {
      console.log('Service not found for ID:', id);
      throw new Error('Service not found');
    }

    console.log('Found service:', service);

    // Delete the service's FAQs first (if any)
    if (service.faqs.length > 0) {
      await prisma.servicesFaq.deleteMany({
        where: { serviceId: id },
      });
    }

    // Delete the service entry
    await prisma.services.delete({ where: { id } });

    // Define the path to the image
    
    
    const imagePath = path.join(process.cwd(), 'public/uploads/servicesimage/servicesicon', path.basename(service.image));
    const bannerImagePath = path.join(process.cwd(), 'public/uploads/servicesimage/servicesbanner', path.basename(service.bannerImage));
    // Try to delete the image file
    try {
         // Delete the service image file
         if (service.image) {
          await unlink(imagePath);
          console.log('Image file deleted:', imagePath);
        }
  
        // Delete the banner image file
        if (service.bannerImage) {
          await unlink(bannerImagePath);
          console.log('Banner image file deleted:', bannerImagePath);
        }
    } catch (fileError) {
      console.error('Error deleting image file:', fileError);
      // Optionally rethrow or handle the file deletion error
    }

    return { message: 'Service deleted successfully' };
  } catch (error) {
    console.error('Error deleting service:', error);
    throw new Error(`Failed to delete service. Details: ${error.message}`);
  }
}




export async function Getdetails(serviceSlug) {
  // Assume this is a valid slug
 try {
   // Ensure serviceSlug is provided
   if (!serviceSlug) {
     throw new Error('Service Slug is required');
   }

   // Fetch the service post from the database using the slug
   const service = await prisma.services.findUnique({
     where: { slug: serviceSlug },
   });

   // Check if the service post exists
   if (!service) {
     throw new Error('Service post not found');
   }

   console.log(service);
   return service;
 } catch (error) {
   console.error('Error fetching service:', error.message);
   throw new Error('Failed to fetch service.');
 }
}
export const fetchServices = async () => {
  try {
    const data = await prisma.services.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    // Ensure that data is being returned correctly
    if (!data) {
      throw new Error('No services found');
    }

    return data;
  } catch (error) {
    console.error('Error fetching services:', error.message);
    throw new Error('Failed to fetch services.');
  }
};
export async function getServiceById(id) {
  const serviceId = id;
  try {
    if (!serviceId) {
      throw new Error('Service ID is required');
    }

    const id = parseInt(serviceId, 10);
    if (isNaN(id)) {
      throw new Error('Invalid Service ID');
    }

    // Fetch the service and its FAQs from the database
    const service = await prisma.services.findUnique({
      where: { id: id },
      include: {
        faqs: true, // Assuming 'faqs' is the related table/model name in Prisma schema
      },
    });

    if (!service) {
      throw new Error('Service not found');
    }

    return service;
  } catch (error) {
    console.error('Error fetching service:', error);
    throw new Error('Failed to fetch service.');
  }
}

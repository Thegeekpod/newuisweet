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
  while (await prisma.specialized.findUnique({ where: { slug } })) {
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


export async function addSpecialized(formData) {
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
    const filePath = path.join(process.cwd(), "public/uploads/specializedimage/specializedimageicon", uniqueFilename);
    await writeFile(filePath, buffer);
    iconImagePath = `/uploads/specializedimage/specializedimageicon/${uniqueFilename}`;


    // Handle banner image file upload if provided
    let bannerImagePath = '';
    if (bannerImageFile) {
      const bannerBuffer = Buffer.from(await bannerImageFile.arrayBuffer());
      const uniqueBannerFilename = generateUniqueFilename(bannerImageFile.name);
      const bannerFilePath = path.join(process.cwd(), "public/uploads/specializedimage/specializedimagebanner", uniqueBannerFilename);
      await writeFile(bannerFilePath, bannerBuffer);
      bannerImagePath = `/uploads/specializedimage/specializedimagebanner/${uniqueBannerFilename}`;
    }
   

    // Generate a slug based on the title
    const baseSlug = generateSlug(title);
    const slug = await generateUniqueSlug(baseSlug);

    // Create the new specialized
    const newSpecialized = await prisma.specialized.create({
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

    // Handle FAQs if provided
    const faqs = formData.get('faqs') ? JSON.parse(formData.get('faqs')) : [];

    if (Array.isArray(faqs) && faqs.length > 0) {
      const faqData = faqs.map((faq) => {
        if (!faq.question || !faq.answer) {
          throw new Error('Each FAQ must have a question and answer.');
        }
        return {
          specializedId: newSpecialized.id,
          question: faq.question,
          answer: faq.answer,
        };
      });

      // Save FAQs if there are any
      await prisma.specializedFaq.createMany({
        data: faqData,
      });
    }

    return newSpecialized;
  } catch (error) {
    console.error('Error adding specialized:', error);
    throw new Error('Failed to add specialized.');
  }
}





export async function editSpecialized(formData, specializedId) {
  try {
    const title = formData.get('title');
    const description = formData.get('description');
    const imageFile = formData.get('image');
    const bannerImageFile = formData.get('bannerImage');
    const seoTitle = formData.get('seoTitle');
    const seoDescription = formData.get('seoDescription');
    const seoKeywords = formData.get('seoKeywords');
    const faqs = JSON.parse(formData.get('faqs')); // Get FAQs from formData

    if (!specializedId) {
      throw new Error('Specialized ID is required');
    }

    const id = parseInt(specializedId, 10);
    if (isNaN(id)) {
      throw new Error('Invalid Specialized ID');
    }

    const existingSpecialized = await prisma.specialized.findUnique({
      where: { id },
      include: {
        faqs: true,
      },
    });

    if (!existingSpecialized) {
      throw new Error('Specialized not found');
    }

    // Handle slug generation
    let slug = existingSpecialized.slug;
    if (title && title !== existingSpecialized.title) {
      const baseSlug = generateSlug(title);
      slug = await generateUniqueSlug(baseSlug);
    }

       // Handle image upload
       let newImagePath = existingSpecialized.image;
       if (imageFile && imageFile.size > 0) {
         const buffer = Buffer.from(await imageFile.arrayBuffer());
         const uniqueFilename = generateUniqueFilename(imageFile.name);
         const filePath = path.join(process.cwd(), "public/uploads/specializedimage/specializedimageicon", uniqueFilename);
         await writeFile(filePath, buffer);
         newImagePath = `/uploads/specializedimage/specializedimageicon/${uniqueFilename}`;
   
         // Delete old image if a new one is uploaded
         const oldImagePath = path.join(process.cwd(), 'public/uploads/specializedimage/specializedimageicon', path.basename(existingSpecialized.image));
         await unlink(oldImagePath).catch((error) => console.error('Error deleting old image:', error));
       }
   
       // Handle banner image upload
       let newBannerImagePath = existingSpecialized.bannerImage;
       if (bannerImageFile && bannerImageFile.size > 0) {
         const bannerBuffer = Buffer.from(await bannerImageFile.arrayBuffer());
         const uniqueBannerFilename = generateUniqueFilename(bannerImageFile.name);
         const bannerFilePath = path.join(process.cwd(), "public/uploads/specializedimage/specializedimagebanner", uniqueBannerFilename);
         await writeFile(bannerFilePath, bannerBuffer);
         newBannerImagePath = `/uploads/specializedimage/specializedimagebanner/${uniqueBannerFilename}`;
   
         // Delete old banner image if a new one is uploaded
         const oldBannerPath = path.join(process.cwd(), 'public/uploads/specializedimage/specializedimagebanner', path.basename(existingSpecialized.bannerImage));
         await unlink(oldBannerPath).catch((error) => console.error('Error deleting old banner image:', error));
       }

    // Update specialized details
    const updatedSpecialized = await prisma.specialized.update({
      where: { id },
      data: {
        title: title || existingSpecialized.title,
        description: description || existingSpecialized.description,
        image: newImagePath,
        bannerImage: newBannerImagePath,
        slug,
        seoTitle: seoTitle || existingSpecialized.seoTitle,
        seoDescription: seoDescription || existingSpecialized.seoDescription,
        seoKeywords: seoKeywords || existingSpecialized.seoKeywords,
      },
    });

    // Handle FAQ updates
    const existingFaqIds = existingSpecialized.faqs.map(faq => faq.id);
    const incomingFaqIds = faqs.map(faq => faq.id).filter(id => id); // Only include FAQs with an ID (existing ones)

    // 1. Delete FAQs that are no longer present
    const faqsToDelete = existingFaqIds.filter(id => !incomingFaqIds.includes(id));
    await prisma.specializedFaq.deleteMany({
      where: { id: { in: faqsToDelete } },
    });

    // 2. Update existing FAQs
    for (const faq of faqs) {
      if (faq.id) {
        await prisma.specializedFaq.update({
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
      await prisma.specializedFaq.create({
        data: {
          specializedId: id,
          question: faq.question,
          answer: faq.answer,
        },
      });
    }

    return updatedSpecialized;
  } catch (error) {
    console.error('Error editing specialized:', error);
    throw new Error('Failed to edit specialized.');
  }
}




export async function deleteSpecialized(id) {
  try {
    console.log('Attempting to delete specialized with ID:', id);

    // Find the specialized entry along with related FAQs
    const specialized = await prisma.specialized.findUnique({
      where: { id },
      include: {
        faqs: true, // Include related FAQs in the query
      },
    });

    if (!specialized) {
      console.log('Specialized not found for ID:', id);
      throw new Error('Specialized not found');
    }

    console.log('Found specialized:', specialized);

    // Delete the related FAQs first
    await prisma.specializedFaq.deleteMany({
      where: {
        specializedId: id,
      },
    });

    // Delete the specialized entry
    await prisma.specialized.delete({ where: { id } });

    const imagePath = path.join(process.cwd(), 'public/uploads/specializedimage/specializedimageicon', path.basename(specialized.image));
    const bannerImagePath = path.join(process.cwd(), 'public/uploads/specializedimage/specializedimagebanner', path.basename(specialized.bannerImage));
    // Try to delete the image file
    try {
         // Delete the specialized image file
         if (specialized.image) {
          await unlink(imagePath);
          console.log('Image file deleted:', imagePath);
        }
  
        // Delete the banner image file
        if (specialized.bannerImage) {
          await unlink(bannerImagePath);
          console.log('Banner image file deleted:', bannerImagePath);
        }
    } catch (fileError) {
      console.error('Error deleting image file:', fileError);
      // Optionally rethrow or handle the file deletion error
    }

    return { message: 'Specialized and related FAQs deleted successfully' };
  } catch (error) {
    console.error('Error deleting specialized:', error);
    throw new Error(`Failed to delete specialized. Details: ${error.message}`);
  }
}




export async function Getdetails(specializedSlug) {
  // Assume this is a valid slug
 try {
   // Ensure specializedSlug is provided
   if (!specializedSlug) {
     throw new Error('Specialized Slug is required');
   }

   // Fetch the specialized post from the database using the slug
   const specialized = await prisma.specialized.findUnique({
     where: { slug: specializedSlug },
   });

   // Check if the specialized post exists
   if (!specialized) {
     throw new Error('Specialized post not found');
   }

   console.log(specialized);
   return specialized;
 } catch (error) {
   console.error('Error fetching specialized:', error.message);
   throw new Error('Failed to fetch specialized.');
 }
}
export const fetchSpecialized = async () => {
  try {
    const data = await prisma.specialized.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    // Ensure that data is being returned correctly
    if (!data) {
      throw new Error('No specialized found');
    }

    return data;
  } catch (error) {
    console.error('Error fetching specialized:', error.message);
    throw new Error('Failed to fetch specialized.');
  }
};
export async function getSpecializedById(id) {
  const specializedId = id;
  try {
    if (!specializedId) {
      throw new Error('Specialized ID is required');
    }

    const id = parseInt(specializedId, 10);
    if (isNaN(id)) {
      throw new Error('Invalid Specialized ID');
    }

    // Fetch the specialized and its FAQs from the database
    const specialized = await prisma.specialized.findUnique({
      where: { id: id },
      include: {
        faqs: true, // Assuming 'faqs' is the related table/model name in Prisma schema
      },
    });

    if (!specialized) {
      throw new Error('Specialized not found');
    }

    return specialized;
  } catch (error) {
    console.error('Error fetching specialized:', error);
    throw new Error('Failed to fetch specialized.');
  }
}

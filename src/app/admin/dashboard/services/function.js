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
    const seoTitle = formData.get('seoTitle');
    const seoDescription = formData.get('seoDescription');
    const seoKeywords = formData.get('seoKeywords');

    if (!imageFile || !title) {
      throw new Error('Missing required fields');
    }

    // Convert the file data to a Buffer
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    // Generate a unique filename for the image
    const uniqueFilename = generateUniqueFilename(imageFile.name);
    const filePath = path.join(process.cwd(), "public/uploads/servicesimage", uniqueFilename);

    // Write the file to the specified directory (public/uploads/servicesimage)
    await writeFile(filePath, buffer);

    // Generate a slug based on the title
    const baseSlug = generateSlug(title);
    const slug = await generateUniqueSlug(baseSlug);




    // Create the new service post with the image path, generated slug, and tags array
    const newService = await prisma.services.create({
      data: {
        title,
        description,
        image: `/uploads/servicesimage/${uniqueFilename}`, // Store the relative path to the image
        slug,
        seoTitle,
        seoDescription,
        seoKeywords,
      },
    });

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
    const seoTitle = formData.get('seoTitle');
    const seoDescription = formData.get('seoDescription');
    const seoKeywords = formData.get('seoKeywords');

    if (!serviceId) {
      throw new Error('Service ID is required');
    }

    const id = parseInt(serviceId, 10);
    if (isNaN(id)) {
      throw new Error('Invalid Service ID');
    }

    const existingService = await prisma.services.findUnique({
      where: { id: id },
    });

    if (!existingService) {
      throw new Error('Service post not found');
    }

    const baseSlug = title ? generateSlug(title) : existingService.slug;
    const slug = await generateUniqueSlug(baseSlug);

    let newImagePath = existingService.image;

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uniqueFilename = generateUniqueFilename(imageFile.name);
      const filePath = path.join(process.cwd(), "public/uploads/servicesimage", uniqueFilename);

      await writeFile(filePath, buffer);

      newImagePath = `/uploads/servicesimage/${uniqueFilename}`;

      const oldImagePath = path.join(process.cwd(), 'public/uploads/servicesimage', path.basename(existingService.image));
      await unlink(oldImagePath).catch((error) => {
        console.error('Error deleting old image:', error);
      });
    }



    const updatedService = await prisma.services.update({
      where: { id: id },
      data: {
        title: title || existingService.title,
        description: description || existingService.description,
        image: newImagePath,
        slug,
        seoTitle: seoTitle || existingService.seoTitle,
        seoDescription: seoDescription || existingService.seoDescription,
        seoKeywords: seoKeywords || existingService.seoKeywords,
      },
    });

    return updatedService;
  } catch (error) {
    console.error('Error editing service:', error);
    throw new Error('Failed to edit service.');
  }
}



export async function deleteService(id) {
  try {
    console.log('Attempting to delete service with ID:', id);

    // Find the service entry
    const service = await prisma.services.findUnique({ where: { id } });

    if (!service) {
      console.log('Service not found for ID:', id);
      throw new Error('Service not found');
    }

    console.log('Found service:', service);

    // Delete the service entry
    await prisma.services.delete({ where: { id } });

    // Define the path to the image
    const filePath = path.join(process.cwd(), 'public/uploads/servicesimage', path.basename(service.image));

    // Try to delete the image file
    try {
      await unlink(filePath);
      console.log('Image file deleted:', filePath);
    } catch (fileError) {
      console.error('Error deleting image file:', fileError);
      // Optionally rethrow or handle the file deletion error
    }

    return { message: 'Service deleted successfully' };
  } catch (error) {
    console.error('Error deleting service:', error);
    // Provide detailed error information
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
  const blogId =id
  try {
    // Ensure blogId is provided and convert it to integer
    if (!blogId) {
      throw new Error('Blog ID is required');
    }

    const id = parseInt(blogId, 10);
    if (isNaN(id)) {
      throw new Error('Invalid Blog ID');
    }

    // Fetch the blog post from the database
    const blog = await prisma.services.findUnique({
      where: { id: id },
    });

    // Check if the blog post exists
    if (!blog) {
      throw new Error('Blog post not found');
    }

    // console.log(blog);
    return blog;
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw new Error('Failed to fetch blog.');
  }
}
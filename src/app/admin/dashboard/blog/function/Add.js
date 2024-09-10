"use server"
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { writeFile,unlink } from 'fs/promises';
const prisma = new PrismaClient();

// Utility function to generate a slug from a string
const generateSlug = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, '');     // Trim leading and trailing hyphens
};

// Utility function to generate a unique slug
const generateUniqueSlug = async (baseSlug) => {
  let slug = baseSlug;
  let count = 1;
  
  // Check if the slug exists in the database and modify if necessary
  while (await prisma.blogs.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${count}`;
    count += 1;
  }
  
  return slug;
};

export async function addBlog(formData) {
  try {
    const title = formData.get('title');
    const description = formData.get('description');
    const imageFile = formData.get('image');
    const tag = formData.get('tag');
    const seoTitle = formData.get('seoTitle');
    const seoDescription = formData.get('seoDescription');
    const seoKeywords = formData.get('seoKeywords');

    if (!imageFile || !title) {
      throw new Error('Missing required fields');
    }

    // Convert the file data to a Buffer
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    // Replace spaces in the file name with underscores
    const filename = imageFile.name.replaceAll(" ", "_");
    const filePath = path.join(process.cwd(), "public/blogimage", filename);

    // Write the file to the specified directory (public/blogimage)
    await writeFile(filePath, buffer);

    // Generate a slug based on the title
    const baseSlug = generateSlug(title);
    const slug = await generateUniqueSlug(baseSlug);

    // Create the new blog post with the image path and generated slug
    const newBlog = await prisma.blogs.create({
      data: {
        title,
        description,
        image: `/blogimage/${filename}`, // Store the relative path to the image
        slug,
        tag,
        seoTitle,
        seoDescription,
        seoKeywords,
      },
    });

    return newBlog;
  } catch (error) {
    console.error('Error adding blog:', error);
    throw new Error('Failed to add blog.');
  }
}



export async function deleteBlog(id) {
  try {
    console.log('Attempting to delete blog with ID:', id);

    // Find the blog entry
    const blog = await prisma.blogs.findUnique({ where: { id } });

    if (!blog) {
      console.log('Blog not found for ID:', id);
      throw new Error('Blog not found');
    }

    console.log('Found blog:', blog);

    // Delete the blog entry
    await prisma.blogs.delete({ where: { id } });

    // Define the path to the image
    const filePath = path.join(process.cwd(), 'public/blogimage', path.basename(blog.image));

    // Try to delete the image file
    try {
      await unlink(filePath);
      console.log('Image file deleted:', filePath);
    } catch (fileError) {
      console.error('Error deleting image file:', fileError);
      // Optionally rethrow or handle the file deletion error
    }

    return { message: 'Blog deleted successfully' };
  } catch (error) {
    console.error('Error deleting blog:', error);
    // Provide detailed error information
    throw new Error(`Failed to delete blog. Details: ${error.message}`);
  }
}


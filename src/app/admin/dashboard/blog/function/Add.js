"use server"
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { writeFile, unlink } from 'fs/promises';
const prisma = new PrismaClient();

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
  while (await prisma.blogs.findUnique({ where: { slug } })) {
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


export async function addBlog(formData) {
  try {
    const title = formData.get('title');
    const description = formData.get('description');
    const imageFile = formData.get('image');
    const tagString = formData.get('tag'); // Updated to receive a string
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
    const filePath = path.join(process.cwd(), "public/uploads/blogimage", uniqueFilename);

    // Write the file to the specified directory (public/uploads/blogimage)
    await writeFile(filePath, buffer);

    // Generate a slug based on the title
    const baseSlug = generateSlug(title);
    const slug = await generateUniqueSlug(baseSlug);

    // Convert the tag string to an array
    const tagsArray = tagString.split(',').map(tag => tag.trim());

    // Create the new blog post with the image path, generated slug, and tags array
    const newBlog = await prisma.blogs.create({
      data: {
        title,
        description,
        image: `/uploads/blogimage/${uniqueFilename}`, // Store the relative path to the image
        slug,
        tag: tagsArray, // Store the tags as an array
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


export async function editBlog(formData, blogId) {
  try {
    const title = formData.get('title');
    const description = formData.get('description');
    const imageFile = formData.get('image');
    const tagString = formData.get('tag'); // Updated to receive a string
    const seoTitle = formData.get('seoTitle');
    const seoDescription = formData.get('seoDescription');
    const seoKeywords = formData.get('seoKeywords');

    if (!blogId) {
      throw new Error('Blog ID is required');
    }

    const id = parseInt(blogId, 10);
    if (isNaN(id)) {
      throw new Error('Invalid Blog ID');
    }

    const existingBlog = await prisma.blogs.findUnique({
      where: { id: id },
    });

    if (!existingBlog) {
      throw new Error('Blog post not found');
    }

    const baseSlug = title ? generateSlug(title) : existingBlog.slug;
    const slug = await generateUniqueSlug(baseSlug);

    let newImagePath = existingBlog.image;

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uniqueFilename = generateUniqueFilename(imageFile.name);
      const filePath = path.join(process.cwd(), "public/uploads/blogimage", uniqueFilename);

      await writeFile(filePath, buffer);

      newImagePath = `/uploads/blogimage/${uniqueFilename}`;

      const oldImagePath = path.join(process.cwd(), 'public/uploads/blogimage', path.basename(existingBlog.image));
      await unlink(oldImagePath).catch((error) => {
        console.error('Error deleting old image:', error);
      });
    }

    // Convert the tag string to an array
    const tagsArray = tagString ? tagString.split(',').map(tag => tag.trim()) : existingBlog.tag;

    const updatedBlog = await prisma.blogs.update({
      where: { id: id },
      data: {
        title: title || existingBlog.title,
        description: description || existingBlog.description,
        image: newImagePath,
        slug,
        tag: tagsArray, // Update tags array
        seoTitle: seoTitle || existingBlog.seoTitle,
        seoDescription: seoDescription || existingBlog.seoDescription,
        seoKeywords: seoKeywords || existingBlog.seoKeywords,
      },
    });

    return updatedBlog;
  } catch (error) {
    console.error('Error editing blog:', error);
    throw new Error('Failed to edit blog.');
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
    const filePath = path.join(process.cwd(), 'public/uploads/blogimage', path.basename(blog.image));

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


export async function getBlogById(blogId) {
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
    const blog = await prisma.blogs.findUnique({
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
export async function Getdetails(blogSlug) {
  // Assume this is a valid slug
 try {
   // Ensure blogSlug is provided
   if (!blogSlug) {
     throw new Error('Blog Slug is required');
   }

   // Fetch the blog post from the database using the slug
   const blog = await prisma.blogs.findUnique({
     where: { slug: blogSlug },
   });

   // Check if the blog post exists
   if (!blog) {
     throw new Error('Blog post not found');
   }

   console.log(blog);
   return blog;
 } catch (error) {
   console.error('Error fetching blog:', error.message);
   throw new Error('Failed to fetch blog.');
 }
}
export const fetchBlogs = async () => {
  try {
    const data = await prisma.blogs.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    // Ensure that data is being returned correctly
    if (!data) {
      throw new Error('No blogs found');
    }

    return data;
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
    throw new Error('Failed to fetch blogs.');
  }
};

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


export async function addProject(formData) {
  try {
    const title = formData.get('title');
    const description = formData.get('description');
    const imageFile = formData.get('image');
    const url = formData.get('url');

   

    if (!imageFile || !title) {
      throw new Error('Missing required fields');
    }

    // Convert the file data to a Buffer
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    // Generate a unique filename for the image
    const uniqueFilename = generateUniqueFilename(imageFile.name);
    const filePath = path.join(process.cwd(), "public/uploads/projects", uniqueFilename);

    // Write the file to the specified directory (public/uploads/blogimage)
    await writeFile(filePath, buffer);


    // Create the new blog post with the image path, generated slug, and tags array
    const newProject = await prisma.projects.create({
      data: {
        title,
        description,
        image: `/uploads/projects/${uniqueFilename}`, // Store the relative path to the image
        url,
        
      },
    });

    return newProject;
  } catch (error) {
    console.error('Error adding blog:', error);
    throw new Error('Failed to add blog.');
  }
}


export async function editProject(formData, projectId) {
  try {
    const title = formData.get('title');
    const description = formData.get('description');
    const imageFile = formData.get('image');
    const url = formData.get('url');

    // Parse and validate the project ID
    const id = parseInt(projectId, 10);
    if (isNaN(id)) {
      throw new Error('Invalid Project ID');
    }

    // Find the existing project by ID
    const existingProject = await prisma.projects.findUnique({
      where: { id: id },
    });

    if (!existingProject) {
      throw new Error('Project post not found');
    }

    // Determine new image path
    let newImagePath = existingProject.image;

    // Handle image file update
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uniqueFilename = generateUniqueFilename(imageFile.name);
      const filePath = path.join(process.cwd(), "public/uploads/projects", uniqueFilename);

      await writeFile(filePath, buffer);

      newImagePath = `/uploads/projects/${uniqueFilename}`;

      // Delete old image if it exists
      const oldImagePath = path.join(process.cwd(), 'public/uploads/projects', path.basename(existingProject.image));
      await unlink(oldImagePath).catch((error) => {
        console.error('Error deleting old image:', error);
      });
    }

    // Update the project with new data
    const updatedProject = await prisma.projects.update({
      where: { id: id },
      data: {
        title: title || existingProject.title,
        description: description || existingProject.description,
        image: newImagePath,
        url: url || existingProject.url
      },
    });

    return updatedProject;
  } catch (error) {
    console.error('Error editing blog:', error);
    throw new Error('Failed to edit blog.');
  }
}




export async function deleteProjecte(id) {
  try {
    console.log('Attempting to delete project with ID:', id);

    // Find the project entry
    const project = await prisma.projects.findUnique({ where: { id } });

    if (!project) {
      console.log('project not found for ID:', id);
      throw new Error('Project not found');
    }

    console.log('Found project:', project);

    // Delete the blog entry
    await prisma.projects.delete({ where: { id } });

    // Define the path to the image
    const filePath = path.join(process.cwd(), 'public/uploads/projects', path.basename(project.image));

    // Try to delete the image file
    try {
      await unlink(filePath);
      console.log('Image file deleted:', filePath);
    } catch (fileError) {
      console.error('Error deleting image file:', fileError);
      // Optionally rethrow or handle the file deletion error
    }

    return { message: 'project deleted successfully' };
  } catch (error) {
    console.error('Error deleting project:', error);
    // Provide detailed error information
    throw new Error(`Failed to delete project. Details: ${error.message}`);
  }
}


export async function getProjectById(ProjectId) {
  try {
    // Ensure project is provided and convert it to integer
    if (!ProjectId) {
      throw new Error('project ID is required');
    }

    const id = parseInt(ProjectId, 10);
    if (isNaN(id)) {
      throw new Error('Invalid project ID');
    }

    // Fetch the project post from the database
    const project = await prisma.projects.findUnique({
      where: { id: id },
    });

    // Check if the project post exists
    if (!project) {
      throw new Error('project  not found');
    }

    // console.log(project);
    return project;
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw new Error('Failed to fetch blog.');
  }
}

export const fetchProjects = async () => {
  try {
    const data = await prisma.projects.findMany({
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

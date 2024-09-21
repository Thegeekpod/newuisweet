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
  while (await prisma.jobPost.findUnique({ where: { slug } })) {
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


export async function addJobPost(formData) {
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
    const filePath = path.join(process.cwd(), "public/uploads/jobpostimage/icon", uniqueFilename);
    await writeFile(filePath, buffer);
    iconImagePath = `/uploads/jobpostimage/icon/${uniqueFilename}`;


    // Handle banner image file upload if provided
    let bannerImagePath = '';
    if (bannerImageFile) {
      const bannerBuffer = Buffer.from(await bannerImageFile.arrayBuffer());
      const uniqueBannerFilename = generateUniqueFilename(bannerImageFile.name);
      const bannerFilePath = path.join(process.cwd(), "public/uploads/jobpostimage/banner", uniqueBannerFilename);
      await writeFile(bannerFilePath, bannerBuffer);
      bannerImagePath = `/uploads/jobpostimage/banner/${uniqueBannerFilename}`;
    }
   

    // Generate a slug based on the title
    const baseSlug = generateSlug(title);
    const slug = await generateUniqueSlug(baseSlug);

    // Create the new jobPost
    const newJobPost = await prisma.jobPost.create({
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
   
    return newJobPost;
  } catch (error) {
    console.error('Error adding jobPost:', error);
    throw new Error('Failed to add jobPost.');
  }
}





export async function editJobPost(formData, jobPostId) {
  try {
    const title = formData.get('title');
    const description = formData.get('description');
    const imageFile = formData.get('image');
    const bannerImageFile = formData.get('bannerImage');
    const seoTitle = formData.get('seoTitle');
    const seoDescription = formData.get('seoDescription');
    const seoKeywords = formData.get('seoKeywords');


    if (!jobPostId) {
      throw new Error('JobPost ID is required');
    }

    const id = parseInt(jobPostId, 10);
    if (isNaN(id)) {
      throw new Error('Invalid JobPost ID');
    }

    const existingJobPost = await prisma.jobPost.findUnique({
      where: { id },
      include: {
        jobApplied:true
      },
    });

    if (!existingJobPost) {
      throw new Error('JobPost not found');
    }

    // Handle slug generation
    let slug = existingJobPost.slug;
    if (title && title !== existingJobPost.title) {
      const baseSlug = generateSlug(title);
      slug = await generateUniqueSlug(baseSlug);
    }

       // Handle image upload
       let newImagePath = existingJobPost.image;
       if (imageFile && imageFile.size > 0) {
         const buffer = Buffer.from(await imageFile.arrayBuffer());
         const uniqueFilename = generateUniqueFilename(imageFile.name);
         const filePath = path.join(process.cwd(), "public/uploads/jobpostimage/icon", uniqueFilename);
         await writeFile(filePath, buffer);
         newImagePath = `/uploads/jobpostimage/icon/${uniqueFilename}`;
   
         // Delete old image if a new one is uploaded
         const oldImagePath = path.join(process.cwd(), 'public/uploads/jobpostimage/icon', path.basename(existingJobPost.image));
         await unlink(oldImagePath).catch((error) => console.error('Error deleting old image:', error));
       }
   
       // Handle banner image upload
       let newBannerImagePath = existingJobPost.bannerImage;
       if (bannerImageFile && bannerImageFile.size > 0) {
         const bannerBuffer = Buffer.from(await bannerImageFile.arrayBuffer());
         const uniqueBannerFilename = generateUniqueFilename(bannerImageFile.name);
         const bannerFilePath = path.join(process.cwd(), "public/uploads/jobpostimage/banner", uniqueBannerFilename);
         await writeFile(bannerFilePath, bannerBuffer);
         newBannerImagePath = `/uploads/jobpostimage/banner/${uniqueBannerFilename}`;
   
         // Delete old banner image if a new one is uploaded
         const oldBannerPath = path.join(process.cwd(), 'public/uploads/jobpostimage/banner', path.basename(existingJobPost.bannerImage));
         await unlink(oldBannerPath).catch((error) => console.error('Error deleting old banner image:', error));
       }

    // Update jobPost details
    const updatedJobPost = await prisma.jobPost.update({
      where: { id },
      data: {
        title: title || existingJobPost.title,
        description: description || existingJobPost.description,
        image: newImagePath,
        bannerImage: newBannerImagePath,
        slug,
        seoTitle: seoTitle || existingJobPost.seoTitle,
        seoDescription: seoDescription || existingJobPost.seoDescription,
        seoKeywords: seoKeywords || existingJobPost.seoKeywords,
      },
    });

    
    return updatedJobPost;
  } catch (error) {
    console.error('Error editing jobPost:', error);
    throw new Error('Failed to edit jobPost.');
  }
}




export async function deleteJobPost(id) {
  try {
    console.log('Attempting to delete jobPost with ID:', id);

    // Find the jobPost entry along with related JobApplied entries
    const jobPost = await prisma.jobPost.findUnique({
      where: { id },
      include: {
        jobApplied: true, // Include related JobApplied in the query
      },
    });

    if (!jobPost) {
      console.log('JobPost not found for ID:', id);
      throw new Error('JobPost not found');
    }

    console.log('Found jobPost:', jobPost);

    // Delete the related JobApplied entries first
    const jobAppliedEntries = await prisma.jobApplied.findMany({
      where: {
        jobId: id,
      },
    });

    // Delete the related CV files
    for (const application of jobAppliedEntries) {
      if (application.cvUpload) {
        const cvFilePath = path.join(process.cwd(), 'public/uploads/jobcv', path.basename(application.cvUpload));
        try {
          await unlink(cvFilePath);
          console.log('CV file deleted:', cvFilePath);
        } catch (fileError) {
          console.error('Error deleting CV file:', fileError);
        }
      }
    }

    // Delete the jobApplied entries
    await prisma.jobApplied.deleteMany({
      where: {
        jobId: id,
      },
    });

    // Delete the jobPost entry
    await prisma.jobPost.delete({ where: { id } });

    // Define paths for images
    const imagePath = path.join(process.cwd(), 'public/uploads/jobpostimage/icon', path.basename(jobPost.image));
    const bannerImagePath = path.join(process.cwd(), 'public/uploads/jobpostimage/banner', path.basename(jobPost.bannerImage));

    // Try to delete the image files
    try {
      // Delete the jobPost image file
      if (jobPost.image) {
        await unlink(imagePath);
        console.log('Image file deleted:', imagePath);
      }

      // Delete the banner image file
      if (jobPost.bannerImage) {
        await unlink(bannerImagePath);
        console.log('Banner image file deleted:', bannerImagePath);
      }
    } catch (fileError) {
      console.error('Error deleting image file:', fileError);
    }

    return { message: 'JobPost, related applications, and associated files deleted successfully' };
  } catch (error) {
    console.error('Error deleting jobPost:', error);
    throw new Error(`Failed to delete jobPost. Details: ${error.message}`);
  }
}





export async function GetCandidates(jobPostSlug) {
  // Assume this is a valid slug
 try {
   // Ensure jobPostSlug is provided
   if (!jobPostSlug) {
     throw new Error('JobPost Slug is required');
   }

   // Fetch the jobPost post from the database using the slug
   const jobPost = await prisma.jobPost.findUnique({
     where: { slug: jobPostSlug },
     include:{
      jobApplied:true,
     }
   });
 
   // Check if the jobPost post exists
   if (!jobPost) {
     throw new Error('JobPost post not found');
   }

   console.log(jobPost.jobApplied);
   return jobPost;
 } catch (error) {
   console.error('Error fetching jobPost:', error.message);
   throw new Error('Failed to fetch jobPost.');
 }
}


export async function deleteCandidate(id) {
  if (!id) {
    return { message: 'Candidate ID is required', status: 400 };
  }

  try {
    const jobAppliedEntry = await prisma.jobApplied.findUnique({
      where: { id },
    });

    if (!jobAppliedEntry) {
      return { message: 'JobApplied entry not found', status: 404 };
    }

    const cvFilePath = path.join(process.cwd(), 'public/uploads/jobcv', path.basename(jobAppliedEntry.cvUpload));

    try {
      if (jobAppliedEntry.cvUpload) {
        await unlink(cvFilePath);
        console.log('CV file deleted:', cvFilePath);
      }
    } catch (fileError) {
      console.error('Error deleting CV file:', fileError);
    }

    await prisma.jobApplied.delete({
      where: { id },
    });

    return { message: 'Candidate and CV deleted successfully', status: 200 };
  } catch (error) {
    console.error('Error deleting candidate:', error.message);
    return { message: 'Failed to delete candidate.', status: 500 };
  }
}




export const fetchJobPost = async () => {
  try {
    const data = await prisma.jobPost.findMany({
      orderBy: {
        id: 'desc',
      },
      include:{
        jobApplied: true
      }
    });

    // Ensure that data is being returned correctly
    if (!data) {
      throw new Error('No jobPost found');
    }

    return data;
  } catch (error) {
    console.error('Error fetching jobPost:', error.message);
    throw new Error('Failed to fetch jobPost.');
  }
};
export async function getJobPostById(id) {
  const jobPostId = id;
  try {
    if (!jobPostId) {
      throw new Error('JobPost ID is required');
    }

    const id = parseInt(jobPostId, 10);
    if (isNaN(id)) {
      throw new Error('Invalid JobPost ID');
    }

    // Fetch the jobPost and its FAQs from the database
    const jobPost = await prisma.jobPost.findUnique({
      where: { id: id },
      include: {
        jobApplied: true, // Include related JobApplied in the query
      },
    });

    if (!jobPost) {
      throw new Error('JobPost not found');
    }

    return jobPost;
  } catch (error) {
    console.error('Error fetching jobPost:', error);
    throw new Error('Failed to fetch jobPost.');
  }
}





export async function submitApplication(formData) {
  try {
    // Extract data from the FormData object
    const jobId = formData.get('jobId');
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const cvUpload = formData.get('cvUpload');

    // Validate required fields
    if (!name || !email || !phone || !address || !cvUpload) {
      return { success: false, error: 'All fields are required' };
    }

    // Ensure that the directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'jobcv');
    
    // Generate a unique file name using timestamp
    const timestamp = Date.now();
    const fileExtension = cvUpload.name.split('.').pop();
    const uniqueFileName = `${timestamp}.${fileExtension}`;
    const filePath = path.join(uploadDir, uniqueFileName);
    
    // Handle file upload
    const file = cvUpload;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Save the file to the jobcv directory
    await writeFile(filePath, buffer);

    // Fix file path for database storage (public path)
    const newPath = `/uploads/jobcv/${uniqueFileName}`;

    // Create a new job application record in the database
    const jobApplied = await prisma.jobApplied.create({
      data: {
        jobId: parseInt(jobId),
        name,
        email,
        phone,
        address,
        cvUpload: newPath, // Store the file path in the database
      },
    });

    return { success: true, jobApplied };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to submit application' };
  }
}


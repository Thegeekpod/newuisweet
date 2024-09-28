"use server";

import path from 'path';
import { writeFile, unlink } from 'fs/promises';
import prisma from '../../../../../lib/prisma';



// Utility function to generate a unique filename for the image
const generateUniqueFilename = (originalName) => {
  const timestamp = Date.now();
  const extension = path.extname(originalName);
  const basename = path.basename(originalName, extension);
  const cleanedBasename = basename.replace(/\s+/g, '_'); // Replace spaces with underscores
  return `${cleanedBasename}-${timestamp}${extension}`;
};

// Add SEO function with OG image upload support
export async function addSEO(formData) {
  try {
    const pagename = formData.get('pagename');
    const title = formData.get('title');
    const description = formData.get('description');
    const canonical = formData.get('canonical');
    const og_title = formData.get('og_title');
    const og_description = formData.get('og_description');
    const og_url = formData.get('og_url');
    const og_type = formData.get('og_type');
    const og_site_name = formData.get('og_site_name');
    const og_locale = formData.get('og_locale');
    const schema = formData.get('schema');
    const ogImageFile = formData.get('og_image');

    // Handle OG image upload
    let og_image_path = null;
    if (ogImageFile && ogImageFile.size > 0) {
      const buffer = Buffer.from(await ogImageFile.arrayBuffer());
      const uniqueFilename = generateUniqueFilename(ogImageFile.name);
      const filePath = path.join(process.cwd(), "public/uploads/seo", uniqueFilename);

      // Save the file to the uploads directory
      await writeFile(filePath, buffer);
      og_image_path = `/uploads/seo/${uniqueFilename}`; // Store relative path
    }

    // Create new SEO entry in the database
    const newSEO = await prisma.sEO.create({
      data: {
        pagename,
        title,
        description,
        canonical,
        og_title,
        og_description,
        og_url,
        og_image: og_image_path, // Save OG image path
        og_type,
        og_site_name,
        og_locale,
        schema,
      },
    });

    return newSEO;
  } catch (error) {
    console.error('Error adding SEO:', error);
    throw new Error('Failed to add SEO.');
  }
}

// Edit SEO function with OG image upload support
export async function editSEO(formData, seoId) {
  try {
    const pagename = formData.get('pagename');
    const title = formData.get('title');
    const description = formData.get('description');
    const canonical = formData.get('canonical');
    const og_title = formData.get('og_title');
    const og_description = formData.get('og_description');
    const og_url = formData.get('og_url');
    const og_type = formData.get('og_type');
    const og_site_name = formData.get('og_site_name');
    const og_locale = formData.get('og_locale');
    const schema = formData.get('schema');
    const ogImageFile = formData.get('og_image');

    // Parse and validate the SEO ID
    const id = parseInt(seoId, 10);
    if (isNaN(id)) {
      throw new Error('Invalid SEO ID');
    }

    // Find the existing SEO entry by ID
    const existingSEO = await prisma.sEO.findUnique({
      where: { id: id },
    });

    if (!existingSEO) {
      throw new Error('SEO entry not found');
    }

    // Handle OG image file update
    let og_image_path = existingSEO.og_image;
    if (ogImageFile && ogImageFile.size > 0) {
      const buffer = Buffer.from(await ogImageFile.arrayBuffer());
      const uniqueFilename = generateUniqueFilename(ogImageFile.name);
      const filePath = path.join(process.cwd(), "public/uploads/seo", uniqueFilename);

      // Save the new OG image file
      await writeFile(filePath, buffer);
      og_image_path = `/uploads/seo/${uniqueFilename}`;

      // Delete old OG image if it exists
      if (existingSEO.og_image) {
        const oldImagePath = path.join(process.cwd(), 'public/uploads/seo', path.basename(existingSEO.og_image));
        await unlink(oldImagePath).catch((error) => {
          console.error('Error deleting old OG image:', error);
        });
      }
    }

    // Update the SEO entry
    const updatedSEO = await prisma.sEO.update({
      where: { id: id },
      data: {
        pagename: pagename || existingSEO.pagename,
        title: title || existingSEO.title,
        description: description || existingSEO.description,
        canonical: canonical || existingSEO.canonical,
        og_title: og_title || existingSEO.og_title,
        og_description: og_description || existingSEO.og_description,
        og_url: og_url || existingSEO.og_url,
        og_image: og_image_path, // Update OG image path
        og_type: og_type || existingSEO.og_type,
        og_site_name: og_site_name || existingSEO.og_site_name,
        og_locale: og_locale || existingSEO.og_locale,
        schema: schema || existingSEO.schema,
      },
    });

    return updatedSEO;
  } catch (error) {
    console.error('Error editing SEO:', error);
    throw new Error('Failed to edit SEO.');
  }
}


// Function to delete SEO entry and its OG image
export async function deleteSEOEntry(seoId) {
  try {
    // Parse and validate the SEO ID
    const id = parseInt(seoId, 10);
    if (isNaN(id)) {
      throw new Error('Invalid SEO ID');
    }

    // Find the existing SEO entry by ID
    const existingSEO = await prisma.sEO.findUnique({
      where: { id: id },
    });

    if (!existingSEO) {
      throw new Error('SEO entry not found');
    }

    // Delete the OG image file if it exists
    if (existingSEO.og_image) {
      const imagePath = path.join(process.cwd(), 'public/uploads/seo', path.basename(existingSEO.og_image));
      await unlink(imagePath).catch((error) => {
        console.error('Error deleting OG image:', error);
      });
    }

    // Delete the SEO entry from the database
    await prisma.sEO.delete({
      where: { id: id },
    });

    return { success: true, message: 'SEO entry deleted successfully' };
  } catch (error) {
    console.error('Error deleting SEO:', error);
    throw new Error('Failed to delete SEO entry.');
  }
}

export const fetchSEOEntries = async () => {
  try {
    const data = await prisma.sEO.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    // Ensure that data is being returned correctly
    if (!data) {
      throw new Error('No seo found');
    }

    return data;
  } catch (error) {
    console.error('Error fetching seo:', error.message);
    throw new Error('Failed to fetch seo.');
  }
};



export async function getSEOById(seoId) {
  try {
    const id = parseInt(seoId, 10);
    if (isNaN(id)) {
      throw new Error('Invalid SEO ID');
    }

    const seo = await prisma.sEO.findUnique({
      where: { id: id },
    });

    if (!seo) {
      throw new Error('SEO not found');
    }
    return seo;
  } catch (error) {
    console.error('Error fetching SEO:', error);
    throw new Error('Failed to fetch SEO.');
  }
}

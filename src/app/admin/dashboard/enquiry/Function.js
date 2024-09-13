"use server"

import prisma from "../../../../../lib/prisma";


export async function deleteEnquiry(id) {
  try {
    console.log('Attempting to delete enquiry with ID:', id);

    // Find the enquiry entry
    const enquiry = await prisma.contactForm.findUnique({ where: { id } });

    if (!enquiry) {
      console.log('Enquiry not found for ID:', id);
      throw new Error('Enquiry not found');
    }

    console.log('Found enquiry:', enquiry);

    // Delete the enquiry entry
    await prisma.contactForm.delete({ where: { id } });


    return { message: 'Enquiry deleted successfully' };
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    // Provide detailed error information
    throw new Error(`Failed to delete enquiry. Details: ${error.message}`);
  }
}



export const fetchEnquiry = async () => {
  try {
    const data = await prisma.contactForm.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    // Ensure that data is being returned correctly
    if (!data) {
      throw new Error('No enquirys found');
    }

    return data;
  } catch (error) {
    console.error('Error fetching enquirys:', error.message);
    throw new Error('Failed to fetch enquirys.');
  }
};

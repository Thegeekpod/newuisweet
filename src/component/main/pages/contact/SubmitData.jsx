"use server";

import prisma from "../../../../../lib/prisma";

export async function submitForm(formData) {
  try {
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const services = formData.get('services');
    const message = formData.get('message');

    if (!name || !phone || !services || !message) {
      throw new Error('Missing required fields');
    }

    // Create a new record with the submitted form data
    const newSubmission = await prisma.ContactForm.create({
      data: {
        name,
        phone,
        email,
        services,
        message,
      },
    });

    return newSubmission;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw new Error('Failed to submit form.');
  }
}

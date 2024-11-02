import prisma from "../../../../lib/prisma";


export async function savePaymentToDatabase(projectName, amount, paymentId) {
  try {
    const payment = await prisma.payment.create({
      data: {
        projectName,
        amount,
        paymentId,
        paymentStatus: 'COMPLETED',
      },
    });
    return payment;
  } catch (error) {
    console.error('Failed to save payment:', error);
    throw new Error('Failed to save payment');
  }
}

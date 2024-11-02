"use client";
import React, { useEffect, useRef, useState } from 'react';
import { loadScript } from '@paypal/paypal-js';
import { savePaymentToDatabase } from './savePayment';


const PayPalButton = () => {
  const [formData, setFormData] = useState({ amount: '', projectName: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const paypalRef = useRef(null);

  useEffect(() => {
    if (showButtons && paypalRef.current) {
      loadScript({ "client-id": `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}` })
        .then((paypal) => {
          if (paypal && paypalRef.current) {
            paypal.Buttons({
              createOrder: (data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE", // Specify the intent here
                  purchase_units: [
                    {
                      description: formData.projectName,
                      amount: {
                        currency_code: 'USD',
                        value: parseFloat(formData.amount).toFixed(2),
                      },
                    },
                  ],
                });
              },
              onApprove: async (data, actions) => {
                setIsProcessing(true); // Start processing
                try {
                  const details = await actions.order.capture();
                  await savePaymentToDatabase(formData.projectName, parseFloat(formData.amount), details.id);
                  alert('Payment successful!');
                } catch (error) {
                  console.error('Error saving payment:', error);
                  setShowError(true);
                } finally {
                  setIsProcessing(false); // Stop processing
                }
              },
              onError: () => {
                setShowError(true);
              },
            }).render(paypalRef.current);
          }
        })
        .catch((error) => {
          console.error("Failed to load PayPal SDK:", error);
          setShowError(true);
        });
    }
  }, [showButtons, formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setShowButtons(false); // Hide PayPal buttons if input changes
  };

  return (
<div className="rounded-2xl grid lg:grid-cols-2 gap-6 bg-white p-10 shadow-lg dark:bg-gray-900 dark:shadow-xl lg:col-span-2 lg:p-14">
   <div className="flex flex-col items-center justify-center lg:border-r-2 lg:border-gray-200 dark:lg:border-gray-700">
    <h2 className="text-2xl font-semibold dark:text-light pb-4">Pay via QR Code</h2>
    <img src="/assets/image/qrcode.png" alt="QR code for payment" className="w-10/12 shadow-md " />
  </div>
  
  <div className="flex flex-col justify-center ">
    <h2 className="text-2xl font-semibold dark:text-light pb-4">Make a Payment via PayPal</h2>
    
    <div className="mb-6">
      <label htmlFor="projectName" className="block text-sm font-semibold text-gray-700 dark:text-gray-400 mb-2">Project Name</label>
      <input
        type="text"
        id="projectName"
        name="projectName"
        placeholder="Enter Project Name"
        value={formData.projectName}
        onChange={handleInputChange}
        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-blue-500 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
      />
    </div>
    
    <div className="mb-6">
      <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 dark:text-gray-400 mb-2">Amount</label>
      <input
        type="number"
        id="amount"
        name="amount"
        placeholder="Enter Amount"
        value={formData.amount}
        onChange={handleInputChange}
        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-blue-500 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
      />
    </div>

    {!showButtons ? (
      <div className="flex justify-center">
        <button
          onClick={() => setShowButtons(true)}
          className="w-full lg:w-auto bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!formData.amount || !formData.projectName || isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Pay with PayPal'}
        </button>
      </div>
    ) : (
      <div ref={paypalRef} className="w-full mt-8"></div>
    )}

    {showError && <p className="text-red-500 mt-6 text-center">An error occurred. Please try again.</p>}
  </div>
</div>


  );
};

export default PayPalButton;

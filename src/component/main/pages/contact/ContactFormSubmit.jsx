"use client";
import { useState } from 'react';
import Swal from 'sweetalert2';
import { submitForm } from './SubmitData';
import { unstable_noStore as noStore } from 'next/cache';

export default function ContactFormSubmit({service}) {
  noStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    services: service || '',
    message: ''
  });

  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
      
    });

    try {
      await submitForm(formDataToSend);
      setLoading(false); // Stop loading after submission

      Swal.fire({
        title: 'Thank you!',
        text: 'Your data has been submitted. We will contact you soon.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#28a745' // Change OK button color to green
      }).then(() => {
        // Reset form fields after success
        setFormData({
          name: '',
          phone: '',
          email: '',
          services: '',
          message: ''
        });
      });
    } catch (error) {
      setLoading(false); // Stop loading on error
      Swal.fire({
        title: 'Submission Failed',
        text: 'Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#28a745' // Change OK button color to green
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg p-1 xl:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="block w-full rounded-lg border px-6 py-4"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Phone
          </label>
          <input
            required
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="block w-full rounded-lg border px-6 py-4"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="block w-full rounded-lg border px-6 py-4"
          />
        </div>
        <div>
          <label htmlFor="services" className="mb-2 block text-sm font-medium">
            Services
          </label>
          {!service ? (
            <select
            id="services"
            name="services"
            value={formData.services}
            onChange={handleChange}
            className="block w-full rounded-lg border px-6 py-4"
          >
            <option value="">Select a service</option>
            <option value="webdevelopment">Web Development</option>
            <option value="graphicdesign">Graphic Design</option>
            <option value="appdevelopment">App Development</option>
          </select>
          ) :  <input
          required
          readOnly
          type="services"
          id="services"
          name="services"
          value={formData.services || service}
          onChange={handleChange}
          placeholder="Enter your services"
          className="block w-full rounded-lg border px-6 py-4"
        /> }
          
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea
          required
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Type your inquiry"
          rows={4}
          className="block w-full rounded-lg border px-6 py-4"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-primary px-6 py-4 text-white transition hover:bg-blue-600"
        disabled={loading}
      >
         {loading ? (
    <>
      Sending Message <span class="dots"></span>

    </>
  ) : (
    'Send Message'
  )}
      </button>
    </form>
  );
}

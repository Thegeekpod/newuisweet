"use client";
import { submitApplication } from "@/app/admin/dashboard/job-post/function";
import { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function JobApplyForm({ jobId }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    cvUpload: "",
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, cvUpload: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("jobId", jobId);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("cvUpload", formData.cvUpload);

    try {
      const result = await submitApplication(formDataToSend);
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your application has been submitted successfully!",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          cvUpload: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: result.error || "Error submitting application.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while submitting the application.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
        <hr className="mb-4"/>
      <h1 className="text-2xl font-bold mb-6 text-center">Apply for Job</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded "
        encType="multipart/form-data"
      >
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone Field */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address Field */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* CV Upload Field */}
        <div className="mb-4">
          <label htmlFor="cvUpload" className="block text-gray-700 text-sm font-bold mb-2">
            Upload CV
          </label>
          <input
            type="file"
            name="cvUpload"
            id="cvUpload"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addSEO } from "../function"; // Import SEO function
import { unstable_noStore as noStore } from 'next/cache';
const AddForm = () => {
  noStore();
  const [formData, setFormData] = useState({
    pagename: "", 
    seoTitle: "",
    seoDescription: "",
    canonical: "",
    ogTitle: "",
    ogDescription: "",
    ogUrl: "",
    ogType: "website",
    ogSiteName: "Your Site Name",
    ogLocale: "en_US",
    schema: "",
    ogImage: null,
  });

  const [notification, setNotification] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      // Add SEO
      const seoData = new FormData();
      seoData.append("pagename", formData.pagename);
      seoData.append("title", formData.seoTitle);
      seoData.append("description", formData.seoDescription);
      seoData.append("canonical", formData.canonical);
      seoData.append("og_title", formData.ogTitle);
      seoData.append("og_description", formData.ogDescription);
      seoData.append("og_url", formData.ogUrl);
      seoData.append("og_type", formData.ogType);
      seoData.append("og_site_name", formData.ogSiteName);
      seoData.append("og_locale", formData.ogLocale);
      seoData.append("schema", formData.schema);
      if (formData.ogImage) {
        seoData.append("og_image", formData.ogImage);
      }
      await addSEO(seoData);

      setNotification("Project and SEO added successfully!");
      setTimeout(() => {
        setNotification("");
        router.push("/admin/dashboard/seo");
      }, 2000);
    } catch (error) {
      setNotification("Failed to add project and SEO. Please try again.");
    }
  };

  return (
    <div className="relative">
      {notification && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white p-4 rounded shadow-md">
          {notification}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow-md mx-auto mt-8">
        {/* SEO Fields */}
        <div>
          <label htmlFor="pagename" className="block text-sm font-medium text-gray-700 mb-1">Page Name</label>
          <select name="pagename" id="pagename" value={formData.pagename} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded">
            <option value="Home">Home</option>
            <option value="About">About</option>
            <option value="Services">Services</option>
            <option value="Projects">Projects</option>
            <option value="Articles">Articles</option>
            <option value="Contact">Contact</option>
            <option value="Career">Career</option>
          </select>
        </div>
        <div>
          <label htmlFor="seoTitle" className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
          <input type="text" name="seoTitle" id="seoTitle" value={formData.seoTitle} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded" />
        </div>

        <div>
          <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
          <textarea name="seoDescription" id="seoDescription" value={formData.seoDescription} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded"></textarea>
        </div>

        <div>
          <label htmlFor="canonical" className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
          <input type="url" name="canonical" id="canonical" value={formData.canonical} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded" />
        </div>

        <div>
          <label htmlFor="ogTitle" className="block text-sm font-medium text-gray-700 mb-1">OG Title</label>
          <input type="text" name="ogTitle" id="ogTitle" value={formData.ogTitle} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded" />
        </div>

        <div>
          <label htmlFor="ogDescription" className="block text-sm font-medium text-gray-700 mb-1">OG Description</label>
          <textarea name="ogDescription" id="ogDescription" value={formData.ogDescription} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded"></textarea>
        </div>

        <div>
          <label htmlFor="ogUrl" className="block text-sm font-medium text-gray-700 mb-1">OG URL</label>
          <input type="url" name="ogUrl" id="ogUrl" value={formData.ogUrl} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded" />
        </div>

        <div>
          <label htmlFor="ogType" className="block text-sm font-medium text-gray-700 mb-1">OG Type</label>
          <input type="text" name="ogType" id="ogType" value={formData.ogType} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded" />
        </div>

        <div>
          <label htmlFor="ogSiteName" className="block text-sm font-medium text-gray-700 mb-1">OG Site Name</label>
          <input type="text" name="ogSiteName" id="ogSiteName" value={formData.ogSiteName} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded" />
        </div>

        <div>
          <label htmlFor="ogLocale" className="block text-sm font-medium text-gray-700 mb-1">OG Locale</label>
          <input type="text" name="ogLocale" id="ogLocale" value={formData.ogLocale} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded" />
        </div>

        <div>
          <label htmlFor="schema" className="block text-sm font-medium text-gray-700 mb-1">Schema</label>
          <textarea name="schema" id="schema" value={formData.schema} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded"></textarea>
        </div>

        <div>
          <label htmlFor="ogImage" className="block text-sm font-medium text-gray-700 mb-1">OG Image</label>
          <input type="file" name="ogImage" id="ogImage" onChange={handleImageChange} className="block w-full p-2 border border-gray-300 rounded" />
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
};

export default AddForm;

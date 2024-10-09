"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addBlog } from '../function/Add';
import { unstable_noStore as noStore } from 'next/cache';
import { Editor } from '@tinymce/tinymce-react';

const BlogForm = () => {
  noStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    short_description: '',
    image: null,
    tag: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    schema: '',
  });

  const [notification, setNotification] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      description: content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      await addBlog(formDataToSend);
      setNotification('Blog added successfully!');
      setTimeout(() => {
        setNotification('');
        router.push('/admin/dashboard/blog'); // Navigate to the desired page
      }, 2000); // Adjust delay as needed
    } catch (error) {
      setNotification('Failed to add blog. Please try again.');
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
      <div className ="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
        <div>
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
   {/* Short Description */}
   <div>
          <label htmlFor="short_description" className="block text-sm font-medium text-gray-700 mb-1">
            Short Description
          </label>
          <input
            type="text"
            name="short_description"
            id="short_description"
            value={formData.short_description}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Editor
            apiKey="fhwn3bux5jvgi5gdbewhzbu8vnzxow2wyp4a1k1zg9c32gp9" // Replace with your TinyMCE API key
            value={formData.description}
            init={{
              height: 400,
              menubar: true,
              plugins: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
              toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
            onEditorChange={handleEditorChange}
          />
        </div>

     

        {/* Image */}
       
        </div>
        <div>
        {/* Tag */}
        <div>
          <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
            Tag
          </label>
          <input
            type="text"
            name="tag"
            id="tag"
            value={formData.tag}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* SEO Title */}
        <div>
          <label htmlFor="seoTitle" className="block text-sm font-medium text-gray-700 mb-1">
            SEO Title
          </label>
          <input
            type="text"
            name="seoTitle"
            id="seoTitle"
            value={formData.seoTitle}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* SEO Description */}
        <div>
          <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-700 mb-1">
            SEO Description
          </label>
          <textarea
            name="seoDescription"
            id="seoDescription"
            value={formData.seoDescription}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* SEO Keywords */}
        <div>
          <label htmlFor="seoKeywords" className="block text-sm font-medium text-gray-700 mb-1">
            SEO Keywords
          </label>
          <input
            type="text"
            name="seoKeywords"
            id="seoKeywords"
            value={formData.seoKeywords}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Schema */}
        <div>
          <label htmlFor="schema" className="block text-sm font-medium text-gray-700 mb-1">
            Schema
          </label>
          <textarea
            name="schema"
            id="schema"
            value={formData.schema}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        </div>
        
</div>
        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;

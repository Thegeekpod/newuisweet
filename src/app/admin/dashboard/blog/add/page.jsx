"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addBlog } from '../function/Add';
 import { unstable_noStore as noStore }  from 'next/cache';

const BlogForm = () => {
  noStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    tag: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
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
        {Object.entries(formData).map(([name, value]) => (
          name !== 'image' && (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              {name === 'description' || name === 'seoDescription' ? (
                <textarea
                  name={name}
                  id={name}
                  value={value}
                  onChange={handleChange}
                  className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ) : (
                <input
                  type="text"
                  name={name}
                  id={name}
                  value={value}
                  onChange={handleChange}
                  className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}
            </div>
          )
        ))}
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
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;

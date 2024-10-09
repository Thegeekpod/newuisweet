"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react'; // Import TinyMCE Editor
import { unstable_noStore as noStore } from 'next/cache';
import { getBlogById, editBlog } from '../../function/Add';

const EditBlog = () => {
  noStore();
  const router = useRouter();
  const { blogId } = useParams();
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
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await getBlogById(blogId);
        const blog = response;
        setFormData({
          title: blog.title,
          description: blog.description,
          short_description: blog.short_description,
          image: null,
          tag: blog.tag,
          seoTitle: blog.seoTitle,
          seoDescription: blog.seoDescription,
          seoKeywords: blog.seoKeywords,
          schema: blog.schema,
        });
        setCurrentImage(blog.image);
      } catch (error) {
        console.error('Failed to fetch blog data:', error);
      }
    };
    fetchBlogData();
  }, [blogId]);

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
      await editBlog(formDataToSend, blogId);
      setNotification('Blog updated successfully!');
      setTimeout(() => {
        setNotification('');
        router.push('/admin/dashboard/blog');
      }, 2000);
    } catch (error) {
      setNotification('Failed to update blog. Please try again.');
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

     
        </div>

        <div>

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

        <div>
          <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-700 mb-1">
            SEO Description
          </label>
          <input
            type="text"
            name="seoDescription"
            id="seoDescription"
            value={formData.seoDescription}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

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
          {currentImage && (
            <img
              src={currentImage}
              alt="Current Blog Image"
              className="mb-2 h-32 w-auto object-cover"
            />
          )}
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
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;

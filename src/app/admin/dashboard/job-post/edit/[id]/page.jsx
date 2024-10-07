"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';
import { unstable_noStore as noStore } from 'next/cache';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editJobPost, getJobPostById } from '../../function';

const Skeleton = ({ width, height }) => (
  <div
    className="animate-pulse bg-gray-300 dark:bg-gray-700"
    style={{ width, height }}
  ></div>
);

const EditSpecialized = () => {
  noStore();
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    bannerImage: null,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [currentImage, setCurrentImage] = useState('');
  const [currentBannerImage, setCurrentBannerImage] = useState('');


  // Fetch JobPost data on component load
  useEffect(() => {
    const fetchSpecializedData = async () => {
      setLoading(true);
      try {
        const JobPost = await getJobPostById(id);
        setFormData({
          title: JobPost.title,
          description: JobPost.description,
          image: null,
          seoTitle: JobPost.seoTitle,
          seoDescription: JobPost.seoDescription,
          seoKeywords: JobPost.seoKeywords,
        });
        setCurrentImage(JobPost.image);
        setCurrentBannerImage(JobPost.bannerImage);
    
      } catch (error) {
        toast.error('Failed to fetch JobPost data.');
        console.error('Failed to fetch JobPost data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpecializedData();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };
  const handleBannerImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      bannerImage: e.target.files[0],
    }));
  };
  // Handle TinyMCE editor changes for description
  const handleEditorChange = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      description: content,
    }));
  };







  // Submit form to edit JobPost
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });


    try {
      await editJobPost(formDataToSend, id);
      toast.success('Specialized updated successfully!');
      setTimeout(() => {
        router.push('/admin/dashboard/job-post');
      }, 2000);
    } catch (error) {
      toast.error('Failed to update JobPost. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
    <ToastContainer />
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 rounded shadow-md"
    >
      {/* Left Column (Service Info) */}
      <div className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <Editor
            apiKey="fhwn3bux5jvgi5gdbewhzbu8vnzxow2wyp4a1k1zg9c32gp9"
            value={formData.description}
            init={{
              height: 300,
              menubar: true,
              plugins:
                "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
              toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
      </div>

      {/* Right Column (SEO Info and Images) */}
      <div className="space-y-6">
      <div className="grid-cols-2 grid flex-wrap gap-6 ">
<div className="">
  <label
    htmlFor="image"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Service Image
  </label>
  <input
    type="file"
    name="image"
    id="image"
    onChange={handleImageChange}
    className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  {currentImage && (
    <div className="mt-4">
      <img
        src={currentImage}
        alt="Current Service"
        className="w-full max-h-40 object-cover rounded"
      />
    </div>
  )}
</div>

<div className="">
  <label
    htmlFor="bannerImage"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Banner Image
  </label>
  <input
    type="file"
    name="bannerImage"
    id="bannerImage"
    onChange={handleBannerImageChange}
    className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  {currentBannerImage && (
    <div className="mt-4">
      <img
        src={currentBannerImage}
        alt="Current Banner"
        className="w-full max-h-40 object-cover rounded"
      />
    </div>
  )}
</div>
</div>

        <div>
          <label
            htmlFor="seoTitle"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="seoDescription"
            className="block text-sm font-medium text-gray-700"
          >
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

        <div>
          <label
            htmlFor="seoKeywords"
            className="block text-sm font-medium text-gray-700"
          >
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
      </div>

   

      <div className="col-span-2 flex justify-end w-full">
        <button
          type="submit"
          className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Job
        </button>
      </div>
    </form>
  </div>
  );
};

export default EditSpecialized;

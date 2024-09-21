"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';
import { unstable_noStore as noStore } from 'next/cache';
import { editSpecialized, getSpecializedById } from '../../function';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [currentImage, setCurrentImage] = useState('');
  const [currentBannerImage, setCurrentBannerImage] = useState('');


  // Fetch specialized data on component load
  useEffect(() => {
    const fetchSpecializedData = async () => {
      setLoading(true);
      try {
        const specialized = await getSpecializedById(id);
        setFormData({
          title: specialized.title,
          description: specialized.description,
          image: null,
          seoTitle: specialized.seoTitle,
          seoDescription: specialized.seoDescription,
          seoKeywords: specialized.seoKeywords,
        });
        setCurrentImage(specialized.image);
        setCurrentBannerImage(specialized.bannerImage);
        setFaqs(specialized.faqs); // Populate FAQs from the fetched data
      } catch (error) {
        toast.error('Failed to fetch specialized data.');
        console.error('Failed to fetch specialized data:', error);
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

  // Handle FAQ question change
  const handleFaqChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFaqs = faqs.map((faq, i) =>
      i === index ? { ...faq, [name]: value } : faq
    );
    setFaqs(updatedFaqs);
  };

  // Handle FAQ TinyMCE editor changes
  const handleFaqEditorChange = (index, content) => {
    const updatedFaqs = faqs.map((faq, i) =>
      i === index ? { ...faq, answer: content } : faq
    );
    setFaqs(updatedFaqs);
  };

  // Add a new FAQ
  const handleAddFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  // Remove a FAQ
  const handleRemoveFaq = (index) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  // Submit form to edit specialized
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    // Add FAQs to the form data as a JSON string
    formDataToSend.append('faqs', JSON.stringify(faqs));

    try {
      await editSpecialized(formDataToSend, id);
      toast.success('Specialized updated successfully!');
      setTimeout(() => {
        router.push('/admin/dashboard/specialized');
      }, 2000);
    } catch (error) {
      toast.error('Failed to update specialized. Please try again.');
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

      {/* FAQs Section */}
      <div className="col-span-2">
        <h2 className="text-lg font-semibold text-gray-700">FAQs</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-2 shadow-xl rounded-lg bg-white p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-600">FAQ {index + 1}</h3>
              <button
                type="button"
                onClick={() => handleRemoveFaq(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
            <div className="mb-2">
              <label htmlFor={`question-${index}`} className="block text-sm font-medium text-gray-700">
                Question
              </label>
              <input
                type="text"
                name="question"
                id={`question-${index}`}
                value={faq.question}
                onChange={(e) => handleFaqChange(index, e)}
                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor={`answer-${index}`} className="block text-sm font-medium text-gray-700">
                Answer
              </label>
              <Editor
                apiKey="fhwn3bux5jvgi5gdbewhzbu8vnzxow2wyp4a1k1zg9c32gp9"
                value={faq.answer}
                init={{
                  height: 200,
                  menubar: false,
                  plugins:
                    "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help",
                  toolbar:
                    "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onEditorChange={(content) => handleFaqEditorChange(index, content)}
              />
            </div>
          </div>
        ))}
        </div>
        <button
          type="button"
          onClick={handleAddFaq}
          className="bg-blue-500 text-white px-4 py-2 my-4 rounded hover:bg-blue-600"
        >
          Add FAQ
        </button>
      </div>

      <div className="col-span-2 flex justify-end w-full">
        <button
          type="submit"
          className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Specialization
        </button>
      </div>
    </form>
  </div>
  );
};

export default EditSpecialized;

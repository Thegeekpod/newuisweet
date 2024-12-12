"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';
import { unstable_noStore as noStore } from 'next/cache';
import { editService, getServiceById } from '../../function';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Skeleton = ({ width, height }) => (
  <div
    className="animate-pulse bg-gray-300 dark:bg-gray-700"
    style={{ width, height }}
  ></div>
);

const EditService = () => {
  noStore();
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    bannerImage: null,
    slug:'',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    schema : '',
  });
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState('');
  const [currentBannerImage, setCurrentBannerImage] = useState('');

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const service = await getServiceById(id);
        setFormData({
          title: service.title,
          description: service.description,
          image: null,
          bannerImage: null,
          slug:service.slug,
          seoTitle: service.seoTitle,
          seoDescription: service.seoDescription,
          seoKeywords: service.seoKeywords,
          schema: service.schema,
        });
        setCurrentImage(service.image);
        setCurrentBannerImage(service.bannerImage);
        setFaqs(service.faqs);
      } catch (error) {
        toast.error('Failed to fetch service data.');
        console.error('Failed to fetch service data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceData();
  }, [id]);

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

  const handleBannerImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      bannerImage: e.target.files[0],
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      description: content,
    }));
  };

  const handleFaqChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFaqs = faqs.map((faq, i) =>
      i === index ? { ...faq, [name]: value } : faq
    );
    setFaqs(updatedFaqs);
  };

  const handleFaqEditorChange = (index, content) => {
    const updatedFaqs = faqs.map((faq, i) =>
      i === index ? { ...faq, answer: content } : faq
    );
    setFaqs(updatedFaqs);
  };

  const handleAddFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const handleRemoveFaq = (index) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        formDataToSend.append(key, value);
      }
    });
    formDataToSend.append('faqs', JSON.stringify(faqs));

    try {
      await editService(formDataToSend, id);
      toast.success('Service updated successfully!');
      setTimeout(() => {
        router.push('/admin/dashboard/services');
      }, 2000);
    } catch (error) {
      toast.error('Failed to update service. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton width="100%" height="40px" />
        <Skeleton width="100%" height="200px" />
        <Skeleton width="100%" height="40px" />
      </div>
    );
  }

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
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700"
            >
              Slug
            </label>
            <input
              type="text"
              name="slug"
              id="slug"
              value={formData.slug}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        <div className="col-span-2">
            <label
              htmlFor="seoSchema"
              className="block text-sm font-medium text-gray-700"
            >
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
            className="bg-blue-500 text-white px-4 py-2  my-4 rounded hover:bg-blue-600"
          >
            Add FAQ
          </button>
        </div>

        <div className="col-span-2 flex justify-end w-full">
        <button
          type="submit"
          className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            Update Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditService;

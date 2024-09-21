"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { Editor } from '@tinymce/tinymce-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addSpecialized } from '../function';

const SpecializedForm = () => {
  noStore();
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
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: e.target.files[0],
    }));
  };
  const handleEditorChange = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      description: content,
    }));
  };

  const handleAddFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const handleFaqChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFaqs = faqs.map((faq, i) =>
      i === index ? { ...faq, [name]: value } : faq
    );
    setFaqs(updatedFaqs);
  };
  const handleRemoveFaq = (index) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };
  const handleEditorFaqChange = (index, content) => {
    const updatedFaqs = faqs.map((faq, i) =>
      i === index ? { ...faq, answer: content } : faq
    );
    setFaqs(updatedFaqs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    // Send FAQs as a JSON string
    formDataToSend.append('faqs', JSON.stringify(faqs));

    try {
      await addSpecialized(formDataToSend);
      toast.success('Specialized added successfully!');
      setTimeout(() => {
        router.push('/admin/dashboard/specialized');
      }, 2000);
    } catch (error) {
      toast.error('Failed to add specialized. Please try again.');
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

        {/* Right Column (SEO Info) */}
        <div className="space-y-6">
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
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
          </div>

          <div>
            <label
              htmlFor="bannerImage"
              className="block text-sm font-medium text-gray-700"
            >
              Banner Image
            </label>
            <input
              type="file"
              name="bannerImage"
              id="bannerImage"
              onChange={handleImageChange}
              className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
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

        {/* FAQ Section */}
        <div className="col-span-2">
          <hr className="my-4" />
          <h3 className="text-lg font-semibold">FAQs</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-2 shadow-xl rounded-lg bg-white p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-600">FAQ {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                {/* Question Input */}
                <div>
                  <label
                    htmlFor={`faq-question-${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Question
                  </label>
                  <input
                    type="text"
                    name="question"
                    id={`faq-question-${index}`}
                    value={faq.question}
                    onChange={(e) => handleFaqChange(index, e)}
                    className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Answer Input with Editor */}
                <div>
                  <label
                    htmlFor={`faq-answer-${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Answer
                  </label>
                  <Editor
                    apiKey="fhwn3bux5jvgi5gdbewhzbu8vnzxow2wyp4a1k1zg9c32gp9"
                    value={faq.answer}
                    init={{
                      height: 200,
                      menubar: true,
                      plugins:
                        "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
                      toolbar:
                        "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    onEditorChange={(content) => handleEditorFaqChange(index, content)}
                  />
                </div>
              </div>
            ))}
          </div>



          <button
            type="button"
            onClick={handleAddFaq}
            className="bg-green-500 text-white py-2 px-4 rounded mt-4"
          >
            Add FAQ
          </button>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 w-full text-white py-3 px-6 rounded shadow-lg hover:bg-blue-600"
          >
            Add Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default SpecializedForm;

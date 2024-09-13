'use client';

import React from 'react';
import { FaClipboard, FaFacebookF, FaWhatsapp, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'; // Import icons from react-icons
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles

const SocialShare = ({ url }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard!'); // Show success toast
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Copy URL Button */}
      <button
        onClick={copyToClipboard}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-transparent text-center text-slate-600 transition hover:text-primary focus:outline-none focus:ring disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-dark-2 dark:text-slate-500 dark:hover:text-primary"
      >
        <FaClipboard className="h-6 w-6" />
      </button>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-transparent text-center text-slate-600 transition hover:text-primary focus:outline-none focus:ring disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-dark-2 dark:text-slate-500 dark:hover:text-primary"
      >
        <FaFacebookF className="h-6 w-6" />
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-transparent text-center text-slate-600 transition hover:text-primary focus:outline-none focus:ring disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-dark-2 dark:text-slate-500 dark:hover:text-primary"
      >
        <FaWhatsapp className="h-6 w-6" />
      </a>

      {/* Instagram */}
      <a
        href={`https://www.instagram.com/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-transparent text-center text-slate-600 transition hover:text-primary focus:outline-none focus:ring disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-dark-2 dark:text-slate-500 dark:hover:text-primary"
      >
        <FaInstagram className="h-6 w-6" />
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-transparent text-center text-slate-600 transition hover:text-primary focus:outline-none focus:ring disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-dark-2 dark:text-slate-500 dark:hover:text-primary"
      >
        <FaLinkedinIn className="h-6 w-6" />
      </a>

  

      {/* Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-transparent text-center text-slate-600 transition hover:text-primary focus:outline-none focus:ring disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-dark-2 dark:text-slate-500 dark:hover:text-primary"
      >
        <FaTwitter className="h-6 w-6" />
      </a>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default SocialShare;

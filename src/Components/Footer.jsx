import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            IdeaHub
          </h2>

          <p className="text-gray-400 leading-relaxed">
            A collaborative platform where people share,
            explore, and interact with innovative ideas.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Platform
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="/ideas">Ideas</Link>
            </li>

            <li>
              <Link href="/categories">Categories</Link>
            </li>

            <li>
              <Link href="/add-idea">Add Idea</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Contact
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>Email: support@ideahub.com</li>
            <li>Phone: +880 1234-567890</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Follow Us
          </h3>

          <div className="flex items-center gap-4 text-2xl">

            <a
              href="#"
              className="hover:text-blue-500 transition"
            >
              <FaFacebook />
            </a>

            <a
              href="#"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="hover:text-blue-400 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="#"
              className="hover:text-gray-300 transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">

          <p>
            © 2026 IdeaHub. All rights reserved.
          </p>

          <div className="flex gap-5 mt-3 md:mt-0">
            <Link href="/privacy-policy">
              Privacy Policy
            </Link>

            <Link href="/terms">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
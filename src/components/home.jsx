import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-green-600">Find A Donor</h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#home"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  About
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Testimonials
                </a>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Sign Up
              </Link>
              {/* Get Started → /signup */}
              <Link
                to="/signup"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm font-medium transition duration-300 shadow-md text-center"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-green-600 focus:outline-none">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-16 bg-gradient-to-r from-green-50 to-emerald-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connecting Lives,
              <span className="text-green-600 block">Giving Hope</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 font-medium max-w-4xl mx-auto">
              Find A Donor is a life‑saving platform that connects kidney donors
              with patients in need. Join our community and help give the gift
              of life through kidney donation.
            </p>

            {/* Hero CTA buttons → /signup */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 shadow-lg text-center"
              >
                Find a Kidney Donor
              </Link>
              <Link
                to="/signup"
                className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 text-center"
              >
                Become a Donor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Find A Donor?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform makes it easy to connect kidney donors with patients
              in need. With advanced matching capabilities, comprehensive
              screening support, and real‑time notifications, we ensure that
              hope finds its way to those who need it most.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Advanced Matching
              </h3>
              <p className="text-gray-600">
                Find compatible kidney donors using our sophisticated matching
                system based on blood type, HLA typing, and location.
              </p>
            </div>

            {/* Card 2 */}
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Medical Support
              </h3>
              <p className="text-gray-600">
                Access to medical professionals and transplant coordinators to
                guide you through the donation process.
              </p>
            </div>

            {/* Card 3 */}
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Compassionate Care
              </h3>
              <p className="text-gray-600">
                Comprehensive support system for both donors and recipients
                throughout the entire journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Background Image */}
      <section id="testimonials" className="py-20 relative">
        {/* Background overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-emerald-600/90" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Stories of Hope and Life
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Read about the lives transformed through kidney donation and the
              heroes who made it possible.
            </p>
          </div>

          {/* Testimonials grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
                  alt="Seth Wambua"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Seth Wambua</h4>
                  <p className="text-sm text-gray-600">Kidney Recipient</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "After 3 years on dialysis, Find A Donor connected me with my
                perfect match. I now have a second chance at life!"
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
                  alt="James Otieno"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">James Otieno</h4>
                  <p className="text-sm text-gray-600">Living Donor</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Donating my kidney was the most meaningful thing I've ever
                done. The platform made the process smooth and supportive."
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <img
                  src="https://www.pexels.com/photo/portrait-of-an-african-woman-in-medical-apron-18788957/"
                  alt="Dr. Lydia Nanjala"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Dr. Lydia Nanjala
                  </h4>
                  <p className="text-sm text-gray-600">Transplant Surgeon</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "This platform has transformed kidney transplantation. The
                matching system and support network are exceptional."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-green-500 mb-4">
                Find-A-Kidney-Donor
              </h3>
              <p className="text-gray-300 mb-4">
                Connecting kidney donors with those in need, giving hope and
                transforming lives through the gift of organ donation.
              </p>
              {/* Socials */}
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-300 hover:text-green-500 transition duration-300"
                >
                  {/* Twitter icon */}
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    {/* … */}
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-500 transition duration-300"
                >
                  {/* YouTube icon */}
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    {/* … */}
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-500 transition duration-300"
                >
                  {/* Pinterest icon */}
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    {/* … */}
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-green-500 transition duration-300"
                  >
                    Find Kidney Donors
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-green-500 transition duration-300"
                  >
                    Become a Donor
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-green-500 transition duration-300"
                  >
                    Transplant Centers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-green-500 transition duration-300"
                  >
                    Emergency Request
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-green-500 transition duration-300"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-green-500 transition duration-300"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-green-500 transition duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-green-500 transition duration-300"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              © 2025 Find A Donor. All rights reserved. Made with ❤️ for giving
              hope and transforming lives.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

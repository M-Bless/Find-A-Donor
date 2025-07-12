/* ─────────────────────────────── Home.jsx ────────────────────────────────
   • Hamburger button is visible only below the md breakpoint (768 px).
   • Clicking it reveals a slide‑down menu with the same nav + auth/CTA items.
   • Desktop (> = md) shows the normal navbar without the hamburger.
   • All hero, about, testimonials, footer content, images, and copy are the
     same as your original; only responsive nav behaviour was added.         */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  /* ───────── testimonials data (unchanged) ───────── */
  const testimonials = [
    {
      id: 1,
      name: 'Seth Wambua',
      role: 'Kidney Recipient',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      quote:
        'After 3 years on dialysis, Find A Donor connected me with my perfect match. I now have a second chance at life!',
    },
    {
      id: 2,
      name: 'James Otieno',
      role: 'Living Donor',
      image:
        'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      quote:
        'Donating my kidney was the most meaningful thing I’ve ever done. The platform made the process smooth and supportive.',
    },
    {
      id: 3,
      name: 'Dr. Lydia Nanjala',
      role: 'Transplant Surgeon',
      image:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      quote:
        'This platform has transformed kidney transplantation. The matching system and support network are exceptional.',
    },
    {
      id: 4,
      name: 'Grace Muthoni',
      role: 'Kidney Recipient',
      image:
        'https://images.unsplash.com/photo-1594824804732-5f8e593cf785?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      quote:
        'The support team guided me through every step. Today, I’m living a healthy, active life thanks to my donor.',
    },
    {
      id: 5,
      name: 'Peter Paul',
      role: 'Living Donor',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      quote:
        'Being able to save a life through kidney donation has been the greatest gift I could give. The process was seamless.',
    },
    {
      id: 6,
      name: 'Dr. Rodgers Pete',
      role: 'Nephrologist',
      image:
        'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      quote:
        'Find A Donor has revolutionized how we connect patients with donors. The success rate has increased significantly.',
    },
  ];

  const [current, setCurrent]   = useState(0);
  const [mobileOpen, setOpen]   = useState(false);

  const next  = () => setCurrent((i) => (i + 1) % testimonials.length);
  const prev  = () => setCurrent((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const slice = () => testimonials.slice(current, current + 3);

  /* ───────────────────────────────────────────────────────────────────── */

  return (
    <div className="min-h-screen font-sans bg-white">
      {/* ───────── NAVBAR ───────── */}
      <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          {/* logo */}
          <h1 className="text-2xl font-bold text-green-600">Find A Donor</h1>

          {/* desktop links */}
          <ul className="ml-auto hidden md:flex space-x-4 text-sm font-medium">
            {['Home', 'About', 'Testimonials'].map((label) => (
              <li key={label}>
                <a
                  href={`#${label.toLowerCase()}`}
                  className="px-3 py-2 rounded-md transition text-gray-700 hover:text-green-600"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* desktop auth / CTA */}
          <div className="ml-6 hidden md:flex items-center space-x-4 text-sm font-medium">
            <Link to="/login"  className="px-3 py-2 rounded-md transition text-gray-700 hover:text-green-600">Login</Link>
            <Link to="/signup" className="px-3 py-2 rounded-md transition text-gray-700 hover:text-green-600">Sign Up</Link>
            <Link
              to="/signup"
              className="rounded-md bg-green-600 px-6 py-2 text-white shadow-md transition hover:bg-green-700"
            >
              Get Started
            </Link>
          </div>

          {/* hamburger (mobile only) */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="ml-auto flex md:hidden items-center text-gray-700 hover:text-green-600"
          >
            {mobileOpen ? (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* mobile slide‑down menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white shadow-inner border-t border-gray-200">
            <ul className="space-y-1 px-4 pt-4 pb-2 text-sm font-medium">
              {['Home', 'About', 'Testimonials'].map((label) => (
                <li key={label}>
                  <a
                    href={`#${label.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 transition text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="mt-2 border-t border-gray-200 pt-2" />
              <li>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 transition text-gray-700 hover:bg-green-50 hover:text-green-700"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 transition text-gray-700 hover:bg-green-50 hover:text-green-700"
                >
                  Sign Up
                </Link>
              </li>
              <li className="pb-4">
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-md bg-green-600 px-3 py-2 text-center text-white transition hover:bg-green-700"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* ───────── HERO ───────── */}
      <section id="home" className="pt-20 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
              Connecting Lives,
              <span className="block text-green-600">Giving Hope</span>
            </h1>
            <p className="mx-auto mb-8 max-w-4xl text-xl font-medium text-gray-700">
              Find A Donor is a life‑saving platform that connects kidney donors with patients in
              need. Join our community and help give the gift of life through kidney donation.
            </p>
            <Link
              to="/signup"
              className="inline-block rounded-lg border-2 border-green-600 px-8 py-4 text-lg font-semibold text-green-600 transition hover:bg-green-600 hover:text-white"
            >
              Become a Donor
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── ABOUT ───────── */}
      <section id="about" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              Why Choose Find A Donor?
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Our platform makes it easy to connect kidney donors with patients in need. With
              advanced matching capabilities, comprehensive screening support, and real‑time
              notifications, we ensure that hope finds its way to those who need it most.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              title="Advanced Matching"
              iconPath="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              text="Find compatible kidney donors using our sophisticated matching system based on blood type, HLA typing, and location."
            />
            <FeatureCard
              title="Medical Support"
              iconPath="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              text="Access to medical professionals and transplant coordinators to guide you through the donation process."
            />
            <FeatureCard
              title="Compassionate Care"
              iconPath="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              text="Comprehensive support system for both donors and recipients throughout the entire journey."
            />
          </div>
        </div>
      </section>

      {/* ───────── TESTIMONIALS ───────── */}
      <section id="testimonials" className="relative py-20">
        {/* colored overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-emerald-600/90" />
        {/* background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Header
            title="Stories of Hope and Life"
            subtitle="Read about the lives transformed through kidney donation and the heroes who made it possible."
          />

          <div className="relative px-4 sm:px-16">
            <CarouselArrow dir="left"  onClick={prev} />
            <CarouselArrow dir="right" onClick={next} />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {slice().map((t) => (
                <TestimonialCard key={t.id} {...t} />
              ))}
            </div>

            {/* dots */}
            <div className="mt-8 flex justify-center space-x-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-3 w-3 rounded-full transition ${
                    current === i ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            {/* brand */}
            <div className="md:col-span-2">
              <h3 className="mb-4 text-2xl font-bold text-green-500">Find A Donor</h3>
              <p className="mb-4 text-gray-300">
                Connecting kidney donors with those in need, giving hope and transforming lives
                through the gift of organ donation.
              </p>
              <SocialIcons />
            </div>

            {/* quick links */}
            <FooterLinks
              title="Quick Links"
              links={[
                { href: '/signup', label: 'Become a Donor' },
                { href: '/transplant-centers', label: 'Transplant Centers' },
                { href: '/emergency-request', label: 'Emergency Request' },
              ]}
            />

            {/* support */}
            <FooterLinks
              title="Support"
              links={[
                { href: '/help', label: 'Help Center' },
                { href: '/contact', label: 'Contact Us' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
              ]}
            />
          </div>

          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-300">
            © 2025 Find A Donor. All rights reserved. Made with ❤️ for giving hope and transforming
            lives.
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ────────────────── PRESENTATIONAL SUB‑COMPONENTS ────────────────── */

const FeatureCard = ({ title, iconPath, text }) => (
  <div className="rounded-lg p-6 text-center shadow transition hover:shadow-lg">
    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
      <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
      </svg>
    </div>
    <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
    <p className="text-gray-600">{text}</p>
  </div>
);

const Header = ({ title, subtitle }) => (
  <div className="mb-16 text-center">
    <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">{title}</h2>
    <p className="mx-auto max-w-3xl text-lg text-white/90">{subtitle}</p>
  </div>
);

const TestimonialCard = ({ image, name, role, quote }) => (
  <div className="rounded-lg bg-white/95 p-6 shadow-lg backdrop-blur-sm">
    <div className="mb-4 flex items-center">
      <img src={image} alt={name} className="mr-4 h-12 w-12 rounded-full object-cover" />
      <div>
        <h4 className="font-semibold text-gray-900">{name}</h4>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
    <p className="italic text-gray-700">“{quote}”</p>
  </div>
);

const CarouselArrow = ({ dir, onClick }) => {
  const isLeft = dir === 'left';
  return (
    <button
      onClick={onClick}
      aria-label={isLeft ? 'Previous testimonials' : 'Next testimonials'}
      className={`absolute top-1/2 z-10 -translate-y-1/2 ${
        isLeft ? 'left-0' : 'right-0'
      } rounded-full bg-green-600 p-3 shadow-lg transition hover:bg-green-700`}
    >
      <svg
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={isLeft ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
        />
      </svg>
    </button>
  );
};

const FooterLinks = ({ title, links }) => (
  <div>
    <h4 className="mb-4 text-lg font-semibold">{title}</h4>
    <ul className="space-y-2">
      {links.map(({ href, label }) => (
        <li key={href}>
          <a href={href} className="text-gray-300 transition hover:text-green-500">
            {label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcons = () => (
  <div className="flex space-x-4">
    <SocialIcon href="https://twitter.com"   hover="hover:text-blue-400"  icon={icons.twitter} />
    <SocialIcon href="https://instagram.com" hover="hover:text-pink-400"  icon={icons.instagram} />
    <SocialIcon href="https://facebook.com"  hover="hover:text-blue-500"  icon={icons.facebook} />
  </div>
);

const SocialIcon = ({ href, hover, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`transition ${hover} text-gray-300`}
  >
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d={icon} />
    </svg>
  </a>
);

/* SVG paths (unchanged) */
const icons = {
  twitter:
    'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
  instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  facebook:
    'M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
};

export default Home;

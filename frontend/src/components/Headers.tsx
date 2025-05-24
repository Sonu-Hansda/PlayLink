import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Headers() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-orange-500 text-white shadow-md font-mono">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <a href="/" className="text-xl font-bold">
            PlayLink
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            <Link to={"/"} className="hover:text-orange-200 transition duration-200">
              Home
            </Link>
            <Link to={"/change-log"} className="hover:text-orange-200 transition duration-200">
              Changelog
            </Link>
            <Link to={"/disclaimer"} className="hover:text-orange-200 transition duration-200">
              Disclaimer
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu (with slide animation) */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="pb-4 flex flex-col space-y-3">
            <Link to={"/"} className="hover:text-orange-200 transition duration-200 pl-2">
              Home
            </Link>
            <Link to={"/change-log"} className="hover:text-orange-200 transition duration-200 pl-2">
              Changelog
            </Link>
            <Link to={"/disclaimer"} className="hover:text-orange-200 transition duration-200 pl-2">
              Disclaimer
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
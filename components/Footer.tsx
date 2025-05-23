"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-10 md:space-y-0">
          {/* Logo & Tagline */}
          <div className="flex-shrink-0">
            <Image
              src="/jju-logo.png"
              alt="JJU Logo"
              width={60}
              height={60}
              className="mb-2"
            />
            <p className="text-gray-600 text-sm">
              Jigjiga Unversity Portal<br />
              &copy; {currentYear} All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            <div>
              <h4 className="text-gray-900 font-semibold mb-3">Admissions</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/admission"
                    className="text-gray-600 hover:text-blue-500"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admission/apply"
                    className="text-gray-600 hover:text-blue-500"
                  >
                    Apply
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admission/status"
                    className="text-gray-600 hover:text-blue-500"
                  >
                    Status
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-3">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/programs"
                    className="text-gray-600 hover:text-blue-500"
                  >
                    Programs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-600 hover:text-blue-500"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-blue-500"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-3">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-600 hover:text-blue-500"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-600 hover:text-blue-500"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-500"
                >
                  {/* Facebook SVG */}
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 2 .1v2h-1.2c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3H14v7A10 10 0 0022 12z" />
                  </svg>
                </a>
                {/* ...other social icons */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

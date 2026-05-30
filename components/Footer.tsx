"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-10">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* TOP LINKS */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">

          <Link
            href="/about"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            About Us
          </Link>

          <Link
            href="/contact"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Contact Us
          </Link>

          <Link
            href="/privacy-policy"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Terms & Conditions
          </Link>

          <Link
            href="/disclaimer"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Disclaimer
          </Link>

        </div>

        {/* DESCRIPTION */}
        <div className="mt-6 text-center text-sm text-gray-500 leading-6 max-w-3xl mx-auto">

          Mega Tools Web provides free online tools, calculators,
          converters, developer utilities, image tools, and premium
          productivity software for everyday use.

        </div>

        {/* COPYRIGHT */}
        <div className="mt-6 text-center text-xs text-gray-400">

          © 2026 Mega Tools Web. All rights reserved.

        </div>

      </div>

    </footer>
  );
}
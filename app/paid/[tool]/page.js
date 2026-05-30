"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Page() {

  const { tool } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {

    async function loadData() {

      try {

        const response = await fetch(`/data/${tool}.json`);

        const json = await response.json();

        setData(json);

      } catch (error) {

        console.error("Error loading JSON:", error);

      }

    }

    loadData();

  }, [tool]);

  if (!data) {

    return (
      <div className="p-10 text-xl">
        Loading...
      </div>
    );

  }

  return (

    <main className="max-w-6xl mx-auto p-6">

      {/* Back to Home Button */}
      <Link href="/">

        <button
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 cursor-pointer"
        >
          ← Back to Home
        </button>

      </Link>

      {/* Tool Name */}
      <h1 className="text-4xl font-bold mt-6 mb-3">
        {data.name}
      </h1>

      {/* Description */}
      <p className="text-gray-600 mb-4">
        {data.shortDescription}
      </p>

      {/* Key Benefit */}
      {data.keybenefit && (

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">

          <h2 className="font-semibold text-lg mb-2">
            Why Use This Tool?
          </h2>

          <p className="text-gray-700">
            {data.keybenefit}
          </p>

        </div>

      )}

      {/* Main Layout */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="md:col-span-2">

          {/* Screenshots */}
          <h2 className="text-2xl font-semibold mb-3">
            Screenshots
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

            {data.screenshots?.map((img, index) => (

              <Image
                key={index}
                src={img}
                alt={data.name}
                width={300}
                height={200}
                className="rounded border mx-auto"
              />

            ))}

          </div>

          {/* Video Demo */}
          <h2 className="text-2xl font-semibold mb-3">
            Video Demo
          </h2>

          <div className="aspect-video mb-8">

            <iframe
              className="w-full h-full rounded"
              src={
                data.youtube
                  ?.replace("youtu.be/", "www.youtube.com/embed/")
                  .split("?")[0]
              }
              title="YouTube Video"
              allowFullScreen
            />

          </div>

          {/* Features */}
          <h2 className="text-2xl font-semibold mb-3">
            Features
          </h2>

          <ul className="list-disc pl-6 mb-8 space-y-2">

            {data.features?.map((feature, index) => (

              <li key={index}>
                {feature}
              </li>

            ))}

          </ul>

          {/* FAQ */}
          <h2 className="text-2xl font-semibold mb-3">
            FAQ
          </h2>

          <div className="space-y-4 mb-8">

            {data.faq?.map((item, index) => (

              <div
                key={index}
                className="border rounded p-4"
              >

                <h3 className="font-semibold">
                  {item.q}
                </h3>

                <p className="text-gray-600 mt-2">
                  {item.a}
                </p>

              </div>

            ))}

          </div>

          {/* User Feedback */}
          <div className="mt-12">

            <h2 className="text-2xl font-semibold mb-4">
              User Feedback
            </h2>

            <form className="space-y-4 max-w-2xl">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg p-3"
              />

              <textarea
                placeholder="Write your feedback..."
                rows={2}
                className="w-full border rounded-lg p-3"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg cursor-pointer"
              >
                Submit Feedback
              </button>

            </form>

          </div>

          {/* Related Tools */}
          <div className="mt-12">

            <h2 className="text-2xl font-semibold mb-4">
              Related Tools
            </h2>

            <div className="flex flex-wrap gap-3">

              {data.relatedTools?.map((related, index) => (

                <Link
                  key={index}
                  href={`/paid/${related.slug}`}
                  className="border rounded-lg px-4 py-2 hover:bg-gray-100"
                >
                  {related.name}
                </Link>

              ))}

            </div>

          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div>

          <div className="border rounded-xl p-5 sticky top-4">

            {/* Price */}
            <div className="text-3xl font-bold mb-4">
              ${data.price}
            </div>

            {/* Buy Now Button */}
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
              Buy Now
            </button>

            {/* Software Info */}
            <div className="mt-6 space-y-3 text-sm">

              <div>
                <strong>Version:</strong> {data.version}
              </div>

              <div>
                <strong>File Size:</strong> {data.fileSize}
              </div>

              <div>
                <strong>Downloads:</strong> {data.downloads}
              </div>

              <div>
                <strong>Release Date:</strong> {data.releaseDate}
              </div>

              <div>
                <strong>Requirements:</strong> {data.requirements}
              </div>

            </div>

            {/* Adsense Placeholders */}
            <div className="mt-8 space-y-6">

              <div className="border rounded-lg h-64 flex items-center justify-center bg-gray-100 text-gray-500">
                Ad Placeholder 1
              </div>

              <div className="border rounded-lg h-64 flex items-center justify-center bg-gray-100 text-gray-500">
                Ad Placeholder 2
              </div>

              <div className="border rounded-lg h-64 flex items-center justify-center bg-gray-100 text-gray-500">
                Ad Placeholder 3
              </div>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}
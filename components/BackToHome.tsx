import Link from "next/link";

export default function BackToHome() {

  return (

    <div className="flex justify-center mt-10">

      <Link
        href="/"
        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
      >
        Back to Home
      </Link>

    </div>

  );
}
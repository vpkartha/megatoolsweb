export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      <div className="bg-[#1D4ED8] text-white py-10">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold">Contact Us</h1>

          <p className="mt-3 text-blue-100 text-sm">
            Get in touch with Mega Tools Web.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6">

          <p className="text-gray-700 leading-7">
            If you have any questions, suggestions, bug reports,
            or business inquiries, feel free to contact us.
          </p>

          <div className="space-y-4 text-sm">

            <div>
              <span className="font-semibold">Name:</span>
              {" "}
              CLASSICSOFT TECHNOLOGIES PRIVATE LIMITED
            </div>

            <div>
              <span className="font-semibold">Email:</span>
              {" "}
              info@classicsofttechnologies.com
            </div>

            <div>
              <span className="font-semibold">Website:</span>
              {" "}
              https://classicsofttechnologies.com
            </div>

            <div>
              <span className="font-semibold">Location:</span>
              {" "}
              MUMBAI, INDIA
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
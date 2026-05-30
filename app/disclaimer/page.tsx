export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      <div className="bg-[#1D4ED8] text-white py-10">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold">Disclaimer</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6 text-gray-700 leading-7">

          <p>
            The information and tools provided on Mega Tools Web
            are for general informational and utility purposes only.
          </p>

          <h2 className="text-2xl font-bold text-gray-800">
            Accuracy
          </h2>

          <p>
            While we strive to provide accurate results, we do not
            guarantee the completeness, reliability, or accuracy of
            any calculations or outputs.
          </p>

          <h2 className="text-2xl font-bold text-gray-800">
            External Links
          </h2>

          <p>
            This website may contain links to third-party websites.
            We are not responsible for the content or practices of
            those websites.
          </p>

          <h2 className="text-2xl font-bold text-gray-800">
            Professional Advice
          </h2>

          <p>
            The tools and information on this website should not be
            considered professional, financial, legal, medical, or
            technical advice.
          </p>

        </div>

      </div>

    </main>
  );
}
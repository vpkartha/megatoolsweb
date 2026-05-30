export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      <div className="bg-[#1D4ED8] text-white py-10">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6 text-gray-700 leading-7">

          <p>
            Mega Tools Web respects your privacy and is committed
            to protecting your personal information.
          </p>

          <h2 className="text-2xl font-bold text-gray-800">
            Information We Collect
          </h2>

          <p>
            We may collect non-personal information such as browser type,
            operating system, pages visited, and usage statistics.
          </p>

          <h2 className="text-2xl font-bold text-gray-800">
            Cookies
          </h2>

          <p>
            This website may use cookies to improve user experience
            and serve personalized advertisements through third-party
            services such as Google AdSense.
          </p>

          <h2 className="text-2xl font-bold text-gray-800">
            Third-Party Services
          </h2>

          <p>
            We may use third-party services including analytics and
            advertising providers that may collect information in
            accordance with their own privacy policies.
          </p>

          <h2 className="text-2xl font-bold text-gray-800">
            Consent
          </h2>

          <p>
            By using this website, you consent to this privacy policy.
          </p>

        </div>

      </div>

    </main>
  );
}
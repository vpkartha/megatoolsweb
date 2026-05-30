"use client";

const categories = ["All", "Calculators", "Converters", "Text", "Dev", "Paid"];

export default function Navbar({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}) {
  return (
    <nav className="border-b px-6 py-3 flex flex-wrap gap-3 items-center justify-between">

      {/* Brand */}
      <div className="text-xl font-bold">
        MegaToolsWeb
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm border transition ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

    </nav>
  );
}
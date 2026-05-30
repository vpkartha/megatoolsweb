export default function AdSidebar() {
  return (
    <aside className="hidden xl:flex w-64 flex-col gap-4 p-4 border-l">

      <div className="h-48 border rounded bg-gray-100 flex items-center justify-center text-sm text-gray-500">
        AdSense Slot 1
      </div>

      <div className="h-48 border rounded bg-gray-100 flex items-center justify-center text-sm text-gray-500">
        AdSense Slot 2
      </div>

      <div className="h-48 border rounded bg-gray-100 flex items-center justify-center text-sm text-gray-500">
        AdSense Slot 3
      </div>

    </aside>
  );
}
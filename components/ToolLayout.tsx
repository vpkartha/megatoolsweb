import { ReactNode } from "react";

import AdSidebar from "./AdSidebar";
import FeedbackForm from "./FeedbackForm";
import BackToHome from "./BackToHome";
import AdSlot from "@/components/AdSlot";

export default function ToolLayout({
  children,
  tool,
}: {
  children: ReactNode;
  tool: string;
}) {
  return (
    <div className="min-h-screen flex bg-white">

      {/* MAIN CONTENT AREA */}
      <div className="flex-1">

        <div className="max-w-3xl mx-auto p-6 space-y-6">

          {/* TOOL CONTENT */}
          <div>
            {children}
          </div>

          {/* UNIVERSAL ACTION AREA */}
          <div className="space-y-4">

            {/* Feedback (ONLY ONCE) */}
            <div className="cursor-pointer">
              <FeedbackForm tool={tool} />
            </div>

            {/* Back Button (ONLY ONCE) */}
            <div className="cursor-pointer">
              <BackToHome />
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDEBAR ADS */}
      <aside className="w-[280px] border-l bg-gray-50 hidden lg:block">

        <div className="sticky top-0 h-screen overflow-y-auto p-4 space-y-4">

          {/* Top Ad Slot */}
         <AdSlot />

          {/* Middle Ad Slot */}
          <AdSlot />
          {/* Bottom Ad Slot */}
          <AdSlot />

        </div>

      </aside>

    </div>
  );
}
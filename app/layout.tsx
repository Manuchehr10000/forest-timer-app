import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/app/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Forest Timer",
  description: "A peaceful productivity app with forest theme",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen text-green-900`}>
        <div className="relative min-h-screen overflow-hidden">
          {/* Forest Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-900/30 to-transparent" />
            {/* Orange Rocks */}
            <div className="absolute bottom-4 left-1/4 w-12 h-12 bg-orange-700 rounded-lg transform rotate-12" />
            <div className="absolute bottom-6 right-1/3 w-8 h-8 bg-orange-600 rounded-lg transform -rotate-6" />
          </div>
          
          {/* Main Content */}
          <div className="relative z-10 flex flex-col h-screen">
            {/* Scrollable content area with green tint */}
            <div className="flex-1 flex justify-center">
              <div className="w-1/2 bg-green-200/95 backdrop-blur-sm">
                <div className="h-full overflow-y-auto px-4 py-6">
                  {children}
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <Navigation />
          </div>
        </div>
      </body>
    </html>
  );
}

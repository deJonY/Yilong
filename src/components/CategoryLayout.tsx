// "use client";

// import type React from "react"
// import Header from "./Header"
// import Sidebar from "./Sidebar"
// import Footer from "./Footer"

// interface CategoryLayoutProps {
//   children: React.ReactNode
//   title: string
//   description?: string
// }

// export default function CategoryLayout({ children, title, description }: CategoryLayoutProps) {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-300 flex flex-col">
//       {/* Header */}
//       <Header />

//       {/* Content */}
//       <div className="container mx-auto flex-1 w-full px-0 md:px-6 py-6">
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Sidebar */}
//           <aside className="md:w-64 w-full">
//             <Sidebar />
//           </aside>

//           {/* Main */}
//           <main className="flex-1">
//             <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
//               <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{title}</h1>
//               {description && (
//                 <p className="text-gray-600 mb-6 text-sm md:text-base">{description}</p>
//               )}
//               {children}
//             </div>
//           </main>
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   )
// }

////////////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import type React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface CategoryLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export default function CategoryLayout({ children, title, description }: CategoryLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-300">
      <Header />

      {/* Home sahifadagi kabi: container + px-0 + flex */}
      <div className="container mx-auto px-0">
        <div className="flex gap-6">
          {/* Sidebar chap devorga yopishib tursin */}
          <Sidebar />

          {/* Asosiy kontent */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              {description && (
                <p className="text-gray-600 mb-6 text-sm md:text-base">{description}</p>
              )}
              {children}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

import type React from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"

interface CategoryLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export default function CategoryLayout({ children, title, description }: CategoryLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-300">
      <Header />
      <div className="container mx-auto">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 px-6 pt-6">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h1 className="text-3xl font-bold mb-4 text-gray-800">{title}</h1>
              {description && <p className="text-gray-600 mb-6">{description}</p>}
              {children}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}

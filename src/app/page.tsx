import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import MainContent from "../components/MainContent"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-300 ">
      <Header />
      <div className="container mx-auto">
        <div className="flex">
          <Sidebar />
          <MainContent />
        </div>
      </div>
      <Footer />
    </div>
  )
}

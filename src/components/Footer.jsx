import { useCallback } from 'react'

const Footer = () => {
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white">BacainPuisi</h2>
            <p className="text-sm text-gray-400 mt-1 tracking-wide">Koleksi puisi-puisi terkenal</p>
          </div>

          <div className="flex space-x-6 text-sm">
            <a href="/NotFound" className="hover:text-white transition-colors duration-200">
              Tentang Kami
            </a>
            <a href="/NotFound" className="hover:text-white transition-colors duration-200">
              Kontak
            </a>
            <a href="/NotFound" className="hover:text-white transition-colors duration-200">
              Kebijakan Privasi
            </a>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-gray-400">
            &copy; {currentYear} BacainPuisi. UTS Pemrograman Web 122140095. Hak Cipta Dilindungi.
          </p>

          <button 
            onClick={handleScrollToTop}
            className="flex items-center group hover:text-white transition"
          >
            <span>Kembali ke atas</span>
            <svg className="w-4 h-4 ml-1 transform group-hover:-translate-y-1 transition-transform duration-200" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer

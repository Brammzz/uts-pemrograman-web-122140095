import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  // Set page title
  useEffect(() => {
    document.title = 'Page Not Found | PuisiKu'
    return () => {
      document.title = 'PuisiKu'
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <h1 className="text-9xl font-bold text-indigo-200">404</h1>
      <div className="h-1 w-24 bg-indigo-500 my-6"></div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Halaman tidak ada, halaman mungkin sudah dihapus atau halaman berubah.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Go to Homepage
      </Link>
    </div>
  )
}

export default NotFound
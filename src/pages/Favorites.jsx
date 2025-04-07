import { useState, useEffect } from 'react'
import PoemCard from '../components/PoemCard'
import { useFavorites } from '../context/FavoritesContext'

const Favorites = () => {
  const { favorites } = useFavorites()
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Add a small delay for animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Sort favorites by author
  const sortedFavorites = [...favorites].sort((a, b) => 
    a.author.localeCompare(b.author)
  )

  return (
    <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
  <section className="bg-gray-900 text-white py-16 px-6 rounded-3xl shadow-lg mb-12">
    <div className="max-w-5xl mx-auto text-center">
      <h1 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight">
        Puisi Favorit Anda
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Koleksi puisi-puisi yang telah Anda tandai sebagai favorit.
      </p>
    </div>
  </section>
      
    {favorites.length === 0 ? (
    <div className="bg-gray-900 rounded-lg shadow-md p-8 text-center text-white">
        <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-white mb-2">Tidak Ada Favorit</h2>
        <p className="text-gray-400 mb-6">
        Anda belum menambahkan puisi apapun ke favorit Anda. 
        Jelajahi koleksi kami dan tandai puisi yang Anda sukai.
        </p> <a 
        href="/"
        className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded hover:bg-white/20 transition duration-200 backdrop-blur">
        Jelajahi Puisi
        </a>

    </div>
    ) : (
    <>
        <p className="text-black-300 mb-6">
        Anda memiliki {favorites.length} puisi dalam daftar favorit Anda.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedFavorites.map((poem, index) => (
            <PoemCard key={`fav-${poem.title}-${index}`} poem={poem} />
        ))}
        </div>
    </>
    )}

    </div>
  )
}

export default Favorites
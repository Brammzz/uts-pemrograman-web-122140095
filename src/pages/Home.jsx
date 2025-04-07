import { useState, useEffect, useMemo } from 'react'
import PoemCard from '../components/PoemCard'
import Loading from '../components/Loading'
import useFetchPoems from '../hooks/useFetchPoems'

const Home = () => {
  const { data: poems, loading, error } = useFetchPoems()
  const [filter, setFilter] = useState('all')
  
  // Memoized filtered poems
  const filteredPoems = useMemo(() => {
    if (!poems) return []
    
    switch (filter) {
      case 'short':
        return poems.filter(poem => 
          poem.linecount && parseInt(poem.linecount) < 20
        )
      case 'medium':
        return poems.filter(poem => 
          poem.linecount && 
          parseInt(poem.linecount) >= 20 && 
          parseInt(poem.linecount) < 50
        )
      case 'long':
        return poems.filter(poem => 
          poem.linecount && parseInt(poem.linecount) >= 50
        )
      default:
        return poems
    }
  }, [poems, filter])

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (loading) return <Loading />
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p>Error loading poems: {error}</p>
        <p className="mt-2">Please try refreshing the page.</p>
      </div>
    )
  }

  return (
    <div>
      <section className="bg-gray-900 text-white py-16 px-6 rounded-3xl shadow-lg mb-12">
        <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight">
        Temukan Puisi Inspiratif
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Koleksi puisi-puisi terkenal dari penyair hebat di seluruh dunia. 
        Tambahkan ke favorit atau bagikan dengan teman-teman Anda.
        </p>
        </div>
    </section>

    <div className="mb-8 flex flex-wrap justify-center gap-4">
        <button 
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
            filter === 'all' 
                ? 'bg-purple-600 text-white shadow-md' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
        >
            All Poems
        </button>

        <button 
            onClick={() => setFilter('short')}
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
            filter === 'short' 
                ? 'bg-purple-600 text-white shadow-md' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
        >
            Short Poems
        </button>

        <button 
            onClick={() => setFilter('medium')}
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
            filter === 'medium' 
                ? 'bg-purple-600 text-white shadow-md' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
        >
            Medium Poems
        </button>

        <button 
            onClick={() => setFilter('long')}
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
            filter === 'long' 
                ? 'bg-purple-600 text-white shadow-md' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
        >
            Long Poems
        </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPoems.length > 0 ? (
            filteredPoems.map((poem, index) => (
            <PoemCard key={`${poem.title}-${index}`} poem={poem} />
            ))
        ) : (
            <div className="col-span-full text-center py-12">
            <p className="text-xl text-gray-500">No poems found for your selection.</p>
            <button 
                onClick={() => setFilter('all')}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-200"
            >
                Show All Poems
            </button>
            </div>
        )}
        </div>

    </div>
  )
}

export default Home
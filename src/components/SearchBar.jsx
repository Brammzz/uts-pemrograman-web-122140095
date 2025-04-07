import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchPoems } from '../utils/api'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchTimeout = useRef(null)
  const navigate = useNavigate()
  
  // Debounced search using useCallback
  const performSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }
    
    try {
      setIsSearching(true)
      const searchResults = await searchPoems(searchQuery)
      setResults(searchResults.slice(0, 5))
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }, [])

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    
    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }
    
    // Set new timeout for debouncing
    searchTimeout.current = setTimeout(() => {
      performSearch(value)
    }, 300)
  }
  
  const handleSelectPoem = (poem) => {
    // Generate slug
    const poemSlug = `${poem.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')}-${poem.author.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')}`
    navigate(`/poem/${encodeURIComponent(poemSlug)}`, { state: { poem } })
    setShowResults(false)
    setQuery('')
  }

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          placeholder="Search poems..."
          className="w-full bg-gray-100 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white"
        />
        <svg
          className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {showResults && query && (
        <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((poem, index) => (
                <li
                  key={index}
                  onMouseDown={() => handleSelectPoem(poem)}
                  className="px-4 py-2 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium">{poem.title}</div>
                  <div className="text-sm text-gray-500">{poem.author}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">No poems found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
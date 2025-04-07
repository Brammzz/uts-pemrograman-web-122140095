import { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'

const Loading = ({ message = 'Loading...' }) => {
  const [dots, setDots] = useState('.')
  
  // Cycle through loading dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '.'
        return prev + '.'
      })
    }, 500)
    
    return () => clearInterval(interval)
  }, [])
  
  // Memoize loading quotes to avoid re-rendering
  const loadingQuotes = useMemo(() => [
    "Fetching poetic beauty...",
    "Gathering words of wisdom...",
    "Discovering literary treasures...",
    "Unveiling poetic masterpieces...",
    "Loading moments of inspiration..."
  ], [])
  
  const randomQuote = useMemo(() => 
    loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)],
  [loadingQuotes])

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
      <p className="text-lg text-gray-600">{message || randomQuote}</p>
      <p className="text-indigo-500 mt-2 text-lg font-medium">{dots}</p>
    </div>
  )
}

Loading.propTypes = {
  message: PropTypes.string
}

export default Loading
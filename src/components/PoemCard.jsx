import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import FavoriteButton from './FavoriteButton'
import ShareButton from './ShareButton'

const PoemCard = ({ poem }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef(null)
  
  // Track when card enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    
    if (cardRef.current) {
      observer.observe(cardRef.current)
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  // Generate a slug for the poem URL
  const poemSlug = `${poem.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')}-${poem.author.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')}`

  return (
    <div ref={cardRef}
    className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 opacity-0 translate-y-10 hover:shadow-xl"
    >
    <div className="p-6">
        <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{poem.title}</h3>
        <FavoriteButton poem={poem} />
        </div>
        
        <p className="text-purple-400 mb-3">by {poem.author}</p>
        
        <div className={`prose prose-invert prose-sm ${isExpanded ? '' : 'line-clamp-3'} text-gray-300`}>
        {poem.lines ? (
            poem.lines.slice(0, isExpanded ? undefined : 6).map((line, i) => (
            <p key={i} className="my-1">{line || <br />}</p>
            ))
        ) : (
            <p className="text-gray-500">Loading poem content...</p>
        )}
        </div>
        
        {poem.lines && poem.lines.length > 6 && (
        <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-purple-400 hover:text-purple-300 text-sm font-medium transition duration-200"
        >
            {isExpanded ? 'Show less' : 'Show more'}
        </button>
        )}
    </div>
    
    <div className="bg-gray-800 px-6 py-3 flex justify-between items-center">
        <Link 
        to={`/poem/${encodeURIComponent(poemSlug)}`}
        state={{ poem }}
        className="text-purple-400 hover:text-purple-300 font-medium transition duration-200"
        >
        Baca Puisi Secara Penuh
        </Link>
        <ShareButton poem={poem} />
    </div>
    </div>

  )
}

PoemCard.propTypes = {
  poem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    lines: PropTypes.arrayOf(PropTypes.string),
    linecount: PropTypes.string
  }).isRequired
}

export default PoemCard
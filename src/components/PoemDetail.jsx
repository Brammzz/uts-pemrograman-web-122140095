import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import FavoriteButton from './FavoriteButton'
import ShareButton from './ShareButton'

const PoemDetail = ({ poem }) => {
  const [isVisible, setIsVisible] = useState(false)
  const poemRef = useRef(null)

  const lines = Array.isArray(poem?.lines)
    ? poem.lines
    : poem?.lines?.split?.('\n') || []

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true)
    }, 100)

    const highlightOnScroll = () => {
      if (!poemRef.current) return

      const lines = poemRef.current.querySelectorAll('.poem-line')

      lines.forEach((line) => {
        const rect = line.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        if (
          rect.top > viewportHeight / 3 &&
          rect.bottom < (viewportHeight * 2) / 3
        ) {
          line.classList.add('text-white', 'font-medium')
          line.classList.remove('text-gray-500')
        } else {
          line.classList.remove('text-white', 'font-medium')
          line.classList.add('text-gray-500')
        }
      })
    }

    window.addEventListener('scroll', highlightOnScroll)
    highlightOnScroll()

    return () => {
      window.removeEventListener('scroll', highlightOnScroll)
    }
  }, [])

  if (!poem) return null

  return (
    <div
      className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
    >
      <div className="bg-gray-900 text-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-extrabold text-purple-300">{poem.title}</h1>
          <div className="flex space-x-2">
            <FavoriteButton poem={poem} />
            <ShareButton poem={poem} />
          </div>
        </div>

        <div className="flex items-center mb-8">
          <div className="h-10 w-1 bg-purple-600 mr-4"></div>
          <div>
            <p className="text-lg font-semibold text-purple-400">{poem.author}</p>
            {poem.linecount && (
              <p className="text-sm text-gray-400">{poem.linecount} lines</p>
            )}
          </div>
        </div>

        <div
          ref={poemRef}
          className="prose prose-lg max-w-none mb-8 leading-relaxed text-white"
        >
          {lines.length > 0 ? (
            lines.map((line, i) => (
              <p
                key={i}
                className="poem-line transition-colors duration-300 my-2 text-gray-500"
              >
                {line || <br />}
              </p>
            ))
          ) : (
            <p className="text-gray-400 italic">No content available.</p>
          )}
        </div>
      </div>
    </div>
  )
}

PoemDetail.propTypes = {
  poem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    lines: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    linecount: PropTypes.string
  })
}

export default PoemDetail

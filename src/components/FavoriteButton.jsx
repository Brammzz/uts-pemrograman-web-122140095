import { useState, useEffect, useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import { useFavorites } from '../context/FavoritesContext'

const FavoriteButton = memo(({ poem }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const [isActive, setIsActive] = useState(false)
  const [animating, setAnimating] = useState(false)

  // Check if poem is in favorites
  useEffect(() => {
    setIsActive(isFavorite(poem))
  }, [poem, isFavorite])

  // Using useCallback to memoize the handler
  const toggleFavorite = useCallback(() => {
    if (isActive) {
      removeFavorite(poem)
    } else {
      addFavorite(poem)
      setAnimating(true)
      setTimeout(() => setAnimating(false), 700)
    }
  }, [isActive, poem, addFavorite, removeFavorite])

  return (
    <button
      aria-label={isActive ? "Remove from favorites" : "Add to favorites"}
      onClick={toggleFavorite}
      className={`relative flex items-center justify-center w-8 h-8 focus:outline-none transition-transform ${
        animating ? 'scale-150' : ''
      }`}
    >
      <svg
        className={`w-6 h-6 transition-colors duration-300 ${
          isActive ? 'text-red-500 fill-current' : 'text-gray-400'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={isActive ? 2 : 1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  )
})

FavoriteButton.displayName = 'FavoriteButton'

FavoriteButton.propTypes = {
  poem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }).isRequired
}

export default FavoriteButton
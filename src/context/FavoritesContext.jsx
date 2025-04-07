import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const FavoritesContext = createContext()

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

export const FavoritesProvider = ({ children }) => {
  // Initialize favorites from localStorage if available
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('poemFavorites')
    return savedFavorites ? JSON.parse(savedFavorites) : []
  })

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('poemFavorites', JSON.stringify(favorites))
  }, [favorites])

  // Add a poem to favorites
  const addFavorite = (poem) => {
    setFavorites(prevFavorites => {
      // Check if already in favorites
      if (prevFavorites.some(p => p.title === poem.title && p.author === poem.author)) {
        return prevFavorites
      }
      return [...prevFavorites, poem]
    })
  }

  // Remove a poem from favorites
  const removeFavorite = (poem) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(p => 
        !(p.title === poem.title && p.author === poem.author)
      )
    )
  }

  // Check if a poem is in favorites
  const isFavorite = (poem) => {
    return favorites.some(p => p.title === poem.title && p.author === poem.author)
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired
}
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from './SearchBar'
import PropTypes from 'prop-types'

const NavLink = ({ to, children }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link 
      to={to} 
      className={`px-4 py-2 text-sm font-medium tracking-wide transition duration-200 ${
        isActive 
          ? 'text-white border-b-2 border-white' 
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {children}
    </Link>
  )
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-10 transition-all duration-300 ${
      scrolled ? 'bg-gray-900 shadow-md py-2' : 'bg-gray-900 py-4'
    }`}>
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between">
        {/* Logo + Burger */}
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            BacainPuisi
          </Link>
          <button className="md:hidden p-2 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4 mt-4 md:mt-0">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/favorites">Favorit</NavLink>
        </nav>

        {/* Search */}
        <div className="hidden md:block w-full md:w-64 mt-4 md:mt-0">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mt-4 px-4 pb-4">
        <SearchBar />
      </div>
    </header>
  )
}

export default Header

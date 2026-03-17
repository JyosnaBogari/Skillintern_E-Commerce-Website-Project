import { NavLink, useNavigate } from 'react-router'
import { useState } from 'react'
import {
  navBrandClass,
  navContainerClass,
  navLinkActiveClass,
  navbarClass,
  navLinksClass,
  navLinkClass,
  navSearchInput,
  navSearchClass,
  iconButton
} from '../styles/common'

function PublicNavBar() {

  const [searchValue, setSearchValue] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchValue(value)
    
    if (value.trim()) {
      navigate(`/?q=${encodeURIComponent(value)}`, { replace: true })
    } else {
      navigate('/', { replace: true })
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      e.preventDefault()
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className={navbarClass}>
      <div className={`${navContainerClass} flex flex-wrap items-center gap-3`}>

        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className={navBrandClass}>JYOS</span>
        </div>

        {/* Search Bar */}
        <div className={`${navSearchClass} w-full md:flex-1 order-3 md:order-0`}>
          <input
            type="text"
            placeholder="Search products..."
            className={`${navSearchInput} w-full`}
            value={searchValue}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
        </div>

        {/* Desktop Links */}
        <nav className={`${navLinksClass} hidden md:block`}>
          <ul className="flex items-center gap-6">

            <li>
              <NavLink to="/" className={({ isActive }) =>
                isActive ? navLinkActiveClass : navLinkClass}>
                Products
              </NavLink>
            </li>

            <li>
              <NavLink to="/signup" className={({ isActive }) =>
                isActive ? navLinkActiveClass : navLinkClass}>
                Sign Up
              </NavLink>
            </li>

            <li>
              <NavLink to="/signin" className={({ isActive }) =>
                isActive ? navLinkActiveClass : navLinkClass}>
                Sign In
              </NavLink>
            </li>

          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className={`${iconButton} md:hidden ml-auto`}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#131921] border-t border-[#2f3a48]">
          <div className="px-4 py-4 space-y-4 flex flex-col">

            <NavLink to="/" onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? navLinkActiveClass : navLinkClass}>
              Products
            </NavLink>

            <NavLink to="/signup" onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? navLinkActiveClass : navLinkClass}>
              Sign Up
            </NavLink>

            <NavLink to="/signin" onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? navLinkActiveClass : navLinkClass}>
              Sign In
            </NavLink>

          </div>
        </div>
      )}
    </div>
  )
}

export default PublicNavBar
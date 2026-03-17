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
      // Keep Enter behavior but navigation already happened in onChange
      e.preventDefault()
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className={navbarClass}>
      <div className={navContainerClass}>

        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className={navBrandClass}>JYOS</span>
        </div>

        {/* Search Bar */}
        <div className={navSearchClass}>
          <input
            type="text"
            placeholder="Search products..."
            className={navSearchInput}
            value={searchValue}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
        </div>

        {/* Desktop Links */}
        <nav className={navLinksClass}>
          <ul className="flex items-center gap-8">

            <li>
              <NavLink
                to=""
                className={({ isActive }) =>
                  isActive ? navLinkActiveClass : navLinkClass
                }
              >
                Products
              </NavLink>
            </li>

            <li>
              <NavLink
                to="signup"
                className={({ isActive }) =>
                  isActive ? navLinkActiveClass : navLinkClass
                }
              >
                Sign Up
              </NavLink>
            </li>

            <li>
              <NavLink
                to="signin"
                className={({ isActive }) =>
                  isActive ? navLinkActiveClass : navLinkClass
                }
              >
                Sign In
              </NavLink>
            </li>

          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className={`${iconButton} md:hidden`}
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#131921] border-t border-[#2f3a48]">
          <div className="px-4 py-4 space-y-4">
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? navLinkActiveClass : navLinkClass
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </NavLink>

            <NavLink
              to="signup"
              className={({ isActive }) =>
                isActive ? navLinkActiveClass : navLinkClass
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </NavLink>

            <NavLink
              to="signin"
              className={({ isActive }) =>
                isActive ? navLinkActiveClass : navLinkClass
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </NavLink>
          </div>
        </div>
      )}
    </div>
  )
}

export default PublicNavBar
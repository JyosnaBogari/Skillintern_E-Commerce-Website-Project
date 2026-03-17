import { NavLink } from 'react-router'
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
  navSignOutBtn,
  iconButton,
  // mobile styles
  mobileMenuWrapper,
  mobileNavLink,
  mobileSignOutBtn,
  mobileHamburgerButton
} from '../styles/common'

import { useAuth } from '../store/authStore'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router'

function AdminNavBar() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const logout = useAuth(state => state.logout)

  const SignOut = async () => {
    await logout()
    toast.success("Logged Out Successfully")
    navigate('/signin')
    setIsMenuOpen(false)
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

        {/* Search Bar - Hidden on mobile */}
        <div className={`${navSearchClass} hidden sm:block`}>
          <input
            type="text"
            placeholder="Search products..."
            className={navSearchInput}
          />
        </div>

        {/* Desktop Links */}
        <nav className={navLinksClass}>
          <ul className="flex items-center gap-5">
            <li>
              <NavLink to="/add-product" className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>
                Add Product
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>
                Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders" className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin-products" className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>
                Products
              </NavLink>
            </li>
            <li>
              <button onClick={SignOut} className={navSignOutBtn}>
                Sign Out
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className={mobileHamburgerButton + " md:hidden"}
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={mobileMenuWrapper}>
          {/* Mobile Search */}
          <input
            type="text"
            placeholder="Search products..."
            className={navSearchInput}
          />

          <NavLink
            to="/add-product"
            className={mobileNavLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Add Product
          </NavLink>

          <NavLink
            to="/users"
            className={mobileNavLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Users
          </NavLink>

          <NavLink
            to="/orders"
            className={mobileNavLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Orders
          </NavLink>

          <NavLink
            to="/admin-products"
            className={mobileNavLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </NavLink>

          <button onClick={SignOut} className={mobileSignOutBtn}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminNavBar
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

  // state to control mobile menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // get logout function from auth store
  const logout = useAuth(state => state.logout)

  // function to handle admin logout
  const SignOut = async () => {
    await logout() // clear auth state (token/session)
    toast.success("Logged Out Successfully")
    navigate('/signin') // redirect to signin page
    setIsMenuOpen(false) // close mobile menu after logout
  }

  // toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className={navbarClass}>
      <div className={navContainerClass}>

        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <span className={navBrandClass}>JYOS</span>
        </div>

        {/* Search Bar (visible only on desktop) */}
        <div className={`${navSearchClass} hidden sm:block`}>
          <input
            type="text"
            placeholder="Search products..."
            className={navSearchInput}
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav className={navLinksClass}>
          <ul className="flex items-center gap-5">
             <li>
              {/* admin dashboard */}
              <NavLink to="/admin-profile" className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>
                Dashboard
              </NavLink>
            </li>
            <li>
              {/* add new product page */}
              <NavLink to="/add-product" className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>
                Add Product
              </NavLink>
            </li>
            <li>
              {/* view all users */}
              <NavLink to="/users" className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>
                Users
              </NavLink>
            </li>
            <li>
              {/* view all orders */}
              <NavLink to="/orders" className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>
                Orders
              </NavLink>
            </li>
            <li>
              {/* manage products */}
              <NavLink to="/admin-products" className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>
                Products
              </NavLink>
            </li>
            <li>
              {/* logout button */}
              <button onClick={SignOut} className={navSignOutBtn}>
                Sign Out
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
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
            {/* icon changes based on menu state */}
            {isMenuOpen ? (
              // close icon
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              // hamburger icon
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu (visible when isMenuOpen = true) */}
      {isMenuOpen && (
        <div className={mobileMenuWrapper}>
          
          {/* Mobile Search */}
          <input
            type="text"
            placeholder="Search products..."
            className={navSearchInput}
          />

           {/* mobile navigation links */}
           <NavLink
            to="/admin-profile"
            className={mobileNavLink}
            onClick={() => setIsMenuOpen(false)} // close menu after click
          >
            Dashboard
          </NavLink>

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

          {/* mobile logout button */}
          <button onClick={SignOut} className={mobileSignOutBtn}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminNavBar
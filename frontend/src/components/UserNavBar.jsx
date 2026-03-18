import {
  navBrandClass,
  navContainerClass,
  navLinkActiveClass,
  navbarClass,
  navLinksClass,
  navLinkClass,
  secondaryBtn,
  ghostBtn,
  navSearchInput,
  navSearchClass,
  iconButton,
  badgeClass,
  mobileMenuWrapper,
  mobileProfileButton,
  mobileHamburgerButton,
  mobileNavLink,
  mobileSignOutBtn
} from '../styles/common';

import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../store/authStore'
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'

function UserNavBar() {

  const logout = useAuth(state => state.logout)
  const cartCount = useAuth(state => state.cartCount)
  const refreshCart = useAuth(state => state.refreshCart)
  // navigation
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [wishlistCount, setWishlistCount] = useState(0)

  useEffect(() => {
    refreshCart()
    //wishlist update
    const updateWishlist = () => {
      const stored = JSON.parse(localStorage.getItem('wishlist')) || []
      setWishlistCount(stored.length)
    }

    updateWishlist()
    window.addEventListener('wishlistUpdated', updateWishlist)
    return () => window.removeEventListener('wishlistUpdated', updateWishlist)

  }, [refreshCart])

  // SignOut function calling
  const SignOut = async () => {
    await logout()
    toast.success("Logged Out Successfully")
    navigate('/signin')
    setOpen(false)
    //mobile  responsiveness
    setIsMenuOpen(false)
  }

  return (
    <div className={navbarClass + " h-14 flex items-center"}>

      <div className={navContainerClass + " flex items-center justify-between w-full"}>

        {/* Logo */}
        <span className={navBrandClass + " text-white"}>JYOS</span>

        {/* Desktop Search */}
        <div className={`${navSearchClass} hidden md:block`}>
          <input
            type="text"
            placeholder="Search products..."
            className={navSearchInput + " h-9"}
          />
        </div>

        {/* Desktop Nav */}
        <nav className={navLinksClass + " hidden md:block"}>
          <ul className="flex items-center gap-4">

            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>
                Products
              </NavLink>
            </li>

            <li>
              <NavLink to="/wishlist" className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>
                Wishlist
              </NavLink>
            </li>

            <li>
              <NavLink to="/cart" className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>
                Cart
              </NavLink>
            </li>

            {/* Cart */}
            <li className="relative">
              <button
                onClick={() => navigate('/cart')}
                className={iconButton + " text-white w-8 h-8 text-lg"}
              >
                🛒
                {cartCount > 0 && (
                  <span className={badgeClass}>{cartCount}</span>
                )}
              </button>
            </li>

            {/* Wishlist */}
            <li className="relative">
              <button
                onClick={() => navigate('/wishlist')}
                className={iconButton + " text-white w-8 h-8 text-lg"}
              >
                ❤️
                {wishlistCount > 0 && (
                  <span className={badgeClass}>{wishlistCount}</span>
                )}
              </button>
            </li>

            {/* Profile */}
            <li className="relative">
              <button
                onClick={() => setOpen(!open)}
                className={iconButton + " text-white w-8 h-8 text-lg"}
              >
                👤
              </button>

              {open && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded-lg p-3 shadow-lg z-50">

                  <button
                    onClick={() => navigate('/edit-user')}
                    className={ghostBtn + " w-full text-left"}
                  >
                    Edit Details
                  </button>

                  <button
                    onClick={() => navigate('/change-password')}
                    className={ghostBtn + " w-full text-left"}
                  >
                    Change Password
                  </button>

                  <button
                    onClick={SignOut}
                    className={secondaryBtn + " w-full text-left"}
                  >
                    Sign Out
                  </button>

                </div>
              )}
            </li>

          </ul>
        </nav>

        {/* RIGHT SIDE (PROFILE + HAMBURGER) */}
        <div className="flex items-center gap-2 md:hidden">

          {/* Profile */}
          <button
            onClick={() => setOpen(!open)}
            className={mobileProfileButton}
          >
            👤
          </button>

          {/* Hamburger only shows when profile is open */}
          {open && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={mobileHamburgerButton}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}

        </div>

      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className={mobileMenuWrapper}>

          {/* Mobile Search */}
          <input
            type="text"
            placeholder="Search products..."
            className={navSearchInput}
          />

          <NavLink to="/" className={mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            Products
          </NavLink>

          <NavLink to="/wishlist" className={mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            Wishlist
          </NavLink>

          <NavLink to="/cart" className={mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            Cart
          </NavLink>

          <div className="border-t border-gray-700 pt-2 space-y-2">
            <button onClick={() => navigate('/edit-user')} className={mobileNavLink}>
              Edit Details
            </button>

            <button onClick={() => navigate('/change-password')} className={mobileNavLink}>
              Change Password
            </button>

            <button onClick={SignOut} className={mobileSignOutBtn}>
              Sign Out
            </button>
          </div>

        </div>
      )}

    </div>
  )
}

export default UserNavBar
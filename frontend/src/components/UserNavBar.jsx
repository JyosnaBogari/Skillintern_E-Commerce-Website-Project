import {
  navBrandClass,
  navContainerClass,
  navLinkActiveClass,
  navbarClass,
  navLinksClass,
  navLinkClass,
  secondaryBtn,
  ghostBtn,
  bodyText,
  navSearchInput,
  navSearchClass,
  iconButton,
  badgeClass
} from '../styles/common';

import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../store/authStore'
import { toast } from 'react-hot-toast'
import { useState } from 'react'

function UserNavBar() {

  const logout = useAuth(state => state.logout)
  const navigate = useNavigate()
  const [open,setOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const SignOut = async () => {
    await logout()
    toast.success("Logged Out Successfully")
    navigate('/signin')
    setOpen(false)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setOpen(false) // Close profile menu if open
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

        {/* Desktop Links + Cart + Profile */}
        <nav className={navLinksClass}>
          <ul className="flex items-center gap-5">

            <li>
              <NavLink to="" className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>
                Products
              </NavLink>
            </li>

            <li>
              <NavLink to="cart" className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>
                Cart
              </NavLink>
            </li>

            {/* Cart Icon */}
            <li className="relative">
              <button
                onClick={() => navigate('/cart')}
                className={iconButton}
              >
                🛒
                {/* Cart Badge - placeholder for now */}
                <span className={badgeClass}>0</span>
              </button>
            </li>

            {/* Profile Icon */}
            <li className="relative">

              <button
                onClick={()=>setOpen(!open)}
                className={iconButton}
              >
                👤
              </button>

              {open && (
                <div className="absolute right-0 mt-3 bg-white border border-gray-300 rounded-lg p-3 flex flex-col gap-2 min-w-40 shadow-lg z-50">

                  <button
                    onClick={()=>navigate('/edit-user')}
                    className={ghostBtn + " text-left"}
                  >
                    Edit Details
                  </button>

                  <button
                    onClick={()=>navigate('/change-password')}
                    className={ghostBtn + " text-left cursor-pointer"}
                  >
                    Change Password
                  </button>

                  <button
                    onClick={SignOut}
                    className={secondaryBtn + " text-left"}
                  >
                    Sign Out
                  </button>

                </div>
              )}

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

            {/* Mobile Search */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className={navSearchInput}
              />
            </div>

            <NavLink
              to=""
              className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </NavLink>

            <NavLink
              to="cart"
              className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Cart
            </NavLink>

            {/* Mobile Profile Menu */}
            <div className="border-t border-[#2f3a48] pt-4 space-y-2">
              <button
                onClick={()=>{navigate('/edit-user'); setIsMenuOpen(false)}}
                className={ghostBtn + " text-left w-full"}
              >
                Edit Details
              </button>

              <button
                onClick={()=>{navigate('/change-password'); setIsMenuOpen(false)}}
                className={ghostBtn + " text-left w-full cursor-pointer"}
              >
                Change Password
              </button>

              <button
                onClick={SignOut}
                className={secondaryBtn + " text-left w-full"}
              >
                Sign Out
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default UserNavBar
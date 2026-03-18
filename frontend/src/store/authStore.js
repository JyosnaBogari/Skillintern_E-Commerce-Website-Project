import axios from 'axios'; // for making API requests
import { create } from 'zustand'; // state management
import { persist } from 'zustand/middleware'; // persist state in localStorage

export const useAuth = create(
  persist(
    (set, get) => ({
      currentUser: null, // stores logged-in user data
      isAuthenticated: false, // user login status
      loading: false, // loading state for API calls
      error: null, // error messages
      cartCount: 0, // total items in cart

      // manually update cart count
      setCartCount: (count) => set({ cartCount: count }),

      // fetch cart items and calculate total quantity
      refreshCart: async () => {
        try {
          const res = await axios.get('https://skillintern-e-commerce-website.onrender.com/user-api/user-cart', {
            withCredentials: true, // send cookies/session
          });

          const cartItems = res.data.payload || []; // get cart items

          // calculate total quantity of items
          const count = cartItems.reduce(
            (acc, item) => acc + (item.quantity || 1),
            0
          );

          set({ cartCount: count }); // update state
        } catch (err) {
          set({ cartCount: 0 }); // reset if error
        }
      },

      // login function
      login: async (userCredWithRole) => {
        const { role, ...userCredObj } = userCredWithRole; // remove role before sending
        try {
          set({ loading: true, error: null });

          // send login request
          const res = await axios.post(
            'https://skillintern-e-commerce-website.onrender.com/common-api/authenticate',
            userCredObj,
            { withCredentials: true }
          );

          // update user state on success
          set({
            loading: false,
            currentUser: res.data.payload,
            isAuthenticated: true,
          });

          // update cart after login
          await get().refreshCart();
        } catch (err) {
          // handle login error
          set({
            loading: false,
            currentUser: null,
            error: err.response?.data?.error || 'Login Failed',
            isAuthenticated: false,
          });
        }
      },

      // logout function
      logout: async () => {
        try {
          set({ loading: true, error: null });

          // call logout API
          await axios.get('https://skillintern-e-commerce-website.onrender.com/common-api/logout', {
            withCredentials: true,
          });

          // clear user state
          set({
            loading: false,
            currentUser: null,
            isAuthenticated: false,
            cartCount: 0,
          });
        } catch (err) {
          console.log('err is', err.message);

          // handle logout error
          set({
            loading: false,
            currentUser: null,
            error: err.response?.data?.error || 'Logout Failed',
            isAuthenticated: false,
            cartCount: 0,
          });
        }
      },
    }),
    {
      name: 'jyos-auth-storage', // key for localStorage

      // persist only selected fields
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        cartCount: state.cartCount,
      }),
    }
  )
);
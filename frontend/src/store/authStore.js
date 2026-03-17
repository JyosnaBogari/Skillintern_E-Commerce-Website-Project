import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuth = create(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      cartCount: 0,

      setCartCount: (count) => set({ cartCount: count }),

      refreshCart: async () => {
        try {
          const res = await axios.get('http://localhost:3000/user-api/user-cart', {
            withCredentials: true,
          });
          const cartItems = res.data.payload || [];
          const count = cartItems.reduce(
            (acc, item) => acc + (item.quantity || 1),
            0
          );
          set({ cartCount: count });
        } catch (err) {
          set({ cartCount: 0 });
        }
      },

      login: async (userCredWithRole) => {
        const { role, ...userCredObj } = userCredWithRole;
        try {
          set({ loading: true, error: null });

          const res = await axios.post(
            'http://localhost:3000/common-api/authenticate',
            userCredObj,
            { withCredentials: true }
          );

          set({
            loading: false,
            currentUser: res.data.payload,
            isAuthenticated: true,
          });

          // Update cart count after login
          await get().refreshCart();
        } catch (err) {
          set({
            loading: false,
            currentUser: null,
            error: err.response?.data?.error || 'Login Failed',
            isAuthenticated: false,
          });
        }
      },

      logout: async () => {
        try {
          set({ loading: true, error: null });
          await axios.get('http://localhost:3000/common-api/logout', {
            withCredentials: true,
          });

          set({
            loading: false,
            currentUser: null,
            isAuthenticated: false,
            cartCount: 0,
          });
        } catch (err) {
          console.log('err is', err.message);
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
      name: 'jyos-auth-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        cartCount: state.cartCount,
      }),
    }
  )
);

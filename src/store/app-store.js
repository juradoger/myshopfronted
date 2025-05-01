import { create } from 'zustand';

export const useAppStore = create((set) => ({
  isCartOpen: false,
  carrito: [],
  setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  filtros: {
    categoria: [],
    color: [],
    talla: [],
    marca: [],
  },
  setMarca: (marca) =>
    set((state) => ({
      filtros: {
        ...state.filtros,
        marca: state.filtros.marca.includes(marca)
          ? state.filtros.marca.filter((brand) => brand !== marca)
          : [...state.filtros.marca, marca],
      },
    })),
  setCategoria: (categoria) =>
    set((state) => ({
      filtros: {
        ...state.filtros,
        categoria: state.filtros.categoria.includes(categoria)
          ? state.filtros.categoria.filter((cat) => cat !== categoria)
          : [...state.filtros.categoria, categoria],
      },
    })),
  setColor: (color) =>
    set((state) => ({
      filtros: {
        ...state.filtros,
        color: state.filtros.color.includes(color)
          ? state.filtros.color.filter((col) => col !== color)
          : [...state.filtros.color, color],
      },
    })),
  setTalla: (talla) =>
    set((state) => ({
      filtros: {
        ...state.filtros,
        talla: state.filtros.talla.includes(talla)
          ? state.filtros.talla.filter((size) => size !== talla)
          : [...state.filtros.talla, talla],
      },
    })),
  resetFilters: () =>
    set({ filtros: { categoria: [], color: [], talla: [], marca: [] } }),

  userAuth: null,
  setUserAuth: (user) => set({ userAuth: user }),

  addToCart: (item) =>
    set((state) => ({
      carrito: [
        ...state.carrito,
        {
          ...item,
          quantity: 1,
        },
      ],
    })),
  removeFromCart: (itemId) =>
    set((state) => ({
      carrito: state.carrito.filter((item) => item.id !== itemId),
    })),
  updateCartItem: (itemId, quantity) =>
    set((state) => ({
      carrito: state.carrito.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ carrito: [] }),
}));

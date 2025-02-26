import { create } from "zustand";
import axios from "axios";

interface AuthState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  token: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: () => Promise<void>;
  signup: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  email: "",
  password: "",
  loading: false,
  error: null,
  token: null,

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  login: async () => {
    set({ loading: true, error: null });
  
    try {
      const { email, password } = get();
      const res = await axios.post("https://masonbackend-production.up.railway.app/signin", { email, password });
  
      if (res.status === 200) {
        const { token } = res.data;
        localStorage.setItem("token", token);
        set({ token });
        window.location.href = "/dashboard";
      }
    }catch (error: unknown) { 
      if (axios.isAxiosError(error)) { 
        const status = error.response?.status;
        const message = error.response?.data?.message || "An error occurred";
  
        if (status === 401) {
          set({ error: "Invalid email. Please create an account to log in." });
        } else if (status === 411) {
          set({ error: "Invalid input. Please check your email and password." });
        } else {
          set({ error: message });
        }
      } else {
        set({ error: "Something went wrong. Please try again later." });
      }
    } finally {
      set({ loading: false });
    }
  },
  
  signup: async () => {
    set({ loading: true, error: null });

    try {
      const { email, password } = get();
      const res = await axios.post("https://masonbackend-production.up.railway.app/signup", { email, password });

      if (res.status === 200) {
        window.location.href = "/signin";
      } else {
        set({ error: "Failed to create account. Please try again." });
      }
    } catch {
      set({ error: "Something went wrong. Please try again later." });
    } finally {
      set({ loading: false });
    }
  },
}));

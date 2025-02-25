import { create } from "zustand";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface NoteState {
  title: string;
  content: string;
  tags: string;
  loading: boolean;
  error: string;
  success: string;
  validationErrors: Record<string, string>;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setTags: (tags: string) => void;
  setLoading: (loading: boolean) => void;
  validateForm: () => boolean;
  createNote: (token: string, router: AppRouterInstance, generateContent: (data: { title: string; content: string }) => Promise<string>) => Promise<void>;
  resetStatus: () => void;
}

export const useNoteStore = create<NoteState>((set, get) => ({
  title: "",
  content: "",
  tags: "",
  loading: false,
  error: "",
  success: "",
  validationErrors: {},

  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setTags: (tags) => set({ tags }),
  setLoading: (loading) => set({ loading }),
  resetStatus: () => set({ error: "", success: "" }),

  validateForm: () => {
    const { title, content, tags } = get();
    const errors: Record<string, string> = {};
    let isValid = true;

    if (!title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!content.trim()) {
      errors.content = "Content is required";
      isValid = false;
    }

    if (!tags.trim()) {
      errors.tags = "At least one tag is required";
      isValid = false;
    }

    set({ validationErrors: errors });
    return isValid;
  },

  createNote: async (token, router, generateContent) => {
    const { title, content, tags, validateForm, setLoading } = get();

    if (!validateForm()) {
      set({ error: "Please fill in all required fields" });
      return;
    }

    setLoading(true);
    set({ error: "", success: "" });

    try {
      const aiSummary = await generateContent({ title, content });

      await axios.post(
        "http://3.108.64.68:8080/notes/create",
        {
          title: title.trim(),
          content: content.trim(),
          tags: tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== ""),
          aiSummary,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      set({ success: "Note created successfully!", error: "", title: "", content: "", tags: "" });

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({ error: error.response?.data?.message || "An error occurred" });
      } else if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: "An unknown error occurred" });
      }
    } finally {
      setLoading(false);
    }
  },
}));

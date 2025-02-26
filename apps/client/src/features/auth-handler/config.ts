import { AUTH_LOCAL_STORAGE_KEY } from "@/config/auth";
import { createStorageInstance } from "@/lib/localStorage";
import { AuthState } from "./slices/authSlice";

export const authStorageInstance = createStorageInstance<AuthState>({
  defaultValue: {
    token: "",
    user: {
      _id: "",
      email: "",
      isVerified: false,
      meta: {
        project: "",
      },
    },
  },
  key: AUTH_LOCAL_STORAGE_KEY,
});

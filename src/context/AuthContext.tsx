// @ts-ignore: React module types are not available in this environment
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export type Role = "Player" | "Game_Master" | null;

interface AuthState {
  user: string | null;
  token: string | null;
  isAuthenticated: boolean;
  role: Role;
}

interface AuthContextValue extends AuthState {
  login: (token: string, role: Role, user?: string) => void;
  logout: () => void;
}

const STORAGE_KEYS = {
  TOKEN: "er_token",
  ROLE: "er_role",
  USER: "er_user",
} as const;

const defaultState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  role: null,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function loadFromStorage(): AuthState {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const role = localStorage.getItem(STORAGE_KEYS.ROLE) as Role;
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    if (token && role) {
      return { token, role, user, isAuthenticated: true };
    }
  } catch {
  }
  return defaultState;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(loadFromStorage);

  useEffect(() => {
    try {
      if (state.isAuthenticated && state.token && state.role) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, state.token);
        localStorage.setItem(STORAGE_KEYS.ROLE, state.role);
        if (state.user) localStorage.setItem(STORAGE_KEYS.USER, state.user);
      } else {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.ROLE);
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch {
    }
  }, [state]);

  const login = useCallback((token: string, role: Role, user?: string) => {
    setState({
      token,
      role,
      user: user ?? null,
      isAuthenticated: true,
    });
  }, []);

  const logout = useCallback(() => {
    setState(defaultState);
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = AuthProvider;
exports.useAuth = useAuth;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const STORAGE_KEYS = {
    TOKEN: 'er_token',
    ROLE: 'er_role',
    USER: 'er_user',
};
const defaultState = {
    user: null,
    token: null,
    isAuthenticated: false,
    role: null,
};
const AuthContext = (0, react_1.createContext)(undefined);
function loadFromStorage() {
    try {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const role = localStorage.getItem(STORAGE_KEYS.ROLE);
        const user = localStorage.getItem(STORAGE_KEYS.USER);
        if (token && role) {
            return { token, role, user, isAuthenticated: true };
        }
    }
    catch {
        // Ignore storage access issues in non-browser environments.
    }
    return defaultState;
}
function AuthProvider({ children }) {
    const [state, setState] = (0, react_1.useState)(loadFromStorage);
    (0, react_1.useEffect)(() => {
        try {
            if (state.isAuthenticated && state.token && state.role) {
                localStorage.setItem(STORAGE_KEYS.TOKEN, state.token);
                localStorage.setItem(STORAGE_KEYS.ROLE, state.role);
                if (state.user) {
                    localStorage.setItem(STORAGE_KEYS.USER, state.user);
                }
            }
            else {
                localStorage.removeItem(STORAGE_KEYS.TOKEN);
                localStorage.removeItem(STORAGE_KEYS.ROLE);
                localStorage.removeItem(STORAGE_KEYS.USER);
            }
        }
        catch {
            // Ignore storage access issues in non-browser environments.
        }
    }, [state]);
    const login = (0, react_1.useCallback)((token, role, user) => {
        setState({
            token,
            role,
            user: user ?? null,
            isAuthenticated: true,
        });
    }, []);
    const logout = (0, react_1.useCallback)(() => {
        setState(defaultState);
    }, []);
    return ((0, jsx_runtime_1.jsx)(AuthContext.Provider, { value: { ...state, login, logout }, children: children }));
}
function useAuth() {
    const ctx = (0, react_1.useContext)(AuthContext);
    if (!ctx)
        throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}

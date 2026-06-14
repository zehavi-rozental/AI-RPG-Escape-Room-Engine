"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hook_form_1 = require("react-hook-form");
const react_router_dom_1 = require("react-router-dom");
const AuthContext_1 = require("../context/AuthContext");
function LoginPage() {
    const { login } = (0, AuthContext_1.useAuth)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const from = location.state?.from?.pathname ??
        '/catalog';
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = (0, react_hook_form_1.useForm)({ defaultValues: { role: 'Player' } });
    const onSubmit = async (data) => {
        await new Promise((r) => setTimeout(r, 600));
        const fakeToken = `mock_token_${Date.now()}`;
        login(fakeToken, data.role, data.email);
        navigate(from, { replace: true });
    };
    const inputCls = `
    w-full bg-neutral-950/60 text-white placeholder-neutral-600
    border border-neutral-700 rounded-lg px-4 py-3 text-sm font-mono
    outline-none transition-all duration-200
    focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/10
    hover:border-neutral-600
  `;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-neutral-950 flex items-center justify-center px-4 relative overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute inset-0", children: (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(251,191,36,0.05),transparent)]" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "relative z-10 w-full max-w-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center mb-8", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-4xl mb-3", children: "\uD83D\uDD10" }), (0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-black text-white tracking-widest", style: { fontFamily: "'Cinzel', 'Georgia', serif" }, children: "ENTER THE VAULT" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-neutral-500 text-xs font-mono", children: "Authentication required to proceed" })] }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), noValidate: true, className: "rounded-2xl border border-neutral-800 bg-neutral-900/80 backdrop-blur-xl p-8 space-y-5 shadow-[0_0_60px_rgba(0,0,0,0.5)]", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block mb-2 text-xs font-semibold tracking-widest uppercase text-amber-400/80", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { ...register('email', { required: 'Email is required.' }), type: "email", placeholder: "operator@vault.io", className: inputCls }), errors.email && ((0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-xs text-rose-400", children: errors.email.message }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block mb-2 text-xs font-semibold tracking-widest uppercase text-amber-400/80", children: "Password" }), (0, jsx_runtime_1.jsx)("input", { ...register('password', { required: 'Password is required.' }), type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: inputCls }), errors.password && ((0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-xs text-rose-400", children: errors.password.message }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block mb-2 text-xs font-semibold tracking-widest uppercase text-amber-400/80", children: "Role" }), (0, jsx_runtime_1.jsxs)("select", { ...register('role'), className: `${inputCls} cursor-pointer`, children: [(0, jsx_runtime_1.jsx)("option", { value: "Player", children: "Player" }), (0, jsx_runtime_1.jsx)("option", { value: "Game_Master", children: "Game Master" })] })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", disabled: isSubmitting, className: "w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 font-black text-xs tracking-[0.2em] uppercase hover:from-amber-400 hover:to-orange-400 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 disabled:opacity-50", children: isSubmitting ? 'AUTHENTICATING…' : 'UNLOCK ACCESS' }), (0, jsx_runtime_1.jsxs)("p", { className: "text-center text-neutral-600 text-xs font-mono pt-1", children: ["No account?", ' ', (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/register", className: "text-amber-400/80 hover:text-amber-400 transition-colors", children: "Register here" })] })] })] })] }));
}

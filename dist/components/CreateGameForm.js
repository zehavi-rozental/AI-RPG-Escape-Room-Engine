"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateGameForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hook_form_1 = require("react-hook-form");
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const GENRE_OPTIONS = [
    { value: 'Horror', label: 'Horror', icon: '☠' },
    { value: 'Sci-Fi', label: 'Sci-Fi', icon: '🛸' },
    { value: 'Detective', label: 'Detective', icon: '🔍' },
    { value: 'Fantasy', label: 'Fantasy', icon: '⚔' },
];
const DIFFICULTY_OPTIONS = [
    {
        value: 'Easy',
        color: 'text-emerald-400 border-emerald-400/40 hover:border-emerald-400',
    },
    {
        value: 'Medium',
        color: 'text-amber-400  border-amber-400/40  hover:border-amber-400',
    },
    {
        value: 'Hard',
        color: 'text-rose-400   border-rose-400/40   hover:border-rose-400',
    },
];
const AUDIENCE_OPTIONS = ['Kids', 'Teens', 'Adults'];
function FieldLabel({ children }) {
    return ((0, jsx_runtime_1.jsx)("label", { className: "block mb-2 text-xs font-semibold tracking-[0.2em] uppercase text-amber-400/80", children: children }));
}
function ErrorMsg({ message }) {
    if (!message)
        return null;
    return ((0, jsx_runtime_1.jsxs)("p", { className: "mt-1.5 text-xs text-rose-400 flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "inline-block w-1 h-1 rounded-full bg-rose-400" }), message] }));
}
function CreateGameForm() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [submitted, setSubmitted] = (0, react_1.useState)(false);
    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting }, } = (0, react_hook_form_1.useForm)({
        defaultValues: {
            title: '',
            genre: 'Horror',
            difficulty: 'Medium',
            targetAudience: 'Teens',
            playerCount: 4,
        },
    });
    const selectedGenre = watch('genre');
    const selectedDifficulty = watch('difficulty');
    const selectedAudience = watch('targetAudience');
    const onSubmit = async (data) => {
        await new Promise((r) => setTimeout(r, 900));
        console.log('✅ Game created:', data);
        setSubmitted(true);
    };
    if (submitted) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-neutral-950 flex items-center justify-center p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center space-y-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-6xl", children: "\uD83D\uDD10" }), (0, jsx_runtime_1.jsx)("h2", { className: "text-3xl text-amber-400 tracking-widest", style: { fontFamily: "'Cinzel', serif" }, children: "ROOM FORGED" }), (0, jsx_runtime_1.jsx)("p", { className: "text-neutral-400 text-sm font-mono", children: "Your escape room has been created." }), (0, jsx_runtime_1.jsx)("button", { onClick: () => navigate('/catalog'), className: "mt-4 px-8 py-3 bg-amber-400 text-neutral-950 text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-amber-300 transition-colors", children: "View Catalog" })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-neutral-950 relative flex items-center justify-center px-4 py-16 overflow-hidden", children: [(0, jsx_runtime_1.jsxs)("div", { className: "pointer-events-none absolute inset-0", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(251,191,36,0.06),transparent)]" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 opacity-[0.04]", style: {
                            backgroundImage: 'linear-gradient(rgba(251,191,36,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.3) 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        } }), (0, jsx_runtime_1.jsx)("div", { className: "absolute -top-32 -left-32 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-rose-900/10 blur-3xl" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative z-10 w-full max-w-2xl", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-10 text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "inline-flex items-center gap-2 mb-4 px-4 py-1.5 border border-amber-400/20 rounded-full bg-amber-400/5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-amber-400 text-xs", children: "\uD83D\uDD11" }), (0, jsx_runtime_1.jsx)("span", { className: "text-amber-400/60 text-xs font-mono tracking-widest uppercase", children: "Game Master Console" })] }), (0, jsx_runtime_1.jsxs)("h1", { className: "text-4xl md:text-5xl font-black tracking-tight text-white", style: {
                                    fontFamily: "'Cinzel', 'Georgia', serif",
                                    letterSpacing: '0.05em',
                                }, children: ["FORGE A NEW", (0, jsx_runtime_1.jsx)("span", { className: "block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500", children: "ESCAPE ROOM" })] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-3 text-neutral-500 text-sm font-mono", children: "Design the labyrinth. Set the trap." })] }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), noValidate: true, className: "relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/80 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" }), (0, jsx_runtime_1.jsxs)("div", { className: "p-8 md:p-10 space-y-8", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(FieldLabel, { children: "Room Title" }), (0, jsx_runtime_1.jsx)("input", { ...register('title', {
                                                    required: 'A title is required.',
                                                    minLength: { value: 3, message: 'At least 3 characters.' },
                                                    maxLength: { value: 80, message: 'Maximum 80 characters.' },
                                                }), type: "text", placeholder: "e.g. The Forgotten Asylum\u2026", className: "w-full bg-neutral-950/60 text-white placeholder-neutral-600 border border-neutral-700 rounded-lg px-4 py-3 text-sm font-mono outline-none transition-all duration-200 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/10 hover:border-neutral-600" }), (0, jsx_runtime_1.jsx)(ErrorMsg, { message: errors.title?.message })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(FieldLabel, { children: "Genre" }), (0, jsx_runtime_1.jsx)("input", { type: "hidden", ...register('genre', { required: true }) }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: GENRE_OPTIONS.map(({ value, label, icon }) => {
                                                    const active = selectedGenre === value;
                                                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => setValue('genre', value, { shouldValidate: true }), className: `relative flex flex-col items-center gap-2 py-4 rounded-lg border text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer select-none ${active ? 'border-amber-400/60 bg-amber-400/10 text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.12)]' : 'border-neutral-700 bg-neutral-900 text-neutral-500 hover:border-neutral-500 hover:text-neutral-300'}`, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: icon }), label, active && ((0, jsx_runtime_1.jsx)("span", { className: "absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" }))] }, value));
                                                }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(FieldLabel, { children: "Difficulty" }), (0, jsx_runtime_1.jsx)("input", { type: "hidden", ...register('difficulty', { required: true }) }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-3 gap-3", children: DIFFICULTY_OPTIONS.map(({ value, color }) => {
                                                    const active = selectedDifficulty === value;
                                                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setValue('difficulty', value, { shouldValidate: true }), className: `py-3 rounded-lg border text-xs font-bold tracking-[0.15em] uppercase transition-all duration-200 cursor-pointer select-none ${active ? `${color} bg-white/5` : `${color} bg-transparent opacity-50 hover:opacity-80`}`, children: value }, value));
                                                }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid sm:grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(FieldLabel, { children: "Target Audience" }), (0, jsx_runtime_1.jsx)("input", { type: "hidden", ...register('targetAudience', { required: true }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-2", children: AUDIENCE_OPTIONS.map((value) => {
                                                            const active = selectedAudience === value;
                                                            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => setValue('targetAudience', value, {
                                                                    shouldValidate: true,
                                                                }), className: `flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm font-mono transition-all duration-200 cursor-pointer select-none text-left ${active ? 'border-amber-400/50 bg-amber-400/8 text-amber-300' : 'border-neutral-700 bg-neutral-900 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300'}`, children: [(0, jsx_runtime_1.jsx)("span", { className: `w-2 h-2 rounded-full border transition-colors ${active ? 'bg-amber-400 border-amber-400' : 'border-neutral-600'}` }), value] }, value));
                                                        }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(FieldLabel, { children: "Player Count" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("input", { ...register('playerCount', {
                                                                    required: 'Required.',
                                                                    min: { value: 1, message: 'Minimum 1 player.' },
                                                                    max: { value: 20, message: 'Maximum 20 players.' },
                                                                    valueAsNumber: true,
                                                                }), type: "number", min: 1, max: 20, className: "w-full bg-neutral-950/60 text-white border border-neutral-700 rounded-lg px-4 py-3 text-3xl font-black text-center font-mono outline-none transition-all duration-200 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/10 hover:border-neutral-600 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute right-3 inset-y-0 flex flex-col justify-center gap-1", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                                                            const cur = watch('playerCount');
                                                                            if (cur < 20)
                                                                                setValue('playerCount', cur + 1);
                                                                        }, className: "text-neutral-500 hover:text-amber-400 transition-colors leading-none text-xs", children: "\u25B2" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                                                            const cur = watch('playerCount');
                                                                            if (cur > 1)
                                                                                setValue('playerCount', cur - 1);
                                                                        }, className: "text-neutral-500 hover:text-amber-400 transition-colors leading-none text-xs", children: "\u25BC" })] })] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-neutral-600 text-xs font-mono text-center", children: "1 \u2013 20 players" }), (0, jsx_runtime_1.jsx)(ErrorMsg, { message: errors.playerCount?.message })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "pt-2", children: (0, jsx_runtime_1.jsxs)("button", { type: "submit", disabled: isSubmitting, className: "relative w-full py-4 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 font-black text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:from-amber-400 hover:to-orange-400 hover:shadow-[0_0_40px_rgba(251,191,36,0.35)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group", children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" }), (0, jsx_runtime_1.jsx)("span", { className: "relative", children: isSubmitting ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center justify-center gap-2", children: [(0, jsx_runtime_1.jsxs)("svg", { className: "animate-spin h-4 w-4", viewBox: "0 0 24 24", fill: "none", children: [(0, jsx_runtime_1.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), (0, jsx_runtime_1.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8v8z" })] }), "FORGING\u2026"] })) : ('⚒ Forge the Room') })] }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" })] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-6 text-center text-neutral-700 text-xs font-mono", children: "Only Game Masters can forge rooms. Play wisely." })] })] }));
}

import { useState } from "react";

function EyeIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function EyeOffIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a20.3 20.3 0 015.06-5.94M9.9 4.24A10.94 10.94 0 0112 4c7 0 11 8 11 8a20.3 20.3 0 01-2.16 3.19M14.12 14.12a3 3 0 11-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    );
}

export default function Input({ type, required, value, onBlur, ...props }) {
    const [touched, setTouched] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    function handleBlur(e) {
        setTouched(true);
        if (onBlur) onBlur(e);
    }

    function toggleShowPassword() {
        setShowPassword(!showPassword);
    }

    const isPasswordField = type === "password";
    const isEmpty = !value;
    const showError = touched && required && isEmpty;
    const showValid = touched && required && !isEmpty;

    let borderClass = "border-slate-200 focus:border-amber-400 focus:ring-amber-100";
    if (showError) {
        borderClass = "border-red-400 focus:border-red-400 focus:ring-red-100";
    } else if (showValid) {
        borderClass = "border-emerald-400 focus:border-emerald-400 focus:ring-emerald-100";
    }

    return (
        <div>
            <div className="relative">
                <input
                    {...props}
                    type={isPasswordField && showPassword ? "text" : type}
                    required={required}
                    value={value}
                    onBlur={handleBlur}
                    className={`w-full rounded-2xl border-2 bg-white px-4 py-3 text-sm transition focus:ring-4 ${borderClass} ${isPasswordField ? "pr-11" : ""}`}
                />
                {isPasswordField && (
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        tabIndex={-1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                )}
            </div>
            {showError && <p className="mt-1 text-xs text-red-500">This field is required</p>}
        </div>
    );
}
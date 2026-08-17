
export default function Input({ props }){
    return (
        <input
            {...props}
            className="w-full rounded-xl border border-slate-200 bg-whte px-4 py-3 test-sm outline-none focus:border-amber-400 focus ring-4 focus:ring-amber-100"
        />
    )
}
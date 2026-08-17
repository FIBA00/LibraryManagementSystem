
export default function Input({ props }){
    return (
        <input
            {...props}
            className="w-full rounded-2xl  bg-white px-4 py-3 test-sm  focus:border-amber-400 focus ring-4 focus:ring-amber-100"
        />
    )
}
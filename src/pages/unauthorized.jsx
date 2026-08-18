import { Link } from "react-router-dom";


export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-red-600 text-2xl text-center">Unauthorized </h1>
            <Link to="/" className="text-2xl">Go Home Please</Link>
        </div>
    )
}
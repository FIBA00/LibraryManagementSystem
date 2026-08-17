import { useState } from "react";
import { useNavigate } from "react-router-dom";

// internal import
import { useLogin } from "../hooks/useAuth";
import { Input } from "../../../components/input.tsx";
import { Button } from "../../../components/button.tsx";

export function Login() {
	const nav = useNavigate();
	const login = useLogin();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		console.log("Requesting login: ", email, password);
		login.mutate({ email, password }, { onSuccess: () => nav("/reader") });
	}

	return (
		<form onSubmit={handleSubmit} className="mt-8 space-y-4">
			<Input
				required
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="you@example.com"
			/>
			<Input
				required
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="••••••••"
			/>
			{login.isError && (
				<p className="text-sm text-red-600">{login.error.message}</p>
			)}
			{/*<Button className="w-full" disabled={login.isPending}>
				{login.isPending ? "Signing in..." : "Sign in"}
			</Button>*/}t
			<Button
				type="button"
				className="w-w"
				onClick={() => alert("clicked")}>
				Sign in
			</Button>
		</form>
	);
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// internal imports
import Input from "../../../components/input.jsx";
import Button from "../../../components/button.jsx";
import { useLogin } from "../hooks/useAuth.js";

function LoginPage() {
	const nav = useNavigate();
	const login = useLogin();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleLoginSubmit(e) {
		e.preventDefault();
		console.log("Requesting login: ", email, password);
		login.mutate(
			{
				email,
				password,
			},
			{ onSuccess: () => nav("/reader") },
		);
	}
	return (
		<div>
			<form onSubmit={handleLoginSubmit} className="mt-8 space-y-4">
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
					placeholder="***********"
				/>

				{login.isError && (
					<p className="text-sm text-c-red">{login.error.message}</p>
				)}
				<Button disabled={login.isPending}>
					{login.isPending ? "Signing in..." : "Sign in"}
				</Button>

				<Button type="submit">Sign in</Button>
			</form>
		</div>
	);
}

export default LoginPage;

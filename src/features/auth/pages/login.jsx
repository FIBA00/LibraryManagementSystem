import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// internal imports
import Input from "../../../components/input.jsx";
import Button from "../../../components/button.jsx";
import Logo from "../../../components/logo.jsx";
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
		<div className="min-h-screen ">
			<div className="mx-auto flex min-h-screen max-w-7xl">
				<div className="hidden flex-1 flex-col justify-between p-10 lg:flex">
					<Logo />
					<div>
						<p className="font-bold text-amber-400">
							FROM SHELF TO READER
						</p>
						<h1 className="mt-4 max-w-xl text-5xl font-black">
							Every book. Every library. One place.
						</h1>
						<p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
							Discover books, manage collections and connect
							readers with libraries.
						</p>
					</div>
				</div>
				<div className="flex flex-1 items-center justify-center p-2 ">
					<div className="w-full max-w-md p-4 rounded-2xl border-4  border-c-orange">
						<h3 className="mt-4 max-w-xl">
							Please Login to Continue
						</h3>
						<form
							onSubmit={handleLoginSubmit}
							className="flex flex-col mt-8 space-y-4">
							<div>
								<label className="mb-2 block text-sm font-semibold">
									Email
								</label>
								<Input
									required
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="you@example.com"
								/>
							</div>

							<div>
								<label className="mb-2 block text-sm font-semibold">
									Password
								</label>
								<Input
									required
									type="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									placeholder="***********"
								/>
							</div>

							<div className="flex space-x-2 mt-4">
								<div className="flex-1 justify-items-center p-2">
									{login.isError && (
										<p className="text-sm text-c-red">
											{login.error.message}
										</p>
									)}
								</div>
								<Button disabled={login.isPending}>
									{login.isPending
										? "Signing in..."
										: "Sign in"}
								</Button>
							</div>
							<div>
								<p className="mt-2  text-sm text-slate-500">
									New here  ?{" "}
									{
										<Link
											className="font-bold text-amber-600"
											to="/register">
											Create Account
											</Link>
									}
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;

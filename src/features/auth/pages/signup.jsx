import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// internal imports
import Input from "../../../components/input.jsx";
import Logo from "../../../components/logo.jsx";
import Button from "../../../components/button.jsx";
import { useSignup } from "../hooks/useAuth.js";

// fix: SOMETHING IS WRONG WITH THIS FUNCTION , WHY WOULD I NEED BOOLEAN VALUE IT JUST SIGNUP , BAD DESIGN CHOICE !!!!
function SignupPage({ register = false }) {
    const nav = useNavigate();
    const signup = useSignup();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	function handleSignupForm(e) {
        e.preventDefault();
        console.log("Requesting signup: ")
        signup.mutate(
            {
                username, 
				email,
                password,
                confirmPassword
			},
			{ onSuccess: () => nav("/reader") },
        );
        
	}
	return (
		<div className="min-h-screen bg-c-bg">
			<div className="mx-auto flex min-h-screen max-w-7xl">
				<div className="hidden flex-1 flex-col justify-between bg-c-bg p-10 text-white lg:flex">
					<Logo />
					<div>
						<p className="font-bold text-c-orange">
							From shelf to reader
						</p>
						<h1 className="mt-4 max-w-xl text-5xl font-black">
							Every book. Every library. One place
						</h1>
						<p className="mt-6 max-w-xl text-lg leading-8 text-ink">
							Discover books, manage collections and connect
							readers with libraries
						</p>
					</div>
				</div>

				<div className="flex flex-1 items-center justify-center p-6">
					<div className="w-full max-w-md">
						<Logo />
						<h1 className="text-3xl font-black">
							{register ? "Create your account" : " Welcome back"}
						</h1>
						<p className="mt-2 text-slate-500">
							{register
								? "Join the reader network or start a library."
								: "Sign in to continue"}
						</p>
					</div>
				</div>

				<div>
					<form
						onSubmit={handleSignupForm}
						className="mt-8 space-y-4">
						{register && (
							<div>
								<label className="mb-2 block text-sm font-semibold">
									Full name
								</label>
								<Input
									required
									type="text"
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
									placeholder="Your name"
								/>
							</div>
						)}
						<div>
							<label className="mb-2 block text-sm font-sembibold">
								Email
							</label>
							<Input
								required
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="You@example.com"
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-sembibold">
								Password
							</label>
							<Input
								required
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								// TODO: add preview password eye
								placeholder="****************"
							/>
						</div>
						<div>
							<label className="mb-2 block text-sm font-sembibold">
								Confirm Password
							</label>
							<Input
								required
								type="password"
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
								// TODO: add preview password eye
								placeholder="****************"
							/>
						</div>

						<Button>
							{register ? "Create account " : "Sign in"}
						</Button>
					</form>

					<p>
						{register ? "Already have an account ? " : "New here ?"}
						<Link
							to={register ? "/login" : "/register"}
							className="font-bold text-c-orange">
							{register ? "Sign in" : "Create an account"}
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default SignupPage;

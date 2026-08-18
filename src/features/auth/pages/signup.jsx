import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"

import Input from "../../../components/input.jsx";
import Button from "../../../components/button.jsx";
import { useSignup } from "../hooks/useAuth.js";

function SignupPage() {
	const nav = useNavigate();
	const signup = useSignup();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	function handleSignupForm(e) {
		e.preventDefault();
		signup.mutate(
			{ username, email, password, confirmPassword },
			{
				onSuccess: function (data) {
					toast.success("Welcome back");
					nav(data.user.role === "owner" ? "/owner": "/reader");
				},
				onError: function (err) {
					toast.error(err.message || "Login failed")
				}
			},
		
		);
	}

	return (
		<div className="w-full max-w-md p-4 rounded-2xl border-4 border-c-orange">
			<h3 className="mt-4 max-w-xl">Create your account</h3>

			<form
				onSubmit={handleSignupForm}
				className="flex flex-col mt-8 space-y-4">
				<div>
					<label className="mb-2 block text-sm font-semibold">
						Full name
					</label>
					<Input
						required
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Your name"
					/>
				</div>

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
						onChange={(e) => setPassword(e.target.value)}
						placeholder="****************"
					/>
				</div>

				<div>
					<label className="mb-2 block text-sm font-semibold">
						Confirm Password
					</label>
					<Input
						required
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="****************"
					/>
				</div>

				<div className="flex space-x-2 mt-4">
					<div className="flex-1 justify-items-center p-2">
						{signup.isError && (
							<p className="text-sm text-c-red">
								{signup.error.message}
							</p>
						)}
					</div>
					<Button disabled={signup.isPending}>
						{signup.isPending
							? "Creating account..."
							: "Create account"}
					</Button>
				</div>

				<div>
					<p className="mt-2 text-sm text-slate-500">
						Already have an account?{" "}
						<Link className="font-bold text-amber-600" to="/login">
							Sign in
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
}

export default SignupPage;

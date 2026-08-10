import { Link, useNavigate } from "react-router-dom";

import { Logo } from "../../../components/logo.tsx";
import { Button } from "../../../components/button.tsx";
import { Input } from "../../../components/input.tsx";


export function Profile({ register = false }: { register?: boolean }) {
	const nav = useNavigate();

	return (
		<div className="min-h-screen bg-slate-50">
			<div className="mx-auto flex min-h-screen max-w-7xl">
				<div className="hidden flex-1 flex-col justify-between bg-[#17202a] p-10 text-white lg:flex">
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

				<div className="flex flex-1 items-center justify-center p-6">
					<div className="w-full max-w-md">
						<div className="mb-8 lg:hidden">
							<Logo />
						</div>
						<h1 className="text-3xl font-black">
							{register ? "Create your account" : "Welcome back"}
						</h1>
						<p className="mt-2 text-slate-500">
							{register
								? "Join the reader network or start a library."
								: "Sign in to continue."}
						</p>

						<form
							onSubmit={(e) => {
								e.preventDefault();
								nav(register ? "/reader" : "/reader");
							}}
							className="mt-8 space-y-4">
							{register && (
								<div>
									<label className="mb-2 block text-sm font-semibold">
										Full name
									</label>
									<Input required placeholder="Your name" />
								</div>
							)}
							<div>
								<label className="mb-2 block text-sm font-semibold">
									Email
								</label>
								<Input
									required
									type="email"
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
									placeholder="••••••••"
								/>
							</div>
							<Button className="w-full">
								{register ? "Create account" : "Sign in"}
							</Button>
						</form>

						<p className="mt-6 text-center text-sm text-slate-500">
							{register
								? "Already have an account?"
								: "New here?"}{" "}
							<Link
								className="font-bold text-amber-600"
								to={register ? "/login" : "/register"}>
								{register ? "Sign in" : "Create an account"}
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

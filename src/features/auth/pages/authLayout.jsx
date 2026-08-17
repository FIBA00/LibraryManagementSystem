import { Outlet } from "react-router-dom";
import Logo from "../../../components/logo.jsx";

function AuthLayout() {
	return (
		<div className="min-h-screen">
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
						<p className="mt-6 max-w-xl text-lg leading-8">
							Discover books, manage collections and connect
							readers with libraries.
						</p>
					</div>
				</div>

				<div className="flex flex-1 items-center justify-center p-2">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default AuthLayout;

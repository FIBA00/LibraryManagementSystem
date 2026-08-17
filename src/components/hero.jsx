<<<<<<< HEAD

export default function Hero() {
    return (
        <div>
            <h1>Read or manage </h1>
        </div>
    )
}
=======
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./button.jsx";

export default function Hero() {
	return (
		<section className="bg-slate-800 text-white">
			<div>
				<div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8 lg:py-28">
					<div>
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-amber-300">
							<Sparkles size={14} />A Better way to find and run
							libraries
						</div>

						<h1 className="text-5xl font-black tracing-tight sm:text-6xl">
							Every book. Every library.{" "}
							<span className="text-amber-400">One Place</span>
						</h1>

						<p>
							Discover books, check availability, and connect with
							libraries. Library owners get the tools to manage
							collections, members and ciculation
						</p>
						<div className="mt-4 space-x-4">
							<Link to="/books">
								<Button>
									Find a book <ArrowRight size={17} />
								</Button>
							</Link>
							<Link to="/forlibraries">
								<Button>For libraries</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
>>>>>>> a0a8e0c (- refactor: updated the entire frontend to use the jsx instead of the tsx)

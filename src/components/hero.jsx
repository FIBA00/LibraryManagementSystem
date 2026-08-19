import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./button.jsx";

export default function Hero() {
	return (
		<section className="bg-surface text-text border-b-2 border-border-strong backdrop-blur-2xl">
			<div>
				<div className="mx-auto grid max-w-7xl gap-12 px-5 py-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8 lg:py-28">
					<div>
						

						<h1 className="text-5xl font-black tracing-tight sm:text-6xl">
							Every book. Every library.{" "}
							<span className="text-accent">One Place</span>
						</h1>

						<p>
							Discover books, check availability, and connect with
							libraries. Library owners get the tools to manage
							collections, members and ciculation
						</p>
						<div className="flex gap-3 m-3">
							<Link to="/books">
								<Button>
									Find a book <ArrowRight size={17} />
								</Button>
							</Link>
							<Link to="/forlibraries">
								<Button>For libraries <ArrowRight size={17} /></Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

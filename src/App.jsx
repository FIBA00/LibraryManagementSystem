<<<<<<< HEAD
import { useState } from "react";
import "./App.css";
=======
import { Routes, Route } from "react-router-dom";
>>>>>>> a0a8e0c (- refactor: updated the entire frontend to use the jsx instead of the tsx)

//------------ internal imports----------------
// Pages
import Home from "./pages/home.jsx";
<<<<<<< HEAD

// compoenents

import NavBar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";

function App() {
	return (
		<>
			<NavBar />
			<section id="center">
				<h1>Library Management system</h1>
				<Home />
			</section>
			<Footer />
		</>
	);
}

export default App;
=======
import Books from "./pages/books.jsx";

// compoenents
import NavBar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";

export default function App() {
	return (
		<div>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/books" element={<Books />} />
			</Routes>
			<Footer />
		</div>
	);
}
>>>>>>> a0a8e0c (- refactor: updated the entire frontend to use the jsx instead of the tsx)

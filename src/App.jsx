import { Routes, Route } from "react-router-dom";

//------------ internal imports----------------
// Pages
import Home from "./pages/home.jsx";
import Books from "./pages/books.jsx";
import Libraries from "./pages/libraries.jsx"
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
				<Route path="/libraries" element={<Libraries />} />
			</Routes>
			<Footer />
		</div>
	);
}

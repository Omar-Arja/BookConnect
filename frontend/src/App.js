import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Auth/Login";
import SignUpPage from "./Pages/Auth/Signup";
import Home from "./Pages/Home/Home";

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/discover" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

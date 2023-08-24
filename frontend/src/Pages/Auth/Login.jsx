import "./style.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { sendRequest } from "../../config/request";

const LoginPage = () => {
	const navigate = useNavigate();
	const submitButton = useRef();

	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = data;

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		submitButton.current.disabled = true;
		submitButton.current.textContent = "Loading...";

		if (!email || !password) {
			submitButton.current.disabled = false;
			submitButton.current.textContent = "Fill all fields";
			setTimeout(() => {
				submitButton.current.textContent = "Log In";
			}, 2000);
			return;
		}

		try {
			const response = await sendRequest({
				method: "POST",
				route: "/auth/login",
				body: data,
			});

			if (response.status === "success") {
				submitButton.current.disabled = false;
				submitButton.current.textContent = "Success";
				console.log(response);

				localStorage.setItem(
					"access_token",
					response.token
				);

				setTimeout(() => {
                    submitButton.current.textContent = "Logging In...";
				}, 1000);

                setTimeout(() => {
                    navigate('/discover');
                }, 2000);
			}
		} catch (error) {
			console.log(error);
			submitButton.current.disabled = false;
			submitButton.current.textContent = "Failed";            
			setTimeout(() => {
				submitButton.current.textContent = "Log In";
			}, 2000);
		}
	};

	return (
		<div className="auth-container">
			<div className="auth-form">
				<h2>Book Connect</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="email"
						placeholder="Email"
						name="email"
						value={email}
						onChange={handleChange}
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={handleChange}
					/>
					<button
						type="submit"
						ref={submitButton}
						onClick={handleSubmit}
					>
						Log In
					</button>
				</form>
                <p className="auth-switch">
                    Don't have an account? <Link to="/signup"><span className="auth-switch-link">Sign Up</span></Link>
                </p>
			</div>
		</div>
	);
}

export default LoginPage;

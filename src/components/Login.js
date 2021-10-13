import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const Login = () => {
	useEffect(() => {
		document.title = 'Login - Drive Clone';
	}, []);

	const useStyles = makeStyles((theme) => ({
		margin: {
			margin: theme.spacing(1),
		},
	}));

	const classes = useStyles();

	// Form validation
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [isValidated, setIsValidated] = useState(false);
	const [isClicked, setIsclicked] = useState(false);
	const history = useHistory();

	const validateCreds = (e) => {
		e.preventDefault();

		// username regex
		const nameRegex = /^[a-z ,.'-]+$/i;

		// Password Regex
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

		if (nameRegex.test(name) && passwordRegex.test(password)) {
			setIsValidated(true);
			// Posting to the API
			e.preventDefault();
			postLogin(name, password);
		} else {
			setIsValidated(false);
		}
		setIsclicked(true);

		console.log(name, password);
		console.log(isValidated);
	};

	// POST REQUEST
	const postLogin = (name, password) => {
		const data = {
			username: name,
			password: password,
		};
		fetch('http://localhost:5000/login', {
			method: 'POST',
			withCredentials: true,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.success) {
					history.push('/');
				} else {
					setIsValidated(false);
					console.log('Hello');
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="login-container">
			<form className="login-form">
				<div className="form-header">
					<img
						className="form-logo"
						src={process.env.PUBLIC_URL + '/Static/google_drive.svg'}
						alt="Drive Logo"
					/>
					<h3 className="form-title">Login</h3>
				</div>
				<TextField
					id="outlined-full-width login-email"
					label="Username"
					style={{ margin: 8 }}
					{...(!isValidated && isClicked ? { error: 'true' } : {})}
					placeholder="Username"
					fullWidth
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
					autoComplete="off"
					variant="outlined"
					onChange={(e) => {
						setName(e.target.value);
						console.log(name);
					}}
				/>
				<TextField
					id="outlined-full-width login-password"
					type="password"
					label="Password"
					style={{ margin: 8 }}
					{...(!isValidated && isClicked ? { error: 'true' } : {})}
					placeholder="Password"
					fullWidth
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
					autoComplete="off"
					variant="outlined"
					onChange={(e) => {
						setPassword(e.target.value);
						console.log(password);
					}}
				/>

				<div className="links-div">
					<a
						href="https://duckduckgo.com/"
						className="forgot-password"
						target="_blank"
					>
						Forgot Password?
					</a>
					<a href="/register" className="forgot-password">
						Dont have an Account? Register Now.
					</a>
				</div>

				<Button
					type="submit"
					variant="contained"
					size="medium"
					color="primary"
					className={classes.margin}
					onClick={validateCreds}
				>
					Login
				</Button>
			</form>
		</div>
	);
};

export default Login;

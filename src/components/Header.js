import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';

function Header() {
	const useStyles = makeStyles((theme) => ({
		margin: {
			margin: 10,
		},
		avatar: {
			backgroundColor: 'red',
		},
	}));
	const history = useHistory();

	const handleLogout = () => {
		// Logout Post Request
		fetch('http://localhost:5000/login', {
			method: 'POST',
			withCredentials: true,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.sucess) {
					history.push('/login');
				} else {
					console.log('Hello');
				}
			})
			.catch((err) => console.log(err));
	};

	const classes = useStyles();
	return (
		<div className="header">
			<div className="logo">
				<img
					src={process.env.PUBLIC_URL + '/Static/google_drive.svg'}
					alt="Logo"
				/>
				<h1>Drive Clone</h1>
			</div>

			<div className="avatar">
				<Button
					type="submit"
					variant="contained"
					size="small"
					color="primary"
					className={classes.margin}
					// onClick={validateCreds}
				>
					Logout
				</Button>
				<Avatar className={classes.avatar}>SA</Avatar>
			</div>
		</div>
	);
}

export default Header;

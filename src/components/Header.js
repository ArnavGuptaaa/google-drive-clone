import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

function Header() {
	// Avatar Styles
	const useStyles = makeStyles({
		avatar: {
			backgroundColor: 'red',
		},
	});

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
				<a href="/logout">LOGOUT</a>
				<Avatar className={classes.avatar}>SA</Avatar>
			</div>
		</div>
	);
}

export default Header;

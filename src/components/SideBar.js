import { makeStyles } from '@material-ui/styles';
import GroupIcon from '@material-ui/icons/Group';
import ComputerIcon from '@material-ui/icons/Computer';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@mui/material/IconButton';

const SideBar = ({ sideBarOption, setSideBarOption }) => {
	// Button Styles
	const useStyles = makeStyles({
		btn: {
			color: '#5F6368',
		},
		uploadbtn: {
			color: '#2185FC',
			fontSize: '40px',
		},
	});

	const classes = useStyles();

	// Functions
	const handleClick = (option) => {
		setSideBarOption(option);
	};
	return (
		<div className="sidebar">
			<div className="upload-btn">
				<AddIcon className={classes.uploadbtn} />
				Upload
			</div>

			<ul className="sidebar-list">
				<li
					className="list-item"
					onClick={() => {
						handleClick(0);
					}}
				>
					<ComputerIcon className={classes.btn} fontSize="large" />
					<p className="list-text">My Drive</p>
				</li>
				<li
					className="list-item"
					onClick={() => {
						handleClick(1);
					}}
				>
					<GroupIcon className={classes.btn} fontSize="large" />
					<p className="list-text">Dev Team</p>
				</li>
			</ul>
		</div>
	);
};

export default SideBar;

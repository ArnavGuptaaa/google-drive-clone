import { makeStyles } from '@material-ui/styles';
import GroupIcon from '@material-ui/icons/Group';
import ComputerIcon from '@material-ui/icons/Computer';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TextField } from '@material-ui/core';
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	borderRadius: 5,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

const SideBar = ({ sideBarOption, setSideBarOption }) => {
	const [listActive1, setListActive1] = useState('list-item-active');
	const [listActive2, setListActive2] = useState('');
	const [open, setOpen] = useState(false);
	const [isFileUploaded, setIsFileUploaded] = useState(false);
	const [metaData, setMetaData] = useState({});

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
	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const handleClick = (option) => {
		setSideBarOption(option);
	};
	const handleUpload = () => {
		console.log('Upload Was Clicked');
	};

	return (
		<div className="sidebar">
			<div className="upload-btn" onClick={handleOpen}>
				<AddIcon className={classes.uploadbtn} />
				Upload
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className="upload-modal" sx={style}>
					{isFileUploaded ? (
						<div className="metaData">
							<p>File name : {metaData.fileName}</p>
							<p>Created : {metaData.createDate}</p>
							<p>Last modified : {metaData.lastModified}</p>
							<p>size : {metaData.fileSize} MB</p>
						</div>
					) : (
						<div className="metaData not-uploaded">
							<p>No files yet</p>
						</div>
					)}

					{isFileUploaded ? (
						<Button
							className="upload-button"
							variant="contained"
							component="label"
							onClick={handleUpload}
						>
							Upload
						</Button>
					) : (
						<Button variant="contained" component="label">
							Select File
							<input
								type="file"
								onChange={(e) => {
									setIsFileUploaded(true);

									setMetaData({
										fileName: e.target.files[0].name,
										createDate: new Date(
											e.target.files[0].lastModified
										).toDateString(),
										lastModified: new Date(
											e.target.files[0].lastModified
										).toDateString(),
										fileSize: e.target.files[0].size * Math.pow(10, -6),
									});
								}}
								hidden
							/>
						</Button>
					)}
				</Box>
			</Modal>
			<ul className="sidebar-list">
				<li
					className={`list-item ${listActive1}`}
					onClick={() => {
						handleClick(0);
						setListActive1('list-item-active');
						setListActive2('');
					}}
				>
					<ComputerIcon className={classes.btn} fontSize="large" />
					<p className="list-text">My Drive</p>
				</li>
				<li
					className={`list-item ${listActive2}`}
					onClick={() => {
						handleClick(1);
						setListActive2('list-item-active');
						setListActive1('');
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

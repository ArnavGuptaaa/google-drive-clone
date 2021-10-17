import { makeStyles } from '@material-ui/styles';
import GroupIcon from '@material-ui/icons/Group';
import ComputerIcon from '@material-ui/icons/Computer';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import {useHistory} from 'react-router-dom'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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

const SideBar = ({ sideBarOption, setSideBarOption, reRender, setReRender }) => {
	const [listActive1, setListActive1] = useState('list-item-active');
	const [listActive2, setListActive2] = useState('');
	const [open, setOpen] = useState(false);
	const [isFileUploaded, setIsFileUploaded] = useState(false);
	const [metaData, setMetaData] = useState({});
	const [file, setFile] = useState();

	const history = useHistory();
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
	const uploadMetaData = () => {
		const data = {
			metadata: {
				filename: metaData.fileName,
				createdate: metaData.createDate,
				lastmodified: metaData.lastModified,
				filesize: metaData.fileSize.toString(),
				type: metaData.type,
			},
		};
		console.log('metadata starts');
		fetch('http://localhost:5000/setMetaData', {
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
				if (data.success) {
					console.log('metadata here');
					console.log('status ' + data.success);

					reRender ? setReRender(0) : setReRender(1);
					setFile();
					setMetaData({});
					setIsFileUploaded(false);
				}
			})
			.catch((err) => console.log(err));
	};

	const uploadFile = (url) => {
		console.log(metaData.type);
		console.log('put : ' + metaData.fileName);
		fetch(url, {
			method: 'PUT',
			headers: {
				'x-ms-blob-type': 'BlockBlob',
				'Content-Type': metaData.type,
				redirect: 'follow',
			},
			body: file,
		})
			.then((res) => {
				console.log('PUT url is : ' + url);
				uploadMetaData(metaData);
				
			})
			.catch((err) => console.log(err));		
	};

	const handleUpload = (e) => {
		const data = {
			fileName: metaData.fileName,
		};

		console.log('post : ' + metaData.fileName);

		fetch('http://localhost:5000/getSASUrl', {
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
				console.log('Yay!', data);
				if (data.success) {
					console.log('url is : ' + data.url);
					uploadFile(data.url);
				}
			})
			.catch((err) => console.log(err));

		e.target.files = {};
		handleClose();
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
							{}
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
							onClick={(e) => {
								handleUpload(e);
							}}
						>
							Upload
						</Button>
					) : (
						<Button variant="contained" component="label">
							Select File
							<input
								type="file"
								onChange={(e) => {
									setMetaData({
										fileName: e.target.files[0].name,
										createDate: new Date(
											e.target.files[0].lastModified
										).toDateString(),
										lastModified: new Date(
											e.target.files[0].lastModified
										).toDateString(),
										fileSize: e.target.files[0].size * Math.pow(10, -6),
										type: e.target.files[0].type,
									});

									setFile(e.target.files[0]);
									setIsFileUploaded(true);
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

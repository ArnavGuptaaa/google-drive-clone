import { useState } from 'react';
import { TextField } from '@material-ui/core';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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


const Main = ({ metaData, reRender,  setReRender }) => {
	const [open, setOpen] = useState(false);
	const [newFileName, setNewFileName] = useState(metaData.filename);
	const [blobFile, setBlobFile] = useState();

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleDelete = () => {
		console.log(metaData.filename);
		const data = {
			filename: metaData.filename
		};
		console.log('metadata starts');
		fetch('http://localhost:5000/deleteBlob', {
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
					reRender ? setReRender(0) : setReRender(1);
					console.log('delete status ' + data.success);
				}
			})
			.catch((err) => console.log(err));
	}
	const handleRename = () => {
		
		const data = {
			filename: metaData.filename,
			metadata: {
				filename: newFileName,
				createdate: metaData.createdate,
				lastmodified: new Date(Date.now()).toDateString(),
				filesize: metaData.filesize,
				type: metaData.type,
			},
		};
		fetch('http://localhost:5000/renameBlob', {
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
					handleClose();
					reRender ? setReRender(0) : setReRender(1);
					
				}
			})
			.catch((err) => console.log(err));
	}
	
	const getFile = (url) =>{
		console.log('getFile starts');
		fetch(url, {
			method: 'GET',
			headers: {
				'x-ms-blob-type': 'BlockBlob',
				'Content-Type': metaData.type,
				redirect: 'follow',
			}
			
		}).then((res) => res.blob())	
		  .then((data)=>{
			  console.log(data);
				console.log(metaData.type)
				setBlobFile(new Blob([data.body], {
					type: metaData.type
				}));

				// setBlobFile(new File([blob], metaData.filename, {
  				// 	type: metaData.type,
				// }))
				console.log('after blob file creation');
				console.log(blobFile);
			})
			.then(()=>{
				// trigger download
				const a = document.createElement("a");
				a.style.display = "none";
				document.body.appendChild(a);

				a.href = URL.createObjectURL(blobFile);
				console.log('a.href');

				// Use download attribute to set set desired file name
				a.setAttribute("download", metaData.filename);

				// Trigger the download by simulating click
				a.click();
				console.log('a clicked');

				// Cleanup
				window.URL.revokeObjectURL(a.href);
				document.body.removeChild(a);
			})
			.catch((err) => console.log(err));	
	}

	const handleDownload = () => {

		const data = {
			filename: metaData.filename,
		};

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
					getFile(data.url);
				}
			})
			.catch((err) => console.log(err));
	}
	return (
		<div className="file">
			<div className="file-header">
				<InsertDriveFileIcon />
				<p className="file-name">{metaData.filename}</p>
				{/* <a href="https://ratneshjain.blob.core.windows.net/arnav/Sumedh.png?sv=2020-10-02&st=2021-10-17T10%3A08%3A24Z&se=2021-10-17T11%3A13%3A24Z&sr=b&sp=rcw&sig=u0rtC6dSy9Obytm%2BVC03YqaWTAjnJiqL8SxGmxYv8s8%3D" download> */}
					<IconButton onClick={handleDownload} >
						<DownloadIcon />
					</IconButton>
				{/* </a> */}


			</div>
			<div className="file-info">
				Created: {metaData.createdate} <br />
				Last Modified: {metaData.lastmodified} <br />
				File Size: {metaData.filesize} MB<br />
				<br />
			</div>

			<div className="file-footer">
				<IconButton onClick={handleDelete}>
					<DeleteIcon />
				</IconButton>
				<IconButton onClick={handleOpen}>
					<CreateIcon />
				</IconButton>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						<TextField
							required
							id="outlined-full-width"
							label="File Name"
							margin="normal"
							variant="outlined"
							fullWidth
							style={{ margin: 8 }}
							InputLabelProps={{
								shrink: true,
							}}
							defaultValue={metaData.filename}
							onChange={(e)=>{
								setNewFileName(e.target.value)
							}}
						/>
					</Typography>

					{/* SAVE / EDIT / UPDATE REQUEST */}
					<Button style={{ margin: 8 }} variant="contained" onClick={handleRename}>
						Save
					</Button>
				</Box>
			</Modal>
		</div>
	);
};
export default Main;

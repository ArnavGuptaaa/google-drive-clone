import { useState, useEffect } from 'react';

import File from './File';
import DevCard from './DevCard';
import { DevTeam } from './DevTeam';

require('dotenv').config();

const Main = ({ sideBarOption, reRender, setReRender }) => {
	// UseEffect
	useEffect(() => {
		getFiles();
	}, [reRender]);

	// State Variables
	const [files, setFiles] = useState();

	// Functions
	const getFiles = () => {
		fetch(`${process.env.REACT_APP_IP}/listBlobs`, {
			method: 'GET',
			withCredentials: true,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					if (data.blob_list.length > 0) {
						setFiles(data.blob_list);
					} else {
						setFiles();
					}
				}
			});
	};

	// Render main according to side bar option
	if (sideBarOption === 0) {
		return (
			<div className="main">
				{files ? (
					files.map((file, i) => (
						<File
							metaData={file.metadata}
							reRender={reRender}
							setReRender={setReRender}
							key={i}
						/>
					))
				) : (
					<div>
						<h1>
							Currently you haven't uploaded any files please upload one by
							clicking on the upload button.
						</h1>
					</div>
				)}
			</div>
		);
	} else {
		return (
			<div className="dev-team">
				{DevTeam.map((team) => (
					<DevCard team={team} key={team.id} />
				))}
			</div>
		);
	}
};
export default Main;

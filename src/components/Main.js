import { useState, useEffect } from 'react';
import File from './File';
import DevCard from './DevCard';
import { DevTeam } from './DevTeam';

const Main = ({ sideBarOption, reRender, setReRender }) => {
	const [files, setFiles] = useState();
	

	useEffect(() => {
		getFiles();
	}, [reRender]);

	const getFiles = () => {
		fetch('http://localhost:5000/listBlobs', {
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
					console.log(data.blob_list);

					if(!data.blob_list.length == 0){
						setFiles(data.blob_list);
						console.log('new files were set!');
					}
				}
			});
	};

	if (sideBarOption === 0) {
		return (
			<div className="main">
				{files ? (
					files.map((file, i) => <File metaData={file.metadata} reRender={reRender} setReRender={setReRender} key={i} />)
				) : (
					<div >   
						<h1>Currently you haven't uploaded any files please upload one by clicking on the upload button.</h1>
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

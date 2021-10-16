import { useState, useEffect } from 'react';
import File from './File';
import DevCard from './DevCard';
import { DevTeam } from './DevTeam';

const Main = ({ sideBarOption }) => {
	const [files, setFiles] = useState([]);

	useEffect(() => {
		getFiles();
	}, []);

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
					setFiles(data.blob_list);
				}
			});
	};

	if (sideBarOption === 0) {
		return (
			<div className="main">
				{files ? (
					files.map((file, i) => <File metaData={file.metadata} key={i} />)
				) : (
					<>
						<h1>LOL</h1>
					</>
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

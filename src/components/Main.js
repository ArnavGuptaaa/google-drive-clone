import { useEffect, useState } from 'react';
import File from './File';
import DevCard from './DevCard';
import { DevTeam } from './DevTeam';

const Main = ({ sideBarOption }) => {
	useEffect(() => {
		document.title = 'Drive Clone';
	}, []);

	const [metaData, setMetaData] = useState({
		fileName: 'FILE 1',
		createDate: '2020-01-01',
		lastModified: '2020-01-01',
		fileSize: '1.00 KB',
	});

	if (sideBarOption === 0) {
		return (
			<div className="main">
				{[1, 2, 3, 4].map((i) => (
					<File metaData={metaData} />
				))}
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

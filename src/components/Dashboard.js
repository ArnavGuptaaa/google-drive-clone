import Header from './Header';
import SideBar from './SideBar';
import Main from './Main';
import { useState } from 'react';

const Dashboard = () => {
	const [sideBarOption, setSideBarOption] = useState(0);

	return (
		<div className="dashboard-container">
			{/* Header */}
			<Header />
			<div className="main-flex">
				{/* Side Bar */}
				<SideBar setSideBarOption={setSideBarOption} />
				{/* Main */}
				<Main sideBarOption={sideBarOption} />
			</div>
		</div>
	);
};

export default Dashboard;

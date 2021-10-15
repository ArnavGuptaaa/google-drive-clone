import Header from './Header';
import SideBar from './SideBar';
import Main from './Main';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const Dashboard = () => {
	const [userName, setUserName] = useState('');
	const [sideBarOption, setSideBarOption] = useState(0);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const history = useHistory();

	useEffect(() => {
		document.title = 'Drive Clone';
		console.log('useEffect Ran');

		// get request with fetch
		fetch('http://localhost:5000/is-logged', {
			method: 'GET',
			withCredentials: true,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (!data.success) {
					setIsLoggedIn(false);
					history.push('/login');
				} else {
					setIsLoggedIn(true);
					setUserName(data.user);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	if (isLoggedIn)
		return (
			<div className="dashboard-container">
				{/* Header */}
				<Header userName={userName} setIsLoggedIn={setIsLoggedIn} />
				<div className="main-flex">
					{/* Side Bar */}
					<SideBar setSideBarOption={setSideBarOption} />
					{/* Main */}
					<Main sideBarOption={sideBarOption} />
				</div>
			</div>
		);
	else
		return (
			<>
				<h1>Checking Credentials...</h1>
			</>
		);
};

export default Dashboard;

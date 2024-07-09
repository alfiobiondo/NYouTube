import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import './_app.scss';

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import CategoriesBar from './components/categoriesBar/CategoriesBar';
import Video from './components/video/Video';
import HomeScreen from './screens/homeScreen/HomeScreen';
import LoginScreen from './screens/loginScreen/LoginScreen';

const App = () => {
	const [sidebar, toggleSidebar] = useState(false);

	const handleToggleSidebar = () => toggleSidebar((value) => !value);

	return (
		// <>
		// 	<Header handleToggleSidebar={handleToggleSidebar} />
		// 	<section className='app__container'>
		// 		<Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
		// 		<Container fluid className='app__main'>
		// 			<HomeScreen />
		// 		</Container>
		// 	</section>
		// </>
		<LoginScreen />
	);
};

export default App;

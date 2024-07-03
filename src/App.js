import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import './_app.scss';

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import CategoriesBar from './components/categoriesBar/CategoriesBar';
import Video from './components/video/Video';
import HomeScreen from './screens/homeScreen/HomeScreen';

const App = () => {
	const [sidebar, toggleSidebar] = useState(false);

	const handleToggleSidebar = () => toggleSidebar((value) => !value);

	return (
		<>
			<Header handleToggleSidebar={handleToggleSidebar} />
			<section className='app__container border border-info'>
				<Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
				<Container fluid className='app__main border border-warning'>
					<HomeScreen />
				</Container>
			</section>
		</>
	);
};

export default App;

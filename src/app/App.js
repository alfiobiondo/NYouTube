import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import './_app.scss';

import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import LoginScreen from '../screens/loginScreen/LoginScreen';

import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
} from 'react-router-dom';

const Layout = ({ children }) => {
	const [sidebar, toggleSidebar] = useState(false);

	const handleToggleSidebar = () => toggleSidebar((value) => !value);

	return (
		<>
			<Header handleToggleSidebar={handleToggleSidebar} />
			<section className='app__container'>
				<Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
				<Container fluid className='app__main'>
					{children}
				</Container>
			</section>
		</>
	);
};

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				path='/'
				element={
					<Layout>
						<HomeScreen />
					</Layout>
				}
			/>
			<Route
				path='/auth'
				element={
					<>
						<LoginScreen />
					</>
				}
			/>
			<Route
				path='/search'
				element={
					<Layout>
						<h1>Search</h1>
					</Layout>
				}
			/>
			<Route path='*' element={<Navigate to='/' />} />
		</>
	)
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;

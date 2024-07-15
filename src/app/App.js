import React from 'react';

import HomeScreen from '../screens/homeScreen/HomeScreen';
import LoginScreen from '../screens/loginScreen/LoginScreen';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';

import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
} from 'react-router-dom';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				path='/'
				element={
					<ProtectedRoute>
						<Layout>
							<HomeScreen />
						</Layout>
					</ProtectedRoute>
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
					<ProtectedRoute>
						<Layout>
							<h1>Search</h1>
						</Layout>
					</ProtectedRoute>
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

import React from 'react';

import HomeScreen from '../screens/homeScreen/HomeScreen';
import LoginScreen from '../screens/loginScreen/LoginScreen';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';
import WatchScreen from '../screens/watchScreen/WatchScreen';
import SearchScreen from '../screens/searchScreen/SearchScreen';
import SubscriptionsScreen from '../screens/subscriptionsScreen/SubscriptionsScreen';
import ChannelScreen from '../screens/channelScreen/channelScreen';
import ReactionsScreen from '../screens/reactionsScreen/ReactionsScreen';

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
			<Route path='/auth' element={<LoginScreen />} />
			{/* <Route
				path='/search'
				element={
					<ProtectedRoute>
						<Layout>
							<h1>Search</h1>
						</Layout>
					</ProtectedRoute>
				}
			/> */}
			<Route
				path='/search/:query'
				element={
					<ProtectedRoute>
						<Layout>
							<SearchScreen />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/watch/:id'
				element={
					<ProtectedRoute>
						<Layout>
							<WatchScreen />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/feed/subscriptions'
				element={
					<ProtectedRoute>
						<Layout>
							<SubscriptionsScreen />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/channel/:channelId'
				element={
					<ProtectedRoute>
						<Layout>
							<ChannelScreen />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/videos/liked'
				element={
					<ProtectedRoute>
						<Layout>
							<ReactionsScreen />
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

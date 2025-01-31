import React from 'react';
import './_sidebar.scss';

import {
	MdSubscriptions,
	MdExitToApp,
	MdThumbUp,
	MdHome,
} from 'react-icons/md';

import { logout } from '../../features/auth/authSlice';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

const Sidebar = ({ sidebar, handleToggleSidebar }) => {
	const dispatch = useDispatch();

	return (
		<nav
			className={sidebar ? 'sidebar open' : 'sidebar'}
			onClick={() => handleToggleSidebar(false)}
		>
			<Link to='/'>
				<li>
					<MdHome size={23} />
					<span>Home</span>
				</li>
			</Link>
			<Link to='/feed/subscriptions'>
				<li>
					<MdSubscriptions size={23} />
					<span>Subscriptions</span>
				</li>
			</Link>
			<Link to='/videos/liked'>
				<li>
					<MdThumbUp size={23} />
					<span>Liked Video</span>
				</li>
			</Link>

			<hr />

			<li className='logout'>
				<MdExitToApp size={23} onClick={() => dispatch(logout())} />
				<span onClick={() => dispatch(logout())}>Log Out</span>
			</li>

			<hr />
		</nav>
	);
};

export default Sidebar;

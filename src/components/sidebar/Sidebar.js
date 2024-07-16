import React from 'react';
import './_sidebar.scss';

import {
	MdSubscriptions,
	MdExitToApp,
	MdThumbUp,
	MdHistory,
	MdLibraryBooks,
	MdHome,
	MdSentimentDissatisfied,
} from 'react-icons/md';

import { logout } from '../../features/auth/authSlice';

import { useDispatch } from 'react-redux';

const Sidebar = ({ sidebar, handleToggleSidebar }) => {
	const dispatch = useDispatch();

	return (
		<nav
			className={sidebar ? 'sidebar open' : 'sidebar'}
			onClick={() => handleToggleSidebar(false)}
		>
			<li>
				<MdHome size={23} />
				<span>Home</span>
			</li>
			<li>
				<MdSubscriptions size={23} />
				<span>Subscription</span>
			</li>
			<li>
				<MdThumbUp size={23} />
				<span>Liked Video</span>
			</li>
			<li>
				<MdHistory size={23} />
				<span>History</span>
			</li>
			<li>
				<MdLibraryBooks size={23} />
				<span>Library</span>
			</li>
			<li>
				<MdSentimentDissatisfied size={23} />
				<span>I don't Know</span>
			</li>

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

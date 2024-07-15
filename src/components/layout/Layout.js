import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

import './_layout.scss';

const Layout = ({ children }) => {
	const [sidebar, toggleSidebar] = useState(false);

	const handleToggleSidebar = () => toggleSidebar((value) => !value);

	return (
		<>
			<Header handleToggleSidebar={handleToggleSidebar} />
			<section className='layout__container'>
				<Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
				<Container fluid className='layout__main'>
					{children}
				</Container>
			</section>
		</>
	);
};

export default Layout;

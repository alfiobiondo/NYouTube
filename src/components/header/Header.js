import React, { useState } from 'react';
import './_header.scss';

import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdNotifications, MdApps } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = ({ handleToggleSidebar }) => {
	const [input, setInput] = useState('');

	const { photoURL } = useSelector((state) => state.auth?.user);

	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		navigate(`/search/${input}`);
	};

	return (
		<header className='header'>
			<FaBars
				className='header__menu'
				size={26}
				onClick={() => handleToggleSidebar()}
			/>
			<img
				className='header__logo'
				src='http://pngimg.com/uploads/youtube/youtube_PNG2.png'
				alt=''
			/>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Search'
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button type='submit'>
					<AiOutlineSearch size={22} />
				</button>
			</form>

			<section className='header__icons'>
				<MdNotifications size={28} />
				<MdApps size={28} />
				<img src={photoURL} alt='avatar' />
			</section>
		</header>
	);
};

export default Header;

import React from 'react';
import './_header.scss';

import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdNotifications, MdApps } from 'react-icons/md';

const Header = ({ handleToggleSidebar }) => {
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
			<form>
				<input type='text' placeholder='Search' />
				<button type='submit'>
					<AiOutlineSearch size={22} />
				</button>
			</form>

			<section className='header__icons'>
				<MdNotifications size={28} />
				<MdApps size={28} />
				<img
					src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
					alt='avatar'
				/>
			</section>
		</header>
	);
};

export default Header;

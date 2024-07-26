import React from 'react';
import moment from 'moment';
import './_comment.scss';

const Comment = () => {
	return (
		<section className='comment p-2 d-flex'>
			<img
				src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
				alt=''
				className='rounded-circle me-3'
			/>
			<section className='comment__body'>
				<p className='comment__header mb-1'>
					{' '}
					Alfio Biondo • {moment('2024-07-26').fromNow()}
				</p>
				<p className='mb-0'>Nice Video DUDE!!!</p>
			</section>
		</section>
	);
};

export default Comment;

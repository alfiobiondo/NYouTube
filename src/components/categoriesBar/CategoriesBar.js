import React, { useState } from 'react';
import './_categoriesBar.scss';

import { useDispatch } from 'react-redux';

import {
	getVideosByCategory,
	setCategory,
} from '../../features/videos/homeVideosSlice';

const keywords = [
	'All',
	'React js',
	'Angular js',
	'React Native',
	'use of API',
	'Redux',
	'Music',
	'Algorithm',
	'Data Structure',
	'Guitar',
	'Snowboard',
	'Climbing',
	'Hiking',
	'UX Design',
	'Figma',
];

const CategoriesBar = () => {
	const [activeElement, setActiveElement] = useState('All');

	const dispatch = useDispatch();

	const handleClick = (value) => {
		console.log(
			`Clicked on ${value}, active element is ${activeElement}, fetching videos from category ${value}`
		);
		setActiveElement(value);
		dispatch(setCategory(value));
		dispatch(getVideosByCategory(value));
	};

	return (
		<section className='categoriesBar'>
			{keywords.map((value, i) => (
				<span
					onClick={() => handleClick(value)}
					key={i}
					className={activeElement === value ? 'active' : ''}
				>
					{value}
				</span>
			))}
		</section>
	);
};

export default CategoriesBar;

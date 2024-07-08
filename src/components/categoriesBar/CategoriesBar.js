import React, { useState } from 'react';
import './_categoriesBar.scss';

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

	const handleClick = (value) => {
		setActiveElement(value);
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

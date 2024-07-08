import React from 'react';
import './_video.scss';

import { AiFillEye } from 'react-icons/ai';

const Video = () => {
	return (
		<section className='video'>
			<section className='video__top'>
				<img
					src='https://i.ytimg.com/vi/tL8wVb_c3AE/hqdefault.jpg?s…AFwAcABBg==&rs=AOn4CLAxI8ogiTZawR-fpL3cnSnIydPpug'
					alt=''
				/>
				<span>03:00</span>
			</section>
			<section className='video__title'>
				Living Through Palanzano #made by Alfio
			</section>
			<section className='video__details'>
				<span>
					<AiFillEye /> 383 Views · 12 years ago
				</span>
			</section>
			<section className='video__channel'>
				<img
					src='https://yt3.ggpht.com/ytc/AIdro_kTEDv60zMpXGwcTPDWE0ktYRQdqzsmBL2M86sFDflC2Z8=s48-c-k-c0x00ffffff-no-rj'
					alt=''
				/>
				<p>Alfio Biondo</p>
			</section>
		</section>
	);
};

export default Video;

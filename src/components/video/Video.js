import React, { useEffect, useState } from 'react';
import './_video.scss';

import { AiFillEye } from 'react-icons/ai';
import request from '../../api';

import moment from 'moment';
import numeral from 'numeral';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useNavigate } from 'react-router-dom';

const Video = ({ video, channelScreen }) => {
	const {
		id,
		snippet: {
			channelId,
			channelTitle,
			title,
			publishedAt,
			thumbnails: { medium },
		},
		contentDetails,
	} = video;

	const [views, setViews] = useState(null);
	const [duration, setDuration] = useState(null);
	const [channelIcon, setChannelIcon] = useState(null);

	const seconds = moment.duration(duration).asSeconds();
	const _duration = moment.utc(seconds * 1000).format('mm:ss');

	const _videoId = id?.videoId || contentDetails?.videoId || id;

	const navigate = useNavigate();

	useEffect(() => {
		const get_video_details = async () => {
			console.log('Fetching video details');
			try {
				const {
					data: { items },
				} = await request.get('/videos', {
					params: {
						part: 'contentDetails,statistics',
						id: _videoId,
					},
				});
				setDuration(items[0].contentDetails.duration);
				setViews(items[0].statistics.viewCount);
			} catch (error) {
				console.error('Error fetching video details:', error);
			}
		};
		get_video_details();
	}, [_videoId]);

	useEffect(() => {
		const get_channel_icon = async () => {
			console.log('Fetching channel icons');
			try {
				const {
					data: { items },
				} = await request.get('/channels', {
					params: {
						part: 'snippet',
						id: channelId,
					},
				});
				setChannelIcon(items[0].snippet.thumbnails.default);
			} catch (error) {
				console.error('Error fetching video details:', error);
			}
		};
		get_channel_icon();
	}, [channelId]);

	const handleVideoClick = () => {
		navigate(`/watch/${_videoId}`);
	};

	return (
		<section className='video' onClick={handleVideoClick}>
			<section className='video__top'>
				{/* <img src={medium.url} alt={title} /> */}
				<LazyLoadImage src={medium.url} effect='blur' />
				<span className='video__top__duration'>{_duration}</span>
			</section>
			<section className='video__title'>{title}</section>
			<section className='video__details'>
				<span>
					<AiFillEye /> {numeral(views).format('0.a')} Views ·
				</span>
				<span>{moment(publishedAt).fromNow()}</span>
			</section>
			<section className='video__channel'>
				{/* <img src={channelIcon?.url} alt={channelTitle} /> */}
				<LazyLoadImage src={channelIcon?.url} effect='blur' />
				<p>{channelTitle}</p>
			</section>
		</section>
	);
};

export default Video;

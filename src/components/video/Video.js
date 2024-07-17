import React, { useEffect, useState } from 'react';
import './_video.scss';

import { AiFillEye } from 'react-icons/ai';
import request from '../../api';

import moment from 'moment';
import numeral from 'numeral';

const Video = ({ video }) => {
	const {
		id,
		snippet: {
			channelId,
			channelTitle,
			title,
			publishedAt,
			thumbnails: { medium },
		},
	} = video;

	useEffect(() => {
		const get_video_details = async () => {
			try {
				const {
					data: { items },
				} = await request.get('/videos', {
					params: {
						part: 'contentDetails,statistics',
						id: id,
					},
				});
				setDuration(items[0].contentDetails.duration);
				setViews(items[0].statistics.viewCount);
			} catch (error) {
				console.error('Error fetching video details:', error);
			}
		};
		get_video_details();
	}, [id]);

	useEffect(() => {
		const get_channel_icon = async () => {
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

	const [views, setViews] = useState(null);
	const [duration, setDuration] = useState(null);
	const [channelIcon, setChannelIcon] = useState(null);

	const seconds = moment.duration(duration).asSeconds();
	const _duration = moment.utc(seconds * 1000).format('mm:ss');

	return (
		<section className='video'>
			<section className='video__top'>
				<img src={medium.url} alt={title} />
				<span>{_duration}</span>
			</section>
			<section className='video__title'>{title}</section>
			<section className='video__details'>
				<span>
					<AiFillEye /> {numeral(views).format('0.a')} Views ·
				</span>
				<span>{moment(publishedAt).fromNow()}</span>
			</section>
			<section className='video__channel'>
				<img src={channelIcon?.url} alt={channelTitle} />
				<p>{channelTitle}</p>
			</section>
		</section>
	);
};

export default Video;

import React, { useEffect, useState } from 'react';
import './_videoHorizontal.scss';

import { AiFillEye } from 'react-icons/ai';
import request from '../../api';

import moment from 'moment';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Col, Row } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

const VideoHorizontal = ({
	video,
	searchScreen,
	subScreen,
	reactionsScreen,
}) => {
	const {
		id,
		snippet: {
			channelId,
			channelTitle,
			description,
			title,
			publishedAt,
			thumbnails: { medium },
			resourceId,
		},
	} = video;

	const isVideo = !(id.kind === 'youtube#channel' || subScreen);

	const [views, setViews] = useState(null);
	const [duration, setDuration] = useState(null);
	const [channelIcon, setChannelIcon] = useState(null);

	const navigate = useNavigate();

	const _videoId = id?.videoId || id;

	useEffect(() => {
		const get_video_details = async () => {
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
		if (isVideo) get_video_details();
	}, [_videoId, isVideo]);

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

	const seconds = moment.duration(duration).asSeconds();
	const _duration = moment.utc(seconds * 1000).format('mm:ss');

	const _channelId = resourceId?.channelId || channelId;

	const handleClick = () => {
		isVideo
			? navigate(`/watch/${_videoId}`)
			: navigate(`/channel/${_channelId}`);
	};

	const thumbnail = !isVideo && 'videoHorizontal__thumbnail-channel';

	return (
		<Row
			className='py-2 m-1 videoHorizontal align-items-center'
			onClick={handleClick}
		>
			<Col
				xs={6}
				md={searchScreen || subScreen || reactionsScreen ? 4 : 6}
				className='videoHorizontal__left'
			>
				<LazyLoadImage
					src={medium.url}
					effect='blur'
					className={`videoHorizontal__thumbnail ${thumbnail} `}
					wrapperClassName='videoHorizontal__thumbnail-wrapper'
				/>
				{isVideo && (
					<span className='videoHorizontal__duration'>{_duration}</span>
				)}
			</Col>
			<Col
				xs={6}
				md={searchScreen || subScreen || reactionsScreen ? 8 : 6}
				className='p-0 videoHorizontal__right'
			>
				<p className='mb-1 videoHorizontal__title'>{title}</p>
				{isVideo && (
					<section className='videoHorizontal__details'>
						<AiFillEye /> {numeral(views).format('0.a')} Views •
						{moment(publishedAt).fromNow()}
					</section>
				)}

				{(searchScreen || subScreen || reactionsScreen) && (
					<p className='mt-1 videoHorizontal__desc'>{description}</p>
				)}

				<section className='my-1 videoHorizontal__channel d-flex align-items-center'>
					{isVideo && <LazyLoadImage src={channelIcon?.url} effect='blur' />}
					<p className='mb-0'>{channelTitle}</p>
				</section>
				{subScreen && (
					<p className='mt-2'>{video.contentDetails.totalItemCount} Videos</p>
				)}
			</Col>
		</Row>
	);
};

export default VideoHorizontal;

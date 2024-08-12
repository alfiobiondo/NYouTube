import React, { useEffect, useState } from 'react';
import './_videoMetaData.scss';
import moment from 'moment';
import numeral from 'numeral';

import request from '../../api';

import {
	MdThumbUp,
	MdThumbDown,
	MdOutlineThumbUp,
	MdOutlineThumbDown,
} from 'react-icons/md';
import ShowMoreText from 'react-show-more-text';
import { useDispatch, useSelector } from 'react-redux';

import {
	checkSubscriptionStatus,
	getChannelDetails,
	subscribeToChannel,
	unsubscribeFromChannel,
} from '../../features/channels/channelsSlice';

import {
	likeVideo,
	dislikeVideo,
	removeRate,
} from '../../features/reactions/reactionsVideosSlice';
import HelmetCustom from '../helmet/HelmetCustom';

const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
	const { channelId, channelTitle, description, title, publishedAt } = snippet;
	const { viewCount, likeCount, dislikeCount } = statistics;

	const [rating, setRating] = useState(null);

	const id = videoId;

	const dispatch = useDispatch();

	const accessToken = useSelector((state) => state.auth.accessToken);

	const { snippet: channelSnippet, statistics: channelStatistics } =
		useSelector((state) => state.channelDetails.channel);

	const subscriptionStatus = useSelector(
		(state) => state.channelDetails.subscriptionStatus
	);

	const subscriptionId = useSelector(
		(state) => state.channelDetails.subscriptionId
	);

	useEffect(() => {
		dispatch(getChannelDetails(channelId));
		dispatch(checkSubscriptionStatus(channelId));
	}, [dispatch, channelId]);

	useEffect(() => {
		const getVideoRatings = async (id) => {
			try {
				const response = await request.get(`/videos/getRating?id=${id}`, {
					headers: {
						Authorization: `Bearer ${accessToken}`, // Use accessToken for authorization
					},
				});
				setRating(response.data.items[0].rating);
			} catch (error) {
				console.error('Error fetching video details:', error);
			}
		};
		getVideoRatings(id);
	}, [id, accessToken]);

	return (
		<section className='py-2 videoMetaData'>
			<HelmetCustom title={title} description={description} />
			<section className='videoMetaData__top'>
				<h5>{title}</h5>
				<section className='py-1 d-flex justify-content-between align-items-center'>
					<span>
						{numeral(viewCount).format('0.a')} Views •{' '}
						{moment(publishedAt).fromNow()}
					</span>

					<section>
						<span className='me-3'>
							{rating === 'like' ? (
								<MdThumbUp
									className='me-1'
									size={26}
									onClick={() => {
										dispatch(removeRate(id));
										setRating(null);
									}}
								/>
							) : (
								<MdOutlineThumbUp
									className='me-1'
									size={26}
									onClick={() => {
										dispatch(likeVideo(id));
										setRating('like');
									}}
								/>
							)}
							{numeral(likeCount).format('0.a')}
						</span>
						<span className='me-2'>
							{rating === 'dislike' ? (
								<MdThumbDown
									className='me-1'
									size={26}
									onClick={() => {
										dispatch(removeRate(id));
										setRating(null);
									}}
								/>
							) : (
								<MdOutlineThumbDown
									className='me-1'
									size={26}
									onClick={() => {
										dispatch(dislikeVideo(id));
										setRating('dislike');
									}}
								/>
							)}
							{numeral(dislikeCount).format('0.a')}
						</span>
					</section>
				</section>
			</section>
			<section className='py-3 my-2 videoMetaData__channel d-flex justify-content-between align-items-center'>
				<section className='d-flex'>
					<img
						src={channelSnippet?.thumbnails?.default?.url}
						alt=''
						className='me-3 rounded-circle'
					/>
					<section className='d-flex flex-column'>
						<span>{channelTitle}</span>
						<span>
							{' '}
							{numeral(channelStatistics?.subscriberCount).format('0.a')}{' '}
							Subscribers
						</span>
					</section>
				</section>

				<button
					onClick={() => {
						if (subscriptionStatus) {
							dispatch(unsubscribeFromChannel(subscriptionId));
						} else {
							dispatch(subscribeToChannel(channelId));
						}
					}}
					className={`p-2 m-2 border-0 btn ${subscriptionStatus && 'btn-gray'}`}
				>
					{subscriptionStatus ? 'Subscribed' : 'Subscribe'}
				</button>
			</section>
			<section className='videoMetaData__description'>
				<ShowMoreText
					less='SHOW LESS'
					anchorClass='showMoreText'
					expanded={false}
				>
					{description}
				</ShowMoreText>
			</section>
		</section>
	);
};

export default VideoMetaData;

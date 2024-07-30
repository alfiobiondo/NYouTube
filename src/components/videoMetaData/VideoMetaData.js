import React, { useEffect } from 'react';
import './_videoMetaData.scss';
import moment from 'moment';
import numeral from 'numeral';

import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import ShowMoreText from 'react-show-more-text';
import { useDispatch, useSelector } from 'react-redux';

import {
	checkSubscriptionStatus,
	getChannelDetails,
} from '../../features/channels/channelsSlice';
const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
	const { channelId, channelTitle, description, title, publishedAt } = snippet;
	const { viewCount, likeCount, dislikeCount } = statistics;

	const dispatch = useDispatch();

	const { snippet: channelSnippet, statistics: channelStatistics } =
		useSelector((state) => state.channelDetails.channel);

	const subscriptionStatus = useSelector(
		(state) => state.channelDetails.subscriptionStatus
	);

	useEffect(() => {
		dispatch(getChannelDetails(channelId));
		dispatch(checkSubscriptionStatus(channelId));
	}, [dispatch, channelId]);

	return (
		<section className='py-2 videoMetaData'>
			<section className='videoMetaData__top'>
				<h5>{title}</h5>
				<section className='py-1 d-flex justify-content-between align-items-center'>
					<span>
						{numeral(viewCount).format('0.a')} Views •{' '}
						{moment(publishedAt).fromNow()}
					</span>

					<section>
						<span className='me-3'>
							<MdThumbUp size={26} />
							{numeral(likeCount).format('0.a')}
						</span>
						<span className='me-3'>
							<MdThumbDown size={26} />
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

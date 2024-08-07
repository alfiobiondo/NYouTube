import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import { getSubscribedChannels } from '../../features/subscriptions/subscribedChannelsSlice';
import './_subscriptionsScreen.scss';

const SubscriptionsScreen = () => {
	const dispatch = useDispatch();

	const { videos, isLoading, nextPageToken } = useSelector(
		(state) => state.subscriptionsChannel
	);

	useEffect(() => {
		dispatch(getSubscribedChannels());
	}, [dispatch]);

	const fetchVideos = () => {
		//console.log('Fetching more videos');
		if (nextPageToken) {
			dispatch(getSubscribedChannels());
		}
	};

	return (
		<Container fluid>
			<InfiniteScroll
				dataLength={videos.length}
				next={fetchVideos}
				hasMore={!!nextPageToken}
				loader={
					<div className='spinner-border text-danger d-block mx-auto'></div>
				}
				className='row'
			>
				{isLoading && videos.length === 0
					? // Show skeletons if loading and no videos are loaded yet
						[...Array(20)].map((_, index) => (
							<SkeletonTheme color='#343a40' highlightColor='#3c4147'>
								<Skeleton width='100%' height='160px' count={20} />
							</SkeletonTheme>
						))
					: videos?.map((video) => (
							<VideoHorizontal video={video} key={video.id} subScreen />
						))}
			</InfiniteScroll>
		</Container>
	);
};

export default SubscriptionsScreen;

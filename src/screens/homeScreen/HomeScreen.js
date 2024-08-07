import React, { useEffect } from 'react';
import { Col, Container } from 'react-bootstrap';
import CategoriesBar from '../../components/categoriesBar/CategoriesBar';
import Video from '../../components/video/Video';
import { useDispatch, useSelector } from 'react-redux';
import {
	getPopularVideos,
	getVideosByCategory,
} from '../../features/videos/homeVideosSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonVideo from '../../components/skeletons/SkeletonVideo';

const HomeScreen = () => {
	const dispatch = useDispatch();

	const { videos, activeCategory, isLoading, nextPageToken } = useSelector(
		(state) => state.homeVideos
	);

	useEffect(() => {
		//console.log('Fetching initial videos');
		dispatch(getPopularVideos());
	}, [dispatch]);

	const fetchVideos = () => {
		console.log('Fetching more videos');
		if (nextPageToken) {
			if (activeCategory === 'All') {
				dispatch(getPopularVideos());
			} else {
				dispatch(getVideosByCategory(activeCategory));
			}
		}
	};

	return (
		<Container>
			<CategoriesBar />
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
							<Col lg={3} md={4} key={index}>
								<SkeletonVideo />
							</Col>
						))
					: videos.map((video, index) => (
							<Col
								lg={3}
								md={4}
								key={`${video.id.videoId || video.id}-${index}`}
							>
								<Video video={video} />
							</Col>
						))}
			</InfiniteScroll>
		</Container>
	);
};

export default HomeScreen;

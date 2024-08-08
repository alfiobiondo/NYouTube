import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	getVideosBySearch,
	resetVideos,
} from '../../features/videos/searchedVideoSlice';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import InfiniteScroll from 'react-infinite-scroll-component';

const SearchScreen = () => {
	const { query } = useParams();
	console.log(query);
	const dispatch = useDispatch();

	const { videos, isLoading, nextPageToken, keyword } = useSelector(
		(state) => state.searchedVideos
	);

	useEffect(() => {
		if (query !== keyword) {
			dispatch(resetVideos());
		}
		dispatch(getVideosBySearch(query));
	}, [query, dispatch, keyword]);

	const fetchVideos = () => {
		//console.log('Fetching more videos');
		if (nextPageToken) {
			dispatch(getVideosBySearch(query));
		}
	};

	return (
		<Container>
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
							<SkeletonTheme
								color='#343a40'
								highlightColor='#3c4147'
								key={index}
							>
								<Skeleton width='100%' height='160px' count={20} />
							</SkeletonTheme>
						))
					: videos?.map((video, index) => (
							<VideoHorizontal
								video={video}
								key={`${video.id.videoId}-${index}`}
								searchScreen
							/>
						))}
			</InfiniteScroll>
		</Container>
	);
};

export default SearchScreen;

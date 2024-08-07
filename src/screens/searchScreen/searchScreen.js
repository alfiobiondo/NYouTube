import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideosBySearch } from '../../features/videos/searchedVideoSlice';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SearchScreen = () => {
	const { query } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getVideosBySearch(query));
	}, [query, dispatch]);

	const { videos, isLoading } = useSelector((state) => state.searchedVideos);

	return (
		<Container>
			{isLoading ? (
				<SkeletonTheme color='#343a40' highlightColor='#3c4147'>
					<Skeleton width='100%' height='160px' count={20} />
				</SkeletonTheme>
			) : (
				videos?.map((video) => (
					<VideoHorizontal video={video} key={video.id.videoId} searchScreen />
				))
			)}
		</Container>
	);
};

export default SearchScreen;

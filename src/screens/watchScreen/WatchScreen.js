import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Comments from '../../components/comments/Comments';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import VideoMetaData from '../../components/videoMetaData/VideoMetaData';
import { getVideosById } from '../../features/videos/selectedVideoSlice';
import { getRelatedVideos } from '../../features/videos/relatedVideosSlice';
import './_watchScreen.scss';

const WatchScreen = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		console.log('Fetching videobyId');
		dispatch(getVideosById(id));
		dispatch(getRelatedVideos(id));
	}, [dispatch, id]);

	const { videos, isLoading: relatedVideosLoading } = useSelector(
		(state) => state.relatedVideo
	);
	const { video, isLoading } = useSelector((state) => state.selectedVideo);

	return (
		<Row>
			<Col lg={8}>
				<section className='watchScreen__player'>
					<iframe
						src={`https://www.youtube.com/embed/${id}`}
						frameBorder='0'
						title={video?.snippet?.title}
						allowFullScreen
						width='100%'
						height='100%'
					></iframe>
				</section>

				{!isLoading ? (
					<VideoMetaData video={video} videoId={id} />
				) : (
					<h6>Loading...</h6>
				)}

				<Comments
					videoId={id}
					totalComments={video?.statistics?.commentCount}
				/>
			</Col>
			<Col lg={4}>
				{!isLoading ? (
					videos
						?.filter((video) => video.snippet)
						.map((video) => (
							<VideoHorizontal video={video} key={video.id.videoId} />
						))
				) : (
					<SkeletonTheme color='#343a40' highlightColor='#3c4147'>
						<Skeleton width='100%' height='130px' count={15} />
					</SkeletonTheme>
				)}
			</Col>
		</Row>
	);
};

export default WatchScreen;

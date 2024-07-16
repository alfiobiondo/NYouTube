import React, { useEffect } from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import CategoriesBar from '../../components/categoriesBar/CategoriesBar';
import Video from '../../components/video/Video';

import { useDispatch } from 'react-redux';

import { getPopularVideos } from '../../features/videos/videosSlice';

const HomeScreen = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPopularVideos());
	}, [dispatch]);

	return (
		<Container>
			<CategoriesBar />
			<Row>
				{[...new Array(20)].map(() => (
					<Col lg={3} md={4}>
						<Video />
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default HomeScreen;

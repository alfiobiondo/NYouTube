import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonVideo = () => (
	<section style={{ width: '100%', margin: '1rem 0' }}>
		<SkeletonTheme color='#343a40' highlightColor='#3c4147'>
			<Skeleton height={180} />
			<section>
				<Skeleton style={{ margin: '0.5rem' }} circle height={40} width={40} />
				<Skeleton height={40} width='75%' />
			</section>
		</SkeletonTheme>
	</section>
);

export default SkeletonVideo;

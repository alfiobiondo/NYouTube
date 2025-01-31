import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addComment,
	getCommentsOfVideoById,
} from '../../features/comments/commentsSlice';
import Comment from '../comment/Comment';
import './_comments.scss';
const Comments = ({ videoId, totalComments }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCommentsOfVideoById(videoId));
	}, [videoId, dispatch]);

	const comments = useSelector((state) => state.commentList.comments);
	const { photoURL } = useSelector((state) => state.auth?.user);

	const [text, setText] = useState('');

	const _comments = comments?.map(
		(comment) => comment.snippet.topLevelComment.snippet
	);

	const handleComment = (e) => {
		e.preventDefault();
		if (text.length === 0) return;
		dispatch(addComment({ id: videoId, text }));
		setText('');
	};

	return (
		<section className='comments'>
			<p>{totalComments} Comments</p>
			<section className='my-2 comments__form d-flex w-100'>
				<img src={photoURL} alt='avatar' className='me-3 rounded-circle' />
				<form onSubmit={handleComment} className='d-flex flex-grow-1'>
					<input
						type='text'
						className='flex-grow-1'
						placeholder='Write a comment...'
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<button className='p-2 border-0'>Comment</button>
				</form>
			</section>
			<section className='comments__list'>
				{_comments?.map((comment, i) => (
					<Comment comment={comment} key={i} />
				))}
			</section>
		</section>
	);
};

export default Comments;

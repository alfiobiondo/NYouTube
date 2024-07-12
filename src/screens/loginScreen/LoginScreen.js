import React from 'react';
import './_loginScreen.scss';

import { useDispatch, useSelector } from 'react-redux';
import { googleLogin } from '../../features/auth/authSlice';

const LoginScreen = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const handleGoogleLogin = () => {
		dispatch(googleLogin());
	};

	return (
		<section className='login'>
			{auth.error && <p>{auth.error}</p>}
			<section className='login__container'>
				<img src='http://pngimg.com/uploads/youtube/youtube_PNG2.png' alt='' />
				<button onClick={handleGoogleLogin}>Login With Google</button>
				<p>This Project is made using YOUTUBE DATA API</p>
			</section>
		</section>
	);
};

export default LoginScreen;

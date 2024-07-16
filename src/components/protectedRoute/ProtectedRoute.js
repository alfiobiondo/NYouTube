import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
	const { accessToken } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (!accessToken) {
			navigate('/auth');
		}
	}, [accessToken, navigate]);

	return <>{children}</>;
};

export default ProtectedRoute;

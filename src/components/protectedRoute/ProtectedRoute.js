import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
	const { accessToken } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		if (!accessToken) {
			navigate('/auth');
		} else {
			setIsAuthenticated(true);
		}
	}, [accessToken, navigate]);

	if (!isAuthenticated) {
		return null; // Or you can show a loading spinner here
	}

	return <>{children}</>;
};

export default ProtectedRoute;

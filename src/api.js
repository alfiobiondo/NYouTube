import axios from 'axios';

const request = axios.request({
	baseURL: 'https://youtube.googleapis.com/youtube/v3/',
	params: {
		apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
	},
});

export default request;

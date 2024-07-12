import ReactDOM from 'react-dom/client';
import React from 'react';
import App from '../src/app/App';
import store from '../src/app/store';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import './_base.scss';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

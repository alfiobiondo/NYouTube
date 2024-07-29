import ReactDOM from 'react-dom/client';
import React from 'react';
import App from '../src/app/App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../src/app/store';

import 'react-lazy-load-image-component/src/effects/blur.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import './_base.scss';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
);

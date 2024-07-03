import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import './_base.scss';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<App />);

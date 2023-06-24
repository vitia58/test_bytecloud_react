import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './common/reportWebVitals';
import InsertPage from './pages/InsertPage';
import { Provider } from 'react-redux';
import store from './store/store';
import HomePage from './pages/Home';
import ProccessPage from './pages/ProcessPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/insert" element={<InsertPage />} />
          <Route path="/process" element={<ProccessPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

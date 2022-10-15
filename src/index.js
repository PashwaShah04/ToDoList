import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import Welcome from './components/Welcome'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginResponse from './components/LoginResponse';
import SignUpResponse from './components/SignUpResponse';
import App from './components/App';
import Tasks from './components/Tasks';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<Navigate to='/login' replace />} />
                <Route path='/' element={<Welcome />}>
                    <Route index element={<Navigate to='/login' replace />} />
                    <Route path='signup' element={<SignUpResponse />} />
                    <Route path='login' element={<LoginResponse />} />
                </Route>
                <Route path='todolist' element={<App />}>
                    <Route index element={<Tasks />} />
                    <Route path=':projectId' element={<Tasks />} />
                </Route>
            </Routes>
        </BrowserRouter>
        <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </div>
);



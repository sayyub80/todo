
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { initializeAuth } from '../../store/slices/authSlice';
import Header from './Header';
import LoginForm from '../auth/LoginForm';
import Dashboard from '../dashboard/Dashboard';

const MainLayout = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        {isAuthenticated ? <Dashboard /> : <LoginForm />}
      </main>
      <footer className="bg-background border-t py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          Advanced Todo App - Built with React, Redux, and TypeScript
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;

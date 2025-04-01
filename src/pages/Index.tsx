
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import MainLayout from '../components/layout/MainLayout';

const Index = () => {
  return (
    <Provider store={store}>
      <MainLayout />
    </Provider>
  );
};

export default Index;

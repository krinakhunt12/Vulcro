'use client';

import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { AuthProvider } from './auth/AuthContext';
import { ToastProvider } from './ToastProvider';
import store from '@/store/reduxStore';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <ReduxProvider store={store}>
          {children}
        </ReduxProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

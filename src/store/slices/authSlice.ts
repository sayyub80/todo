
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../index';

interface User {
  username: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
    },
    initializeAuth: (state) => {
      const userData = localStorage.getItem('user');
      if (state.isAuthenticated && userData) {
        state.user = JSON.parse(userData);
      }
    }
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, initializeAuth } = authSlice.actions;

// Simulated login thunk
export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(loginRequest());
  
  // Simulate API call with setTimeout
  setTimeout(() => {
    // Mock authentication logic
    if (username === 'demo' && password === 'password') {
      dispatch(loginSuccess({ username, name: 'Demo User' }));
    } else {
      dispatch(loginFailure('Invalid username or password'));
    }
  }, 1000);
};

export default authSlice.reducer;

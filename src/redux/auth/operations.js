import axios from 'axios';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://smart-foxes-backend-watertracker.onrender.com/api';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const signUp = createAsyncThunk('auth/signup', async (userData, thunkAPI) => {
  try {
    const response = await axios.post('/users/register', userData);
    token.set(response.data.token);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    Report.failure(message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const signIn = createAsyncThunk('auth/signin', async (userData, thunkAPI) => {
  try {
    const response = await axios.post('/users/login', userData);

    token.set(response.data.token);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    Report.failure(message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/users/logout');

    token.unset();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;
  if (!persistedToken) {
    return thunkAPI.rejectWithValue('Unable to fetch user');
  }
  try {
    token.set(persistedToken);
    const result = await axios.get('/users/current');
    return result.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const uploadAvatar = createAsyncThunk('auth/avatar', async (formData, thunkAPI) => {
  try {
    const {
      data: { avatarURL },
    } = await axios.patch('/users/avatars', formData);

    return avatarURL;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUserInfo = createAsyncThunk('auth/info', async (formData, thunkAPI) => {
  try {
    const response = await axios.patch('/users', formData);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateWaterRate = createAsyncThunk(
  'water-rate/editDailyNorma',
  async (data, thunkApi) => {
    const waterRate = data.toString() * 1000;
    try {
      console.log('Sending data to URL: /water-rate'); // Логируем URL
      console.log('Sending data:', { waterRate }); // Логируем данные перед отправкой
      const response = await axios.patch(`/water-rate`, { waterRate });
      console.log('Response:', response); // Логируем ответ сервера
      return response.data.waterRate;
    } catch (error) {
      if (error.response) {
        // Сервер вернул ответ с ошибкой
        console.error('Server responded with:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
        return thunkApi.rejectWithValue(error.response.data);
      } else {
        // Ошибка на стороне клиента
        console.error('Error during updateWaterRate:', error.message);
        return thunkApi.rejectWithValue(error.message);
      }
    }
  }
);

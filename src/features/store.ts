import { configureStore, Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import messagesReducer from './messagesSlice';
import authReducer, { initialState } from './authSlice';
import twitchReducer from './twichSlice';
import settingsReducer from './settingsSlice';

const authMiddleware: Middleware = (store) => (next) => (action) => {
	const result = next(action);
	if (action.type?.startsWith('auth/')) {
		const { token } = store.getState().auth;
		localStorage.setItem('auth', JSON.stringify({ token }));
	}
	return result;
};

const reHydrateStore = () => {
	const authData = localStorage.getItem('auth');
	if (authData) {
		const data = JSON.parse(authData);
		return { auth: { ...initialState, ...data } };
	}
	return {};
};

const store = configureStore({
	reducer: {
		messages: messagesReducer,
		auth: authReducer,
		twitch: twitchReducer,
		settings: settingsReducer,
	},
	preloadedState: reHydrateStore(),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(logger).concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

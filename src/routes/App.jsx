import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../container/Layout';
import Header from '../components/Header';
import '../scss/App.scss';
import Chat from '../components/Chat';
import { validateToken } from '../utils/Redux/authSlice';
import { getUserInfo } from '../utils/Redux/twichSlice';

const App = () => {
	const dispatch = useDispatch();
	const { token, isAuthenticated } = useSelector((state) => state.auth);
	const { displayName } = useSelector((state) => state.twitch);
	// client.connect().catch((err) => {
	// 	console.error(err);
	// });

	// client.on('message', (channel, tags, message, self) => {
	// 	// Ignore echoed messages.
	// 	if (self) {
	// 		return;
	// 	}
	// 	dispatch(messagesSlice.actions.addMessage({ tags, message }));
	// });

	// client.on(
	// 	'messagedeleted',
	// 	(channel, username, deletedMessage, userstate) => {
	// 		dispatch(messagesSlice.actions.deleteMessage({ userstate }));
	// 	}
	// );

	useEffect(() => {
		if (token) {
			dispatch(validateToken());
		}
	}, [token, dispatch]);

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(getUserInfo());
		}
	}, [isAuthenticated, dispatch]);

	return (
		<div className="App">
			<Layout>
				<Header />
				{isAuthenticated && displayName ? `Welcome ${displayName}` : null}
				<Chat />
			</Layout>
		</div>
	);
};

export default App;

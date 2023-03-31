import { Box, Typography } from '@material-ui/core';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import io from 'socket.io-client';
import { getAccessTokenFromLS } from '../../../services/token';

const username = 'User' + String(Math.ceil(Math.random() * 100));

export const ChatApp = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]); //array of message Objects
  const [feedback, setFeedback] = useState('');
  const [text, setText] = useState('');

  const handleAltMessage = ({ message }) => {
    setFeedback('');
    setMessages((s) => [...s, message]);
  };

  const handleAltTyping = ({ username }) => setFeedback(`${username} is typing a message...`);
  const handleAltTypingEnd = () => setFeedback('');

  useEffect(() => {
    const socket = io('http://localhost:3000', { auth: { token: getAccessTokenFromLS() } });

    socket.on('message', handleAltMessage);
    socket.on('typing', handleAltTyping);
    socket.on('typing_end', handleAltTypingEnd);

    setSocket(socket);

    return () => socket.disconnect();
  }, []);

  const handleKeypress = (e) => {
    if (e.code !== 'Enter') {
      socket.emit('typing', { username }); //need to find a way to indicate typing stopped. People seem to use `isTyping` Boolean flag + timeout before emitting typing-end event: https://stackoverflow.com/questions/16766488/socket-io-how-to-check-if-user-is-typing-and-broadcast-it-to-other-users
    }
  };

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    const message = { username, text };
    socket.emit('message', { message });
    setMessages((s) => [...s, message]);
    setText('');
  };

  return (
    <Box>
      {messages.map((m) => (
        <Typography>
          {m.username}: {m.text}
        </Typography>
      ))}
      {feedback && <Typography children={feedback} />}
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={handleChange} onKeyPress={handleKeypress} /* required */ />
      </form>
    </Box>
  );
};

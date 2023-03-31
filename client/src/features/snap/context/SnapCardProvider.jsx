import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { toggleSnapLike } from '../state';
import { snapContext } from './snap-context';

export const SnapCardProvider = ({ snap, children }) => {
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState(snap.isLiked); // 1
  const [likeCount, setLikeCount] = useState(snap.likeCount); // 1

  const toggleLike = async () => {
    const wasLiked = !isLiked;

    setIsLiked((prev) => !prev);
    setLikeCount((prev) => prev + (wasLiked ? 1 : -1));

    try {
      await dispatch(toggleSnapLike({ id: snap._id, wasLiked })).unwrap(); // 2
    } catch {
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => prev + (wasLiked ? -1 : +1));
    }
  };

  const commentInputRef = useRef();

  const contextValue = {
    ...snap,
    isLiked,
    likeCount,
    toggleLike,
    commentInputRef,
  };

  return <snapContext.Provider value={contextValue} children={children} />;
};

/*
1) required for optimistic updates (instant UX feedback)

2) dispatching it via Redux ensures that error <Snackbar> opens via middleware

3) pessimistic update code that relies solely on Redux store:

export const SnapCardProvider = ({ snap, children, watchSnap }) => {
  const dispatch = useDispatch();

  const toggleLike = () => {
    dispatch(toggleSnapLike({ id: snap._id, wasLiked: !snap.isLiked }))
  };

  const commentInputRef = useRef();

  const contextValue = {
    ...snap,
    toggleLike,
    commentInputRef,
  };

  return <snapContext value={contextValue} children={children} />;
};

Given pessimism, we'd probably need to display some <Loading> in the UI when
the like button is hit

*/

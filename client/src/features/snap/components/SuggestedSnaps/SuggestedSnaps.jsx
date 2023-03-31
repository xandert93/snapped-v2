import { useState } from 'react';
import { snapAPI } from '../../api';
import { useHTTP, useMountEffect } from '../../../../hooks';

import { SuggestedSnapListSkeleton } from './SuggestedSnapListSkeleton';
import { SuggestedSnapList } from './SuggestedSnapList';

export const SuggestedSnaps = () => {
  const [snaps, setSnaps] = useState([]);

  const [isFetching, errMessage, fetchSnaps] = useHTTP({
    request: snapAPI.getSuggested,
    onFetched: ({ snaps }) => setSnaps(snaps),
  });

  useMountEffect(fetchSnaps);

  if (isFetching) return <SuggestedSnapListSkeleton count={6} />;
  else return <SuggestedSnapList snaps={snaps} />;
};

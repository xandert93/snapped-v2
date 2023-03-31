import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CircularProgress, Divider } from '@material-ui/core';

import { snapAPI } from '../../features/snap/api';
import { SnapCardProvider } from '../../features/snap/context';
import { SnapCardHeader } from '../../features/snap/components/SnapCardHeader';
import { SnapCardMedia } from '../../features/snap/components/SnapCardMedia';
import { SnapCardTags } from '../../features/snap/components/SnapCardTags';
import { SnapCardActions } from '../../features/snap/components/SnapCardActions';
import { SnapCardCaption } from '../../features/snap/components/SnapCardCaption';
import { SnapCardCommentForm } from '../../features/snap/components/SnapCardCommentForm';
import { SnapCardFooter } from '../../features/snap/components/SnapCardFooter';
import { Main } from '../../components';

// all very rough and just copied and pasted stuff

export const SnapPage = () => {
  const { id } = useParams();

  const [snap, setSnap] = useState(null);

  const fetchSnap = async () => {
    const { snap } = await snapAPI.get(id);
    setSnap(snap);
  };

  useEffect(fetchSnap, []);

  if (!snap) return <CircularProgress />;
  else
    return (
      <Main disableGutters>
        <SnapCardProvider snap={snap}>
          <Card component="article" /* className={classes['feed-snap-card']} */ raised>
            <SnapCardHeader />
            <Divider />
            <SnapCardMedia />
            <SnapCardTags />
            <SnapCardActions />
            <SnapCardCaption />
            <SnapCardCommentForm />
            <SnapCardFooter />
          </Card>
        </SnapCardProvider>
      </Main>
    );

  // const [suggestedSnaps, setSuggestedSnaps] = useState([]);

  // const fetchSuggestedSnaps = async () => {
  //   const tagsStr = snap.tags.join(',');
  //   const snaps = await snapAPI.getBy({ tags: tagsStr });
  //   setSuggestedSnaps(snaps.filter((s) => s._id !== snap._id));
  // };

  // return snap ? (
  //   <>
  //     <FeedSnapCard snap={snap} />
  //     {!!suggestedSnaps.length && (
  //       <>
  //         <h4>You might also like:</h4>
  //         {!!suggestedSnaps.length &&
  //           suggestedSnaps.map((snap) => <SuggestedSnap key={snap._id} {...snap} />)}
  //       </>
  //     )}
  //   </>
  // ) : (
  //   <LoadingScreen />
  // );
};

const SuggestedSnap = ({ _id, location, creator }) => {
  const history = useHistory();
  const openPost = () => history.push(`/snap/${_id}`);

  return (
    <p onClick={openPost}>
      {location} by {creator.username}
    </p>
  );
};

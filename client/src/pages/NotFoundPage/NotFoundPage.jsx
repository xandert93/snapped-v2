import { useState, useEffect } from 'react';
import {} from '@material-ui/core';
import useStyles from './styles';
import { useLocation } from 'react-router-dom';
import { Link } from '../../components';
import { PATHS } from '../../constants/routing-constants';

export const NotFoundPage = (props) => {
  const classes = useStyles();

  const { state: { message } = { message: 'no message bro' } } = useLocation();

  useEffect(() => {}, []);

  return (
    <>
      <h1>Sorry, this page isn't available</h1>
      <h2>{message}</h2>
      <p> The link you followed may be broken, or the page may have been removed.</p>
      <Link to={PATHS.HOME} children="Go back to Snapped!" />
    </>
  );
};

{
  /* <main className="not-found-page grid">
  <div
    style={{
      gridColumn: 'center-start / center-end',
      textAlign: 'center',
      padding: '0 2rem',
    }}>
    <h1 className="heading-1">Sorry, this page isn't available.</h1>
    <h3 className="heading-3 font-medium">
     {' '}
      <Link to="/" className="link">
        Go back to Instaclone.
      </Link>
    </h3>
  </div>
</main>; */
}

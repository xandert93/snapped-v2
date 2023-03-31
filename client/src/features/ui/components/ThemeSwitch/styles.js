import { makeStyles } from '@material-ui/core';

export default ({ isDarkMode: dark }) =>
  makeStyles((theme) => ({
    'theme-switch': {
      position: 'relative',
      zIndex: 1,
      width: theme.spacing(7),
      height: theme.spacing(3.5),
      backgroundImage: `linear-gradient(75deg, ${
        dark ? 'midnightblue, rebeccapurple' : 'rgb(42, 145, 255), skyblue'
      })`,
      borderRadius: theme.shape.borderRadius * 5,
      padding: 2,
      cursor: 'pointer',
    },

    'theme-toggle': {
      height: '100%',
      width: '50%',
      borderRadius: '50%',
      backgroundColor: dark ? 'whiteSmoke' : 'gold',
      boxShadow: `0 0 3px ${dark ? 'whitesmoke' : 'rgb(99, 84, 0)'}`,
      transition: 'all 0.3s ease',
      transform: dark && 'translateX(100%)',

      '& .moon-crater': {
        backgroundColor: 'burlywood',
        borderRadius: '50%',
        position: 'absolute',
        opacity: dark ? 0.35 : 0,
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.4) inset',
        top: 4,
        height: 4,

        '&:first-child': {
          left: 1,
          width: '0.65rem',
          transform: 'rotate(-45deg)',
        },

        '&:last-child': {
          right: 3,
          width: 6,
          transform: 'rotate(45deg)',
        },
      },
    },

    'theme-switch-shapes': {
      '& > *': {
        position: 'absolute',
        backgroundColor: dark ? 'lightgray' : 'whitesmoke',
        borderRadius: '50%',
        boxShadow: dark && '0 0 2px 0.5px violet',
        transition: 'all 0.3s ease',
        opacity: dark ? 1 : 0.75,
      },

      '& .shape-sm': {
        height: dark ? 1 : 2,
        width: dark ? 1 : '1rem',
        top: ' 50%',
        left: '60%',
        transform: dark && 'translateX(-1rem)',

        '&:first-of-type': {
          transform: dark && 'translate(-1.5rem, -1.5px)',
        },
      },

      '& .shape-md': {
        height: dark ? 2.5 : 3,
        width: dark ? 2.5 : '1.5rem',
        top: '25%',
        left: '25%',
        zIndex: -1,
        transform: dark && 'translateX(20%)',
      },

      '& .shape-lg': {
        height: 4,
        width: dark ? 4 : '2rem',
        bottom: '20%',
        left: '27%',
        transform: dark && 'translateX(-5px)',
      },
    },
  }));

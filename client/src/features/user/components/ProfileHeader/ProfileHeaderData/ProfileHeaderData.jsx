import { Box, Link, Typography } from '@material-ui/core';
import {
  BioIcon,
  BirthdayIcon,
  GenderIcon,
  LocationIcon,
  WebsiteIcon,
} from '../../../../../components';
import { genAgeStr } from '../../../../../utils/formatters/date-formatters';
import useStyles from './styles';

// almost certain to be a more programmatic way of doing this, but CBA...
export const ProfileHeaderData = ({ data }) => {
  const { dob, location, pronouns, bio, websiteURL } = data;

  const classes = useStyles();
  return (
    <Box className={classes['profile-data']}>
      {dob && (
        <Typography variant="body2">
          <BirthdayIcon />
          {genAgeStr(new Date(dob))}
        </Typography>
      )}
      {location && (
        <Typography variant="body2">
          <LocationIcon />
          {location}
        </Typography>
      )}
      {pronouns && (
        <Typography variant="body2">
          <GenderIcon />
          {pronouns}
        </Typography>
      )}
      {bio && (
        <Typography variant="body2">
          <BioIcon />
          {bio}
        </Typography>
      )}
      {websiteURL && (
        <Typography variant="body2">
          <WebsiteIcon />
          <Link href={websiteURL}>{websiteURL}</Link>
        </Typography>
      )}
    </Box>
  );
};

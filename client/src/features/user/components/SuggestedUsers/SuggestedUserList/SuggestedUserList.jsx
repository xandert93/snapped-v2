import { Box, CardHeader, Fade } from '@material-ui/core';
import { UserPreviewCard } from '../../UserPreviewCard/UserPreviewCard';

import useStyles from './styles';

export const SuggestedUserList = ({ users }) => {
  return (
    <Fade in timeout={800}>
      <Box>
        <CardHeader
          title="Suggested for You 🤝"
          titleTypographyProps={{ variant: 'h6', component: 'h2', style: { fontWeight: 'bold' } }}
        />
        <Box>
          {users.map((user) => (
            <UserPreviewCard key={user._id} {...user} />
          ))}
        </Box>
      </Box>
    </Fade>
  );
};

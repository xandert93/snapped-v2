import { CardContent, Chip } from '@material-ui/core';
import { Link } from '../../../../components';

import { buildExplorePath } from '../../../../utils/routing-utils';
import { useSnap } from '../../context';

import useStyles from './styles';

export const SnapCardTags = () => {
  const { tags } = useSnap();
  const classes = useStyles();

  const hasTags = Boolean(tags.length);

  return (
    hasTags && (
      <CardContent className={classes['card-tags-box']}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            color="secondary"
            size="small"
            label={`#${tag}`}
            clickable
            component={Link}
            to={buildExplorePath(tag)}
          />
        ))}
      </CardContent>
    )
  );
};

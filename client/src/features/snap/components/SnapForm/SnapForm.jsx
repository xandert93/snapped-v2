import { useState, useEffect } from 'react';
import useStyles from './styles';

import { Box, Grid, MenuItem } from '@material-ui/core';
import { Lock, Public } from '@material-ui/icons';
import { isEqual as areEqual } from 'lodash';

import { useDispatch } from 'react-redux';

import ChipInput from 'material-ui-chip-input';

import { Input, GridForm } from '../../../../components';
import { validateHashtag } from '../../../../utils/validators/string-validators';
import { formatTags } from '../../../../utils/formatters/string-formatters';

import { closeDialog } from '../../../ui/state/ui-slice';
import { Select } from '../../../../components/Inputs';
import { SnapMediaCarousel } from '../SnapMediaCarousel';

const iconStyles = { fontSize: 20, marginLeft: 8, verticalAlign: -4 };
const visibilities = [
  {
    label: (
      <>
        Public
        <Public style={iconStyles} />
      </>
    ),
    value: true,
  },
  {
    label: (
      <em>
        Private
        <Lock style={iconStyles} />
      </em>
    ),
    value: false,
  },
];

export const SnapForm = (props) => {
  const { hasErr, setHasErr, setIsClean } = props;
  const { previewURLs, initialBody, onSubmit: submitHandler } = props;

  const dispatch = useDispatch();
  const [body, setBody] = useState(initialBody);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBody((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const isClean = areEqual(body, initialBody);
    setIsClean(isClean);
  }, [body]);

  const handleSubmit = () => {
    const snapBody = { ...body, tags: formatTags(body.tags) };
    submitHandler(snapBody);
    dispatch(closeDialog());
  };

  const showIndicators = previewURLs.length > 1;

  const classes = useStyles();
  return (
    <GridForm id="snap-form" onSubmit={handleSubmit} justify="center">
      <Grid item xs={12}>
        <SnapMediaCarousel indicators={showIndicators}>
          {previewURLs.map((url, index) => (
            <img key={index} className={classes['snap-media']} src={url} alt="Image Preview" />
          ))}
        </SnapMediaCarousel>
      </Grid>

      <Input
        label={`Where ${previewURLs.length === 1 ? 'was this' : 'were these'} taken?`}
        name="location"
        value={body.location}
        onChange={handleInputChange}
      />

      <Input
        label="Create a caption!"
        name="caption"
        value={body.caption}
        onChange={handleInputChange}
        multiline
        rows={3}
      />

      <TagInput
        setBody={setBody}
        setHasErr={setHasErr}
        variant="outlined"
        fullWidth
        label="Give it some tags!"
        name="tags"
        value={body.tags}
        helperText={!hasErr ? null : 'You cannot include special characters'}
        FormHelperTextProps={{ className: classes['tag-input-helper-text'] }}
      />

      <Select
        label="Choose post visibility:"
        name="isPublic"
        value={body.isPublic}
        onChange={handleInputChange}
        helperText="Public posts are visible to all users!">
        {visibilities.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </GridForm>
  );
};

const TagInput = ({ setBody, setHasErr, ...props }) => {
  const validateNewTag = (e) => {
    const tag = e.target.value; // value is the tag that's currently being typed in
    const isValid = validateHashtag(tag);
    setHasErr(!isValid);
  };

  const handleTagSubmit = (tag) => {
    setBody((prev) => {
      const tags = [...prev.tags, tag];
      return { ...prev, tags };
    });
  };

  const handleTagRemove = (tagToDelete) => {
    setBody((prev) => {
      const tags = prev.tags.filter((tag) => tag !== tagToDelete);
      return { ...prev, tags };
    });
  };

  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <ChipInput
        {...props}
        newChipKeyCodes={[32]}
        onUpdateInput={validateNewTag}
        onAdd={handleTagSubmit}
        onDelete={handleTagRemove}
      />
    </Grid>
  );
};

//OLD CAPTIONS Input:

/*   const existingDescription = post?.description && {
    ...post.description,
    tags: post.tags.join(', '),
  }; */

/* <Input
     required={false}
     label="Give it some tags!"
     name="tags"
     value={tags}
     onChange={(e) => {
       handleInputChange(e);
       setAreTagsValid(/[^#\w, ]/.test(e.target.value));
     }}
     error={!areTagsValid}
     helperText={
       !areTagsValid ? 'You cannot include any special characters.' : null
     }
     multiline
     rows={2}
/> */

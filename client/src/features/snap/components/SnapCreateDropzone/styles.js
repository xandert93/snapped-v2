import { makeStyles } from '@material-ui/core';

export default ({ isDragged }) => {
  const useStyles = makeStyles(({ palette, spacing, shape }) => {
    const paperColor = palette.background.paper;

    const [color1, color2] = !isDragged
      ? [palette.secondary.main, palette.primary.main]
      : [palette.primary.main, palette.success.main];

    return {
      dropzone: {
        borderRadius: shape.borderRadius * 5,
        padding: spacing(5),
        border: '3px dashed',
        borderColor: !isDragged ? paperColor : 'transparent',
        backgroundImage: `linear-gradient(${paperColor}, ${paperColor}), linear-gradient(135deg, ${color1}, ${color2})`,
        backgroundOrigin: 'border-box', //*padding-box
        backgroundClip: 'padding-box, border-box', //clip first background as normal, but one behind to border box (i.e. leave just the border)
      },

      '@keyframes throb': {
        from: { fill: color1, transform: 'initial' },
        to: { fill: color2, transform: 'scale(1.2)' },
      },
      'dropzone-icon': {
        animation: isDragged && '$throb .8s infinite alternate',
      },
    };
  });

  const styles = useStyles();
  return styles;
};

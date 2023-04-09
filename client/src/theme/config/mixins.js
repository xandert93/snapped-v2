export const mixins = {
  absCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  absCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  gradientColor: (color1, color2) => ({
    backgroundImage: `linear-gradient(135deg, ${color1}, ${color2})`,
    color: 'transparent',
    '-webkit-background-clip': 'text',
  }),
};

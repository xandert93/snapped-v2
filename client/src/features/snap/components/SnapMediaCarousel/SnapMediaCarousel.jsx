import Carousel from 'react-material-ui-carousel';

export const SnapMediaCarousel = (props) => {
  return (
    <Carousel
      autoPlay={false}
      indicators={false}
      cycleNavigation={false}
      animation="fade"
      swipe
      {...props}
    />
  );
};

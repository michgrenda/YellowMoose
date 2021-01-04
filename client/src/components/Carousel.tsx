import React from "react";
// Carousel
import ReactMultiCarousel, {
  CarouselProps as ReactMultiCarouselProps,
  ArrowProps,
} from "react-multi-carousel";
// Icons
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
// Types
import { FileType } from "../types";

const responsive = {
  extraLarge: {
    breakpoint: { max: Infinity, min: 1200 },
    items: 1,
  },
  large: {
    breakpoint: { max: 1200, min: 992 },
    items: 1,
  },
  medium: {
    breakpoint: { max: 992, min: 768 },
    items: 1,
  },
  small: {
    breakpoint: { max: 768, min: 576 },
    items: 1,
  },
  extraSmall: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
  },
};

const CustomLeftArrow = ({ onClick }: ArrowProps) => {
  return (
    <button
      className="carousel__button carousel__button--left"
      onClick={onClick}
    >
      <ArrowBackIosRoundedIcon className="carousel__icon" />
    </button>
  );
};

const CustomRightArrow = ({ onClick }: ArrowProps) => {
  return (
    <button
      className="carousel__button carousel__button--right"
      onClick={onClick}
    >
      <ArrowForwardIosRoundedIcon className="carousel__icon" />
    </button>
  );
};

// Props
interface ICarouselProps {
  images: FileType[];
  children?: any;
}

type Props = ICarouselProps & Omit<ReactMultiCarouselProps, "children">;

const defaultProps = {
  responsive,
};

const Carousel = ({ images, infinite, children, ...rest }: Props) => {
  // Variables
  const imageGroup = images.map((image) => (
    <div
      className={`carousel__image-wrapper ${
        rest.centerMode && "carousel__image-wrapper--center-mode"
      }`}
    >
      <img
        className="carousel__image"
        src={image.preview}
        alt={image.name}
        draggable={false}
        onDragStart={() => false}
        style={{ transform: `rotateZ(${image.rotation}deg)` }}
      />
    </div>
  ));

  const infiniteFlag = infinite && imageGroup.length > 1;

  return (
    <ReactMultiCarousel
      {...rest}
      infinite={infiniteFlag}
      customRightArrow={<CustomRightArrow />}
      customLeftArrow={<CustomLeftArrow />}
    >
      {imageGroup}
    </ReactMultiCarousel>
  );
};

Carousel.defaultProps = defaultProps;

export default Carousel;

import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { ImageGalleryContainer } from "./imageGallery.styled";
import PropTypes from "prop-types";

const ImageGallery = ({ images, onClick }) => {
  return (
    <ImageGalleryContainer>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            src={webformatURL}
            alt={tags}
            largeimageurl={largeImageURL}
            onClick={() => onClick(largeImageURL)}
          />
        );
      })}
    </ImageGalleryContainer>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};
export default ImageGallery;

import { ImageItem, Image } from './ImageGalleryItaem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, alt, largeImageURL, onClick }) => {
    return (  <ImageItem  key={src}>
      <Image
        src={src}
        alt={alt}
        largeimageurl={largeImageURL}
        onClick={onClick}              
      />
    </ImageItem> );
}
 
ImageGalleryItem.propTypes = {
  
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default ImageGalleryItem;
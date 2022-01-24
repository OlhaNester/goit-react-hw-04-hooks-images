import { ButtonMore } from './Button.styled';
import PropTypes from 'prop-types';
;



const Button = ({ onClick }) => {
  return (
    <ButtonMore type="button" onClick={onClick}>
      Load More
    </ButtonMore>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}
export default Button;

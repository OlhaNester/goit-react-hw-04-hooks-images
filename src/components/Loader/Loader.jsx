
import { SpinnerCircular } from 'spinners-react';
import {LoaderContainer} from './Loader.styled';






const Loader = () => {
    return (<LoaderContainer><SpinnerCircular color="#00BFFF" size="50" speed="100" />
    </LoaderContainer>);
}
 
export default Loader;




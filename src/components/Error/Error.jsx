import errorImage from '../smile.jpg';
import { ErrorMessage } from './Error.styled';
import {PropTypes} from 'prop-types';


import React from 'react'
;

function Error({message}) {
    return (
        <ErrorMessage>
            <img src={errorImage} width="300" alt="smile" />
            <h1>{message}</h1>
        </ErrorMessage>
    )
}
Error.propTypes = {
    message: PropTypes.string,
}

export default Error

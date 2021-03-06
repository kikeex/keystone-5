/** @jsx jsx */

import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { AlertIcon, Container, H1 } from '../primitives';
import { Link } from '../../routes';

export default function Error({ message, title }) {
  return (
    <Container css={{ marginTop: '3rem', textAlign: 'center' }}>
      <AlertIcon size={48} />
      <H1>{title}</H1>
      <p>{message}</p>
      <Link route="/" passHref>
        <a css={{ color: 'inherit' }}>Go back home</a>
      </Link>
    </Container>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
Error.defaultProps = {
  message: 'Something went wrong. Please try again later.',
  title: 'Error',
};

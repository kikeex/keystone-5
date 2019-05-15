/** @jsx jsx */

import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';

import { Container } from '../primitives';
import { H1 } from '../primitives/Typography';
import { colors, fontSizes } from '../theme';

export const Hero = ({
  align,
  backgroundColor,
  children,
  subTitle,
  superTitle,
  title,
  ...props
}) => {
  const horizontalMargin = align === 'center' ? 'auto' : null;
  return (
    <>
      <Wrapper align={align} backgroundColor={backgroundColor} {...props}>
        <Container>
          {superTitle && <Subtitle>{superTitle}</Subtitle>}
          <H1>{title}</H1>
          {subTitle && <Subtitle>{subTitle}</Subtitle>}
          <Content horizontalMargin={horizontalMargin}>{children}</Content>
        </Container>
      </Wrapper>
      <svg
        css={{ height: '5vw', width: '100vw' }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon fill={backgroundColor} points="0, 100 0, 0 100, 0" />
      </svg>
    </>
  );
};

Hero.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
  subTitle: PropTypes.string,
  superTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};
Hero.defaultProps = {
  align: 'center',
  backgroundColor: colors.greyDark,
};

// styled components

const Wrapper = ({ align, backgroundColor, ...props }) => (
  <div
    css={{
      backgroundColor: backgroundColor,
      color: 'white',
      padding: '7rem 0',
      textAlign: align,
    }}
    {...props}
  />
);

const Content = ({ horizontalMargin, ...props }) => (
  <div
    css={{
      fontSize: fontSizes.md,
      marginLeft: horizontalMargin,
      marginRight: horizontalMargin,
      marginTop: 30,
      maxWidth: 720,
    }}
    {...props}
  />
);

const Subtitle = ({ horizontalMargin, ...props }) => (
  <div
    css={{
      fontSize: fontSizes.md,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    }}
    {...props}
  />
);
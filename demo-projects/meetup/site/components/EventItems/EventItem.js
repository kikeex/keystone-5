/** @jsx jsx */
import { jsx } from '@emotion/core';

import { Link } from '../../../routes';
import Rsvp from '../../components/Rsvp';
import { Html, Button, Loading } from '../../primitives';
import { H3 } from '../../primitives/Typography';
import { colors, gridSize, shadows } from '../../theme';
import { isInFuture, formatPastDate, formatFutureDate } from '../../helpers';
import { mq } from '../../helpers/media';

const EventItem = ({
  id,
  name,
  startTime,
  description,
  talks,
  themeColor,
  locationAddress,
  locationDescription,
  maxRsvps,
  ...props
}) => {
  const prettyDate = isInFuture(startTime)
    ? formatFutureDate(startTime)
    : formatPastDate(startTime);

  const hex = themeColor && themeColor.slice(1);

  return (
    <li {...props} css={mq({ width: ['100%', '50%', '50%', '33.33%'] })}>
      <div
        css={{
          backgroundColor: 'white',
          borderTop: `solid 8px ${themeColor || colors.greyLight}`,
          boxShadow: shadows.sm,
          margin: gridSize,
          padding: `${gridSize * 3}px ${gridSize * 3}px 0`,
          position: 'relative',
          transition: 'all 0.1s',

          '&:hover': {
            boxShadow: shadows.md,
            transform: 'translateY(-2px)',
          },
          '&:active': {
            boxShadow: shadows.sm,
            transform: 'none',
          },
        }}
      >
        <div css={{ maxHeight: 400, overflow: 'hidden' }}>
          <Link route="event" params={{ id, hex }} passHref>
            <a
              css={{
                color: 'inherit',
                textDecoration: 'none',

                ':hover h3': {
                  textDecoration: 'underline',
                },
              }}
            >
              <Mask />
              <span css={{ textTransform: 'uppercase', fontWeight: 600 }}>{prettyDate}</span>
              <H3
                size={4}
                css={{ wordWrap: 'break-word', lineHeight: '1.25', marginBottom: gridSize }}
              >
                {name}
              </H3>
              {locationDescription ? (
                <p css={{ margin: 0, opacity: isInFuture(startTime) ? 1 : 0.5 }}>
                  {locationDescription}
                </p>
              ) : null}
              <Html
                markup={description}
                css={{
                  a: {
                    color: 'inherit',
                    pointerEvents: 'none',
                    textDecoration: 'none',
                  },
                }}
              />
            </a>
          </Link>
          {isInFuture(startTime) ? (
            <Rsvp eventId={id}>
              {({ loading, error, isGoing, canRsvp, rsvpToEvent }) => {
                if (loading) return <Loading css={{ position: 'relative', zIndex: 2 }} />;
                if (error) return null;
                return (
                  <div
                    css={{
                      alignItems: 'center',
                      background: 'linear-gradient(rgba(255, 255, 255, 0), white 66%)',
                      bottom: 0,
                      boxSizing: 'border-box',
                      display: 'flex',
                      left: 0,
                      padding: gridSize * 3,
                      position: 'absolute',
                      right: 0,
                      zIndex: 20,
                    }}
                  >
                    <span css={{ padding: '0', flex: 1 }}>Attending?</span>
                    <Button
                      disabled={isGoing || !canRsvp}
                      background={isGoing ? themeColor : colors.greyLight}
                      foreground={isGoing ? 'white' : colors.greyDark}
                      css={{ marginLeft: '.5rem', padding: '.6rem 1.33rem' }}
                      onClick={() => rsvpToEvent('yes')}
                    >
                      yes
                    </Button>
                    <Button
                      disabled={!isGoing}
                      background={!isGoing ? themeColor : colors.greyLight}
                      foreground={!isGoing ? 'white' : colors.greyDark}
                      css={{ marginLeft: '.5rem', padding: '.6rem 1.33rem' }}
                      onClick={() => rsvpToEvent('no')}
                    >
                      no
                    </Button>
                  </div>
                );
              }}
            </Rsvp>
          ) : null}
        </div>
      </div>
    </li>
  );
};

// Styled Components
// ------------------------------

const Mask = props => (
  <div
    css={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      background: 'linear-gradient(rgba(255, 255, 255, 0), white 66%)',
      width: '100%',
      height: 100,
    }}
    {...props}
  />
);

export default EventItem;

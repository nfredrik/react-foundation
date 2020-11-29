import PropTypes from 'prop-types';

import {
  ErrorBoundary
} from './ErrorBoundary';

import {
  Card
} from './Card';

function CardList({ items }) {
  return items.map(({ title, image }, index) => (
    <ErrorBoundary key={index}>
      {error => (
        error
          ? <Card
              title="Oops, an error occurred"
              image="https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png"
            />
          : <Card
              title={title}
              image={image}
            />
      )}
    </ErrorBoundary>
  ))
}

CardList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    size: PropTypes.string
  }))
};

export { CardList };
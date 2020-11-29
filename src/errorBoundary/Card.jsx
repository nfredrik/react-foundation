import styles from './Card.module.css';

import PropTypes from 'prop-types';

function Card({ title, image, size }) {
  const sizeClass = styles[size] ?? styles['medium'];

  return (
    <div className={`${styles.card} ${sizeClass}`}>
      <p className={styles.title}>{title.toUpperCase()}</p>
      <div><img className={styles.image} src={image} alt="" /></div>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string
};

export { Card }
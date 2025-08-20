import styles from '../../styles/components/loading.module.scss';
import React from 'react'

const Loading = () => {
  return (
    <div className={styles.container_loading} data-testid="container_loading">
      <div className={styles.loading_item}>
        <div className={styles.item_image}></div>
        <div className={styles.item_content}>
          <div className={styles.content_title}></div>
          <div className={styles.content_price}></div>
        </div>
      </div>
      <div className={styles.loading_item}>
        <div className={styles.item_image}></div>
        <div className={styles.item_content}>
          <div className={styles.content_title}></div>
          <div className={styles.content_price}></div>
        </div>
      </div>
      <div className={styles.loading_item}>
        <div className={styles.item_image}></div>
        <div className={styles.item_content}>
          <div className={styles.content_title}></div>
          <div className={styles.content_price}></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
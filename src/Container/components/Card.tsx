import React from 'react'
import styles from '../styles/card.module.scss'
import Image from 'next/image'

const Card = ({ items }: any) => {
  return (
    <>
      {items.length > 0 && items.map((item: any) => (
        <div key={item.id} className={styles.container_card} data-testid={`container_card${item.id}`}>
          <Image
            width={180}
            height={180}
            src={`https://picsum.photos/200/300?random=${item.id}`}
            alt={item.title}
            className={styles.card_image}
            data-testid="test-image"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
          />
          <div className={styles.card_info}>
            <div className={styles.info_details}>
              <h2 className={styles.info_title} data-testid="info_title">
                {item.title}
              </h2>
              <span className={styles.details_description} data-testid="details_description">
                {item.description}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Card
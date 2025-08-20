import React from 'react';
import styles from '../../styles/components/card.module.scss';
import Image from 'next/image';
import { useStore } from '@/store/useStore';
import { Props } from './type';
import { ICard } from '@/store/type';
import Loading from './loading';
import MessageCustom from './MessageCustom';


const Card = ({ handleDelete, handleEdit }: Props) => {
  const { editingId, filteredCards, setModal, setCloseModal, loading } = useStore();

  return (
    <>
      {loading ?
        (<Loading />)
        : (!filteredCards || filteredCards.length === 0) ?
          <MessageCustom
            url_msg={'/image/sinResult.png'}
            msgPrimary={'No se encontraron resultados'}
            msgSecondary={'Proba con otra búsqueda'} />
          : (
            filteredCards.map((item: ICard) => (
              <div key={item.id} className={`${styles.container_card} ${editingId === item.id ? styles.editing_card : ""}`} data-testid={`container_card${item.id}`}>
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
                  <div className={styles.card_actions}>
                    <button
                      type="button"
                      className={styles.card_button_edit}
                      onClick={() => handleEdit?.(item.id)}
                      data-testid={`edit_button${item.id}`}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className={styles.card_button_delete}
                      onClick={() => setModal?.({
                        isOpen: true,
                        onClose: () => setCloseModal?.(),
                        title: 'Confirmar eliminación',
                        title_secondary: '¿Estás seguro de que deseas eliminar este elemento?',
                        buttonFooter: [
                          {
                            className: 'primary',
                            label: 'Cancelar',
                            onClick: () => setCloseModal?.()
                          },
                          {
                            className: 'secondary',
                            label: 'Sí, eliminar',
                            onClick: () => {
                              handleDelete?.(item.id);
                              setCloseModal?.()
                            }
                          }
                        ]
                      })}
                      data-testid={`delete_button${item.id}`}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            )))}
    </>
  );
};

export default Card;

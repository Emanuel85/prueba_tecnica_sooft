import React from 'react'
import Card from './components/Card'
import useWithListCard from './components/useWithListCard';
import styles from './styles/listCard.module.scss';
import { Props } from './components/type';

const ListCard = ({ handleDelete, handleEdit }: Props) => {
  return (
    <div className={styles.container_list_card}>
      <Card handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  )
}

export default useWithListCard(ListCard)
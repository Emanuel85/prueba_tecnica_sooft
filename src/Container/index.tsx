import React from 'react'
import Card from './components/Card'
import { useStore } from '../store/useStore'
import useWithListCard from './components/useWithListCard';

const ListCard = () => {
  const { cards } = useStore();
  return (
    <div>    
      <Card items={cards} />
    </div>
  )
}

export default useWithListCard(ListCard)
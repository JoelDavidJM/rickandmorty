import React from 'react'
import './styles/LocationCard.css'

const LocationCard = ({location}) => {
  return (
    <article className='locationCard'>
        <h2 className='locationCard__title'>{location?.name}</h2>
        <ul className='locationCard__list'>
            <li className='locationCard__item'><span className='locationCard__label'>Type</span><span className='locationCard__value'>{location?.type}</span></li>
            <li className='locationCard__item'><span className='locationCard__label'>Dimension</span><span className='locationCard__value'>{location?.dimension}</span></li>
            <li className='locationCard__item'><span className='locationCard__label'>Population</span><span className='locationCard__value'>{location?.residents.length}</span></li>
        </ul>
    </article>
  )
}

export default LocationCard
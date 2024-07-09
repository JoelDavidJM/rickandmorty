import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import './styles/ResidentsCard.css'

const ResidentsCard = ({url}) => {

    const [ residents, getResidents ] = useFetch(url)

    useEffect(() => {
        getResidents()
    },[])

  return (
    <article className='resident'>
        <header className='resident__header'>
          <img className='resident__img' src={residents?.image} alt="" /> 
            <div  className='resident__status'>
              <div className={`resident__status__circle ${residents?.status}`}></div>
            <span className='resident__status__value'>{residents?.status}</span>
            </div>
        </header>
       <section className='resident__body'>
        <h3 className='resident__name'>{residents?.name}</h3>
        <hr className='resident__hr' />
        <ul className='resident__list'>
            <li className='resident__item'><span className='resident__label'>Specie</span><span className='resident__value'>{residents?.species}</span></li>
            <li className='resident__item'><span className='resident__label'>Origen</span><span className='resident__value'>{residents?.origin.name}</span></li>
            <li className='resident__item'><span className='resident__label'>Episodes where appear</span><span className='resident__value'>{residents?.episode.length}</span></li>
        </ul>
       </section>
    </article>
  )
 }

export default ResidentsCard
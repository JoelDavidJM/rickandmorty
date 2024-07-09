
import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import LocationCard from './components/LocationCard'
import ResidentsCard from './components/ResidentsCard'
import Pagination from './components/Pagination'

function App() {

  const locationId = getRandomNumber(126)

  const [inputValue, setInputValue] = useState(locationId)

  const url =  `https://rickandmortyapi.com/api/location/${inputValue}`

  const [ location, getLocation, hasError ] = useFetch(url)

  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  const [residentsForPage, setResidentsForPage] = useState(8)

  const [currentPage, setCurrentPage] = useState(1)

  const [click, setClick] = useState(false)

  useEffect(() => {
    getLocation()
    setCurrentPageIndex(0)
    setCurrentPage(1)
  },[inputValue])

  const lastIndex = currentPage * residentsForPage
  const firstIndex = lastIndex - residentsForPage

  const filteredResidents = location?.residents

  const inputLocation = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    const newInputValue = inputLocation.current.value
    setInputValue(newInputValue.length < 1 ? locationId : newInputValue)
    setCurrentPageIndex(0)
    setCurrentPage(1)
  }

  const handleClick = () => {
    setClick(true)
    setInputValue(locationId)
    setClick()
  }

  return (
    <div className='app__container'>
      <img className='app__img' src="https://c4.wallpaperflare.com/wallpaper/864/758/347/rick-and-morty-tv-shows-hd-4k-wallpaper-preview.jpg" alt="" />
      <form className='app__form' onSubmit={handleSubmit}>
        <input className='app__input' ref={inputLocation} type="text" placeholder='Number'/>
        <button className='app__btn'>Search</button>
      </form>
      {
        hasError  ?
        <div className={`app__message ${click && 'app__close'}`} >
          <section className='app__section__error'>
            <div>
            <h2 className='app__message__title'>Hey!!! you must provide an id from 1 to 126</h2> 
          </div>
          <div>
            <button className='app__btn__error' onClick={handleClick}>Ok</button>
          </div>
          </section>
          
          
        </div>
         :
        (<>
        <LocationCard
      location={location}
      />
      <div className='resident__container'>
        {
          filteredResidents?.slice(firstIndex, lastIndex).map(url => (
            <ResidentsCard
            key={url}
            url={url}
            />
          ))
        }
      </div>

      <div className='pagination__container__app'>
        {
          filteredResidents && filteredResidents.length > 8 && (
            <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        residentsForPage={residentsForPage}
        residents={filteredResidents}
        currentPageIndex={currentPageIndex}
        setCurrentPageIndex={setCurrentPageIndex}
        />
          )
        }
        
      </div>
        </>)
        
      }
      

    </div>
  )
}

export default App

import React from 'react'
import './styles/pagination.css'

const Pagination = ({ currentPage, setCurrentPage, residentsForPage, residents, currentPageIndex, setCurrentPageIndex }) => {

    const totalPage = Math.ceil(Number(residents?.length) / Number(residentsForPage))
    const pageNumber = []
    const superPage = [[]]

    let superPageCount = 0
    let superPageIndex = 0

    for (let i = 1; i <= totalPage; i++) {
        pageNumber.push(i)
        if (superPageCount === 5) {
            superPage.push([])
            superPageIndex++
            superPageCount = 0
        }
        superPage[superPageIndex].push(i)
        superPageCount++
    }

    const handleStartPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1
            const newSuperPageIndex = superPage.findIndex(group => group.includes(newPage))
            setCurrentPageIndex(newSuperPageIndex)
            setCurrentPage(newPage)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPage) {
            const newPage = currentPage + 1
            const newSuperPageIndex = superPage.findIndex(group => group.includes(newPage))
            setCurrentPageIndex(newSuperPageIndex)
            setCurrentPage(newPage)
        }
    }

    const handleChangePage = (newNumberPage) => {
        const newSuperPageIndex = superPage.findIndex(group => group.includes(newNumberPage))
        setCurrentPageIndex(newSuperPageIndex)
        setCurrentPage(newNumberPage)
    }

    return (
        <nav className="pagination" role='navigate' aria-label='pagination'>
            <button className={`pagination__button__previous ${currentPage <= 1 ? 'is-disabled' : ''}`} disabled={currentPage <= 1} onClick={handleStartPage} >
                <i className="pagination__button__icon bx bx-chevrons-left"></i>
            </button>
            <ul className="pagination__ul">
                <div className="pagination__ul__container">
                    {
                        superPage[currentPageIndex]?.map((pageIndex) => (
                            <li key={pageIndex} className="pagination__li">
                                <button className={`pagination__ul__li__button ${pageIndex === currentPage ? 'is-current' : ''}`} onClick={() => handleChangePage(pageIndex)}>{pageIndex}</button>
                            </li>
                        ))
                    }
                </div>

            </ul>
            <button className={`pagination__button__next ${currentPage >= totalPage ? 'is-disabled' : ''}`} disabled={currentPage >= totalPage} onClick={handleNextPage}>
                <i className="pagination__button__icon bx bx-chevrons-right"></i>
            </button>
        </nav>
    )
}

export default Pagination
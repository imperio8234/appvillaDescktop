import { useState } from "react"

// eslint-disable-next-line react/prop-types
export const  Pages = ({paginas, setGetPage}) => {
  const [currentPages, setCurrentPages] = useState([1,2,3]);
  const [nextPage, setNextPage] = useState(1);

  // optener pagina
  const getpage = (e) => {
    setGetPage(e.target.textContent)

  }
  const decrementPage = () => {
    setNextPage((page) => page-1 )
    pages()
    if (nextPage <= 1 ) {
      setNextPage(1)
    }
  }
  const incrementPage = () => {
     setNextPage((page) => page + 1)
     pages();
     // eslint-disable-next-line react/prop-types
     if (nextPage >= paginas.length) {
      // eslint-disable-next-line react/prop-types
      setNextPage(paginas.length)
     }
  }

  const pages = () => {
    //console.log(paginas,nextPage)
    const paginasn= [...paginas];    
    if (nextPage > paginasn.length-3) {
      setCurrentPages(paginasn.slice(nextPage -3, nextPage));
    }else {
      setCurrentPages(paginasn.slice(nextPage- 1, nextPage + 2));
    }
  }
    return(
        <div className="cont-pages">
            <nav aria-label="Page navigation">
               <ul className="pagination">
                  <li className="page-item">
                   <a onClick={() =>decrementPage()} className="page-link" href="#" aria-label="Previous">
                     <span aria-hidden="true">&laquo;</span>
                   </a>
                  </li>
                  {
                    currentPages.map((item, index) => {
                      return (
                       <li onClick={(e) => getpage(e)} key={index} className="page-item"><a className="page-link" href="#">{item}</a></li>
                      )
                    })                    
                  }
                  <li className="page-item">
                    <a onClick={() => incrementPage()} className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
            </nav>
        </div>
    )
}
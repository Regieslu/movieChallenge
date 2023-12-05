import React from 'react'; //importamos biblioteca react. 

//definimos una interface y especificamos las props
interface PaginationProps {
  setPage: (page: number) => void; // funcion que toma un argumento de tipo numero y no devuelve nada. 
  page: number; //el numero que representa la página actual. 
}

// se define un compornente funcional de react llamado pagination con dos props
const Pagination: React.FC<PaginationProps> = ({ setPage, page }) => {
  
  const handlePrevClick = () => { // se ejecutara cuando se haga click en el boton prev
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    setPage(page + 1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevClick}>&lt; Prev</button>
      <span>Page {page}</span>
      <button onClick={handleNextClick}>Next &gt;</button>
    </div>
  );
};

export default Pagination;

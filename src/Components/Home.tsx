import React, { useState } from "react";
import axios from 'axios';
import Search from "../Components/Common/Search";
import Detail from "./Detail";
import Pagination from "./Common/pagination";
import { MovieCatalog, MovieResult } from "../Components/Interfaces"
import Sidebar from "./Filters";

// state = {
// movieName: "",
// results: [] as MovieCatalog[],
// selected: {} as MovieResult
//}

function Home() { //componente padre de sarch y detail 
  //utilizamos el hook useState para gestionar el estado del componente
  const [currentPage, setCurrentPage] = useState(1) //currentPage es mi variable de estado y setCurrentPage establece el estado
  const [state, setState] = useState({
    movieName: "",
    results: [] as MovieCatalog[],
    selected: {} as MovieResult,
  });
  const apiurl = "https://api.themoviedb.org/3"; //Define la URL base de la API
  const initialCatalog = "/trending/movie/day?language=en-US";// obtenemos pelis populares

  const headers = {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWY0YWY5N2NjOTc2MjNjZTkxYjM1YmVmOWVlMzJiZCIsInN1YiI6IjY1NTUwMjdiYjU0MDAyMDBhYzk4NWI3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XcHfTme4sZ3N4y-sPoNwbTzDK9FFm3xi-q2zYXfKlwo'
  };

  //Esta función actualiza el estado de movieName cuando ingresamos texto en el input
  const searchInput = (e: React.FormEvent<HTMLInputElement>) => {
    const s = e.currentTarget.value;
    setState((previusState) => {
      return {
        ...previusState,
        movieName: s,

      };
    });
  };

  const search = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { //realizamos busqueda despues de dar enter y actualizamos los estados
      axios(apiurl + "/search/movie?query=" + state.movieName, {
        headers: headers
      }).then(
        ({ data }) => { // buscamos en la data
          const results: MovieCatalog[] = data.results;
          setState((prevState) => {
            return {
              ...prevState,
              results: results,
            };
          });
        }
      );
    }
  };

  // Abrimos los detalles de la película cuando hacemos click sobre ella 
  const openDetail = (id: number) => {
    axios(apiurl + "/movie/" + id, { //realizamos la llamada con axios
      headers: headers
    }).then(({ data }) => {
      const result = data as MovieResult
      setState((prevState) => {
        return { ...prevState, selected: result };//obtenemos data
      });
    });
  };
  // cerramos los detalle de la película seleccionada haciendo click en close
  const closeDetail = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} as MovieResult };
    });
  };

  //esta función nos ayuda a actualizar la página actual obteniendo la lista de 
  //peliculas correspondientes a la página 
  const updatePageAndCatalog = (page: number) => {
    setCurrentPage(page);
    axios(apiurl + `${initialCatalog}&page=${page}`, {
      headers: headers,
    }).then(({ data }) => {
      setState((prevState) => {
        return { ...prevState, results: data.results };
      });
    });
  }

  // obtenemos la lista inicial de las peliculas populares
  const getHomeCatalog = () => {
    axios(apiurl + initialCatalog, {
      headers: headers,
    }).then(({ data }) => {
      setState((prevState) => {
        return { ...prevState, results: data.results };
      });
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cine Movie</h1>
      </header>
      <main>
        <Search
          searchInput={searchInput}
          search={search}
        />
        <Sidebar
          setGender={(gender: number) => { console.log(gender) }}
          gender={1}
          setSortBy={(sortBy: string) => { console.log(sortBy) }} />
        <div className="container">
          {state.results.length && state.results.map((e: MovieCatalog) => (
            <div
              key={e.id}
              className="item"
              onClick={() =>
                openDetail(e.id)
              }
            >
              <img
                alt="This is the poster"
                style={{ width: "200px" }}
                src={`https://image.tmdb.org/t/p/w154${e.poster_path}`}
              />
              <h3 style={{ color: "white" }}>
                {e.title}
              </h3>
            </div>
          ))}
        </div>

        {!state.results.length &&
          getHomeCatalog()
        }

        {typeof state.selected.original_title !=
          "undefined" ? (
          <>
            <Detail
              selected={state.selected}
              closeDetail={closeDetail} />
          </>
        ) : (
          false
        )}
        <Pagination
          setPage={(page) => updatePageAndCatalog(page)} page={currentPage}
        />
      </main>
    </div>
  );
}
export default Home;

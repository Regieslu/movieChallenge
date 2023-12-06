import React, { useEffect, useState } from "react";
import axios from 'axios';
import Search from "../Components/Common/Search";
import Detail from "./Detail";
import Pagination from "./Common/pagination";
import { MovieCatalog, MovieResult } from "../Interface/Interfaces"
import Sidebar from "./Filters";

function Home() { //componente padre de sarch y detail 
  //utilizamos el hook useState para gestionar el estado del componente
  const [currentPage, setCurrentPage] = useState(1) //el valor inicial de cuppentPage es (1)
  const [genres, setGenres] = useState(28);
  const [sortBy, setSortBy] = useState("popularity.desc")
  const [state, setState] = useState({
    movieName: "",
    results: [] as MovieCatalog[],
    selected: {} as MovieResult,
  });

  useEffect(() => { //useEffect ejecuta getHome una vez cargada la página x 1ra vez y se vuelve a ejecutar si alguna de sus dependencias cambia
    getHome().then(data => { //getList from API
      setState((prevState) => {
        return { ...prevState, results: data.results };
      });
    }).catch((error) => console.error(error));
  }, [genres, sortBy, currentPage]);

  const getHome = () => {
    return axios(urlWithCriteria, {
      headers: headers,
    },).then(({ data }) => data);
  }
  const apiurl = "https://api.themoviedb.org/3"; //Define la URL base de la API
  const urlWithCriteria = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-US&page=${currentPage}&with_genres=${genres}&sort_by=${sortBy}`;
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
        ({ data }) => {
          setState((prevState) => {
            return {
              ...prevState,
              results: data.results,
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
        return { ...prevState, selected: result };
      });
    });
  };
  // cerramos los detalle de la película seleccionada haciendo click en close
  const closeDetail = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} as MovieResult };
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cine Movie</h1>
      </header>
      <main>
        <Search //mi componente 
          searchInput={searchInput} //propiedades de search
          search={search}
        />
        <Sidebar
          setGender={(genre: number) =>  setGenres(genre) }
          gender={genres}
          setSortBy={(sortBy: string) => setSortBy(sortBy) } />
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
          setPage={(page) => setCurrentPage(page)} page={currentPage}
        />
      </main>
    </div>
  );
}
export default Home;

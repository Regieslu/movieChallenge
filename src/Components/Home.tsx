import React, { useState } from "react";
import axios from 'axios';
import Search from "../Components/Common/Search";
import Detail from "./Detail";
import Pagination from "./Common/pagination";

// import "./App.css";

// interface para el genero
export interface MovieCatalog {
  id: number,
  title: string,
  poster_path: string,

}
export interface MovieResult {
  original_title: string,
  poster_path: string,
  vote_average: number,
  overview: string,
  release_date: string,
  genres: Genres[],
}

export interface Genres {
    "id": number, 
    "name": string,
}

function Home() { //comonente padre de sarch y detail 
  const [currentPage, setCurrentPage] = useState(1)
  const [state, setState] = useState({
    movieName: "",
    results: [] as MovieCatalog[],
    selected: {} as MovieResult,
  });
  const apiurl = "https://api.themoviedb.org/3";
  const initialCatalog = "/trending/movie/day?language=en-US";

  const headers = {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWY0YWY5N2NjOTc2MjNjZTkxYjM1YmVmOWVlMzJiZCIsInN1YiI6IjY1NTUwMjdiYjU0MDAyMDBhYzk4NWI3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XcHfTme4sZ3N4y-sPoNwbTzDK9FFm3xi-q2zYXfKlwo'
  };

  const searchInput = (e: React.FormEvent<HTMLInputElement>) => {
    const s = e.currentTarget.value;

    setState((prevState) => {
      return { ...prevState, movieName: s };
    });
  };

  const search = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      axios(apiurl + "/search/movie?query=" + state.movieName, {
        headers: headers
      }).then(
        ({ data }) => {
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

  const openDetail = (id: number) => {
    axios(apiurl + "/movie/" + id, {
      headers: headers
    }).then(({ data }) => {
      const result = data as MovieResult
      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  const closeDetail = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} as MovieResult };
    });
  };

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
          <Detail
            selected={state.selected}
            closeDetail={closeDetail}
          />
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

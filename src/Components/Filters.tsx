//Importamos diferentes funciones de react
import { useEffect, useState } from "react";
import { Genres } from "../Interface/Interfaces"; // Importamos el tipo de dato Genre
import { getGenres } from "../Components/Common/GetGenders"; // Importamos el servicio getGenres que nos trae los generos de la API
import "../styles/sidebar.css"


interface SidebarProps {
  setGender: (gender: number) => void; // Funcion que setea el genero a filtrar.
  gender: number; //Genero de tipo number.
  setSortBy: (sortBy: string) => void; // Funcion que setea el ordenamiento de tipo string
}

export default function Sidebar(props: SidebarProps) {
  const [filterState, setFilterState] = useState({
    genders: [] as Genres[],
    sortBy: "",
  });
  useEffect(() => {
    //Con esta funcion getGenres mandamos a traer los generos de la API
    getGenres()
      .then((data: Genres[]) => {
        setFilterState((prevState) => ({
          ...prevState,
          genders: data
        })); //Seteamos los valores de la API en la variable genres
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="sidebar-generos">
      <h3 className="sidebar-title">Genres</h3>
      <div className="contenedor-generos" id="filtroGeneros">
        {filterState.genders?.map(
          (
            genre: Genres,
            i: number // Itero la variable genres y para cada genre renderizo un boton con su nombre
          ) => (
            <button
              disabled={genre.id === props.gender}
              className={genre.id === props.gender ? "btn active" : "btn"}
              onClick={() => {
                props.setGender(genre.id);
              }}
              key={i}
            >
              {genre.name}
            </button>
          )
        )}
      </div>
      <div className="sidebar-ordenar ">
        <select
          value={filterState.sortBy}
          name="ordenar"
          id="ordenar"
          data-testid={"ordenBy"}
          onChange={(event) => {
            props.setSortBy(event.target.value);
          }}
        >
          <option value="popularity.desc"> Ordenar por</option>
          <option value="popularity.asc">Menos populares</option>
          <option value="popularity.desc">Más populares</option>
        </select>
      </div>
    </div>
  );
}
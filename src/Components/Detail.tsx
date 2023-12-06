import { Genres, MovieResult } from "../Interface/Interfaces"

interface Props {
  selected: MovieResult;
  closeDetail(): void;
}
const renderGenres = (genres: Genres[]) => {
  return ( 
    <div>
      <p>
        Genres: 
      </p>
      <ul>
        {genres.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
      </div>
    
  );
}

function Detail(props: Props) {
  const { selected, closeDetail } = props;
  const posterPath = "https://image.tmdb.org/t/p/w154" + selected.poster_path;
  return (
    <section className="detail">
      <div className="content">
        <h2>{selected.original_title}</h2>
        <p className="rating">
          Rating: {selected.vote_average}
        </p>
        <p>
        Date: {selected.release_date}
        </p>
        <div>
          {renderGenres(selected.genres)}
        </div>

        <div className="about">
          <img src={posterPath} alt="" />

          <p>{selected.overview}</p>
        </div>
        <button
          className="close"
          onClick={closeDetail}
        >
          Close
        </button>
      </div>
    </section>
  );
}
export default Detail;
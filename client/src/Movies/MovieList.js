import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const MovieList = (props) =>  {

  const addMovie = () => {
    props.history.push('/add-movie');
  }

  return (
    <div>
      <button onClick={addMovie} >
                Add Movie
      </button>
      <div className="movie-list">
        {props.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`} >
      <MovieCard movie={movie} />
    </Link>
  );
}

export default MovieList;
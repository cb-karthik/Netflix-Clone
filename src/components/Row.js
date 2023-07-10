import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_Url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMoveies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //  A snippet of code which runsbased on a specific condtion or variable
  useEffect(() => {
    // if [], run once when the row loads, and dont run again
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMoveies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(null, { tmdbId: movie?.id })
        .then((url) => {
          window.open(url, "_blank");
          // console.log(url);
          // const urlParams = new URLSearchParams(new URL(url).search);
          // setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log("i'm here", error));
    }
  };

  console.log(trailerUrl);

  return (
    <div className="row">
      <h2 className="row_title">{title}</h2>

      <div className="row_posters">
        {movies.map((movie) => (
          <img
            title={movie?.name || movie?.title}
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_Url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/* {trailerUrl && <Youtube videoID={trailerUrl} opts={opts} />} */}
    </div>
  );
}

export default Row;

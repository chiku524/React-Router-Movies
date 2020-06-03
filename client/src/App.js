import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Route, Link} from "react-router-dom";
import MovieList from "./Movies/MovieList";
import SavedList from './Movies/SavedList';
import Movie from "./Movies/Movie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  console.log(movieList);

  return (
    <div>
      <SavedList list={savedList} />
      <Route exact path="/">
        <MovieList props={movieList}></MovieList>
      </Route>
      <Route path="/movies/:id" component={Movie}/>
    </div>
  );
};

export default App;

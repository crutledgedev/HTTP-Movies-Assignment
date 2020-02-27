import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const MovieForm = props => {
  const [item, setItem] = useState(initialItem);

  useEffect(() => {
    const id = props.match.params.id;
    if (id) {
      axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setItem(res.data)
      })
      .catch(err => console.log(err.response));
    }
  }, [props.match.params.id]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    let name = ev.target.name;

    if (name === 'stars') {
      let arr = value.split(',');
      setItem({
        ...item,
        [name]: arr
      });
    } else {
      setItem({
        ...item,
        [name]: value
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (props.match.params.id) {
      axios
        .put(`http://localhost:5000/api/movies/${item.id}`, item)
        .then(res => {
          props.setUpdate(!props.update);
          setItem(initialItem);
          props.history.push('/');
        })
        .catch(err => console.log(err.response));
    } else {
      axios
      .post(`http://localhost:5000/api/movies/`, item)
      .then(res => {
        props.setUpdate(!props.update);
        setItem(initialItem);
        props.history.push('/');
      })
      .catch(err => console.log(err.response));
    }
  };

  return (
    <div className="form">
      <h1>Movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={item.title}
        />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={item.director}
        />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={item.metascore}
        />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={item.stars}
        />
        <button className="md-button form-button">Submit</button>
      </form>
    </div>
  );
};

export default MovieForm;
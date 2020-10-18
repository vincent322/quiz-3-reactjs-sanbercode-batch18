import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { Context } from "../utility/context";

const Movie = () => {
  const { logins, history } = useContext(Context);
  const [login] = logins;
  if (!login) {
    history.push("/login");
  }
  const [movieList, setMovieList] = useState(null);
  const [editedIndex, setEditedIndex] = useState(-1);
  const [objectMovie, setObjectMovie] = useState({
    title: "",
    description: "",
    year: 2020,
    duration: 120,
    genre: "",
    rating: 0,
    image_url: "",
  });
  const [search, setSearch] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState({
    title: null,
    description: null,
    year: null,
    duration: null,
    genre: null,
    rating: null,
    image_url: null,
  });

  useEffect(() => {
    if (!movieList) {
      Axios.get("http://backendexample.sanbercloud.com/api/movies")
        .then((res) => {
          if (res.status === 200) {
            setMovieList(res.data);
          }
        })
        .catch((error) => setResponse(error.message));
    }
  }, [movieList]);

  const handleChange = (e) => {
    let name = e.target.name;
    switch (name) {
      case "year":
        return !isNaN(e.target.value)
          ? setObjectMovie({ ...objectMovie, [name]: Number(e.target.value) })
          : "";
      case "duration":
        return !isNaN(e.target.value)
          ? setObjectMovie({ ...objectMovie, [name]: Number(e.target.value) })
          : "";
      case "rating":
        return !isNaN(e.target.value)
          ? Number(e.target.value) > 10
            ? setObjectMovie({ ...objectMovie, [name]: Number(10) })
            : setObjectMovie({ ...objectMovie, [name]: Number(e.target.value) })
          : "";
      case "search":
        setSearch(e.target.value);
        break;
      default:
        setObjectMovie({ ...objectMovie, [name]: e.target.value });
        break;
    }
  };

  const checkYear = (e) => {
    const value = e.target.value;
    if (isNaN(value)) {
      return;
    } else if (value < 1980) {
      setObjectMovie({ ...objectMovie, year: Number(1980) });
    } else {
      return;
    }
  };

  const handleValidation = () => {
    let errors = {};
    let valid = true;
    if (!objectMovie.title) {
      errors.title = "Title is required";
      valid = false;
    }

    if (!objectMovie.description) {
      errors.description = "Description is required";
      valid = false;
    }

    if (!objectMovie.year) {
      errors.year = "Year is required";
      valid = false;
    }

    if (!objectMovie.duration) {
      errors.duration = "Duration is required";
      valid = false;
    }

    if (!objectMovie.genre) {
      errors.genre = "Genre is required";
      valid = false;
    }

    if (!objectMovie.rating) {
      errors.rating = "Rating is required";
      valid = false;
    }

    if (!objectMovie.image_url) {
      errors.image_url = "Image url is required";
      valid = false;
    }

    setError({ ...error, errors });
    return valid;
  };

  const handleSearch = () => {
    let movieLists = null;
    if (search !== "") {
      movieLists = movieList.filter(
        (data) =>
          data.title && data.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setMovieList(movieLists);
  };

  const handleEdit = (val) => {
    const index = movieList.indexOf(val);
    let objectMovies = {
      ...objectMovie,
      id: val.id,
      title: val.title,
      description: val.description,
      year: val.year,
      duration: val.duration,
      genre: val.genre,
      rating: val.rating,
      image_url: val.image_url,
    };
    setObjectMovie(objectMovies);
    setEditedIndex(index);
  };

  const handleDelete = (val) => {
    Axios.delete(`http://backendexample.sanbercloud.com/api/movies/${val.id}`)
      .then((res) => {
        if (res.status === 200) {
          setMovieList(null);
        }
      })
      .catch((error) => {
        setResponse(error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = handleValidation();
    if (valid) {
      if (editedIndex > -1) {
        Axios.put(
          `http://backendexample.sanbercloud.com/api/movies/${objectMovie.id}`,
          objectMovie
        )
          .then((res) => {
            if (res.status === 200) {
              setTimeout(() => {
                setObjectMovie({
                  id: null,
                  title: "",
                  description: "",
                  year: 2020,
                  duration: 120,
                  genre: "",
                  rating: 0,
                  image_url: "",
                });
                setEditedIndex(-1);
                setMovieList(null);
              }, 500);
            }
          })
          .catch((error) => {
            setResponse(error.message);
          });
      } else {
        Axios.post(
          "http://backendexample.sanbercloud.com/api/movies",
          objectMovie
        )
          .then((res) => {
            if (res.status === 201) {
              setTimeout(() => {
                setObjectMovie({
                  id: null,
                  title: "",
                  description: "",
                  year: 2020,
                  duration: 120,
                  genre: "",
                  rating: 0,
                  image_url: "",
                });
                setMovieList(null);
              }, 500);
            }
          })
          .catch((error) => {
            setResponse(error.message);
          });
      }
    }
  };

  const handleReset = () => {
    setObjectMovie({
      id: null,
      title: "",
      description: "",
      year: 2020,
      duration: 120,
      genre: "",
      rating: 0,
      image_url: "",
    });
  };

  return (
    <>
      <div
        className="sections"
        style={{
          padding: "8px",
          paddingTop: "0px",
          width: "70%",
          marginBottom: "16px",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 flex">
              <input
                className="form-control"
                type="text"
                name="search"
                id="search"
                value={search}
                onChange={handleChange}
              />
            </div>
            <button
              className="button"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <h1 className="text-center title mt-0">Daftar Film</h1>
        <div
          className="container pa-0 ma-2"
          style={{ border: "1px solid black" }}
        >
          <div className="row ma-0">
            <div
              className="col-1 ma-1 text-center"
              style={{ backgroundColor: "white" }}
            >
              <b>No</b>
            </div>
            <div
              className="col-2 ma-1 text-center"
              style={{ backgroundColor: "white" }}
            >
              <b>Title</b>
            </div>
            <div
              className="col-2 ma-1 text-center"
              style={{ backgroundColor: "white" }}
            >
              <b>Description</b>
            </div>
            <div
              className="col-1 ma-1 text-center"
              style={{ backgroundColor: "white" }}
            >
              <b>Year</b>
            </div>
            <div
              className="col-1 ma-1 text-center"
              style={{ backgroundColor: "white" }}
            >
              <b>Duration</b>
            </div>
            <div
              className="col-2 ma-1 text-center"
              style={{ backgroundColor: "white" }}
            >
              <b>Genre</b>
            </div>
            <div
              className="col-1 ma-1 text-center"
              style={{ backgroundColor: "white" }}
            >
              <b>Rating</b>
            </div>
            <div
              className="col-2 ma-1 text-center"
              style={{ backgroundColor: "white" }}
            >
              <b>Action</b>
            </div>
          </div>
          {movieList &&
            movieList.map((el, index) => {
              return (
                <div key={index} className="row ma-0">
                  <div
                    className="col-1 ma-1"
                  >
                    {index + 1}
                  </div>
                  <div
                    className="col-2 ma-1"

                  >
                    {el.title
                      ? `${el.title[0].toUpperCase()}${el.title.substr(1)}`
                      : "-"}
                  </div>
                  <div
                    className="col-2 ma-1"
                    style={{

                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    {el.description}
                  </div>
                  <div
                    className="col-1 ma-1"
                  >
                    {el.year}
                  </div>
                  <div
                    className="col-1 ma-1"
                  >
                    {el.duration}
                  </div>
                  <div
                    className="col-2 ma-1"
                  >
                    {el.genre
                      ? el.genre.charAt(0).toUpperCase() + el.genre.substr(1)
                      : "-"}
                  </div>
                  <div
                    className="col-1 ma-1"
                  >
                    {el.rating}
                  </div>
                  <div
                    className="col-2 ma-1"
                  >
                    <button
                      className="btn btn-warning btn-block"
                      type="button"
                      onClick={() => handleEdit(el)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error btn-block"
                      type="button"
                      onClick={() => handleDelete(el)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="sections">
        <h1 className="text-center title">Movies Form</h1>
        <div className="container">
          <form
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            onReset={handleReset}
          >
            <div className="row">
              <div className="col-4 label">
                <label htmlFor="title">Title</label>
              </div>
              <div className="col-4">
                <input
                  className={`form-control${error.title ? " errors" : ""}`}
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={objectMovie.title}
                  onChange={handleChange}
                />
                {error.title && <span>{error.title}</span>}
              </div>
            </div>
            <div className="row">
              <div className="col-4 label">
                <label htmlFor="description">Description</label>
              </div>
              <div className="col-4">
                <textarea
                  className={`form-control${
                    error.description ? " errors" : ""
                  }`}
                  id="description"
                  name="description"
                  rows="4"
                  cols="10"
                  required
                  value={objectMovie.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-4 label">
                <label htmlFor="year">Year</label>
              </div>
              <div className="col-4">
                <input
                  className={`form-control${error.year ? " errors" : ""}`}
                  type="tel"
                  name="year"
                  id="year"
                  maxLength={4}
                  required
                  value={objectMovie.year}
                  onChange={handleChange}
                  onBlur={checkYear}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4 label">
                <label htmlFor="duration">Duration (minutes)</label>
              </div>
              <div className="col-4">
                <input
                  className={`form-control${error.duration ? " errors" : ""}`}
                  type="tel"
                  name="duration"
                  id="duration"
                  required
                  value={objectMovie.duration}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4 label">
                <label htmlFor="genre">Genre</label>
              </div>
              <div className="col-4">
                <input
                  className={`form-control${error.genre ? " errors" : ""}`}
                  type="text"
                  name="genre"
                  id="genre"
                  required
                  value={objectMovie.genre}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4 label">
                <label htmlFor="rating">Rating</label>
              </div>
              <div className="col-4">
                <input
                  className={`form-control${error.rating ? " errors" : ""}`}
                  type="tel"
                  name="rating"
                  id="rating"
                  maxLength={2}
                  required
                  value={objectMovie.rating}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4 label">
                <label htmlFor="image_url">Image Url</label>
              </div>
              <div className="col-4">
                <textarea
                  className={`form-control${error.image_url ? " errors" : ""}`}
                  id="image_url"
                  name="image_url"
                  rows={4}
                  required
                  value={objectMovie.image_url}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <input
                  className="btn btn-warning btn-block"
                  type="reset"
                  value="Reset"
                  style={{ backgroundColor: "#f57f17" }}
                />
              </div>
              <div className="col-2">
                <input
                  className="btn btn-success btn-block"
                  type="submit"
                  value="Submit"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <h3>{response}</h3>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Movie;
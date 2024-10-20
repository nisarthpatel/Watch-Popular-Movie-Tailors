import axios from "axios";
import { createContext, useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await axios.get(POPULAR_MOVIES_URL);
                setMovies(response.data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);
    const updateMovie = (updatedMovie) => {
        setMovies(prevMovies =>
            prevMovies.map(movie => (movie.id === updatedMovie.id ? updatedMovie : movie))
        );
    };

    return (
        <MovieContext.Provider value={{ movies, loading, error, updateMovie }}>
            {children}
        </MovieContext.Provider>
    );
};

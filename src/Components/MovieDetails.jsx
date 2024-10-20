import { Button, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieContext } from '../contexts/MovieContext';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetails = () => {
    const { id } = useParams();
    const { movies } = useContext(MovieContext);
    const [movie, setMovie] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState(null);

    useEffect(() => {
        const selectedMovie = movies.find((movie) => movie.id === parseInt(id));
        if (selectedMovie) {
            setMovie(selectedMovie);
            fetchMovieTrailer(selectedMovie.id);
        }
    }, [id, movies]);

    const fetchMovieTrailer = async (movieId) => {
        try {
            const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
                params: {
                    api_key: API_KEY,
                    language: 'en-US',
                },
            });
            const trailers = response.data.results;
            const youtubeTrailer = trailers.find(trailer => trailer.site === 'YouTube' && trailer.type === 'Trailer');
            if (youtubeTrailer) {
                setTrailerUrl(`https://www.youtube.com/watch?v=${youtubeTrailer.key}`);
            } else {
                setTrailerUrl(null);
            }
        } catch (error) {
            console.error("Failed to fetch movie trailer", error);
            setTrailerUrl(null);
        }
    };

    if (!movie) return <Typography>No movie found</Typography>;

    const { title, overview, runtime, release_date } = movie;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <CardMedia
                        component="img"
                        alt={title}
                        height="400"
                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Overview
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {overview}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Runtime:</strong> {runtime} minutes
                        </Typography>
                        <Typography variant="body1">
                            <strong>Release Date:</strong> {release_date}
                        </Typography>
                        {trailerUrl && (
                            <Button
                                variant="contained"
                                color="primary"
                                href={trailerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ marginTop: '20px' }}
                            >
                                Watch Trailer
                            </Button>
                        )}
                    </CardContent>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MovieDetails;

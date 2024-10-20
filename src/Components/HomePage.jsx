import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../contexts/MovieContext";
import { Card, CardContent, CardMedia, CircularProgress, Container, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SortIcon from '@mui/icons-material/Sort';


const HomePage = () => {
    const { movies, loading, error } = useContext(MovieContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortAsc, setSortAsc] = useState(true);

    const handleSort = () => {
        movies.sort((a, b) => sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
        setSortAsc(!sortAsc);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    useEffect(() => {

    }, [searchTerm])

    const filteredMovies = movies.filter(movie => {
        return movie.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
    });

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </div>
    );
    if (error) return <Typography color="error">{`Error: ${error}`}</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Popular Movies
            </Typography>
            <TextField
                label="Search Movies"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <IconButton color="primary" onClick={handleSort}>
                <Typography variant="h6" gutterBottom>
                    {sortAsc ? 'Sort Z-A' : 'Sort A-Z'}
                </Typography>
                <SortIcon />
            </IconButton>
            <Grid container spacing={4}>
                {filteredMovies.map((movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4}>
                        <Card>
                            <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <CardMedia
                                    component="img"
                                    alt={movie.title}
                                    height="300"
                                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {movie.title}
                                    </Typography>
                                </CardContent>
                            </Link>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePage;

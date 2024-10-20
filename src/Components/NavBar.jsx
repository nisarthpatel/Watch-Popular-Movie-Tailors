import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="home" onClick={() => navigate('/')}>
                    <HomeIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    Watch Movies
                </Typography>
                <IconButton color="inherit" aria-label="edit" onClick={() => navigate('/edit-movie')}>
                    <EditIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;

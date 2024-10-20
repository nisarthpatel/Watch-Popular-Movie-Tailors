import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import { Button, Container, Typography } from "@mui/material";

import { DataGrid } from '@mui/x-data-grid';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
    editable: true,
  },
  {
    field: 'release_date',
    headerName: 'Release Date',
    width: 150,
    type: 'Date',
    editable: true,
  },
  {
    field: 'runtime',
    headerName: 'Runtime (minutes)',
    type: 'number',
    width: 150,
    editable: true,
  },
];

const EditMovie = () => {
  const { movies, updateMovie } = useContext(MovieContext);
  const rows = movies;

  const handleProcessRowUpdate = (newRow) => {
    updateMovie(newRow);
    return newRow;
  };

  const handleSave = async () => {
    try {
      alert('Changes saved successfully!');
    } catch (err) {
      console.error('Error saving changes:', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Movies
      </Typography>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          processRowUpdate={handleProcessRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 16 }}
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </Container>
  );
};

export default EditMovie;

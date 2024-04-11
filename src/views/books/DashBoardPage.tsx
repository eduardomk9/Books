import React, { useEffect, useState } from 'react';
import { CircularProgress, TextField, MenuItem, Button, Snackbar, Box } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import DataGridCustom from '../../components/DataGridCustom';
import { useAuthService } from '../../services/auth/index';
import { useBookService } from '../../services/book/index';
import { IBooks } from '../../services/book/interfaces/IBooks';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Dashboard = () => {
  const [books, setBooks] = useState<IBooks[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchType, setSearchType] = useState<string>('title');
  const [searchValue, setSearchValue] = useState<string>('book');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const { signIn } = useAuthService();
  const { getBooks } = useBookService();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    setLoading(true);
    try {
      const bookData = await getBooks({ type: searchType, value: searchValue });
      if (bookData) {
        setBooks(bookData);
      } else {
        console.error('Failed to fetch books:', bookData);
      }
    } catch (error: any) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataIfAuthenticated = async () => {
      try {
        if (!authenticated) {
          const signInResponse = await signIn({ mail: 'generic@auth.com', password: 'pass1234' });
          if (!signInResponse) {
            setSnackbarMessage('Authentication failed');
            setSnackbarOpen(true);
            setLoading(false);
            return;
          }
          setAuthenticated(true);
          fetchData();
        }
      } catch (error: any) {
        console.error('Error:', error.message);
      }
    };

    fetchDataIfAuthenticated();
  }, [authenticated, fetchData, signIn]);

  const handleSearch = async () => {
    fetchData();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSearchTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value);
  };

  const handleSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'title', headerName: 'Title' },
    { field: 'firstName', headerName: 'First Name' },
    { field: 'lastName', headerName: 'Last Name' },
    { field: 'totalCopies', headerName: 'Total Copies' },
    { field: 'copiesInUse', headerName: 'Copies in Use' },
    { field: 'type', headerName: 'Type' },
    { field: 'isbn', headerName: 'ISBN' },
    { field: 'category', headerName: 'Category' },
  ];

  return (
    <Box p={2} boxShadow={1} borderRadius={4} bgcolor="background.paper">
      <TextField
        select
        label="Search Type"
        value={searchType}
        onChange={handleSearchTypeChange}
        sx={{ mr: 2 }}
      >
        <MenuItem value="title">Title</MenuItem>
        <MenuItem value="firstName">First Name</MenuItem>
        <MenuItem value="lastName">Last Name</MenuItem>
        <MenuItem value="type">Type</MenuItem>
        <MenuItem value="category">Category</MenuItem>
        <MenuItem value="isbn">Isbn</MenuItem>
      </TextField>
      <TextField
        label="Search Value"
        value={searchValue}
        onChange={handleSearchValueChange}
        sx={{ mb: 2, mr: 2 }}
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <DataGridCustom
          rows={books}
          columns={columns}
          checkboxSelection
          loading={false}
          pageSize={20}
          headerHeight={56}
          isRowSelectable={(params) => true}
          onRowSelectionModelChange={(newSelection) => console.log(newSelection)}
          getRowClassName={(params) => 'custom-row-class'}
          autosizeOnMount
        />
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;

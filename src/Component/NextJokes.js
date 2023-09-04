import React, { useState, useEffect } from 'react';
import { Grid, Button, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from "@mui/system";  
const StyledButton = styled(Button)(({ theme }) => ({
  categoryButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '4px',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    margin: '10px',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '150px',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: 'red', // Change the color to your preference
  },
}));

function ChuckNorrisCategories() {  
  const [randomJoke, setRandomJoke] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  

  const fetchRandomJoke = (category) => {
    setIsLoading(true);
    // Fetch a random joke for the selected category
    fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
      .then((response) => response.json())
      .then((data) => {
        setRandomJoke(data.value);
      })
      .catch((error) => {
        console.error('Error fetching Chuck Norris joke:', error);
        setRandomJoke(''); // Clear the joke on error
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const closeJoke = () => {
    // Clear the joke when the Close button is clicked
    setRandomJoke('');
  };

  return (
    <div>
      <h1>Chuck Norris Joke Categories</h1>
      <Grid container spacing={2}>
        {categories.map((category, index) => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
             <StyledButton
              variant="contained" 
              onClick={() => {
                fetchRandomJoke(category);
              }} >
              {category}
            </ StyledButton>
          </Grid>
        ))}
      </Grid>
      {isLoading ? (
        <div  >
          <CircularProgress />
        </div>
      ) : (
        randomJoke && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'yellow',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <IconButton
              aria-label="Close"
               
              onClick={closeJoke}
            >
              <CloseIcon />
            </IconButton>
            <h2>Random Chuck Norris Joke:</h2>
            <p>{randomJoke}</p>
            <Button variant="contained" onClick={() => fetchRandomJoke(categories[Math.floor(Math.random() * categories.length)])}>
              Next Joke
            </Button>
          </div>
        )
      )}
    </div>
  );
}

export default ChuckNorrisCategories;

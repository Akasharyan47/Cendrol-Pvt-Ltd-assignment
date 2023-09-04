import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Box,
  Typography, 
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";  

const StyledButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(90deg,#4286f4,#373b44)",
  color: "#fff",
  cursor: "pointer",
  borderRadius: "4px",
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.1)",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "1rem",
    width: "200px",
    height: "100px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100px",
    fontSize: "0.5rem",
    height: "auto",
  },
}));
const closeButton = {
  position: "absolute",
  top: "5px",
  right: "10px",
  color: "black",
};
const divStyle = {  
  background: "#373b34",
  paddingBottom: "20px",
  padding: "15px",
  width: "auto",
  boxShadow:
    "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
};

function ChuckNorrisCategories() {
  const [categories, setCategories] = useState([]);
  const [randomJoke, setRandomJoke] = useState("");

  useEffect(() => { 
    fetch("https://api.chucknorris.io/jokes/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const fetchRandomJoke = (category) => { 
    fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
      .then((response) => response.json())
      .then((data) => {
        setRandomJoke(data.value);
      })
      .catch((error) => {
        console.error("Error fetching Chuck Norris joke:", error);
        setRandomJoke("");
      });
  };
  const closeJoke = () => {
    setRandomJoke("");
  };

  return (
    <div style={divStyle}>
      <Typography pt={2} pb={3} variant="h4" color={"white"}>
        Chuck Norries
      </Typography>

      <Box sx={{  width:"auto" }}>
        <Grid pr={0} container   center >
          {categories.map((category, index) => (
            <Grid item xs={4} sm={4} md={3} pb={3} key={index}>
              <StyledButton
                variant="contained"
                onClick={() => {
                  fetchRandomJoke(category);
                }}
              >
                <Typography>
                  {category}
                  <br />
                  <Typography
                    sx={{
                      fontSize: "0.6rem",
                      fontFamily: "Muller",
                      letterSpacing: "1px",
                    }} >
                    Unlimited Jokes{" "}
                  </Typography>
                </Typography>
              </StyledButton>
            </Grid>
          ))}
        </Grid>

        {randomJoke && (
          <Box  >
            <div
              style={{
                width:"auto",
                boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
             position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background: "white",
                padding: "20px",
                textAlign: "center", 
              }}
            >
              <IconButton
                style={closeButton}
                aria-label="Close"
                onClick={closeJoke}
              >
                <CloseIcon />
              </IconButton>
              <Box  sx={{ 
              width: '100%',  
             '@media (min-width: 768px)': {
              width: '800px', 
               height:"120px"    
            },
            '@media (max-width: 700px)': {
              width: '300px',
              maxHeight:"320px" 
               },
             }}>
                <h2>{ }</h2>
               <p>{randomJoke}</p>
              <Button
                pr={1}
                variant="contained"
                onClick={() =>
                  fetchRandomJoke(
                    categories[Math.floor(Math.random() * categories.length)]
                  )  }  >
                Next
                <ArrowForwardIcon />
              </Button>
              </Box>

            </div>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default ChuckNorrisCategories;

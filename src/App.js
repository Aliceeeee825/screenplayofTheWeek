import React, { useState, useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

//Page specific imports
import request from 'request-promise';

//Material Styles
import { makeStyles } from '@material-ui/core/styles';

//Material-UI Components
import { Grid, Paper, Typography, Tabs, Tab } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";


import swal from "sweetalert";
import MovieCard from './MovieCard'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#defe47',
    },
    secondary: {
      main: '#ff124f',
    },
    accent:{
      main:'#000000'
    }
  },
});

//Page specific CSS
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'black',
    color: 'primary'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    background: 'black',
  },
  preloader: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gridGap: '15px',
    boxShadow: '18px 18px 36px #c2c1c1, -18px -18px 36px #ffffff',
    background: '#fff',
    padding: '10px',
  },
  title: {
    fontSize: "4rem",
    fontFamily: 'limeLight',
    color: 'white',
    textTransform: 'uppercase',
    border: '5px dotted #defe47',
    marginBottom: '6%',
    textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6',
    padding: '2%',
    animation: `$glow 0.4s ${theme.transitions.easing.easeInOut} 4 alternate`
  },
  "@keyframes glow": {
    "from": {
      textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6',
    },
    "to": {
      textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0073e6, 0 0 40px #0073e6, 0 0 50px #0073e6, 0 0 60px #0073e6, 0 0 70px #0073e6',
    },
  },
  backToTop: {
    position: "fixed",
    right: "20px",
    top: "50%",
  },
  mediaType:{
    marginBottom: '5%',
    background: '#efeeee',
  },
  media:{
    '&:hover': {
      background: '#7700a6',
      boxShadow: '0 0 10px #7700a6, 0 0 40px #7700a6, 0 0 80px #7700a6',
      color: '#fff'
    }
  },
  PrivateTabIndicatorColorPrimary11:{
    color: 'white'
  },
}));



function App() {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [fav, setFav] = useState([])
  const [favStatus, setFavStatus] = useState([])
  const [value, setValue] = React.useState(0);
  const [allResults, setAllResults] = useState([])

  useEffect(() => {
  request("https://api.themoviedb.org/3/trending/all/week?api_key=3058422e0d59745070d03d9b781c0d40")
  .then(items => {
    const results = JSON.parse(items).results
    results.map((result, index) => {
        result['index'] = index
      })
      setItems(results)
      setAllResults(results)
      //initialize the fav status by giving all of them 0
      let initFav = []
      for (let i = 0; i < results.length; i ++){
        initFav.push(0)
      }
      setFavStatus([...initFav])
  })
  .catch(e => {
    alert(e)
  })
  }, []);


  const deleteCard = (e) => {
    swal({
      title: "Are you sure?",
      text:"Once deleted, you will not be able to recover this image!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your image has been deleted!", {
            icon: "success",
          });
          setItems(items.filter((item) => item.id !== Number(e)));
        } else {
          swal("Yay! Your image is safe!");
        }
      });
  }

  const addFav = (order, id) =>{
    // find the selected item's infor based on id
    const favToBeAppend = items.filter((item) =>{
      return item.id === Number(id)
    })

    let currFav = fav
    let currFavStatus = favStatus
    const favIndex = fav.findIndex((item)=>{
      return item[0].index === favToBeAppend[0].index
    })
    if(favIndex !== -1){
      currFav.splice(favIndex, 1)
      currFavStatus[favToBeAppend[0].index] = 0
    }else{
      if (fav.length > 2) {
        // if more than 3 items in the favourite, remove the first one and catch it's id 
        // then replace the status by 0
        const removedItem = currFav.shift()
        currFavStatus[removedItem[0].index] = 0
      }
      // add the new one to the fav and replace its status to 1 
      currFav.push(favToBeAppend)
      currFavStatus[order] = 1
    }
    setFavStatus([...currFavStatus]);
    setFav([...currFav]);
  }

  const mediaType = (type) =>{
    let result = []
    if (type === 'all'){
      result = allResults
    }else{
      result = allResults.filter((item)=>{
        return item.media_type === type
      })
    }
    setItems(result)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  

  return (
    <div className={classes.root}>
      {items.length === 0 ? (
        <div className={classes.preloader}>
          <CircularProgress />
        </div>
      ) : (
        <ThemeProvider theme={theme}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid className={classes.paper} item xs={12} sm={10}>
              <Paper className={classes.paper}>
                <Typography variant="h1" component="h1" className={classes.title}>
                  Screenplay of the week
                </Typography>
  
                  <Paper className={classes.tabs}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    className={classes.mediaType}
                    centered
                  >
                    <Tab label="All" className={classes.media} onClick={() => { mediaType('all') }} />
                    <Tab label="Movies" className={classes.media} onClick={() => { mediaType('tv') }}/>
                    <Tab label="TV shows" className={classes.media} onClick={() => { mediaType('movie')}}/>
                  </Tabs>
                </Paper>
  
                <Fab
                  color="primary"
                  aria-label="Back to top"
                  className={classes.backToTop}
                  onClick={backToTop}
                >
                  <NavigationIcon />
                </Fab>
  
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignment="centers"
                  className={classes.cardContainer}
                  item
                  xs
                >
                  {items.map((item) => {
                    return (
                      <MovieCard
                        data={item}
                        delete={deleteCard}
                        addFav={addFav}
                        order={item.index}
                        favStatus={favStatus}
                        key={item.id}
                      />
                    );
                  })}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </div>
  );
}

export default App;

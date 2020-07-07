import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Info from './Info'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: '#fbf9f9',
    borderRadius: '10px',
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  card: {
    position: "relative",
    transition: 'all 0.5s',
    '&:hover':{
      transform: 'scale(1.1)',
      zIndex: '9'
    }
  },
  bttn: {
    justifyContent: "center",
    alignItems: "flex-end",
    flexWrap: 'wrap',
  },
  floatingBttn:{
    position: 'absolute',
    top: '20px',
    background: 'rgba(238,238,238,0.6)',
    padding: '2px',
    borderRadius: '10px',
    border: '1px solid rgba(238,238,238, 0.8)'
  },
  favBttn:{
    left: '70%'
  },
  deleteBttn:{
    left: '85%'
  },
  usersBttn:{
    '&:hover':{
      backgroundColor: 'transparent'
    }
  }
}));

function AlbumCard(props) {
    // catch the props
    const classes = useStyles();
    const photo = props.data
    const deleteCard = props.delete
    const addFav = props.addFav
    const favStatus = props.favStatus

    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
              <Grid key={photo.id} item>
                <div className={classes.card}>
                  <img src={`https://image.tmdb.org/t/p/w200/${photo.poster_path}`}></img>
                <Info movie={photo} delete={deleteCard} addFav={addFav}
                  order={photo.index}
                  favStatus={favStatus}/>
                </div>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
}





export default AlbumCard
import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tooltip from "@material-ui/core/Tooltip";
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});



export default function CustomizedDialogs(props) {
    const [open, setOpen] = React.useState(false);
    const movie = props.movie
    const deleteCard = props.delete
    const addFav = props.addFav
    const order = props.order
    const favStatus = props.favStatus

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 140,
        }, 
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        card:{
          background: '#efeeee',
          maxWidth: '600px',
          display: 'flex',
          justifyContent:'space-evenly',
          padding: '4% 2%',
        },
        info:{
            position:'absolute',
            top: 0,
            right: 0,
            zIndex: 10,
            color: '#fff',
        },
        rating:{
          marginBottom: 0,
          color: '#defe47'
        },
        ratingText:{
          marginTop: '20px'
        },
        cardContent:{
          width: '50%'
        },
        cardAction:{
          padding: 0
        }
    });

    const classes = useStyles();

    return (
      <div>
        <Button
          onClick={handleClickOpen}
          className={classes.info}
        >
          <InfoIcon />
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Grid container className={classes.card}>
            <Grid item>
              <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt='movie poster'></img>
            </Grid>
            <Grid item className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {movie.media_type === 'tv' ? movie.name : movie.title}
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                {movie.overview}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.ratingText}>
                Average rating: {movie.vote_average}
              </Typography>
              <Box component="fieldset" mb={3} borderColor="transparent" className={classes.rating}>
                <Rating
                  name="Average Rating"
                  value={movie.vote_average}
                  precision={0.1}
                  max={10}
                  readOnly
                />
              </Box>

              <div className={classes.cardAction}>
                <Tooltip title="add to favorite (up to three)">
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => addFav(order, movie.id)}
                    className={`${classes.favBttn} ${classes.floatingBttn}`}
                  >
                    <FavoriteBorderIcon
                      color={favStatus[order] === 0 ? "action" : "secondary"}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="delete the photo">
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteCard(movie.id)}
                    className={`${classes.deleteBttn} ${classes.floatingBttn}`}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </Grid>
          </Grid>
        </Modal>
      </div>
    );
}

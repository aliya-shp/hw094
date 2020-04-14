import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import imageNotAvailable from '../../assets/images/image_not_available.jpg';
import {apiURL} from "../../constants";

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const PostCard = props => {
  const classes = useStyles();

  let image = imageNotAvailable;

  if (props.image) {
    image = apiURL + '/' + props.image;
  }
  return (
    <Grid item xs={3} sm={12} md={6} lg={4}>
      <Paper className={classes.root}>
        {props.tags.map((data) => {
          return (
            <Chip
              key={data}
              label={data}
              className={classes.chip}
            />
          );
        })}
      </Paper>
      <Card className={classes.card}>
        <CardMedia image={image} className={classes.media}/>
        <CardContent>
          {props.text}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PostCard;
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';

import {format} from 'date-fns';

const useStyles = makeStyles(theme => ({
  card: {
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ItemCard(props) {
  const classes = useStyles();

  const formatAnilistDate = (year, month, date) => {
    let formatDate = new Date(year, month-1, date);
    return format(formatDate, 'MMMM dd, Y');
  };

  const anime = props.anime;

  return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {anime.averageScore}
                </Avatar>
              }
              title={anime.title.romaji}
              subheader={formatAnilistDate(anime.startDate.year, anime.startDate.month, anime.startDate.day)}
          />

          <CardMedia
              className={classes.media}
              image={anime.coverImage.extraLarge}
              title={anime.title.english}
          />

          <CardContent>
            <Typography variant="body2" component="p" color="textSecondary">
              {anime.description}
            </Typography>
          </CardContent>

        </CardActionArea>
      </Card>
  )
}

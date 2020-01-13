import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import SearchBar from 'material-ui-search-bar'
import Nav from './Nav/Nav';
import ItemCard from './ItemCard/ItemCard';
import { styled } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import {useLazyQuery} from '@apollo/react-hooks';
import {Typography} from "@material-ui/core";
import Link from '@material-ui/core/Link';

const MainSearchBar = styled(SearchBar)({
  marginTop: 20,
});

const GET_ANIMES = gql`
    query ($id: Int, $page: Int, $perPage: Int, $search: String) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }

            media (id: $id, type: ANIME, search: $search) {
                id
                title {
                    english
                    romaji
                }
                startDate{
                    year
                    month
                    day
                }
                description
                averageScore
                coverImage {
                    extraLarge
                }
            }
        }
    }
`;

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  paginationButton: {
    marginRight: 10
  }
}));

function App() {
  const [value, setValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const classes = useStyles();

  const [getAnimes, { loading, error, data }] = useLazyQuery(GET_ANIMES, {
    onCompleted: data => {
      console.log('Last Page');
      setLastPage(data.Page.pageInfo.lastPage);
    }
  });

  function handleCancel() {
    setValue('')
  }

  function handlePageGo(pageNumber) {
    setCurrentPage(pageNumber);

    getAnimes({
      variables: {
        search: value,
        page: pageNumber,
        perPage: 6
      }
    });
  }

  function handleSearch() {
    getAnimes({
      variables: {
        search: value,
        perPage: 6,
      }
    });
  }

  if (loading){
    return(
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (error) return <p>Error :(</p>;

  return (
    <>
      <Nav />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainSearchBar
                value={value}
                onChange={(newValue) => setValue(newValue)}
                onRequestSearch={() => handleSearch()}
                onCancelSearch={() => handleCancel()}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography align="center">
              {data && data.Page && currentPage !== 1 &&
                <Link onClick={() => handlePageGo(1)}
                      variant="button"
                      component="button"
                      className={classes.paginationButton}>
                  First
                </Link>
              }
              {currentPage !== 1 && data &&
                <Link onClick={() => handlePageGo(currentPage-1)}
                      variant="button"
                      component="button"
                      className={classes.paginationButton}>
                  Previous
                </Link>
              }
              <Link variant="button" className={classes.paginationButton}>
                {currentPage}
              </Link>

              {data && data.Page.pageInfo.hasNextPage &&
                <Link
                    onClick={() => handlePageGo(currentPage+1)}
                    variant="button"
                    component="button"
                    className={classes.paginationButton}>
                  Next
                </Link>
              }

              {data && data.Page.pageInfo.hasNextPage &&
                <Link onClick={() => handlePageGo(lastPage)} variant="button" component="button">
                  Last
                </Link>
              }
            </Typography>
          </Grid>
          {data &&
            <Grid item xs={12}>
              <Typography variant="h4">Total Records: {data.Page.pageInfo.total}</Typography>
            </Grid>
          }

          {data && data.Page.media.map((anime) =>
            <Grid item xs={4} key={`grid-${anime.id}`}>
              <ItemCard anime={anime} />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  )
}

export default App;

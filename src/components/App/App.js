import React from "react";
import { useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import GlobalStyles from "../GlobalStyles";
import ArtistRoute from "../../components/ArtistRoute";

import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";

const DEFAULT_ARTIST_ID = "58XGUNsRNu3cVOIOYk5chx";

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(requestAccessToken());
    fetch("/spotify_access_token")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(receiveAccessToken(data.access_token));
      })
      .catch((err) => {
        console.log(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/artists/:id">
            <ArtistRoute />
          </Route>
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`}></Redirect>
        </Switch>
      </Router>
    </>
  );
};

export default App;

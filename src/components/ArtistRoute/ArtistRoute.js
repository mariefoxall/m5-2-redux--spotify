import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchArtistProfile } from "../../helpers/api-helpers";
import { useParams } from "react-router-dom";
import {
  requestArtistProfile,
  receiveArtistProfile,
  receiveArtistProfileError,
} from "../../actions";

// class ArtistRoute extends Component {
//   render() {
//     return <div />;
//   }
// }

const ArtistRoute = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const artistStatus = useSelector((state) => state.artists.status);
  const accessToken = useSelector((state) => state.auth.token);
  const artistId = useParams().id;

  const state = useSelector((state) => state);
  console.log(state);

  // const [artistProfile, setArtistProfile] = React.useState({});

  const artistProfile = useSelector((state) => state.artists.currentArtist);

  React.useEffect(() => {
    if (!accessToken) {
      return;
    }
    dispatch(requestArtistProfile());
    fetchArtistProfile(accessToken, artistId)
      .then((data) => {
        console.log(data);
        dispatch(receiveArtistProfile(data));
        // setArtistProfile(data);
      })
      .catch((err) => {
        console.log(err);
        dispatch(receiveArtistProfileError());
      });
  }, [accessToken]);

  console.log(artistProfile);
  return (
    <>
      {artistStatus === "loading" ? (
        <div>LOADING...</div>
      ) : (
        <>
          {artistProfile && (
            <>
              <img src={artistProfile.images[1].url} alt="Ty Segall" />
              <div>{artistProfile.name}</div>
              <div>
                {Math.floor(artistProfile.followers.total / 1000)}K followers
              </div>
              <div>{artistProfile.genres[4]}</div>
              <div>{artistProfile.genres[6]}</div>
            </>
          )}
        </>
      )}
    </>
  );
  // return <div> HELLO </div>;
};

export default ArtistRoute;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

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
            <ProfileDiv>
              <ArtistImage src={artistProfile.images[1].url} alt="Ty Segall" />
              <ArtistName>{artistProfile.name}</ArtistName>
              <Followers>
                {Math.floor(artistProfile.followers.total / 1000)}K{" "}
                <span>followers</span>
              </Followers>
              <Tags>tags</Tags>
              <GenreDiv>
                <Genre>{artistProfile.genres[4]}</Genre>
                <Genre>{artistProfile.genres[6]}</Genre>
              </GenreDiv>
            </ProfileDiv>
          )}
        </>
      )}
    </>
  );
  // return <div> HELLO </div>;
};

const ProfileDiv = styled.div``;

const ArtistImage = styled.img`
  position: absolute;
  width: 175px;
  height: 175px;
  left: 100px;
  top: 59px;
  border-radius: 190.5px;
`;

const ArtistName = styled.h1`
  position: absolute;
  width: 268px;
  height: 59px;
  left: 75px;
  top: 150px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 59px;
  /* identical to box height */

  /* White */

  color: #ffffff;
  /* Triple shadow */

  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5),
    4px 8px 25px #000000;
`;

const Followers = styled.p`
  position: absolute;
  width: 150px;
  height: 17px;
  left: 141px;
  top: 257px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  text-transform: lowercase;

  color: #ff4fd8;

  & span {
    color: white;
    background: transparent;
  }
`;

const Tags = styled.h2`
  position: absolute;
  width: 48px;
  height: 26px;
  left: 164px;
  top: 478px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;
  /* identical to box height */

  text-transform: lowercase;

  /* White */

  color: #ffffff;
`;

const GenreDiv = styled.div`
  position: absolute;
  top: 528px;
  left: 70px;
  display: flex;
  margin: auto;
  background: transparent;
`;

const Genre = styled.div`
  background: rgba(75, 75, 75, 0.4);
  border-radius: 4px;
  color: white;
  padding: 5px 10px;
  margin: 5px;
`;

export default ArtistRoute;

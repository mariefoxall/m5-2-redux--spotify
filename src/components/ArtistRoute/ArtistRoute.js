import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import PlayButton from "react-play-button";

import { fetchArtistProfile, fetchTopTracks } from "../../helpers/api-helpers";
import { useParams } from "react-router-dom";
import {
  requestAllArtistInfo,
  receiveArtistProfile,
  receiveArtistInfoError,
  receiveTopTracks,
  finishReceivingAllArtistInfo,
} from "../../actions";

// class ArtistRoute extends Component {
//   render() {
//     return <div />;
//   }
// }

const ArtistRoute = () => {
  const dispatch = useDispatch();
  const artistStatus = useSelector((state) => state.artists.status);
  const accessToken = useSelector((state) => state.auth.token);
  const artistId = useParams().id;
  const artistProfile = useSelector((state) => state.artists.currentArtist);
  const topTracks = useSelector((state) => state.artists.topTracks);

  const [isTrackOnePlaying, setIsTrackOnePlaying] = React.useState(false);
  const [isTrackTwoPlaying, setIsTrackTwoPlaying] = React.useState(false);
  const [isTrackThreePlaying, setIsTrackThreePlaying] = React.useState(false);

  const playTrackOne = () => {
    setIsTrackOnePlaying(true);
    setIsTrackTwoPlaying(false);
    setIsTrackThreePlaying(false);
  };

  const playTrackTwo = () => {
    setIsTrackOnePlaying(false);
    setIsTrackTwoPlaying(true);
    setIsTrackThreePlaying(false);
  };
  const playTrackThree = () => {
    setIsTrackOnePlaying(false);
    setIsTrackTwoPlaying(false);
    setIsTrackThreePlaying(true);
  };

  const stopTrackOne = () => {
    setIsTrackOnePlaying(false);
  };

  const stopTrackTwo = () => {
    setIsTrackTwoPlaying(false);
  };
  const stopTrackThree = () => {
    setIsTrackThreePlaying(false);
  };

  console.log(topTracks);

  React.useEffect(() => {
    if (!accessToken) {
      return;
    }
    dispatch(requestAllArtistInfo());
    const artistPromise = fetchArtistProfile(accessToken, artistId)
      .then((data) => {
        console.log(data);
        dispatch(receiveArtistProfile(data));
        // setArtistProfile(data);
      })
      .catch((err) => {
        console.log(err);
        dispatch(receiveArtistInfoError());
      });
    const tracksPromise = fetchTopTracks(accessToken, artistId)
      .then((data) => {
        console.log(data);
        dispatch(receiveTopTracks(data));
        // setArtistProfile(data);
      })
      .catch((err) => {
        console.log(err);
        dispatch(receiveArtistInfoError());
      });

    Promise.all([artistPromise, tracksPromise]).then(() =>
      dispatch(finishReceivingAllArtistInfo())
    );
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
              {
                topTracks && (
                  <Tracks>
                    <h2>top tracks</h2>
                    <PlayDiv>
                      <PlayButton
                        url={topTracks.tracks[0].preview_url}
                        playIconColor="white"
                        stopIconColor="white"
                        idleBackgroundColor="#494946"
                        activeBackgroundColor="#FF4FD8"
                        progressCircleColor="#3354FF"
                        progressCircleWidth="1"
                        active={isTrackOnePlaying}
                        play={playTrackOne}
                        stop={stopTrackOne}
                        iconAnimationLength="500"
                        fadeInLength="1000"
                        fadeOutLength="1000"
                      />
                      <PlayButton
                        url={topTracks.tracks[1].preview_url}
                        playIconColor="white"
                        stopIconColor="white"
                        idleBackgroundColor="#494946"
                        progressCircleColor="#3354FF"
                        progressCircleWidth="1"
                        active={isTrackTwoPlaying}
                        play={playTrackTwo}
                        stop={stopTrackTwo}
                      />
                      <PlayButton
                        url={topTracks.tracks[2].preview_url}
                        playIconColor="white"
                        stopIconColor="white"
                        idleBackgroundColor="#494946"
                        progressCircleColor="#3354FF"
                        progressCircleWidth="1"
                        active={isTrackThreePlaying}
                        play={playTrackThree}
                        stop={stopTrackThree}
                      />
                    </PlayDiv>
                  </Tracks>
                )
                // <Tracks>{topTracks.tracks[0].name}</Tracks>
              }
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

const Tracks = styled.div`
  color: white;
  position: absolute;
  top: 340px;
  background: transparent;
  width: 200px;
  left: 87px;
  text-align: center;
`;

const PlayDiv = styled.div`
  display: flex;
  background: transparent;
  justify-content: space-between;
`;

export default ArtistRoute;

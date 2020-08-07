export const requestAccessToken = () => ({
  type: "REQUEST_ACCESS_TOKEN",
});

export const receiveAccessToken = (token) => ({
  type: "RECEIVE_ACCESS_TOKEN",
  token,
});

export const receiveAccessTokenError = () => ({
  type: "RECEIVE_ACCESS_TOKEN_ERROR",
});

// export const requestArtistProfile = () => ({
//   type: "REQUEST_ARTIST_PROFILE",
// });

export const requestAllArtistInfo = () => ({
  type: "REQUEST_ALL_ARTIST_INFO",
});

export const receiveArtistProfile = (data) => ({
  type: "RECEIVE_ARTIST_PROFILE",
  data,
});

export const receiveArtistInfoError = () => ({
  type: "RECEIVE_ARTIST_INFO_ERROR",
});

export const receiveTopTracks = (data) => ({
  type: "RECEIVE_TOP_TRACKS",
  data,
});

export const finishReceivingAllArtistInfo = () => ({
  type: "FINISH_RECEIVING_ALL_ARTIST_INFO",
});

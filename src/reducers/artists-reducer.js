const initialState = {
  currentArtist: null,
  status: "idle",
  topTracks: null,
};

export default function artistReducer(state = initialState, action) {
  switch (action.type) {
    // case "REQUEST_ARTIST_PROFILE": {
    //   return {
    //     ...state,
    //     status: "loading",
    //   };
    // }
    case "REQUEST_ALL_ARTIST_INFO": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_ARTIST_PROFILE": {
      return {
        ...state,
        currentArtist: action.data,
      };
    }
    case "RECEIVE_ARTIST_INFO_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }
    case "RECEIVE_TOP_TRACKS": {
      return {
        ...state,
        topTracks: action.data,
      };
    }
    case "FINISH_RECEIVING_ALL_ARTIST_INFO": {
      return {
        ...state,
        status: "idle",
      };
    }
    default: {
      return state;
    }
  }
}

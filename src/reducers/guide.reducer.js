import {
  CREATE_SHOW,
  RETRIEVE_SHOWS,
  UPDATE_SHOW,
  DELETE_SHOW,
} from "../actions/types.constants";

const initialState = [];

function showReducer(guide = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_SHOW:
      return [...guide, payload];

    case RETRIEVE_SHOWS:
      return payload;

    case UPDATE_SHOW:
      return guide.map((show) => {
        if (show.id === payload.id) {
          return {
            ...show,
            ...payload,
          };
        } else {
          return show;
        }
      });

    case DELETE_SHOW:
      return guide.filter(({ id }) => id !== payload.id);

    default:
      return guide;
  }
};

export default showReducer;
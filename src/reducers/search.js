import { SEARCH_REPO } from "../actions/search";

export default (state = "", { type, payload }) => {
  switch (type) {
    case SEARCH_REPO:
      return payload;

    default:
      return state;
  }
};
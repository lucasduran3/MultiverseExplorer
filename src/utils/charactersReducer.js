import characterActions from './charactersActions';

const charactersReducer = (state, action) => {
  switch (action.type) {
    case characterActions.FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case characterActions.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.results,
        pagination: action.payload.info,
      };
    case characterActions.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pagination: { count: 0, pages: 0, next: null, prev: null },
      };
    default:
      throw new Error();
  }
};

export default charactersReducer;

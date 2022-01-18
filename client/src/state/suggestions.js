import { get } from 'axios';

const getSuggestions = async (stock) => {
  try {
    const { data } = await get(
      `https://stock-market-analyser-backend.herokuapp.com/stock/predautosuggest/${stock}`,
    );
    return new Promise((resolve, reject) => {
      if (data) {
        resolve(data);
      } else {
        reject();
      }
    });
  } catch (err) {
    throw new Error(err);
  }
};

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CLEAR': {
      const notid = !state.id;
      return { ...state, suggestionList: [], id: notid };
    }
    case 'SUGGEST': {
      const notid = !state.id;
      if (payload.length > 2) {
        getSuggestions(payload)
          .then((result) => {
            if (result.length > 10) {
              console.log(result.slice(0, 10));
              return {
                ...state,
                suggestionList: result.slice(0, 10),
                id: notid,
              };
            }
            console.log(result);
            return { ...state, suggestionList: result, id: notid };
          })
          .catch((err) => {
            throw new Error(err);
          });
      } else {
        return { ...state, id: notid };
      }
      break;
    }
    default: {
      throw new Error('No such dispatch type');
    }
  }
};

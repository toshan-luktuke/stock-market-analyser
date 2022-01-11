import { get } from 'axios';

const getSuggestions = async (stock) => {
  try {
    const { data } = await get(
      `http://127.0.0.1:5000/stock/predautosuggest/${stock}`,
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
          .catch((err) => console.log(err));
      } else {
        return { ...state, id: notid };
      }
    }
    case 'CLEAR': {
      const notid = !state.id;
      return { ...state, suggestionList: [], id: notid };
    }
    case 'NONE': {
      const notid = !state.id;
      return { ...state, id: notid };
    }
    default:
      throw new Error('No such dispatch type');
  }
};

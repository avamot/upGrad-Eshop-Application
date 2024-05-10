import axios from 'axios';

const initState = 
(axios.get('http://localhost:8080/api/products/')).response.data;


const Catalogue = (state = initState, action) => {
  switch (action.type) {
    case "SET_FILTER": {
        return {
            ...state,
            filter: action.filter
        };
    }
    case "CLEAR_FILTER": {
        return {
            ...state,
            filter: null
        };
    }
    default: {
        return state;
    }
  }
};

export default Catalogue;
import {FETCHING_DATA} from '../actions/eveactions';

const initState = {
    isFetching: false
};

const reducer = (state = initState, action) => {
    switch(action.type) {
        case FETCHING_DATA:
            return {...state, isFetching: true};
        default:
            return state;
    };
}

export default reducer;
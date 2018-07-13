const initalState = {
    user: {},
    listings: [],
    hostListings: []
}

const USER_DATA = 'USER_DATA';
const GET_LISTINGS = 'GET_LISTINGS';
const GET_HOST_LISTINGS = 'GET_HOST_LISTINGS';

export default function reducer(state = initalState, action) {
    switch (action.type) {
        case USER_DATA:
            return Object.assign({}, state, { user: action.payload })
        case GET_LISTINGS:
            return Object.assign({}, state, { listings: action.payload })
        case GET_HOST_LISTINGS:
            return Object.assign({}, state, { hostListings: action.payload })
        default: return state;
    }
}

export const getUserData = (user) => {
    return {
        type: USER_DATA,
        payload: user
    }
}

export const getListings = (listings) => {
    return {
        type: GET_LISTINGS,
        payload: listings
    }
}

export const getHostListings = (hostListings) => {
    return {
        type: GET_HOST_LISTINGS,
        payload: hostListings
    }
}
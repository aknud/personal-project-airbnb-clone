const initalState = {
    user: {},
    listings: [],
    hostListings: []
}

const USER_DATA = 'USER_DATA';
const GET_LISTINGS = 'GET_LISTINGS';
const GET_HOST_LISTINGS = 'GET_HOST_LISTINGS';
const ADD_LISTING = 'ADD_LISTING';

export default function reducer(state = initalState, action) {
    switch (action.type) {
        case USER_DATA:
            return Object.assign({}, state, { user: action.payload })
        case GET_LISTINGS:
            return Object.assign({}, state, { listings: action.payload })
        case GET_HOST_LISTINGS:
            return Object.assign({}, state, { hostListings: action.payload })
        case ADD_LISTING:
            return Object.assign({}, state, {newListing: action.payload})
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

export const addListing = (newListing) => {
    return {
        type: ADD_LISTING,
        payload: newListing
    }
}
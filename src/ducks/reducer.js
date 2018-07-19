const initalState = {
    user: {},
    listings: [],
    hostListings: [],
    allUserData: []
}

const USER_DATA = 'USER_DATA';
const ALL_USER_DATA = 'ALL_USER_DATA';
const GET_LISTINGS = 'GET_LISTINGS';
const GET_HOST_LISTINGS = 'GET_HOST_LISTINGS';
const UPDATE_LISTING = 'UPDATE_LISTING';

export default function reducer(state = initalState, action) {
    switch (action.type) {
        case USER_DATA:
            return Object.assign({}, state, { user: action.payload })
        case ALL_USER_DATA:
            return Object.assign({}, state, { allUserData: action.payload })
        case GET_LISTINGS:
            return Object.assign({}, state, { listings: action.payload })
        case GET_HOST_LISTINGS:
            return Object.assign({}, state, { hostListings: action.payload })
        case UPDATE_LISTING:
            const newListings = action.payload
            const hostListings = newListings.filter( listing => listing.user_id === state.user.user_id)
            return Object.assign({}, state, { listings: newListings, hostListings: hostListings })
        default: return state;
    }
}

export const getUserData = (user) => {
    return {
        type: USER_DATA,
        payload: user
    }
}

export const getAllUserData = (userData) => {
    return {
        type: ALL_USER_DATA,
        payload: userData
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

export const updateListing = (listings) => {
    return {
        type: UPDATE_LISTING,
        payload: listings
    }
}

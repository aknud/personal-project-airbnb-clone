const initalState = {
    user: {},
    listings: []
}

const USER_DATA = 'USER_DATA';
const GET_LISTINGS = 'GET_LISTINGS';
const GET_USER_LISTINGS = 'GET_USER_LISTINGS';

export default function reducer(state = initalState, action) {
    switch (action.type) {
        case USER_DATA:
            return Object.assign({}, state, { user: action.payload })
        case GET_LISTINGS:
            return Object.assign({}, state, { listings: action.payload })
        case GET_USER_LISTINGS:
            return Object.assign({}, state, { userListings: action.payload })
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

export const getUserListings = (userListings) => {
    return {
        type: GET_USER_LISTINGS,
        payload: userListings
    }
}
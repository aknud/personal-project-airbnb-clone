const initalState = {
    user: {},
    host_id: [],
    listings: [],
    saved_listings: [],
    host_listings: [],
    all_user_data: [],
    photos: [],
    search: ''
}

const USER_DATA = 'USER_DATA';
const HOST_DATA = 'HOST_DATA';
const ALL_USER_DATA = 'ALL_USER_DATA';
const GET_LISTINGS = 'GET_LISTINGS';
const GET_HOST_LISTINGS = 'GET_HOST_LISTINGS';
const UPDATE_LISTING = 'UPDATE_LISTING';
const SEARCH_LISTINGS = 'SEARCH_LISTINGS';
const GET_PHOTOS = 'GET_PHOTOS';
const UPDATE_PHOTOS = 'UPDATE_PHOTOS';
const SAVED_LISTINGS = 'SAVED_LISTINGS';

export default function reducer(state = initalState, action) {
    switch (action.type) {
        case USER_DATA:
            return Object.assign({}, state, { user: action.payload })
        case HOST_DATA:
            return Object.assign({}, state, { host_id: action.payload })
        case ALL_USER_DATA:
            return Object.assign({}, state, { all_user_data: action.payload })
        case GET_LISTINGS:
            return Object.assign({}, state, { listings: action.payload })
        case GET_HOST_LISTINGS:
            return Object.assign({}, state, { host_listings: action.payload })
        case GET_PHOTOS:
            return Object.assign({}, state, { photos: action.payload })
        case UPDATE_LISTING:
            const newListings = action.payload
            const hostListings = newListings.filter( listing => listing.user_id === state.user.user_id)
            return Object.assign({}, state, { listings: newListings, host_listings: hostListings })
        case UPDATE_PHOTOS:
            return Object.assign({}, state, {photos: action.payload})
        case SEARCH_LISTINGS:
            return Object.assign({}, state, { search: action.payload })
        case SAVED_LISTINGS:
            console.log('saved_listings on reducer',action.payload)
            return Object.assign({}, state, { saved_listings: action.payload })
        default: return state;
    }
}

export const getUserData = (user) => {
    return {
        type: USER_DATA,
        payload: user
    }
}
export const getHostData = (host_id) => {
    return {
        type: HOST_DATA,
        payload: host_id
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

export const getHostListings = (host_listings) => {
    return {
        type: GET_HOST_LISTINGS,
        payload: host_listings
    }
}

export const updateListing = (listings) => {
    return {
        type: UPDATE_LISTING,
        payload: listings
    }
}

export const searchListings = (search) => {
    return {
        type: SEARCH_LISTINGS,
        payload: search
    }
}

export const savedListings = (listing) => {
    return {
        type: SAVED_LISTINGS,
        payload: listing
    }
}

export const getPhotos = (photos) => {
    return {
        type: GET_PHOTOS,
        payload: photos
    }
}

export const updatePhotos = (photos) => {
    return {
        type: UPDATE_PHOTOS,
        payload: photos
    }
}
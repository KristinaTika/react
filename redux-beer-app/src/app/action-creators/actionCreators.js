import axios from 'axios';
import { beersEndpoint, searchFoodEndpoint } from '../../constants/constants';

export const FETCH_BEERS = "FETCH_BEERS";
export const FETCH_SINGLE_BEER = "FETCH_SINGLE_BEER";
export const FETCH_RANDOM_BEER = "FETCH_RANDOM_BEER";
export const FETCH_SEARCHED_BEERS = "FETCH_SEARCHED_BEERS";

const handleBeers = (beers) => {
    return {
        type: FETCH_BEERS,
        beers
    }
}

export const fetchBeers = () => {
    return dispatch => {
        return axios.get(beersEndpoint)
        .then(res => dispatch(handleBeers(res.data)))
        .catch(err => console.log("Something went wrong!", err));
    }
}

const handleSingleBeer = (beer) => {
    return {
        type: FETCH_SINGLE_BEER,
        beer
    }
}

export const fetchSingleBeer = (id) => {
    return dispatch => {
        return axios.get(`${beersEndpoint}/${id}`)
        .then(res => dispatch(handleSingleBeer(res.data)))
        .catch(err => console.log("Something went wrong!", err));
    }
}

const handleRandomBeer = (randomBeer) => {
    return {
        type: FETCH_RANDOM_BEER,
        randomBeer
    }
}

export const fetchRandomBeer = () => {
    return dispatch => {
        return axios.get(`${beersEndpoint}/random`)
        .then(res => dispatch(handleRandomBeer(res.data)))
        .catch(err => console.log("Something went wrong!", err));
    }
}

const handleSearchedBeers = (searchedBeers) => {
    return {
        type: FETCH_SEARCHED_BEERS,
        searchedBeers
    }
}

export const fetchSearchedBeers = (searchValue) => {
    return dispatch => {
        return axios.get(`${searchFoodEndpoint}${searchValue}`)
        .then(res => dispatch(handleSearchedBeers(res.data)))
    }
}
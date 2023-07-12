import axios from 'axios'

export const getAllSongs = (page=1) => {
    return axios.get(`http://localhost:5000/songs?page=${page}`);
}

export const getSongbyTitle = (title) => {
    return axios.get(`http://localhost:5000/songs/${title}`);
}

export const postRatings = (title) =>{
    return axios.post(`http://localhost:5000/songs/${title}/rate`)
}
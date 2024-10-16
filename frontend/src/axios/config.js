import axios from 'axios';

const ListFetch = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        'Content-type': 'application/json'
    },
})

export default ListFetch
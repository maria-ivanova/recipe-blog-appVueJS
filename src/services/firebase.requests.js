import axios from 'axios';
import { DATABASE_URL, RESIPES_DB, CATEGORIES_DB } from '../constants/db.js';

const postCreate = (data) => {
    return fetch(`${DATABASE_URL}/${RESIPES_DB}.json`, {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
};

const postEdit = (id, data) => {
    return fetch(`${DATABASE_URL}/${RESIPES_DB}/${id}.json`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
}

const getItemInfo = (id) => {
    return fetch(`${DATABASE_URL}/${RESIPES_DB}/${id}.json`);
}

const getData = () => {
    return axios.get(`${RESIPES_DB}.json`);
}

const getCategories = () => {
    return axios.get(`${CATEGORIES_DB}.json`);
}

const deleteItem = (id) => {
    return fetch(`${DATABASE_URL}/${RESIPES_DB}/${id}.json`, {
        method: 'DELETE'
    })
}

export {
    postCreate,
    postEdit,
    getData,
    getCategories,
    deleteItem,
    getItemInfo
}

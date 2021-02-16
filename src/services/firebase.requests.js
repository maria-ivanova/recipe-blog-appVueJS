import axios from 'axios';
import { RESIPES_DB, CATEGORIES_DB } from '../constants/db.js';

const postCreate = (data) => {
    return axios.post(`${RESIPES_DB}.json`, data);
};

const postEdit = (id, data) => {
    return axios.put(`${RESIPES_DB}/${id}.json`, data)
}

const getItemInfo = (id) => {
    return axios.get(`${RESIPES_DB}/${id}.json`);
}

const getData = () => {
    return axios.get(`${RESIPES_DB}.json`);
}

const getCategories = () => {
    return axios.get(`${CATEGORIES_DB}.json`);
}

const deleteItem = (id) => {
    return axios.delete(`${RESIPES_DB}/${id}.json`);
}

export {
    postCreate,
    postEdit,
    getData,
    getCategories,
    deleteItem,
    getItemInfo
}

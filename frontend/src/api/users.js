import axios from 'axios';

const BASE_URL = '/api/users';

export const getUsers = () => axios.get(BASE_URL);
export const getUserById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createUser = (data) => axios.post(BASE_URL, data);
export const deleteUser = (id) => axios.delete(`${BASE_URL}/${id}`);
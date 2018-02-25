import axios from 'axios';

let base = 'http://127.0.0.1:3000/appointment';

export const requestLogin = params => {
  return axios.post(`/login`, params).then(res => res.data);
};

export const getUserListPage = (name, page) => {
  return axios.get(`${base}/getuser`, { params:{name: name, page: page }});
 };

export const deleteUser = params => {
  return axios.get(`${base}/deleteUser`, { params: params });
};

export const editUser = params => {
  return axios.post(`${base}/editUser`, params)
};

export const addUser = params => {
  return axios.post(`${base}/addUser`, {
    name: params.name,
    card_id: params.card_id,
    age: params.age,
    gender: params.gender
  })
};

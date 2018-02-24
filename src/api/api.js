import axios from 'axios';

let base = 'localhost:3000/appointment';

export const requestLogin = params => { return axios.post(`/login`, params).then(res => res.data); };

// export const getUserList = () => { return axios.get('localhost:3000/appointment/getUser', { name: '', page: 1 }); };

export const getUserListPage = (name, page) => {
  return axios.get('http://127.0.0.1:3000/appointment/getuser', { params:{name: name, page: page }});
 };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

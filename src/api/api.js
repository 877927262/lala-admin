import axios from 'axios';

let base = 'http://127.0.0.1:3000/appointment';

export const requestLogin = params => {
  return axios.post(`/login`, params).then(res => res.data);
};
// 查询用户
export const getUserListPage = (name, page) => {
  return axios.get(`${base}/getuser`, { params:{name: name, page: page }});
 };
// 删除用户
export const deleteUser = params => {
  return axios.get(`${base}/deleteUser`, { params: params });
};
// 编辑用户
export const editUser = params => {
  return axios.post(`${base}/editUser`, params)
};
// 新增用户
export const addUser = params => {
  return axios.post(`${base}/addUser`, {
    name: params.name,
    card_id: params.card_id,
    age: params.age,
    gender: params.gender
  })
};

// 查询大夫
export const getDoctorListPage = (name, page) => {
    return axios.get(`${base}/getDoctor`, { params:{name: name, page: page }});
};
//获取所有的科室
export const getAllDepartment = (name, page) => {
    return axios.get(`${base}/getAllDepartment`);
};
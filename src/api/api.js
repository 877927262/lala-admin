import axios from 'axios';

let base = 'http://127.0.0.1:3000/appointment';
// 登录
export const requestLogin = params => {
  return axios.post(`${base}/login`, params).then(res => res.data);
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
// 删除大夫
export const deleteDoctor = params => {
    return axios.get(`${base}/deleteDoctor`, { params: params });
};
// 新增大夫
export const addDoctor = params => {
    return axios.post(`${base}/addDoctor`, {
        name: params.name,
        age: params.age,
        gender: params.gender,
        department: params.initDepartmentValue
    })
};
// 编辑大夫
export const editDoctor = params => {
    return axios.post(`${base}/editDoctor`, params)
};

// 查询科室
export const getDepartmentListPage = (name, page) => {
    return axios.get(`${base}/getDepartment`, { params:{name: name, page: page }});
};
// 删除科室
export const deleteDepartment = params => {
    return axios.get(`${base}/deleteDepartment`, { params: params });
};
// 新增科室
export const addDepartment = params => {
    return axios.post(`${base}/addDepartment`, {
        name: params.name,
        banner: params.banner
    })
};
// 编辑科室
export const editDepartment = params => {
    return axios.post(`${base}/editDepartment`, params)
};




// 查询病症
export const getIllnessListPage = (name, page) => {
    return axios.get(`${base}/getIllness`, { params:{name: name, page: page }});
};
// 删除病症
export const deleteIllness = params => {
    return axios.get(`${base}/deleteIllness`, { params: params });
};
// 新增病症
export const addIllness = params => {
    return axios.post(`${base}/addIllness`, {
        name: params.name,
        banner: params.banner
    })
};
// 编辑病症
export const editIllness = params => {
    return axios.post(`${base}/editIllness`, params)
};


// 查询预约
export const getAppointmentListPage = (name, page) => {
    return axios.get(`${base}/getAppointment`, { params:{name: name, page: page }});
   };
// 删除预约
export const deleteAppointment = params => {
    return axios.get(`${base}/deleteAppointment`, { params: params });
};
  // 编辑预约
//   export const editAppointment = params => {
//     return axios.post(`${base}/editAppointment`, params)
//   };
//   // 新增预约
//   export const addAppointment = params => {
//     return axios.post(`${base}/addAppointment`, {
//       name: params.name,
//       card_id: params.card_id,
//       age: params.age,
//       gender: params.gender
//     })
//   };
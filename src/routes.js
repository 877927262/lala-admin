import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import User from './views/user/user.vue'
import Doctor from './views/doctor/doctor.vue'
import Illness from './views/illness/illness.vue'
import Appointment from './views/appointment/appointment.vue'
import Department from './views/department/department.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '患者',
        iconCls: 'fa el-icon-message',//图标样式class
        children: [
            // { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/user', component: User, name: '患者信息' },
            // { path: '/form', component: Form, name: 'Form' },
            // { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '大夫',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/doctor', component: Doctor, name: '大夫信息' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '科室',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/department', component: Department, name: '科室信息' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '病症',
        iconCls: 'fa fa-address-card',
        // leaf: true,//只有一个节点
        children: [
            { path: '/illness', component: Illness, name: '病症信息' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '挂号',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/appointment', component: Appointment, name: '挂号记录' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;

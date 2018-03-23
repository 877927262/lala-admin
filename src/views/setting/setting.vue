<template>
    <div class="p-t-lg">
        <el-row class="m-t-lg">
            <el-col :span="24">
        		<el-button size="small" type="primary" class="pull-right" @click="back">返回</el-button>
                <div class="changeInfo">
                    <h1>修改个人信息</h1>
                    <el-form  label-width="100px"  class="form" :model="userInfo" :rules="rules1" ref="userInfo">
                        <el-form-item>
                            <div class="logo-box">
                                <img :src="userInfo.logo" class="avatar">
                            </div>
                        </el-form-item>
                        <el-form-item label="头像地址:" prop="logo">
                            <el-input v-model="userInfo.logo">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="修改昵称:" prop="name">
                            <el-input v-model="userInfo.name">
                            </el-input>
                        </el-form-item>
                        <el-form-item >
                            <el-button type="primary" @click="changeUserInfo('userInfo')">确认修改</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="changePassword">
                    <h1>修改密码</h1>
                    <el-form  label-width="100px" :model="passwordData" class="form" :rules="rules2" ref="passwordData">
                        <el-form-item label="旧密码:" prop="olderPassword">
                            <el-input v-model="passwordData.olderPassword" type="password">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="新密码:" prop="newPassword">
                            <el-input v-model="passwordData.newPassword" type="password">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="确认密码:" prop="againNewPassword">
                            <el-input v-model="passwordData.againNewPassword" type="password">
                            </el-input>
                        </el-form-item>
                        <el-form-item >
                            <el-button type="primary" @click="changePassword('passwordData')">确认修改</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
	import { editAdminInfo, editAdminPassword } from '../../api/api';

    export default {
        data(){
			// 自定义表单验证规则，解决两次密码输入不一致问题
			var validatePass = (rule, value, callback) => {
				if (value === '') {
				callback(new Error('请输入密码'));
				} else {
				if (this.passwordData.againNewPassword !== '') {
					this.$refs.passwordData.validateField('againNewPassword');
				}
				callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
				callback(new Error('请再次输入密码'));
				} else if (value !== this.passwordData.newPassword) {
				callback(new Error('两次输入密码不一致!'));
				} else {
				callback();
				}
			};

            return {
                //修改个人信息
                userInfo:{
                    id:'',
                    logo:'',
                    name:''
                },
                // 修改密码 表单数据
                passwordData:{
                    id: '',
                    olderPassword:'',
                    newPassword:'',
                    againNewPassword:''
				},
                rules1: {
					logo: [
						{ required: true, message: '请输入图片路径', trigger: 'blur' }
					],
					name: [
						{ required: true, message: '请输入昵称', trigger: 'blur' }
					]
				},
				rules2: {
                    olderPassword:[
						{ required: true,message: '请输入旧密码', trigger: 'blur' }
					],
					newPassword: [
						{ required: true,validator: validatePass, trigger: 'blur' }
					],
					againNewPassword: [
						{ required: true,validator: validatePass2, trigger: 'blur' }
					]
				}
            }
        },
        computed:{
        },
        methods:{
            //跳转到上一级路由
            back(){
				this.$router.go(-1)
            },
            //修改用户信息
            changeUserInfo(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
					if (valid) {
                        // 用户的表单验证通过了，接下来传向后台
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
							let para = Object.assign({}, this.userInfo);
							editAdminInfo(para).then((res) => {
								this.$message({
									message: '修改成功',
									type: 'success'
                                });
                                sessionStorage.removeItem('user');
                                _this.$router.push('/login');
							});
						});
					} else {
						return false;
					}
				});
            },
            //修改密码
            changePassword(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
					if (valid) {
						// 密码的表单验证通过了，接下来传向后台
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
							let para = Object.assign({}, this.passwordData);
							editAdminPassword(para).then((res) => {
                                if(res.data.affectedRows){
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    sessionStorage.removeItem('user');
                                    _this.$router.push('/login');
                                }else{
                                    this.$message({
                                        message: '旧密码输入错误',
                                        type: 'error'
                                    });
                                }
							});
						});
					} else {
						return false;
					}
				});
            }
        },
        mounted(){
            let user = JSON.parse(sessionStorage.getItem('user'));
			this.userInfo.logo = user.avatar;
            this.userInfo.name = user.name;
            this.userInfo.id = user.id;
            this.passwordData.id = user.id;
        }

    }

</script>

<style lang="scss" scoped>
.changeInfo{
  //background: pink;
  .form{
    width: 60%;
    //下面这一堆是上传头像框的样式
    .logo-box {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      position: relative;
      overflow: hidden;
      width: 100px;
      height: 100px;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }

    //头像框的样式到这里截止
  }
}
.changePassword{
  //background: skyblue;
  .form{
    width: 60%;
  }
}
</style>
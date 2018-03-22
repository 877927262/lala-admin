<template>
    <div class="p-t-lg">
        <el-button size="small" type="primary" class="pull-right" @click="back">返回</el-button>
        <el-row class="m-t-lg">
            <el-col :span="24">
                <div class="changeInfo">
                    <h1>修改个人信息</h1>
                    <el-form  label-width="100px"  class="form">
                        <el-form-item>
                            <div class="logo-box">
                                <img :src="userInfo.logo" class="avatar">
                            </div>
                        </el-form-item>
                        <el-form-item label="头像地址:">
                            <el-input v-model="userInfo.logo">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="修改昵称:">
                            <el-input v-model="userInfo.name">
                            </el-input>
                        </el-form-item>
                        <el-form-item >
                            <el-button type="primary" @click="changeUserInfo">确认修改</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="changePassword">
                    <h1>修改密码</h1>
                    <el-form  label-width="100px" :model="passwordData" class="form">
                        <el-form-item label="旧密码:">
                            <el-input v-model="passwordData.olderPassword" type="password">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="新密码:">
                            <el-input v-model="passwordData.newPassword" type="password">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="确认密码:">
                            <el-input v-model="passwordData.againNewPassword" type="password">
                            </el-input>
                        </el-form-item>
                        <el-form-item >
                            <el-button type="primary" @click="changePassword">确认修改</el-button>
                        </el-form-item>

                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                //修改个人信息
                userInfo:{
                    logo:'',
                    name:''
                },
                // 修改密码 表单数据
                passwordData:{
                    olderPassword:'',
                    newPassword:'',
                    againNewPassword:''
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
            changeUserInfo(){
                let _this = this ;
                
            },
            //修改密码
            changePassword(){
                let _this = this;
                
            }
        },
        mounted(){
			let user = JSON.parse(sessionStorage.getItem('user'));
			console.log(user);
			this.userInfo.logo = user.avatar;
			this.userInfo.name = user.name;
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
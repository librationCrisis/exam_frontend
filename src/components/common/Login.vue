<template>
  <div id="login">
    <div class="bg"></div>
    <el-row class="main-container">
      <el-col :lg="8" :xs="16" :md="10" :span="10">
        <div class="top">
          <i class="iconfont icon-kaoshi"></i>
          <span class="title">在线考试系统</span>
        </div>
        <div class="bottom">
          <div class="container">
            <p class="title">账号登录</p>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="用户名">
                <el-input v-model.number="formLabelAlign.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="formLabelAlign.password" placeholder="请输入密码" type='password'></el-input>
              </el-form-item>
              <div class="submit">
                <el-button type="primary" class="row-login" @click="login()">登录</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="footer">
      <el-col>
        <p class="msg2">版权所有 ©2020 保留所有权利 </p>
      </el-col>
    </el-row>
    <section class="remind">
      <span>学生账号：20154001</span>
      <span>教师账号：20081001</span>
      <span>密码都是：123456</span>
    </section>
  </div>
</template>


<script>
import store from '@/vuex/store'
import {mapState} from 'vuex'
import qs from 'qs'

export default {
  store,
  name: "login",
  data() {
    return {
      role: 2,
      labelPosition: 'left',
      formLabelAlign: {
        username: '20081001',
        password: '123456'
      },
      json: {
        type: Array
      }
    }
  },
  methods: {
    //用户登录请求后台处理
    login() {
      console.log("登录系统中");
      this.$axios({
        url: '/api/login',
        method: 'POST',
        data: qs.stringify(this.formLabelAlign)
      }).then(res => {
            console.log(res)
            console.log(res.data.role)
            //判断用户名和密码是否存在数据库中
            if (this.formLabelAlign.username == res.data.student_id || this.formLabelAlign.username == res.data.teacher_id) {
              // if (res.data.role == 1) {
              //   console.log('res1')
              //   this.$router.push({path: '/teacher'});
              // }
              // if (res.data.role == 2) {
              //   console.log('res2')
              //   this.$router.push({path: '/student'});
              // }
              //判断是教师还是学生
              switch (res.data.role) {
                case "1": //教师
                  // console.log('res1')
                  this.$router.push({path: '/teacher'})
                  break
                case "2": //学生
                  // console.log('res2')
                  this.$cookies.set("cname", res.data.student_name)
                  this.$cookies.set("cid", res.data.student_id)
                  this.$router.push({path: '/student'})
                  break
              }
              // console.log(res.data.id)
            }
            if (this.formLabelAlign.username != res.data.student_id && this.formLabelAlign.username != res.data.teacher_id) { //错误提示
              this.$message({
                showClose: true,
                type: 'error',
                message: '用户名或者密码错误'
              })
            }
          }
          // console.log(res.data.id);
          // this.$router.push({path: '/student'}) //跳转到首页
      ).catch(error => {
        console.log(error)
      })
    },
  },
  computed: mapState(["userInfo"]),
  mounted() {

  }
}
</script>


<style lang="scss" scoped>
.remind {
  border-radius: 4px;
  padding: 10px 20px;
  display: flex;
  position: fixed;
  right: 20px;
  bottom: 50%;
  flex-direction: column;
  color: #606266;
  background-color: #fff;
  border-left: 4px solid #409eff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
}

.container {
  margin-bottom: 32px;
}

.container .el-radio-group {
  margin: 30px 0px;
}

a:link {
  color: #ff962a;
  text-decoration: none;
}

#login {
  font-size: 14px;
  color: #000;
  background-color: #fff;
}

#login .bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
  height: 100%;
  background: url('../../assets/img/loginbg.png') center top / cover no-repeat;
  background-color: #b6bccdd1 !important;
}

#login .main-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#login .main-container .top {
  margin-top: 100px;
  font-size: 30px;
  color: #fff;
  display: flex;
  justify-content: center;
}

#login .top .icon-kaoshi {
  font-size: 80px;
}

#login .top .title {
  margin-top: 20px;
}

#login .bottom {
  display: flex;
  justify-content: center;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#login .bottom .title {
  text-align: center;
  font-size: 30px;
}

.bottom .container .title {
  margin: 30px 0px;;
}

.bottom .submit .row-login {
  width: 100%;
  background-color: #00b38a;
  border-color: #04468b;
  margin: 20px 0px 10px 0px;
  padding: 15px 20px;
}

.bottom .submit {
  display: flex;
  justify-content: center;
}

.footer {
  margin-top: 50px;
  text-align: center;
}

.footer .msg1 {
  font-size: 18px;
  color: #fff;
  margin-bottom: 15px;
}

.footer .msg2 {
  font-size: 14px;
  color: #e3e3e3;
  margin-top: 70px;
}

.bottom .options {
  margin-bottom: 40px;
  color: #ff962a;
  display: flex;
  justify-content: space-between;
}

.bottom .options > a {
  color: #ff962a;
}

.bottom .options .register span:nth-child(1) {
  color: #8C8C8C;
}
</style>

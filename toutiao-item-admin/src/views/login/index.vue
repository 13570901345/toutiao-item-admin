<template>
  <div class="login-contain">
    <!-- 配置form 表单验证：在el-form中加入rules属性并绑定一个规则 然后再在个个el-form-item中
    绑定prop属性绑定名字 随后就在data中开始写入你想绑定的规则-->
    <el-form :rules="rulesform" class="login-form" ref="form" :model="user">
      <div class="login-header"></div>
      <el-form-item prop="mobile">
        <el-input placeholder="请输入手机号" v-model="user.mobile"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input placeholder="请输入验证码" v-model="user.code"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" :loading="loginLoad" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/user";
export default {
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
        agree: false, // 是否同意用户协议
      },
      //   checkchart: false, //是否同意用户协议选中的状态
      loginLoad: false,
      rulesform: {
        mobile: [
          { required: true, message: "请输入手机名", trigger: "change" },
          {
            pattern: /^1[3|4|5|6|7|8|9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { pattern: /^\d{6}$/, message: "验证码格式不正确", trigger: "blur" },
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback();
              } else {
                callback(new Error("请勾选用户协议"));
              }
            },
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    load() {
      //打开登录加载
      //处理后端响应的结果成功or失败

      this.loginLoad = true;
      //表单验证

      //验证通过，提交登录
      login(this.user)
        .then((res) => {
          console.log(res);
          //登录成功
          this.$message({
            message: "恭喜你，登录成功！",
            type: "success",
          });
          //关闭登录加载
          this.loginLoad = false;
          this.$router.push({
              name: 'home'
          })
        })
        .catch((err) => {
          console.log("登录失败", err);
          this.$message.error("登录失败，手机号或验证码不正确！");
          //关闭登录加载
          this.loginLoad = false;
        });
    },
    onSubmit() {
      //获取表单数据
      //   const user = this.user;

      //表单验证
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return;
        }
        this.load();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-contain {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background: url("./login_bg的副本.jpg") no-repeat;
  background-size: cover;
  .login-form {
    background: #fff;
    padding: 3vw;
    min-width: 300px;
  }
  .login-btn {
    width: 100%;
  }
  .login-header {
    margin-bottom: 20px;

    width: 300px;
    height: 57px;
    background: url("./logo_index的副本.png") no-repeat;
  }
}
</style>

<template>
  <div class="settingcount">
    <div class="comment-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item
              ><a href="/image">个人设置</a></el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
        <!-- //表单部分 -->
        <div>
          <el-row>
            <el-col :span="13"
              ><div class="grid-content bg-purple-dark">
                <el-form
                  :model="user"
                  ref="user"
                  label-width="100px"
                  class="demo-ruleForm"
                  :rules="rulesform"
                >
                  <el-form-item label="编号"> {{ user.id }} </el-form-item>
                  <el-form-item label="手机"> {{ user.mobile }} </el-form-item>
                  <el-form-item label="媒体名称" prop="name">
                    <el-input type="text" v-model="user.name"></el-input>
                  </el-form-item>
                  <el-form-item label="媒体介绍" prop="intro">
                    <el-input type="textarea" v-model="user.intro"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input type="text" v-model="user.email"></el-input>
                  </el-form-item>

                  <el-form-item>
                    <el-button
                      type="primary"
                      @click="updatauser"
                      :loading="onloadingfind"
                      >保存</el-button
                    >
                    <el-button>取消</el-button>
                  </el-form-item>
                </el-form>
              </div></el-col
            >
            <el-col :span="5" :offset="4">
              <label class="labeltothe" for="file">
                <el-avatar
                  shape="square"
                  :size="150"
                  fit="cover"
                  :src="user.photo"
                ></el-avatar>
                <p>点击修改头像</p>
                <input
                  id="file"
                  type="file"
                  ref="file"
                  hidden
                  @change="onchangecontent"
                />
              </label>
              <el-dialog
                title="修改头像"
                :visible.sync="dialogVisible"
                width="30%"
                @opened="onopendailog"
                @closed="onclosedailog"
              >
                <div class="urlcropfather">
                  <img class="cropson" :src="urlfileimg" ref="img" />
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="ongetcropped"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getuserprofile, getuserphoto, updatauser } from "@/api/user";
//引入crop工具
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

import globalbus from "@/utils/global-bus";

export default {
  name: "settingcontent",
  components: {},
  props: {},
  data() {
    return {
      user: {
        email: "",
        id: null,
        intro: "",
        mobile: "",
        name: "",
        photo: "",
      }, //所存储的用户信息
      dialogVisible: false,
      urlfileimg: null,
      cropper: null,
      rulesform: {
        name: [
          { min: 1, max: 7, message: "长度在 1 到 7 个字符", trigger: "blur" },
        ],
        email: [
          {
            pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],
      },
      onloadingfind: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadgetuser();
  },
  mounted() {},
  methods: {
    loadgetuser() {
      getuserprofile().then((res) => {
        this.user = res.data.data;
      });
    },
    onchangecontent() {
      const file = this.$refs.file;
      const basefile = window.URL.createObjectURL(file.files[0]);
      this.urlfileimg = basefile;
      //展示弹出层 预览用户选择的图片
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    onopendailog() {
      const image = this.$refs.img;
      this.cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        crop(event) {},
      });
    },
    onclosedailog() {
      this.cropper.destroy();
    },
    ongetcropped() {
      //获取裁剪对象
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        const formdata = new FormData();
        formdata.append("photo", blob);
        getuserphoto(formdata).then((res) => {
          this.user.photo = window.URL.createObjectURL(blob);
        });
      });
      //关闭弹窗
      this.dialogVisible = false;
    },
    updatauser() {
      this.$refs["user"].validate((value) => {
        if (!value) {
          return;
        } else {
          //如果验证成功
          this.onloadingfind = true;
          updatauser({
            name: this.user.name,
            intro: this.user.intro,
            email: this.user.email,
          }).then((res) => {
            this.$message({
              type: "success",
              message: "保存成功",
            });
            this.onloadingfind = false;

            globalbus.$emit("hxk", this.user);
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.labeltothe {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.urlcropfather {
  .cropson {
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }
}
</style>
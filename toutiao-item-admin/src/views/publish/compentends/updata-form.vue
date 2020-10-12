<template>
  <div class="updataform">
    <div class="coverbox" @click="handlefind">
      <img
        ref="aaa"
        :src="coverimage"
      />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">素材库的内容</el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input type="file" @change="filehandle" ref="file" />
          <img src="" ref="img" />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onmarsurefile">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { imagefile } from "@/api/image";
export default {
  name: "updataform",
  components: {},
  props: ['coverimage'],
  data() {
    return {
      dialogVisible: false,
      activeName: "first",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handlefind() {
      this.dialogVisible = true;
    },
    filehandle() {
      const file = this.$refs.file.files[0];
      const bolb = window.URL.createObjectURL(file);
      this.$refs.img.src = bolb;
    },
    //点击确定是进行触发的方法操作
    onmarsurefile() {
      if (this.activeName === "second") {
        if (!this.$refs.file.files[0]) {
          this.$message("请选择文件");
          return;
        }
        const file = this.$refs.file.files[0];
        const fd = new FormData();
        fd.append("image", file);
        imagefile(fd).then((res) => {
          this.dialogVisible = false;
          this.$refs.aaa.src = res.data.data.url
          
          this.$emit('coverchange',res.data.data.url)
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.coverbox {
  border: 1px solid #ccc;
  width: 130px;
  height: 150px;
  img{
      height: 100%;
      width: 100%;
  }
}
</style>
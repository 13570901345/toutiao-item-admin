<template>
  <div class="image-content">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/image">素材管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- //表单部分 -->
      <div class="form-flex">
        <el-radio-group v-model="radio" @change="onchange">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" @click="dialogTableVisible = true">
          上传素材
        </el-button>
      </div>
      <el-row :gutter="10">
        <el-col
          :xs="12"
          :sm="8"
          :md="6"
          :lg="4"
          :xl="4"
          v-for="(item, index) in images"
          :key="index"
          class="image-findhxk"
          ><div class="grid-content bg-purple" style="position: relative">
            <el-image
              style="height: 150px; width: 100%"
              :src="item.url"
              fit="cover"
            >
            </el-image>
            <div
              class="box-image"
              style="
                height: 40px;
                width: 100%;
                background: rgba(204, 204, 204, 0.5);
                position: absolute;
                bottom: 5px;
                left: 0;
                font-size: 30px;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                color: #fff;
              "
            >
              <el-button
                type="warning"
                size="small"
                :icon="
                  images[index].is_collected
                    ? 'el-icon-star-on'
                    : 'el-icon-star-off'
                "
                @click="oniconimage(images[index])"
                :loading="images[index].loading"
                circle
              ></el-button
              ><el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="onimagedelete(images[index])"
                circle
              ></el-button>
              <!-- <i :class="{'el-icon-star-on': images[index].is_collected,'el-icon-star-off': !images[index].is_collected}"  @click="oniconimage(images[index])"></i> -->
              <!-- <i class="el-icon-delete-solid"></i>' -->
            </div>
          </div></el-col
        >
      </el-row>
      <!-- 分页部分 -->
      <el-pagination
        class="pagetion"
        page-size.sync="10"
        background
        layout="prev, pager, next"
        :total="tototal"
        :page-size="pagesize"
        @current-change="onpage"
      >
      </el-pagination>
    </el-card>

    <!-- //弹出框 -->
    <el-dialog title="上传素材" width="35%" :visible.sync="dialogTableVisible">
      <el-upload
        class="upload-demo"
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        multiple
        :headers="loadheader"
        name="image"
        :on-success="onsuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getimage, collectimage,deleteimage } from "@/api/image";
const user = JSON.parse(window.localStorage.getItem("user"));
export default {
  inject: ["reload"],
  name: "imagecontent",
  components: {},
  props: {},
  data() {
    return {
      radio: false,
      images: [],
      dialogTableVisible: false,
      loadheader: {
        Authorization: `Bearer ${user.token}`,
      },
      page:1,
      tototal: null, //总条数
      pagesize: 10, //显示的每页条数
      //   id:'' ,//每个图像的id
      //     is_collected: null //当前的是否处于收藏状态
    };
  },
  computed: {},
  watch: {},
  created() {
    this.ongetimage(1);
  },
  mounted() {},
  methods: {
    //上传图片并渲染到image函数上去 collect默认意思是否是收藏的图片
    ongetimage(page, collect = false) {
      getimage({
        collect,
        page: page,
        per_page: this.pagesize,
      }).then((res) => {
        const results = res.data.data.results;
        results.forEach((res) => {
          res.loading = false;
        });
        this.images = results;
        this.tototal = res.data.data.total_count;
      });
    },
    onchange(val) {
      this.ongetimage(1, val);
    },
    onsuccess() {
      //关闭对话框
      this.dialogTableVisible = false;
      //刷新把图片渲染上去
      this.ongetimage(1);

      //上传成功提示
      this.$message({
        type: "success",
        message: "上传成功",
      });
    },
    onpage(page) {
      this.ongetimage(page);
    },
    //点击收藏方法
    oniconimage(img) {
      img.loading = true;
      //收藏接口传递数值
      collectimage(img.id, !img.is_collected).then((res) => {
        img.is_collected = !img.is_collected;
        // this.reload();
        img.loading= false
      });
      this.ongetimage(this.page);
    },
    //点击删除图片素材
    onimagedelete(img) {
        deleteimage(img.id).then(res => {
            this.ongetimage(this.page)
        })
    }
  },
};
</script>

<style lang="less" scoped>
.image-findhxk {
  margin-top: 15px;
}
.form-flex {
  display: flex;
  justify-content: space-between;
}
.upload-demo {
  text-align: center;
}
.pagetion {
  margin-top: 10vh;
  margin-left: 30vw;
}
</style>
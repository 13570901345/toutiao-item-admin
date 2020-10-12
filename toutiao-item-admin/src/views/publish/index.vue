<template>
  <div class="publish-index">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/publish"
              >{{ $route.query.id ? "修改" : "发布" }}文章</a
            ></el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <!-- //表单部分 -->
      <el-form
        ref="publish-from"
        :model="article"
        label-width="80px"
        :rules="validata"
      >
        <el-form-item label="标题" prop="title">
          <el-input type="text" v-model="article.title"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          <!-- <el-tiptap v-model="article.content" :extensions="extensions" /> -->
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            :height="400"
          ></el-tiptap>
        </el-form-item>

        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <template v-if="article.cover.type>0">
            <updataform v-for="(cover,index) in article.cover.type" :key="index" 
            @coverchange='oncoverchange(index,$event)' 
            :coverimage='article.cover.images[index]' />
          </template>
        </el-form-item>

        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              v-for="(item, index) in channels"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">{{
            $route.query.id ? "修改" : "发布"
          }}</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getarticlemouth,
  publisharticle,
  putarticle,
  getfindarticle,
} from "@/api/article";
import updataform from "./compentends/updata-form";
import {
  ElementTiptap,
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Link,
  Image,
  Iframe,
  CodeBlock,
  Blockquote,
} from "element-tiptap";
// import element-tiptap 样式
import "element-tiptap/lib/index.css";
//引入图片接口文件
import { imagefile } from "@/api/image";
export default {
  name: "publishindex",
  components: {
    "el-tiptap": ElementTiptap,
    updataform,
  },
  props: {},
  data() {
    return {
      article: {
        title: "", //文章标题
        content: "", //文章内容
        cover: {
          //封面
          type: 0, //封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [], //图片路径
        },
        channel_id: null, //文章所属频道id
      },
      channels: [], //用来装文章频道数据的盒子
      extensions: [
        // new ElementTiptap(),
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), //下划线 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(), //斜体
        new Strike(), //删除线
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Link(),
        new Image({
          //由于这个会默认把上传过来的图片转化为字符串存在本地，而我们要的是一个
          //外部链接
          // uploadRequest这个方法是这插件内置的能够返回文件上传的链接，而不用那种默认的字符串方式
          uploadRequest(file) {
            //如果接口要求content-type 是 multipart/form-data,则请求体必须用formdata对象
            const fd = new FormData();
            fd.append("image", file);
            return imagefile(fd).then((res) => {
              return res.data.data.url;
            });
          },
        }),
        new Iframe(),
        new CodeBlock(),
        new Blockquote(),
      ],
      validata: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        content: [
          {
            validator(rule, value, callback) {
              if (value === "<p></p>") {
                callback(new Error("请输入内容"));
              } else {
                callback();
              }
            },
          },
          { required: true, message: "请输入内容", trigger: "blur" },
        ],
        channel_id: [{ required: true, message: "请选择所属频道" }],
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.ongetarticlemouth();
    //获得所以编辑的文章id 如果那个路由参数里面有ID则表示进行的是路由编辑操作
    if (this.$route.query.id) {
      this.ongetarticleid();
    }
  },
  mounted() {},
  methods: {
    onSubmit(draft = false) {
      //进行发布之前的验证操作
      this.$refs["publish-from"].validate((valid) => {
        //如果验证规则不通过，则返回回去
        if (!valid) {
          return;
        }
        if (this.$route.query.id) {
          //这是进行修改文章的操作
          putarticle(this.$route.query.id, this.article, draft).then((res) => {
            this.$message({
              message: `${draft ? "存入草稿" : "发布"}成功`,
              type: "success",
            });
          });
        } else {
          //这是进行发布文章的操作
          publisharticle(this.article, draft).then((res) => {
            this.$message({
              message: `${draft ? "存入草稿" : "发布"}成功`,
              type: "success",
            });
          });
        }
        this.$router.push("/article");
      });

      //如果请求头上有id的存在
    },
    ongetarticlemouth() {
      getarticlemouth().then((res) => {
        this.channels = res.data.data.channels;
      });
    },
    ongetarticleid() {
      getfindarticle(this.$route.query.id).then((res) => {
        this.article = res.data.data;
      });
    },
    oncoverchange(index,url) {
      this.article.cover.images[index] = url
    }
  },
};
</script>

<style lang="less" scoped>
</style>
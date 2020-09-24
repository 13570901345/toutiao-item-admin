<template>
  <div class="article-container">
    <el-card class="box-card box-card-file">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航开始 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">内容管理</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑导航结束 -->
      </div>
      <!-- 数据筛选表单开始 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 数据筛选表单结束 -->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到4545条结果：
        <!-- 数据展示表单 -->
        <el-table :data="articledata" border style="width: 100%" class="table-box">
          <el-table-column prop label="封面"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column label="状态">
            <!-- slot-scope的意思是能够获取到内部到数据下面有row/column/$index/store等 -->
            <template slot-scope="scope">
              <el-tag type="info" v-if="scope.row.status===0">草稿</el-tag>
              <el-tag type="primary" v-if="scope.row.status===1">待审核</el-tag>
              <el-tag type="success" v-if="scope.row.status===2">审核通过</el-tag>
              <el-tag type="warning" v-if="scope.row.status===3">审核失败</el-tag>
              <el-tag type="danger" v-if="scope.row.status===4">已删除</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="pubdate" label="发布时间"></el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button icon="el-icon-edit" circle></el-button>
              <el-button icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- /数据展示表单 -->
        <!-- 分页组件 -->
        <el-pagination class="page-compentend" background layout="prev, pager, next" :total="1000"></el-pagination>
        <!-- /分页组件 -->
      </div>
    </el-card>
  </div>
</template>

<script>
import { getarticle } from "@/api/article";
export default {
  name: "articlecontainer",
  components: {},
  props: {},
  data() {
    return {
      form: {
        name: "",
        region: "",
        date: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      articledata: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getmethodarticle();
  },
  mounted() {},
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    getmethodarticle() {
      getarticle().then((res) => {
        console.log(res);
        this.articledata = res.data.data.results;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box-card-file {
  margin-bottom: 20px;
}
.table-box {
  margin: 15px 0;
}
.page-compentend {
  margin-left: 180px;
}
</style>
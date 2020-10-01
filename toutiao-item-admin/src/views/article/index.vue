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
      <el-form ref="form" :model="form" label-width="80px" v-loading="loading">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道">
          <el-select v-model="channelid" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel,index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker
            v-model="rangdate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getmethodarticle(1)" :disabled="loading">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 数据筛选表单结束 -->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到{{ articletount }}条结果：
        <!-- 数据展示表单 -->
        <el-table
          v-loading="loading"
          :data="articledata"
          border
          style="width: 100%"
          class="table-box"
        >
          <el-table-column label="封面">
            <template slot-scope="scope">
              <div class="block">
                <el-image lazy :src="scope.row.cover.images[0]">
                  <div slot="error" class="image-slot">
                    <el-image></el-image>
                  </div>
                </el-image>
              </div>
              <!-- <img v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]" class="img-article">
              <img v-else src="./pic_bg.png" class="img-article">-->
            </template>
          </el-table-column>
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
            <template slot-scope="scope">
              <el-button icon="el-icon-edit" circle @click="$router.push('/publish?id=' + scope.row.id)"></el-button>
              <el-button icon="el-icon-delete" @click="ondeleteicon(scope.row.id)" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- /数据展示表单 -->
        <!-- 分页组件 -->
        <!-- page-size表示每页的数据条数 current-change表示跳转页面的事件 total表示总数据条数 -->
        <el-pagination
          class="page-compentend"
          :page-size="pagesize"
          @current-change="oncurrentchange"
          background
          layout="prev, pager, next"
          :total="articletount"
          :disabled="loading"
          :current-page.sync="page"
        ></el-pagination>
        <!-- /分页组件 -->
      </div>
    </el-card>
  </div>
</template>

<script>
import { getarticle, getarticlemouth, detalearticle } from "@/api/article";
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
      articledata: [], //总的传递过来的数据
      articletount: 0, //总数据条数
      pagesize: 15, //每个页面的数据条数
      status: null, //数据筛选的状态，如全部或已审核
      channels: [], //文章数据频道的数据总和
      channelid: null, // 文章频道具体的ID
      rangdate: null, //日期起始
      loading: true, //加载动画开启
      page: 1 //这是当前页码
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getmethodarticle(1);
    this.ongetarticlemouth();
  },
  mounted() {},
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    getmethodarticle(page) {
      //请求一开始就开启loading
      this.loading = true;
      getarticle({
        page: page,
        per_page: this.pagesize,
        status: this.status,
        channel_id: this.channelid,
        begin_pubdate: this.rangdate ? this.rangdate[0] : null,
        end_pubdate: this.rangdate ? this.rangdate[1] : null,
      }).then((res) => {
        // console.log(res);
        this.articledata = res.data.data.results;
        this.articletount = res.data.data.total_count;

        //请求结束时便可以关闭了
        this.loading = false;
      });
    },
    oncurrentchange(page) {
      this.getmethodarticle(page);
    },
    ongetarticlemouth() {
      getarticlemouth().then((res) => {
        this.channels = res.data.data.channels;
      });
    },
    ondeleteicon(id) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调用删除接口
          //应为传递过来的id太长，用来json-bigint来转化来，所以后面要加个tostring来拿到完整的id
          detalearticle(id.toString()).then((res) => {
              //当上面那行代码传递给数据库删除来代码后下面那行就进行更新当前页数据
            this.getmethodarticle(this.page)
          });
        })
        .catch(() => {});
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
  margin-left: 23vw;
}
.cell .block {
  text-align: center;
  margin-top: 13px;
}
</style>
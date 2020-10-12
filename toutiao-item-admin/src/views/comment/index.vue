<template>
  <div class="comment-content">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/image">评论管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- //表单部分 -->
      <div>
        <el-table :data="message" style="width: 100%">
          <el-table-column prop="title" label="标题"> </el-table-column>
          <el-table-column prop="total_comment_count" label="总评论数">
          </el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝评论数">
          </el-table-column>
          <el-table-column prop="comment_status" label="状态">
            <template slot-scope="scoped">
              {{ scoped.row.comment_status ? "正常" : "关闭" }}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scoped">
              <el-switch
                v-model="scoped.row.comment_status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="onchangecomment(scoped.row)"
                :disabled="scoped.row.statuscounts"
              >
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size.sync="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalcount"
          class="paginationly"
          :current-page.sync="topage"
          background
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getarticle, updatacommend } from "@/api/article";
export default {
  name: "commentcontent",
  components: {},
  props: {},
  data() {
    return {
      message: [], //所存储的接口传递过来的数据
      totalcount: 0, //所存储的数据总数
      pagesize: 10, //所存储的每页条数
      topage: 1, //所要跳转的页数
    };
  },
  computed: {},
  watch: {},
  created() {
    this.ongetarticle();
  },
  mounted() {},
  methods: {
    ongetarticle(page = 1,pagesize = 10) {
      this.topage = page
      getarticle({
        response_type: "comment",
        page, //默认第几页
        per_page: pagesize, //每页几条数据
      }).then((res) => {
        const { results } = res.data.data;
        results.forEach((article) => {
          article.statuscount = false;
        });
        this.message = results;
        this.totalcount = res.data.data.total_count;
      });
    },
    onchangecomment(res) {
      res.statuscount = true;
      updatacommend(res.id.toString(), res.comment_status).then((article) => {
        res.statuscount = false;
      });
      // console.log(res.comment_status);
    },
    handleCurrentChange(page) {
      this.ongetarticle(page)
    },
    handleSizeChange(pagesize) {
      this.ongetarticle(1,pagesize)
    }
  },
};
</script>

<style lang="less" scoped>
.paginationly {
  margin-left: 11vw;
  margin-top: 8vh;
}
</style>
// 查询选择题
<template>
  <div class="exam" v-if="loading">
    <h2>选择题</h2>
    <el-table :data="pagination" border :row-class-name="tableRowClassName">
      <el-table-column prop="subject" label="试卷名称" width="180"></el-table-column>
      <el-table-column prop="question" label="题目信息" width="490"></el-table-column>
      <el-table-column prop="section" label="所属章节" width="200"></el-table-column>
      <el-table-column prop="score" label="试题分数" width="150"></el-table-column>
      <el-table-column prop="level" label="难度等级" width="133"></el-table-column>
    </el-table>
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pagination.current"
        :page-sizes="[10]"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        class="page"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      pagination: {
        //分页后的考试信息
        current: 1, //当前页
        total: null, //记录条数
        size: 6 //每页条数
      }
    };
  },
  created() {
    this.getAnswerInfo();
  },
  methods: {
    getAnswerInfo() {
      //分页查询选择题试卷信息
      this.$axios({
        url: `/api/multi-question/${this.pagination.current}/${10}`,
        method: 'GET'
      }).then(res => {
        this.pagination = res.data;
        this.loading = true
        console.log(res);
      })
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getAnswerInfo();
    },
    tableRowClassName({rowIndex}) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.exam {
  padding: 0 40px;

  .page {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .edit {
    margin-left: 20px;
  }

  .el-table tr {
    background-color: #DD5862 !important;
  }
}

.el-table .warning-row {
  background: #000 !important;

}

.el-table .success-row {
  background: #DD5862;
}
</style>
//显示学生成绩
<template>
  <div class="table" v-if="loading">
    <section class="content-el">
      <el-table ref="filterTable" :data="pagination">
        <el-table-column
            prop="answerDate"
            label="考试日期"
            sortable
            width="300"
            column-key="answerDate"
            :filters="filter"
            :filter-method="filterHandler">
        </el-table-column>
        <el-table-column
            prop="subject"
            label="课程名称"
            width="300"
            filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.subject }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="考试分数" width="200"></el-table-column>
        <el-table-column label="是否及格" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.score>= 60 ? 'success' : 'danger'">{{ scope.row.score >= 60 ? "及格" : "不及格" }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" align="middle" class="pagination">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pagination.current"
            :page-sizes="[5]"
            :page-size="pagination.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
        </el-pagination>
      </el-row>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagination: { //分页后的留言列表
        current: 1, //当前页
        total: null, //记录条数
      },
      loading: false, //加载标识符
      score: [], //学生成绩
      filter: null //过滤参数
    }
  },
  created() {
    this.getScore()
    // this.loading = true //数据加载则遮罩表格
  },
  methods: {
    getScore() {
      let studentId = this.$cookies.get("cid")
      console.log(studentId)
      this.$axios({
        url: `/api/score/${this.pagination.current}/5/${studentId}`,
        method: "GET"
      }).then(res => {
        this.pagination = res.data
        console.log(res.data)
        this.loading = true
        // if(res.data.code == 200) {
        //   this.loading = false //数据加载完成去掉遮罩
        //   this.score = res.data.data.records
        //   this.pagination = {...res.data.data}
        //   let mapVal = this.score.map((element,index) => { //通过map得到 filter:[{text,value}]形式的数组对象
        //     let newVal = {}
        //     newVal.text = element.answerDate
        //     newVal.value = element.answerDate
        //     return newVal
        //   })
        //   let hash = []
        //   const newArr = mapVal.reduce((item, next) => { //对新对象进行去重操作
        //     hash[next.text] ? '' : hash[next.text] = true && item.push(next);
        //     return item
        //   }, []);
        //   this.filter = newArr
        // }
      })
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val
      this.getScore()
    },
    formatter(row) {
      return row.address;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  padding-top: 20px;
}

.table {
  width: 980px;
  height: 650px;
  margin: 100px auto 0;
}

.content-el {
  background-color: #fff;
  padding: 20px;
}
</style>

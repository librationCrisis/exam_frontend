// 点击试卷后的缩略信息
<template>
  <div id="msg" v-if="loading">
    <div class="title">
      <span>试卷列表</span>
      <span>/  {{ examData.source }}</span>
    </div>
    <div class="wrapper">
      <ul class="top">
        <li class="example">{{ examData.source }}</li>
        <li class="right">
          <div>
            <span class="count">总分</span>
            <span class="score">{{ score[0] + score[1] + score[2] }}</span>
          </div>
        </li>
      </ul>
      <ul class="bottom">
        <li>更新于{{ examData.examDate }}</li>
        <li>来自 {{ examData.institute }}</li>
        <li>{{ examData.type }}</li>
        <li class="right">
          <el-button @click="toAnswer(examData.examCode)">开始答题</el-button>
        </li>
      </ul>
      <ul class="info">
        <li @click="dialogVisible = true"><a href="javascript:"><i class="iconfont icon-info"></i>考生须知</a></li>
      </ul>
    </div>
    <div class="content">
      <el-collapse v-model="activeName">
        <el-collapse-item class="header" name="0">
          <template slot="title" class="stitle">
            <div class="title">
              <span>{{ examData.source }}</span><i class="header-icon el-icon-info"></i>
              <span class="time">{{ examData.totalScore }}分 / {{ examData.totalTime }}分钟</span>
              <el-button type="primary" size="small">点击查看试题详情</el-button>
            </div>
          </template>
          <el-collapse class="inner">
            <el-collapse-item>
              <template slot="title" name="1">
                <div class="titlei">选择题 (共{{ topic[1].length }}题 共计{{ score[0] }}分)</div>
              </template>
              <div class="contenti">
                <ul class="question" v-for="(list, index) in topic[1]" :key="index">
                  <li>{{ index + 1 }}. {{ list.question }} {{ list.score }}分</li>
                </ul>
              </div>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title" name="2">
                <div class="titlei">填空题 (共{{ topic[2].length }}题 共计{{ score[1] }}分)</div>
              </template>
              <div class="contenti">
                <ul class="question" v-for="(list, index) in topic[2]" :key="index">
                  <li>{{ topicCount[0] + index + 1 }}.{{ list.question }} {{ list.score }}分</li>
                </ul>
              </div>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title" name="3">
                <div class="titlei">判断题 (共{{ topic[3].length }}题 共计{{ score[2] }}分)</div>
              </template>
              <div class="contenti">
                <ul class="question" v-for="(list, index) in topic[3]" :key="index">
                  <li>{{ topicCount[0] + topicCount[1] + index + 1 }}. {{ list.question }} {{ list.score }}分</li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-collapse-item>

      </el-collapse>
    </div>
    <!--考生须知对话框-->
    <el-dialog
        title="考生须知"
        :visible.sync="dialogVisible"
        width="30%">
      <span>{{ examData.tips }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      dialogVisible: false, //对话框属性
      activeName: '0',  //默认打开序号
      topicCount: [],//每种类型题目的总数
      score: [],  //每种类型分数的总数
      examData: { //考试信息
        // source: null,
        // totalScore: null,
      },
      topic: {  //试卷信息

      },
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    //初始化页面数据
    init() {
      let examCode = this.$route.query.examCode //获取路由传递过来的试卷编号
      this.$axios({
        url: `/api/exam/${examCode}`,
        method: "GET"
      }).then(res => {
        this.examData = res.data
        // this.loading = false
        console.log(res)
        let paperId = this.examData.paperId
        this.$axios(`/api/paper/${paperId}`).then(res => {
          this.topic = res.data
          console.log(res)
          let currentScore = 0
          // for(let i = 1; i< this.topic[1].length; i++) { //循环每种题型,计算出总分
          //   currentScore += this.topic[1][i].score
          // }
          // this.score.push(currentScore) //把每种题型总分存入score
          // currentScore = 0
          // for(let i = 1; i< this.topic[2].length; i++) { //循环每种题型,计算出总分
          //   currentScore += this.topic[2][i].score
          // }
          // this.score.push(currentScore) //把每种题型总分存入score
          // currentScore = 0
          // for(let i = 1; i< this.topic[3].length; i++) { //循环每种题型,计算出总分
          //   currentScore += this.topic[3][i].score
          // }
          // this.score.push(currentScore) //把每种题型总分存入score
          for (let i = 1; i < 4; i++) {
            for (let j = 1; j < this.topic[i].length; j++) {
              currentScore += this.topic[i][j].score
            }
            this.score.push(currentScore) //把每种题型总分存入score
            currentScore = 0
          }
          this.loading = true
        })
      }).catch(error => {
        console.log(error)
      })
    },
    toAnswer(id) {
      this.$router.push({path: "/answer", query: {examCode: id}})
    },
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  .right {
    .el-button {
      color: #409EFF;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
  }
}

.right {
  margin-left: auto;
}

.inner .contenti .question {
  margin-left: 40px;
  color: #9a9a9a;
  font-size: 14px;
}

.content .inner .titlei {
  padding: 10px 20px;
  margin-left: 20px;
  font-size: 16px;
  color: #88949b;
  font-weight: bold;
}

.content .title .time {
  font-size: 16px;
  margin-left: 420px;
  color: #999;
}

.content .stitle {
  background-color: #0195ff;
}

.content .title span {
  margin-right: 10px;
}

#msg .content .title {
  font-size: 20px;
  margin: 0;
  display: flex;
  align-items: center;
}

.content {
  margin-top: 20px;
  margin-bottom: 300px;
  background-color: #fff;
}

.content .header {
  padding: 10px 30px;
}

.wrapper .info {
  margin: 20px 0 0 20px;
  border-top: 1px solid #eee;
}

.wrapper .info a {
  color: #88949b;
  font-size: 14px;
}

.wrapper .info a:hover {
  color: #0195ff;
}

.wrapper .bottom {
  display: flex;
  margin-left: 20px;
  color: #999;
  font-size: 14px;
  align-items: center;
}

.wrapper .bottom li {
  margin-right: 14px;
}

#msg {
  padding-top: 10px;
  background-color: #FFF;
  width: 980px;
  margin: 0 auto;
}

#msg .title {
  margin: 20px;
}

#msg .wrapper {
  background-color: #fff;
  padding: 10px;
}

.wrapper .top {
  display: flex;
  margin: 20px;
  align-items: center;
}

.wrapper .top .right {
  margin-left: auto;
}

.wrapper .top .example {
  color: #333;
  font-size: 22px;
  font-weight: 700;
}

.wrapper .top li i {
  margin-left: 20px;
  color: #88949b;
}

.wrapper .right .count {
  margin-right: 60px;
  color: #fff;
  padding: 4px 10px;
  background-color: #88949b;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid #88949b;
}

.wrapper .right .score {
  position: relative;
  left: -60px;
  padding: 5px 10px;
  font-size: 14px;
  color: #88949b;
  border: 1px dashed #88949b;
  border-left: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  font-weight: bold;
}

.wrapper .right div {
  position: relative;
  left: 65px;
}
</style>

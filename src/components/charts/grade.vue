// 成绩统计页面
<template>
  <div id="grade">
    <div ref="box" class="box"></div>
    <div class="notFound" v-if="isNull">
      <i class="iconfont icon-LC_icon_tips_fill"></i><span>该考生未参加考试</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "grade",
  data() {
    return {
      isNull: false, //原始数据
      tableDataX: [], //x轴数据 保存次数
      tableDataY: [], //y轴数据 保存分数
    }
  },
  mounted() {
    this.score();
  },
  methods: {
    score() {
      let studentId = this.$route.query.studentId
      this.$axios({
        url: `/api/score/${studentId}`,
        method: 'GET'
      }).then(res => { //根据学生Id查询成绩
        console.log(res)
        if (res.status == 200) {
          let rootData = res.data
          console.log(rootData)
          rootData.forEach((element, index) => {
            console.log(element.score)
            this.tableDataX.push(`第${index + 1}次`)
            this.tableDataY.push(element.score)
          });
          let boxDom = this.$refs["box"];
          let scoreCharts = this.$echarts.init(boxDom);
          let option = {
            xAxis: {
              type: "category",
              data: this.tableDataX
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                data: this.tableDataY,
                type: "line",
                itemStyle: {normal: {label: {show: true}}}
              }
            ]
          };
          scoreCharts.setOption(option);
          scoreCharts.on("mouseover", params => {
            console.log(params.value);
          });
        } else {
          this.isNull = true
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
#grade {
  position: relative;

  .box {
    width: 600px;
    height: 400px;
  }

  .notFound {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>

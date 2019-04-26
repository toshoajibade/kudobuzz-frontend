<template>
  <div class="home">
    <div class="chart-wrapper">
      <h4>Percentages</h4>
      <div class="percentages">
        <div>
          <h5>Reviews by type</h5>
          <div v-for="item in calculatePercentage(reviewType)" :key="item.id">
            <p>{{ item.id }} - {{ item.percent }}</p>
          </div>
        </div>
        <div>
          <h5>Reviews by source</h5>
          <div
            v-for="item in calculatePercentage(reviewSources)"
            :key="item.id"
          >
            <p>{{ item.id }} - {{ item.percent }}</p>
          </div>
        </div>
        <div>
          <h5>All reviews</h5>
          <div v-for="item in calculatePercentage(allReviews)" :key="item.id">
            <p>{{ item.id }} - {{ item.percent }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-wrapper">
      <h4>Pie Chart: Hover over each segment to see it's value</h4>
      <div class="pie-chart">
        <div>
          <vue-chart
            :data="extractData(this.reviewType)"
            type="pie"
            :options="options.reviewType"
          />
          <p>Reviews by type</p>
        </div>
        <div>
          <vue-chart
            :data="extractData(this.reviewSources)"
            type="pie"
            :options="options.reviewType"
          />
          <p>Reviews by source</p>
        </div>
        <div>
          <vue-chart
            :data="extractData(this.allReviews)"
            type="pie"
            :options="options.reviewType"
          />
          <p>All reviews</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/services/Api";
import VueChart from "vuechart";

export default {
  name: "Home",
  components: {
    [VueChart.name]: VueChart
  },
  data() {
    return {
      allReviews: [],
      reviewType: [],
      reviewSources: [],
      options: {
        reviewType: {
          legend: {
            display: false
          }
        }
      }
    };
  },
  async mounted() {
    try {
      const res = await Api.instance().get("review/T1234567");
      if (res.status === 200 || res.status === 304) {
        this.allReviews = res.data[0].all_reviews;
        this.reviewType = res.data[0].review_types;
        this.reviewSources = res.data[0].review_sources;
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    extractData(data) {
      const labels = data.map(item => item._id);
      const reviewData = data.map(item => item.count);
      let returnData = {
        labels,
        datasets: [
          {
            data: reviewData,
            backgroundColor: [
              "rgba(90, 232, 115, 0.9)",
              "rgba(100, 112, 235, 0.9)",
              "rgba(255, 206, 86, 0.9)",
              "rgba(75, 192, 192, 0.9)",
              "rgba(100, 210, 165, 0.9)",
              "rgba(153, 102, 255, 0.9)",
              "rgba(51, 107, 70, 0.9)",
              "rgba(255, 159, 64, 0.9)"
            ]
          }
        ]
      };
      return returnData;
    },
    calculatePercentage(value) {
      let sum = 0;
      let arr = [];
      value.map(item => {
        sum += item.count;
      });
      value.map(item => {
        let data = {
          id: item._id,
          percent: ((item.count / sum) * 100).toFixed(2)
        };
        arr.push(data);
      });
      return arr;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  padding-top: 10rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-image: url("../assets/svgs/vector1.svg");
  background-repeat: no-repeat;
  overflow: hidden;
  background-position: top -50px right 0px;
}
.chart-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.pie-chart {
  padding: 5%;
  padding-top: 0rem;
  justify-content: space-around;
  height: 200px;
  display: flex;
  > div {
    display: flex;
    width: 30%;
    flex-direction: column;
  }
}
.percentages {
  display: flex;
  justify-content: space-around;
  margin-bottom: 3rem;
  p {
    line-height: 1.5;
    text-align: left;
    &::after {
      content: "%";
    }
    &::first-letter {
      text-transform: uppercase;
    }
  }
}
h4 {
  font-size: 1.5rem;
  font-weight: normal;
  margin-bottom: 0.5rem;
}
h5 {
  font-size: 1.3rem;
  font-weight: normal;
  margin-bottom: 0.5rem;
  text-align: left;
}
</style>

<template>
  <div class="home">
    <div class="pie-chart">
      <div>
        <vue-chart
          :data="extractData(this.reviewType)"
          type="pie"
          :options="options.reviewType"
        />
        <p>Product review by type</p>
      </div>
      <div>
        <vue-chart
          :data="extractData(this.reviewSources)"
          type="pie"
          :options="options.reviewType"
        />
        <p>Product review by type</p>

      </div>
      <div>

        <vue-chart
          :data="extractData(this.allReviews)"
          type="pie"
          :options="options.reviewType"
        />
        <p>Ratio of each unique review</p>
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
          },
          
        }
      }
    };
  },
  async mounted() {
    try {
      const res = await Api.instance().get("review/T1234567");
      console.log(res.data);
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
              "rgba(255, 99, 132, 0.9)",
              "rgba(54, 162, 235, 0.9)",
              "rgba(255, 206, 86, 0.9)",
              "rgba(75, 192, 192, 0.9)",
              "rgba(153, 102, 255, 0.9)",
              "rgba(255, 159, 64, 0.9)"
            ]
          }
        ]
      };
      return returnData;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  width: 100vw;
  display: flex;
  background-image: url("../assets/svgs/vector1.svg");
  background-repeat: no-repeat;
  background-position: top 0px right 0px;
}
.pie-chart {
  margin-top: 8rem;
  padding: 10%;
  width: 100%;
  display: flex;
  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
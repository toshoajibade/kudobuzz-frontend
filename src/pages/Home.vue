<template>
  <div class="home">
    <pie-chart />

  </div>
</template>

<script>
import PieChart from "@/components/PieChart";
import Api from "@/services/Api";

export default {
  name: "Home",
  components: {
    PieChart
  },
  async mounted() {
    console.log(process.env.VUE_APP_BACKEND_URL)
    const res = await Api.instance().get("review");
    console.log(res.data);
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  width: 100vw;
  background-image: url("../assets/svgs/vector1.svg"),
    url("../assets/svgs/vector2.svg");
  background-repeat: no-repeat;
  background-position: top 0px right 0px, bottom 0px left 0px;
}
</style>
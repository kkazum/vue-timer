<template>
  <Timer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Timer from "./components/Timer.vue";
export default defineComponent({
  name: "App",
  components: {
    Timer,
  },
});
</script>

<!-- <div class="ly_top">
    <div class="ly_topInner">
      <div v-show="isWeekShown"  class="ly_topInner_contents">
        <h1 >昼回タイマー</h1>
        <div class="bl_weeks">
          <h2 class="bl_weeks_title">曜日を選んでね！</h2>
          <ul class="bl_weeks_list">
            <li class="bl_weeks_list_item">月</li>
            <li class="bl_weeks_list_item">火</li>
            <li class="bl_weeks_list_item">水</li>
            <li class="bl_weeks_list_item">木</li>
            <li class="bl_weeks_list_item">金</li>
          </ul>
        </div>
      </div>
    </div>
  </div> -->

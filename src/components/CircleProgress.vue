<template>
  <radial-progress-bar
    :diameter="600"
    :completed-steps="completedSteps + (totalSteps - totalTime * 1000)"
    :total-steps="totalSteps"
    :start-color="startColor"
    :stop-color="stopColor"
    :inner-stroke-color="innerStrokeColor"
    :innerStrokeWidth="15"
    :strokeWidth="15"
    :animateSpeed="1000"
  >
  </radial-progress-bar>
</template>

<script>
import RadialProgressBar from "vue-radial-progress";
import { defineComponent, reactive } from "vue";

export default defineComponent({
  props: {
    totalTime: Number,
  },
  setup(props) {
    /* eslint-disable */
    const { totalTime } = props;
    const ciecleProps = reactive({
      completedSteps: 0,
      totalSteps: totalTime * 1000,
      startColor: "#41a9f3",
      stopColor: "#41a9f3",
      innerStrokeColor: "#305271",
    });
    return {
      ...ciecleProps,
    };
  },

  components: {
    RadialProgressBar,
  },
});
</script>

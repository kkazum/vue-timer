<template>
  <li :class="timerItem">
    <span id="minuteOrigin">{{ timer.minutes }}</span>
    <span id="middleOrigin">:</span>
    <span id="secondsOrigin">{{ timer.seconds }}</span>
    <div class="childTimer_controls">
      <p>{{ timer.title }}</p>
      <div @click="startTimer(timer)" v-if="!timer.timerId" id="start">
        Start
      </div>
      <div v-if="timer.isMaskShown" class="timerMask">
        <div class="timerMask_inner">
          <div class="timerMask_item">
            <div class="time_wrap">
              <span id="minuteOrigin">{{ timer.minutes }}</span>
              <span id="middleOrigin">:</span>
              <span id="secondsOrigin">{{ timer.seconds }}</span>
            </div>
            <RadialProgressBar :totalTime="timer.totalTime" />
          </div>
          <div class="timerMask_controls">
            <button @click="startTimer(timer)" v-if="!timer.timerId" id="start">
              Start
            </button>
            <button @click="stopTimer(timer)" v-if="timer.timerId" id="stop">
              Stop
            </button>
            <p>{{ timer.title }}</p>
            <button
              @click="resetChildTimer(timer)"
              v-if="timer.resetButton"
              id="reset"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, PropType, reactive } from "vue";
import RadialProgressBar from "./CircleProgress.vue";
import { ChildTimer } from '../types/utils'


export default defineComponent({
  props: {
    timer: {
      type: Object as PropType<ChildTimer>,
    },
  },
  name: "ChildTimer",
  components: {
    RadialProgressBar,
  },
  setup(props) {
    const { timer } = props;

    const ChildTimer = reactive({
      timer,
    });
    const startTimer = (timer: ChildTimer) => {
      timer.timerId = setInterval(() => countDown(timer), 1000);
      timer.resetButton = true;
      timer.isMaskShown = true;
    };

    const stopTimer = (timer: ChildTimer) => {
      clearInterval(timer.timerId!);
      timer.timerId = null;
      timer.resetButton = true;
    };

    const resetChildTimer = (timer: ChildTimer) => {
      timer.totalTime = timer.pickTime;
      clearInterval(timer.timerId!);
      timer.timerId = null;
      timer.resetButton = false;
      timer.isMaskShown = false;
    };

    const countDown = (timer: ChildTimer) => {
      if (timer.totalTime >= 1) {
        timer.totalTime--;
      } else {
        timer.totalTime = 0;
        resetChildTimer(timer);
        // Swe("Complete!!", "", "success");
      }
    };

    return {
      ...ChildTimer,
      countDown,
      resetChildTimer,
      stopTimer,
      startTimer,
    };
  },
});
</script>

<style scoped>
</style>

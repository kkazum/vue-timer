<template>
  <li :class="timerItem">
    <span id="minuteOrigin">{{ newProps.minutes }}</span>
    <span id="middleOrigin">:</span>
    <span id="secondsOrigin">{{ newProps.seconds }}</span>
    <div class="childTimer_controls">
      <p>{{ newProps.title }}</p>
      <div @click="startTimer(newProps)" v-if="!newProps.timerId" id="start">
        Start
      </div>
      <div v-if="newProps.isMaskShown" class="timerMask">
        <div class="timerMask_inner">
          <div class="timerMask_item">
            <div class="time_wrap">
              <span id="minuteOrigin">{{ newProps.minutes }}</span>
              <span id="middleOrigin">:</span>
              <span id="secondsOrigin">{{ newProps.seconds }}</span>
            </div>
            <RadialProgressBar :totalTime="newProps.totalTime" />
          </div>
          <div class="timerMask_controls">
            <button
              @click="startTimer(newProps)"
              v-if="!newProps.timerId"
              id="start"
            >
              Start
            </button>
            <button
              @click="stopTimer(newProps)"
              v-if="newProps.timerId"
              id="stop"
            >
              Stop
            </button>
            <p>{{ newProps.title }}</p>
            <button
              @click="resetChildTimer(newProps)"
              v-if="newProps.resetButton"
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
import { defineComponent, PropType, reactive, toRefs, computed } from "vue";
import RadialProgressBar from "./CircleProgress.vue";
import { ChildTimer } from "../types/utils";

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
    const newProps: ChildTimer = reactive({
      ...props.timer!,
      minutes: computed(() => {
        const minutes = Math.floor(newProps.totalTime! / 60);
        return minutes;
      }),
      seconds: computed(() => {
        const seconds = newProps.totalTime! - newProps.minutes * 60;
        return String(seconds).padStart(2, "0");
      }),
    });
    const ChildTimer = reactive({
      newProps,
    });
    const startTimer = (timer: ChildTimer) => {
      timer.timerId = window.setInterval(() => countDown(timer), 1000);
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

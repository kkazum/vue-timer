<template>
  <div class="container">
    <div id="timer">
      <span id="minutes">{{ minutes }}</span>
      <span id="middle">:</span>
      <span id="seconds">{{ seconds }}</span>
      <div class="timerTitle">
        <input v-model="title" type="text" />
      </div>
    </div>
    <div class="controls">
      <div @click="Min()" id="min">Min</div>
      <div @click="Sec()" id="sec">Sec</div>
      <div @click="resetTimer()" id="reset">Reset</div>
      <div @click="createTimer(totalTime, title)" id="start">Create</div>
    </div>
    <div class="timerListWrap">
      <ul class="timerList">
        <draggable :list="timerState" item-key="id" @end="saveItem(timerArr)">
          <template #item="{ element, index }">
            <ChildTimer :timer="element" :key="index" />
          </template>
        </draggable>
        <!-- <ChildTimer v-for="(timer, i) in timerArr" :key="i" :timer="timer" /> -->
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, reactive, computed, toRefs, ref } from "vue";
import ChildTimer from "./ChildTimer.vue";
import draggable from "vuedraggable";
import { ParentTimer, ChildTimer as Child } from "../types/utils";

export default defineComponent({
  name: "Timer",
  components: {
    ChildTimer,
    draggable,
  },
  setup() {
    const timerLists = localStorage.getItem("timerLists");
    const timerState = timerLists
      ? ref(JSON.parse(timerLists) as Array<Child>)
      : ref([]);
    const parent: ParentTimer = reactive({
      totalTime: 0,
      title: "",
      resetButton: false,
      minutes: computed(() => {
        const minutes = Math.floor(parent.totalTime! / 60);
        return minutes;
      }),
      seconds: computed(() => {
        const seconds = parent.totalTime! - parent.minutes * 60;
        return padTime(seconds);
      }),
    });

    const Min = () => {
      parent.totalTime! += 1 * 60;
    };

    const Sec = () => {
      parent.totalTime! += 1;
    };

    const saveItem = (timerArr: Array<Child>) =>
      localStorage.setItem("timerLists", JSON.stringify(timerArr));

    const resetTimer = () => {
      parent.totalTime = 0;
    };

    const createTimer = (totalTime: number, title: string) => {
      if (parent.totalTime == 0 || parent.title == "") {
        return;
      }

      const childTimer: Child = reactive({
        id: Math.random().toString(32).substring(2),
        pickTime: totalTime,
        totalTime: totalTime,
        title: title,
        resetButton: false,
        minutes: computed(() => {
          const minutes = Math.floor(childTimer.totalTime! / 60);
          return minutes;
        }),
        seconds: computed(() => {
          const seconds = childTimer.totalTime! - childTimer.minutes * 60;
          return padTime(seconds);
        }),
        timerId: null,
        isMaskShown: false,
      });
      timerState.value.push(childTimer);
      localStorage.setItem("timerLists", JSON.stringify(timerState.value));
      parent.totalTime = 0;
      parent.title = "";
      return childTimer;
    };

    // 秒が一桁の場合0を追加
    const padTime = (time: number) => {
      return (time < 10 ? "0" : "") + time;
    };

    return {
      ...toRefs(parent),
      timerState,
      saveItem,
      resetTimer,
      createTimer,
      Min,
      Sec,
    };
  },
});
</script>

<style src="@/components/style.scss" lang="scss"></style>

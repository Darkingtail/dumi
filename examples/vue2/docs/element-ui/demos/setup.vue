<template>
  <div>
    <p>Current Count: {{ count }}</p>
    <el-button type="primary" @click="inc">Increment (Setup)</el-button>
    <el-button type="primary" plain @click="dec">Decrement (Setup)</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button as ElButton, Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/button.css';
import 'element-ui/lib/theme-chalk/message.css';

const count = ref(0);

const inc = () => {
  count.value++;
  Message.success(`Count is now: ${count.value}`);
};

const dec = () => {
  count.value--;
  Message.success(`Count is now: ${count.value}`);
};
</script>

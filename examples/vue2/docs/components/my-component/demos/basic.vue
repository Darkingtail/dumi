<template>
  <div>
    <MyComponent message="Hello World" @click="handleClick" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Message } from 'element-ui';
// 使用包名导入，模拟真实用户用法
import { MyComponent } from '@examples/vue2';

export default Vue.extend({
  components: { MyComponent },
  methods: {
    handleClick(msg: string) {
      Message.info(msg);
    }
  }
});
</script>
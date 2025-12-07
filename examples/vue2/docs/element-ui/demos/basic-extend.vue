<template>
  <div>
    <el-button type="primary" @click="onClick"> Element Button </el-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Button, Message } from 'element-ui';

// 确保样式被引入 (如果没有配置 babel-plugin-import)
import 'element-ui/lib/theme-chalk/button.css';
import 'element-ui/lib/theme-chalk/message.css';

export default Vue.extend({
  components: {
    [Button.name]: Button,
  },
  methods: {
    onClick(): void {
      Message.success('Hello Element');
    },
  },
});
</script>

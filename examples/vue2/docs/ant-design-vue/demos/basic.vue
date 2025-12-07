<template>
  <div>
    <h3>Ant Design Vue (Imported)</h3>
    <a-button type="primary" @click="onClick"> Antd Button </a-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Button, message } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; // 简单起见引入全量样式

export default Vue.extend({
  components: {
    AButton: Button,
  },
  methods: {
    onClick(): void {
      message.info('Hello Antd');
    },
  },
});
</script>

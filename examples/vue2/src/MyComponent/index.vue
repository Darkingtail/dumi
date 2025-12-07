<template>
  <div class="my-component">
    <h3>My Custom Component</h3>
    <p>Message prop: {{ message }}</p>
    <button @click="onClick">Emit Event</button>
  </div>
</template>

<script lang="ts">
/**
 * MyComponent Description
 */
export default {
  name: 'MyComponent',
  props: {
    /**
     * The message to display
     */
    message: {
      type: String,
      default: 'Default Message'
    },
    /**
     * A count number
     */
    count: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onClick() {
      /**
       * Triggered when button is clicked
       * @property {string} msg - The event payload
       */
      this.$emit('click', 'Hello from MyComponent');
    }
  }
};
</script>

<style scoped>
.my-component {
  padding: 10px;
  border: 1px dashed #999;
  background-color: #f9f9f9;
}
button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>

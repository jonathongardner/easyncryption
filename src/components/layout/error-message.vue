<template>
  <div v-if='value' class="notification is-warning">
    <button class="delete" @click='close'></button>
    {{ value }}
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    close () {
      this.$emit('input', '')
    }
  }
}
</script>

<style scoped lang="scss">
</style>

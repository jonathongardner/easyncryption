<template>
  <div class="select">
    <select v-model='selected' :disabled='disabled' :required='required'>
      <option v-for='(option, index) in options' :key='index' :value='option.value' :disabled='option.disabled'>
        {{ option | display }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'MySelect',
  props: {
    value: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  filters: {
    display (option) {
      return option.label || option.value
    },
  },
  computed: {
    selected: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    },
  }
}
</script>

<!-- TODO: Add Colors -->
<style scoped lang='scss'>
</style>

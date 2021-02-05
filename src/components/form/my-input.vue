<template>
  <div class="control">
    <input class="input" :type='type' :disabled='disabled' :name='name'
      :placeholder="placeholder" :value='value' @input='input'
      :autocomplete="autocomplete" :required='required'>
  </div>
</template>

<script>
export default {
  name: 'MyInput',
  components: {
  },
  props: {
    value: {
      required: true
    },
    placeholder: {
      type: String,
      default: null,
    },
    autocomplete: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    input(event) {
      this.$emit('input', event.srcElement.value)
    }
  }
}
</script>

<style scoped lang='scss'>
</style>

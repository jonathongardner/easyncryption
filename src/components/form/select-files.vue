<template>
  <div class="field">
    <div class="file is-large is-centered is-boxed">
      <label class="file-label">
        <input class="file-input" type="file" ref="fileInput" :accept='acceptJ' :multiple='true' @change='addFiles'>
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">
            <slot name='label' />
          </span>
        </span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectFiles',
  props: {
    accept: {
      type: Array,
      default: () => [],
    }
  },
  computed: {
    acceptJ () {
      return this.accept.join(',')
    }
  },
  methods: {
    addFiles () {
      const files = this.$refs.fileInput.files
      this.$emit('add', files)
      this.$refs.fileInput.value = ''
    },
  }
}
</script>

<style scoped lang="scss">
</style>

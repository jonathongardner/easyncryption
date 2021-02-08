<template>
  <div class="select-or-drop has-text-white has-text-centered" @drop='filesDropped' @dragover.prevent @dragenter.prevent>
    <label for='fileInput' class='my-file-label'>
      <input id='fileInput' class="file-input" type="file" ref="fileInput" :accept='acceptJ' :multiple='true' @change='addFiles' :disabled='disabled'>
      <span>
        <span v-if='loading'>
          <i class="fas fa-spinner fa-spin"></i>
        </span>
        <span v-else>
          <i class="fas fa-upload"></i>
        </span>
        <span>
          <slot name='label'/>
        </span>
      </span>
    </label>
    <slot name='body'/>
  </div>
</template>

<script>
export default {
  name: 'SelectOrDragFiles',
  props: {
    accept: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
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
    filesDropped (event) {
      console.log(event)
      event.preventDefault()
      this.$emit('add', event.dataTransfer.files)
    }
  }
}
</script>

<style scoped lang="scss">
.select-or-drop {
  margin: 10px;
  .my-file-label {
    position: relative;
    .file-input:enabled {
      cursor: pointer;
    }
  }
  flex: 1;
  border: 2px solid white;
  border-radius: 8px;
  align-self: stretch;
}
</style>

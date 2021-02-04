<template>
  <div>
    <div v-if='hasClearListener' class='reset-button'>
      <button v-if='anyFiles' class="secret-button is-size-6" @click='clearFiles'>
        Clear
      </button>
    </div>
    <div class='files'>
      <template v-for='file in files'>
        <slot v-bind:file='file' />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Files',
  props: {
    files: {
      type: Array,
      required: true,
    },
  },
  computed: {
    anyFiles () {
      return this.files.length
    },
    hasClearListener(){
      return this.$listeners && this.$listeners.clear
    }
  },
  methods: {
    clearFiles () {
      this.$emit('clear')
    }
  }
}
</script>

<style scoped lang="scss">
.files {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.reset-button {
  display: flex;
  flex-direction: row-reverse;
}
</style>

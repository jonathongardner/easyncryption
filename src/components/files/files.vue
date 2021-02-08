<template>
  <div>
    <div v-if='hasClearListener' class='reset-button'>
      <button v-if='anyFiles' class="secret-button is-size-6" @click='clearFiles'>
        Clear
      </button>
    </div>
    <div class='files has-text-centered'>
      <template v-for='file in files'>
        <file-el :file='file' :key='file.id' v-if='hasDelete' @delete='deleteFile' />
        <file-el :file='file' :key='file.id' v-else />
      </template>
    </div>
  </div>
</template>

<script>
import FileEl from '@/components/files/file'
export default {
  name: 'Files',
  components: {
    FileEl,
  },
  props: {
    files: {
      type: Array,
      required: true,
    },
  },
  computed: {
    hasDelete () {
      return this.$listeners && this.$listeners.delete
    },
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
    },
    deleteFile (file) {
      this.$emit('delete', file)
    }
  }
}
</script>

<style scoped lang="scss">
.files {
  min-height: 170px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.reset-button {
  display: flex;
  flex-direction: row-reverse;
}
</style>

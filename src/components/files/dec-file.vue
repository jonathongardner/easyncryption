<template>
  <a class="dec-file" :href='file.dataURL' :download='file.filename'>
    <button class='delete' @click='deleteThis'></button>
    <file-overlay v-if='loading'>
      <progress class="progress is-small is-dark" max="100"></progress>
    </file-overlay>
    <file-overlay v-else-if='error'>
      <p class="has-text-white	">
        Could not decrypt file, try again. If this continues ensure you are using the decryption key matching the encrpytion key.
      </p>
    </file-overlay>
    <file-overlay v-else class='my-hover'>
      <span class="icon is-small has-text-white	">
        <i class="fas fa-download"></i>
      </span>
    </file-overlay>
    <div class='image'>
      <img src='/img/file.png' alt='file' />
    </div>
    <div>
      {{ file.encFilename }}
    </div>
    <div>
      <span class='icon'>
        <i class="fas fa-exclamation-circle" v-if='error'></i>
        <i class="fas fa-unlock" v-else></i>
      </span>
    </div>
  </a>
</template>

<script>
import FileOverlay from '@/components/layout/file-overlay'
export default {
  name: 'DecFile',
  components: {
    FileOverlay
  },
  props: {
    file: {
      type: Object,
      required: true,
    }
  },
  computed: {
    loading () {
      return !this.file.dataURL && !this.error
    },
    error () {
      return this.file.error
    }
  },
  methods: {
    deleteThis (event) {
      event.preventDefault()
      this.$emit('delete', this.file)
    }
  }
}
</script>

<style scoped lang="scss">
.dec-file {
  color: #2c3e50;
  position: relative;
  width: 150px;
  height: 150px;
  padding: 10px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .image {
    img {
      width: 50px;
      margin: 0px auto;
    }
  }
  .delete {
    position: absolute;
    right: 0px;
    top: 0px;
    transform: translate(40%, -40%);
  }
  .my-hover {
    display: none;
  }
}
.dec-file:hover {
  .my-hover {
    display: flex;
  }
}
</style>

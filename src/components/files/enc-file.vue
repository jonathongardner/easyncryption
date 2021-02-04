<template>
  <a class="enc-file" :href='file.encDataURL' :download='file.encFilename'>
    <button class='delete' @click='deleteThis'></button>
    <file-overlay v-if='loading'>
      <progress class="progress is-small is-dark" max="100"></progress>
    </file-overlay>
    <file-overlay v-else-if='error' class='my-hover'>
      <p class="has-text-white	">
        Could not encrypt file, try again. If this continues key could be corrupt or file could be to large.
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
      {{ file.filename }}
    </div>
    <div>
      <span class='icon'>
        <i class="fas fa-exclamation-circle" v-if='error'></i>
        <i class="fas fa-lock" v-else></i>
      </span>
    </div>
  </a>
</template>

<script>
import FileOverlay from '@/components/layout/file-overlay'
export default {
  name: 'EncFile',
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
      return !this.file.encDataURL
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
.enc-file {
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
.enc-file:hover {
  .my-hover {
    display: flex;
  }
}
</style>

<template>
  <div class="key-file">
    <button v-if='hasDelete' class='delete' @click='deleteThis'></button>
    <a :href='file.dataURL' :download='file.downloadFilename || file.filename'>
      <file-overlay v-if='error'>
        <p class="has-text-white	">
          {{ file | errorMessage }}
        </p>
      </file-overlay>
      <file-overlay v-else-if='loading'>
        <progress class="progress is-small is-dark" max="100"></progress>
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
          <i class="fas" :class='iconClass'></i>
        </span>
      </div>
    </a>
  </div>
</template>

<script>
import FileOverlay from '@/components/layout/file-overlay'
export default {
  name: 'File',
  components: {
    FileOverlay
  },
  props: {
    file: {
      type: Object,
      required: true,
    }
  },
  filters: {
    errorMessage({ type }) {
      if (type === 'encryption') {
        return 'Could not encrypt file, try again. If this continues, key could be corrupt or file could be to large.'
      }
      if (type === 'decryption') {
        return 'Could not decrypt file, try again. If this continues ensure you are using the decryption key matching the encrpytion key.'
      }
      if (type === 'generate-key') {
        return 'Could not generate key, try again.'
      }
      return ''
    },
  },
  computed: {
    hasDelete () {
      return this.$listeners && this.$listeners.delete
    },
    iconClass () {
      const { type } = this.file
      if (type === 'encryption') {
        return 'fa-lock'
      }
      if (type === 'decryption') {
        return 'fa-unlock'
      }
      if (type === 'generate-key') {
        return 'fa-key'
      }
      return ''
    },
    loading () {
      return !this.file.dataURL
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
.key-file {
  background-color: white;
  position: relative;
  width: 150px;
  height: 150px;
  padding: 10px 20px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 10px;
  .delete {
    position: absolute;
    right: 0px;
    top: 0px;
    transform: translate(40%, -40%);
  }
  & > a {
    color: #2c3e50;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .image {
      img {
        width: 50px;
        margin: 0px auto;
      }
    }
    .my-hover {
      display: none;
    }
  }
  & > a:hover {
    .my-hover {
      display: flex;
    }
  }
}
</style>

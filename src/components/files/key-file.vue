<template>
  <a class="key-file" :href='file.dataURL' :download='file.filename'>
    <file-overlay class='my-hover'>
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
        <i class="fas fa-key"></i>
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
.key-file {
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
  .my-hover {
    display: none;
  }
}
.key-file:hover {
  .my-hover {
    display: flex;
  }
}
</style>

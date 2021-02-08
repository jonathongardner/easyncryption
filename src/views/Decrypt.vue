<template>
  <div>
    <select-enk :value='encKey' @input='keyChanged' decryption />
    <select-or-drag-files v-hide='noEncKey' @add='addEncFiles' :accept="['.enc']">
      <template v-slot:label>
        Select files to Decrypt or drag them here
      </template>
      <template v-slot:body>
        <files :files='files' @clear='clearFiles' @delete='deleteFile' />
      </template>
    </select-or-drag-files>
  </div>
</template>

<script>
import SelectEnk from '@/components/form/select-enk'
import SelectOrDragFiles from '@/components/form/select-or-drag-files'
import Files from '@/components/files/files'
import { decryptFile } from '@/helpers/encryptions'

export default {
  name: 'Decrypt',
  components: {
    SelectEnk, SelectOrDragFiles, Files
  },
  data () {
    return {
      encKey: {},
      files: [],
    }
  },
  computed: {
    noEncKey () {
      return !this.encKey.filename
    }
  },
  methods: {
    keyChanged (value) {
      this.files = []
      this.encKey = value
    },
    addEncFiles (files) {
      files.forEach(file => {
        const id = Math.random()
        this.files.push({ filename: file.name, id, type: 'decryption' })
        decryptFile(this.encKey, file).then(({ filename, dataURL }) => {
          this.updateFile(id, { downloadFilename: filename, dataURL })
        }).catch(err => {
          console.log(err)
          this.updateFile(id, { error: err.message })
        })
      })
    },
    updateFile (id, data) {
      const index = this.files.findIndex(file => file.id === id)
      if (index === -1) { // if -1 assume deleted
        return
      }
      this.$set(this.files, index, Object.assign({}, this.files[index], data))
    },
    clearFiles () {
      this.files = []
    },
    deleteFile ({ id }) {
      const index = this.files.findIndex(file => file.id === id)
      if (index !== -1) { // if -1 assume deleted
        this.$delete(this.files, index)
      }
    }
  }
}
</script>

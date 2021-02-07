<template>
  <div>
    <select-enk :value='encKey' @input='keyChanged' decryption />
    <template v-if='hasEncKey'>
      <select-files @add='addEncFiles' :accept="['.enc']">
        Select Files to Decrypt
      </select-files>
      <files :files='files' @clear='clearFiles'>
        <template v-slot:default="{ file }">
          <dec-file :file='file' @delete='deleteFile'/>
        </template>
      </files>
    </template>
  </div>
</template>

<script>
import SelectEnk from '@/components/form/select-enk'
import SelectFiles from '@/components/form/select-files'
import Files from '@/components/files/files'
import DecFile from '@/components/files/dec-file'
import { decryptFile } from '@/helpers/encryptions'

export default {
  name: 'Decrypt',
  components: {
    SelectEnk, SelectFiles, Files, DecFile
  },
  data () {
    return {
      encKey: {},
      files: [],
    }
  },
  computed: {
    hasEncKey () {
      return !!this.encKey.filename
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
        this.files.push({ encFilename: file.name, id })
        decryptFile(this.encKey, file).then(({ filename, dataURL }) => {
          this.updateFile(id, { filename, dataURL })
        }).catch(err => {
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

<template>
  <div>
    <select-enk :value='encKey' @input='keyChanged' />
    <template v-if='hasEncKey'>
      <select-files @add='addEncFiles'>
        Select Files to Encrypt
      </select-files>
      <files :files='files' @clear='clearFiles'>
        <template v-slot:default="{ file }">
          <enc-file :file='file' @delete='deleteFile'/>
        </template>
      </files>
    </template>
  </div>
</template>

<script>
import SelectEnk from '@/components/form/select-enk'
import SelectFiles from '@/components/form/select-files'
import Files from '@/components/files/files'
import EncFile from '@/components/files/enc-file'
import { encryptFile } from '@/helpers/encryptions'

export default {
  name: 'Encrypt',
  components: {
    SelectEnk, SelectFiles, Files, EncFile
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
        this.files.push({ filename: file.name, id })
        encryptFile(this.encKey, file).then(({ encFilename, encDataURL }) => {
          this.updateFile(id, { encFilename, encDataURL })
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

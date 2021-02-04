<template>
  <div>
    <select-enk :value='encKey' @input='keyChanged' decryption />
    <template v-if='hasEncKey'>
      <select-files @add='addEncFiles' :accept="['.enc']">
        Select Files to Decrypt
      </select-files>
      <files :files='files' @clear='clearFilesToEnc'>
        <template v-slot:default="{ file }">
          {{ file.encFilename }}
          <!-- <dec-file :file='file' @delete='deleteEncFile'/> -->
        </template>
      </files>
    </template>
  </div>
</template>

<script>
import SelectEnk from '@/components/form/select-enk'
import SelectFiles from '@/components/form/select-files'
import Files from '@/components/common/files'
import { decryptFile } from '@/helpers/encryptions'

export default {
  name: 'Decrypt',
  components: {
    SelectEnk, SelectFiles, Files
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
        decryptFile(this.encKey, file).then(({ encFilename, encDataURL }) => {
          const index = this.files.findIndex(file => file.id === id)
          if (index !== -1) { // if -1 assume deleted
            this.$set(this.files[index], 'dataURL', encDataURL)
            this.$set(this.files[index], 'filename', encFilename)
          }
        })
      })
    },
    clearFilesToEnc () {
      this.files = []
    }
  }
}
</script>

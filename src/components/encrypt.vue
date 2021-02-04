<template>
  <div>
    <select-enk :value='encKey' @input='keyChanged' />
    <template v-if='hasEncKey'>
      <select-files @add='addEncFiles'>
        Select Files to Encrypt
      </select-files>
      <files :files='files' @clear='clearFilesToEnc'>
        <template v-slot:default="{ file }">
          {{ file.filename }} {{ file.error }}
          <!-- <enc-file :file='file' @delete='deleteEncFile'/> -->
        </template>
      </files>
    </template>
  </div>
</template>

<script>
import SelectEnk from '@/components/form/select-enk'
import SelectFiles from '@/components/form/select-files'
import Files from '@/components/common/files'
import { encryptFile } from '@/helpers/encryptions'

export default {
  name: 'Encrypt',
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
        this.files.push({ filename: file.name, id })
        encryptFile(this.encKey, file).then(({ encFilename, encDataURL }) => {
          this.updateFile(id, { encFilename, encDataURL })
        }).catch(err => {
          this.updateFile(id, { error: 'Something went wrong, try again.', detailedError: err.message })
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
    clearFilesToEnc () {
      this.files = []
    }
  }
}
</script>

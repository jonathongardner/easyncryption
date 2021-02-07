<template>
  <div>
    <error-message v-model='error' />
    <form class="field has-addons" @submit='stopSubmit'>
      <p class="control">
        <my-select v-model='type' :options='encryptions' :disabled='loading' />
      </p>
      <p class="control is-expanded">
        <my-input v-model='identifier' :disabled='loading' placeholder='Identifier'/>
      </p>
      <p class="control">
        <button class="button is-success" :class="{ 'is-loading': loading }" @click='generateKey' :disabled='disableGenerate' type='submit'>
          Generate
        </button>
      </p>
    </form>
    <files :files='files'>
      <template v-slot:default="{ file }">
        <key-file :file='file' />
      </template>
    </files>
  </div>
</template>

<script>
import ErrorMessage from '@/components/layout/error-message'
import MySelect from '@/components/form/my-select'
import MyInput from '@/components/form/my-input'
import Files from '@/components/files/files'
import KeyFile from '@/components/files/key-file'
import { encryptions, textDataURL } from '@/helpers/encryptions'

export default {
  name: 'GenerateKey',
  components: {
    ErrorMessage, MySelect, MyInput, Files, KeyFile
  },
  data () {
    return {
      loading: false,
      error: '',
      type: 'rsa+aes',
      identifier: '',
      encryptions: Object.values(encryptions).filter(enc => !enc.ignore).map(enc => ({ value: enc.type, label: enc.label })),
      files: []
    }
  },
  computed: {
    disableGenerate () {
      return !this.type
    },
  },
  methods: {
    stopSubmit (e) {
      // use form so enter defaults
      e.preventDefault()
    },
    generateKey () {
      if (this.disableGenerate) {
        return
      }
      this.files = []
      this.error = ''
      this.loading = true
      const enc = encryptions[this.type]
      const ident = this.identifier ? this.identifier : `${enc.type}-EasyNCRYPTION`

      enc.generateKey().then(keys => {
        this.files = keys.map((key) => {
          const jsonString = JSON.stringify({ type: enc.type, identifier: ident, ...key.toSave })
          return {
            filename: `${ident}${key.extension}`,
            dataURL: textDataURL(jsonString)
          }
        })
      }).catch(error => {
        this.error = error.message
      }).then(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>

<template>
  <div>
    <error-message v-model='error' />
    <form @submit="stop">
      <div class="field">
        <label class="label">Encryption Type</label>
        <my-select v-model='type' :options='encryptions' :disabled='loading' />
      </div>
      <div class="field">
        <label class="label">Identifier</label>
        <my-input v-model='identifier' :disabled='loading' placeholder='Identifier'/>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-success" :class="{ 'is-loading': loading }" @click='generateKey' :disabled='disableGenerate' type='submit'>
            Generate
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import ErrorMessage from '@/components/layout/error-message'
import MySelect from '@/components/form/my-select'
import MyInput from '@/components/form/my-input'
import { encryptions, textDataURL } from '@/helpers/encryptions'

export default {
  name: 'GenerateKeyForm',
  components: {
    ErrorMessage, MySelect, MyInput
  },
  props: {
    value: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      loading: false,
      error: '',
      type: 'rsa+aes',
      identifier: '',
      encryptions: Object.values(encryptions).filter(enc => !enc.ignore).map(enc => ({ value: enc.type, label: enc.label })),
    }
  },
  computed: {
    disableGenerate () {
      return !this.type
    },
  },
  methods: {
    stop (evt) {
      evt.preventDefault()
    },
    generateKey () {
      if (this.disableGenerate) {
        return
      }
      this.$emit('input', [])
      this.error = ''
      this.loading = true
      const enc = encryptions[this.type]
      const ident = this.identifier ? this.identifier : `${enc.type}-EasyNCRYPTION`

      enc.generateKey().then(keys => {
        const files = keys.map((key) => {
          const jsonString = JSON.stringify({ type: enc.type, identifier: ident, ...key.toSave })
          return {
            filename: `${ident}${key.extension}`,
            dataURL: textDataURL(jsonString)
          }
        })
        this.$emit('input', files)
      }).catch(error => {
        this.error = error.message
      }).then(() => {
        this.loading = false
      })
    }
  }
}
</script>

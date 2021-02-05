<template>
  <div class="file has-name is-centered">
    <error-message v-model='error' />
    <label class="file-label">
      <input ref='fileInput' class="file-input" type="file" :name="type" :accept="accept" @change='addFile' :disabled='loading'>
      <span class="file-cta">
        <span v-if='loading' class="file-icon">
          <i class="fas fa-spinner fa-spin"></i>
        </span>
        <span v-else class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label">
          Select {{ type }} key file
        </span>
      </span>
      <span v-if='hasValue' class="file-name">
        {{ encLabel }} {{ type }} using {{ value.filename }}
      </span>
    </label>
  </div>
</template>

<script>
import ErrorMessage from '@/components/layout/error-message'
import { parseEnkFile } from '@/helpers/file-functions'

export default {
  name: 'SelectEnk',
  components: { ErrorMessage },
  props: {
    value: {
      type: Object,
      required: true,
    },
    decryption: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      loading: false,
      error: '',
    }
  },
  computed: {
    hasValue () {
      return !!this.value.filename
    },
    extensions () {
      if (this.decryption) {
        return ['.enk']
      }
      return ['.enk','.enk.pub']
    },
    accept () {
      return this.extensions.join(',')
    },
    type () {
      if (this.decryption) {
        return 'decryption'
      }
      return 'encryption'
    },
    encLabel () {
      if (this.value.type) {
        return this.value.encryption.label
      }
      return ''
    },
    keyKeys () {
      if (this.decryption) {
        return ['type', 'identifier', 'decryptionKey']
      }
      return ['type', 'identifier', 'encryptionKey']
    }
  },
  methods: {
    async addFile () {
      this.loading = true
      this.error = ''
      const file = this.$refs.fileInput.files[0]
      if (file) {
        const input = await this.parseEnkFile(file)
        this.$emit('input', input)
      }
      this.$refs.fileInput.value = ''
      this.loading = false
    },
    parseEnkFile (file) {
      return parseEnkFile(file, this.extensions, this.keyKeys).catch(e => {
        this.error = e.message
        return {}
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>

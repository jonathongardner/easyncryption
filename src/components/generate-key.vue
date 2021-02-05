<template>
  <div>
    <generate-key-form v-model='files' />
    <files :files='files'>
      <template v-slot:default="{ file }">
        <key-file :file='file' />
      </template>
    </files>
  </div>
</template>

<script>
import GenerateKeyForm from '@/components/form/generate-key-form'
import Files from '@/components/files/files'
import KeyFile from '@/components/files/key-file'

export default {
  name: 'GenerateKey',
  components: {
    GenerateKeyForm, Files, KeyFile
  },
  data () {
    return { files: [] }
  },
  computed: {},
  methods: {}
}
</script>

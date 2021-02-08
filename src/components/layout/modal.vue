<template>
  <div class="modal is-active">
    <div class="modal-background" @click='close'></div>
    <div class="modal-content">
      <header class="modal-card-head">
        <slot name='header' />
        <button class="delete" aria-label="close" @click='close'></button>
      </header>
      <section class="modal-card-body">
        <slot name='body' />
      </section>
      <footer class="modal-card-foot">
        <slot name='footer' />
      </footer>
    </div>
    <!-- <button class="modal-close is-large" aria-label="close" @click='close'></button> -->
  </div>
</template>

<script>
export default {
  name: 'Modal',
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
</style>

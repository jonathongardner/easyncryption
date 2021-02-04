<template>
  <div class='overlay'>
    <div class='item'>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileOverlay',
}
</script>

<style scoped lang="scss">
.overlay {
  // content: '\A';
  z-index: 5;
  position: absolute;
  width: 100%;
  height:100%;
  top:0;
  left:0;
  background: rgba(0,0,0,0.6);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .item {
    padding: 10px 10px;
  }
}
</style>

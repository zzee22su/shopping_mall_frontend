
<template>
  <div class="my-modal"
     v-if="visible" @click.self="handleWrapperClick"> // 팝업 영역 바깥쪽을 클릭했을때 발생하는 이벤트/
    <div class="my-modal__dialog">
      <header class="my-modal__header">
        <span>{{title}}</span>
      </header>
      <div class="my-modal__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-modal',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    title: {
      type: String,
      require: false,
    },
  },
  methods: {
    handleWrapperClick(){
      this.$emit('update:visible', false)
    },
  },
}

</script>
<style lang="scss">
$module: 'my-modal';
.#{$module} {
  // This is modal bg
  background-color: rgba(0,0,0,.7); // 팝업 밖의 배경색 지정.
  top: 0; right: 0; bottom: 0; left: 0;
  position: fixed;
  overflow: auto;
  margin: 0;
  //This is modal layer
  &__dialog{
    left:40%; //위치 지정을 위해 설정.
    top: 75px; //위쪽 여백.
    width: 400px; // 가로 크기 지정.
    position: absolute;
    background: #fff;
    margin-bottom: 50px;
  }

  &__header {
    font-size: 28px;
    font-weight: bold;
    line-height: 1.29;
    padding: 16px 16px 0 25px;
    position: relative;
  }
  &__body {
    padding: 25px;
    min-height: 100px;
    max-height: 412px;
    color: red;
    font-weight: bold;
  }
}
</style>
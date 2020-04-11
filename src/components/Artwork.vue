<template>
  <div
    id="artwork"
    :class="{ blurry, paused }"
    :style="{ backgroundImage: `url(${image})`}"
  ></div>
</template>

<script>
export default {
  name: 'artwork',
  props: {
    image: String,
    blurry: Boolean,
    paused: Boolean
  }
}
</script>

<style scoped>
  #artwork {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: absolute;
    width: 500px;
    height: 500px;
    transform: scale(1.05);
    transition: all 0.3s ease;
  }
  #artwork.blurry {
    transform: scale(1.10);
    filter: blur(3px);
  }
  #artwork.paused {
    filter: grayscale(80%);
  }
</style>

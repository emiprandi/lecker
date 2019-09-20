<template>
  <div>
    <h1>{{lecker}}</h1>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      lecker: 'Lecker Player'
    }
  }
}
</script>

<style scoped>
h1 {
  color: tomato;
}
</style>

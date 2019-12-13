<template>
  <div class="home">
    <GetTodo2></GetTodo2>
    <CurrentTodos></CurrentTodos>
  </div>
</template>

<script>
import GetTodo2 from '@/components/GetTodo2.vue'
import CurrentTodos from '@/components/CurrentTodos.vue'
export default {
  name: 'home',
  components: {
    GetTodo2,
    CurrentTodos,
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>

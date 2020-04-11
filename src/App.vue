<template>
  <div id="app">
        <router-view></router-view>
  </div>
</template>

<script>
// import Animations from './components/Animations.vue';
// import QuizApp from './components/Quiz.vue';

export default {
  name: 'app',
  /* components: {
    Animations,
    'quiz-app':QuizApp
  } */
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

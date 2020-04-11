<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1 class="text-center">The Super Quiz</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <transition name="flip" mode="out-in">
          <component :is="mode" @answered="answered($event)" @confirmed="mode='app-questions'"></component>
        </transition>
      </div>
    </div>
    <router-link to="/animations"> Go to Animations </router-link>
  </div>
</template>

<script>
import Questions from "./Questions.vue";
import Answers from "./Answers.vue";

export default {
  data() {
    return {
      mode: "app-questions"
    };
  },
  methods: {
    answered(isCorrect) {
      if (isCorrect) {
        this.mode = "app-answers";
      } else {
        this.mode = "app-questions";
        alert("wrong, please try again");
      }
    }
  },
  components: {
    "app-questions": Questions,
    "app-answers": Answers
  }
};
</script>

<style scoped>
.flip-enter {
    
}
.flip-enter-active {
    animation: flip-in 0.5s ease-out forwards;
}
.flip-leave {

}

.flip-leave-active {
    animation: flip-in  -.5s ease-out forwards;
}


@keyframes flip-out {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(90deg);
  }
}
@keyframes flip-in {
  from {
    transform: rotateY(90deg);
  }
  to {
    transform: rotateY(0deg);
  }
}
</style>
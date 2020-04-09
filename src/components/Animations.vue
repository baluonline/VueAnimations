<template>
  <div class="col-8 container">
    <h1>{{msg}}</h1>
    <hr />
    <select v-model="alertAnimation" class="form-control">
      <option value="fade">fade</option>
      <option value="slide">slide</option>
    </select>
    <hr />
    <button class="btn btn-primary" @click="show=!show">Click me</button>
    <hr />
    <transition :name="alertAnimation">
      <div class="alert alert-info" v-if="show">This is animated element</div>
    </transition>
    <transition :name="alertAnimation">
      <div class="alert alert-info" v-if="show">This is slide element</div>
    </transition>
    <transition enter-active-class="animated bounce" leave-active-class="animated zoomInLeft">
      <div class="alert alert-info" v-if="show">This is initial slide</div>
    </transition>
    <transition :name="alertAnimation" mode="in-out">
      <div class="alert alert-info" v-if="show" key="info">This is information element</div>
      <div class="alert alert-warning" v-else key="warning">This is warning element</div>
    </transition>
    <hr />
    <button class="btn btn-primary" @click="load = !load">Leave or Load Animations</button>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCancelled"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @leave-cancelled="leaveCancelled"
      :css="false"
    >
      <div style="width:300px; height:100px; background-color:green" v-if="load"></div>
    </transition>
    <br />
    <br />
    <h1>Dynamic Component animation</h1>
    <button
      class="btn btn-primary"
      @click="selectedComponent === 'app-success-alert'? selectedComponent='app-danger-alert':selectedComponent='app-success-alert'"
    >Toggle component</button>
    <br />
    <br />
    <br />
    <transition name="fade" mode="out-in">
      <component :is="selectedComponent"></component>
    </transition>
    <hr />
    <button class="btn btn-primary" @click="addItem">Add item</button>
    <br />
    <br />
    <ul class="list-group">
      <transition-group name="slide">
        <li
          class="list-group-item"
          v-for="(number,index) in numbers"
          :key="number"
          @click="deleteItem(index)"
          style="cursor:pointer"
        >{{ number }}</li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import SuccessAlert from "./SuccessAlert.vue";
import DangerAlert from "./DangerAlert.vue";

export default {
  name: "HelloWorld",
  props:{
    msg:String
  },
  data() {
    return {
      show: false,
      load: true,
      alertAnimation: "",
      elementWidth: 100,
      selectedComponent: "app-danger-alert",
      numbers: [1, 2, 3, 4, 5]
    };
  },
  components: {
    "app-danger-alert": DangerAlert,
    "app-success-alert": SuccessAlert
  },
  methods: {
    beforeEnter(el) {
      alert("before enter");
      this.elementWidth = 100;
      el.style.width = this.elementWidth + "px";
    },
    enter(el, done) {
      alert("enter");

      let round = 1;
      const interval = setInterval(() => {
        el.style.width = this.elementWidth + round * 10 + "px";
        round++;
        if (round > 20) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterEnter() {
      alert("after enter");
    },
    enterCancelled() {
      alert("enter cancel");
    },
    beforeLeave(el) {
      this.elementWidth = 300;
      el.style.width = this.elementWidth + "px";
    },
    leave(el, done) {
      let round = 1;
      const interval = setInterval(() => {
        el.style.width = this.elementWidth - round * 10 + "px";
        round++;
        if (round > 5) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterLeave() {
      alert("leave after");
    },
    leaveCancelled() {
      alert("leave cancel");
    },
    addItem() {
      const pos = Math.floor(Math.random() * this.numbers.length);
      this.numbers.splice(pos, 0, this.numbers.length + 1);
    },
    deleteItem(index) {
      // this.numbers = this.numbers.filter(number => number!==index)
      this.numbers.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1s;
}
/* .fade-leave {

} */
.fade-leave-active {
  transition: opacity 1s;
  opacity: 0;
}
.slide-enter {
}
.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity 1s;
}
.slide-leave {
}
.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 1s;
  position: absolute;
}
.slide-move {
  transition: transform 1s;
}
@keyframes slide-in {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(40px);
  }
}
@keyframes slide-out {
  from {
    transform: translateY(40px);
  }
  to {
    transform: translateY(20px);
  }
}
</style>
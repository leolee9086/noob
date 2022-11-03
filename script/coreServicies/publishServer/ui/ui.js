import { createApp } from '/deps/vue'
console.log(createApp)
createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')

import { createApp } from '/deps/vue'
import loadModule  from  "/deps/vue-sfc-loader"
console.log(createApp)
console.log(loadModule)
createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')

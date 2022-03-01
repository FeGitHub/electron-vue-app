import Vue from 'vue'

// #################################vue-web-storage###############################################
// https://github.com/ankurk91/vue-web-storage
/* import storage from 'vue-web-storage'
Vue.use(storage, {
  drivers: ['session', 'local']
})*/

// #################################vue-storage-watcher###############################################
// https://github.com/dreambo8563/vue-storage-watcher
/* import lsWatcher from 'vue-storage-watcher';
Vue.use({ ...lsWatcher }, { prefix: 'drc-pm-vue:' });
Vue.use({ ...lsWatcher }, { prefix: 'drc-pm-vue:', storage: 'session' });
*/

// #################################vue-web-storage###############################################
// https://github.com/RobinCK/vue-ls
import Storage from 'vue-ls'
Vue.use(Storage, {
  namespace: 'electron-vue-app:', // key prefix
  name: '$localStorage', // name variable Vue.[ls] or this.[$ls],
  storage: 'local' // storage name session, local, memory
})

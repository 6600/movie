import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    userId: '',
    membership: 0,
    token:'',
    userinfo:{}
  },
  getters: {
    getUsername: (stage) => stage.username,
    getToken: (stage) => stage.token,
    getUserId: (stage) => stage.userId,
    getMembership: (stage) => stage.membership,
    getUserinfo: (stage) => stage.userinfo
  },
  mutations: {
    setToken: (stage,data) => stage.token = data,
    setUserinfo: (stage,data) => stage.userinfo = data,
    setUsername: (stage, data) => stage.username = data,
    setUserId: (stage, data) => stage.userId = data,
    setMembership: (stage, data) => stage.membership = data
  },
  actions: {
  },
  modules: {
  }
})

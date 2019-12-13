import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    newTodo: '',
    pk: 0,
    token: '',
  },
  mutations: {
    GET_TOKEN(state, token){
      state.token =  token
    },
    GET_TODOS(state, todos){
      state.todos =  todos
    },
    ADD_TODO(state, todo){
        state.todos.push({
            name: todo.name,
            pk: todo.pk,
            completed: false
        })
    },
    EDIT_TODO(state, todo){
      var todos = state.todos
      var t = todos.filter((el) => {
        return el.pk == todo.pk
      })
      todos[todos.indexOf(t[0])].name = todo.name
      state.todos = todos
    },
    REMOVE_TODO(state, todo){
        var todos = state.todos
        todos.splice(todos.indexOf(todo), 1)
        
    },
    COMPLETE_TODO(state, todo){
        todo.completed = !todo.completed
    },
    CLEAR_TODO(state){
        state.newTodo = ''
    }
  },
  actions: {
    GET_TOKEN : async ({commit}) => {
      let res = await Axios.post("http://localhost:8000/todo/api/token/",{
        "username":"admin",
        "password":"admin"
      })
      
      if(res.status == 200){
        localStorage.token = res.data.access;
        commit('GET_TOKEN', res.data.access)
      }else{
        console.log('something wrong with token');
      }
    },
    GET_TODOS : async ({commit}) => {
      let res = await Axios.get("http://localhost:8000/todo/")
      if(res.status == 200){        
        commit('GET_TODOS', res.data)
      }else{
        console.log('something wrong with server');
      }
    },
    ADD_TODO : async ({commit}, todo) => {
        let res = await Axios.post("http://localhost:8000/todo/create/",{'name':todo})
        if(res.status == 201){
          commit('ADD_TODO', res.data)
        }else{
          console.log('something wrong with create');
        }
    },
    EDIT_TODO : async ({commit}, todo) => {
        let res = await Axios.put("http://localhost:8000/todo/" + todo.pk + "/",{'name':todo.name})
        if(res.status == 200){
          commit('EDIT_TODO', todo)
        }else{
          console.log('something wrong with REMOVE_TODO');
        }
        
    },
    removeTodo : async ({commit}, todo) => {
      
      let res = await Axios.delete("http://localhost:8000/todo/" + todo.pk + "/")
        if(res.status == 204){
          commit('REMOVE_TODO', todo)
        }else{
          console.log('something wrong with REMOVE_TODO');
        }
    },
    completeTodo({commit}, todo){
        commit('COMPLETE_TODO', todo)
    },
    clearTodo({commit}){
        commit('CLEAR_TODO')
    }
  },
  getters: {
    newTodo: state => state.newTodo,
    token: state => state.token,
    todos: state => state.todos.filter((todo) => {return !todo.completed}),
    completedTodos: state => state.todos
    },
  modules: {
  }
})

<template>
    <div id="current-todos" class="container">
        <h3 v-if="todos.length > 0">Current({{todos.length}})</h3>
        <ul class="list-group">
            <li class="list-group-item" v-for="todo in todos" :key="todo.pk">
                {{todo.pk}} - 
                
            <div class="btn-group">
                <input class=""
                :value="todo.name"
                @change="testcomp"
                >
                <button type="button" @click="edit($event,todo)" class="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-edit"></span> Edit
                </button>
                <button type="button" @click="complete(todo)" class="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-ok-circle"></span> Complete
                </button>
                <button type="button" @click="remove(todo)" class="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-remove-circle"></span> Remove
                </button>
            </div>
            </li>
        </ul>
        <p>{{token}}</p>
    </div>
</template>
<script>
export default{
    data() {
            return{
                test: ''
            }
         
        },
    methods: {
        
        getTodo(event, todo){
            console.log('event.target.value ' + event.target.value);
            console.log(todo);
            },
        edit(event, todo){
            let todo2 = {
                "name":this.test,
                "pk":todo.pk
                }
            this.$store.dispatch('EDIT_TODO', todo2)
        },
        complete(todo){
            this.$store.dispatch('completeTodo', todo)
        },
        remove(todo){
            this.$store.dispatch('removeTodo', todo)
        },
        testcomp(e){
            this.test = e.target.value
            
            
        },
        
    },
    created() {
            this.$store.dispatch('GET_TODOS')
            this.$store.dispatch('GET_TOKEN')
        },
    computed: {
        todos(){
            return this.$store.getters.completedTodos
        },
        token(){
            return this.$store.getters.token
        },
        newTodo(){
            return this.$store.getters.newTodo
            },
        
        
    }
}
</script>
<style>
    .btn-group{
        float: right;
    }
</style>

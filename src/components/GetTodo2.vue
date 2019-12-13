<template>
    <div id="get-todo" class="container">
        <input class="form-control"
               v-model="newtodo"
               placeholder="I need to...">
        <button class="btn btn-primary" @click="addTodo">Add Todo</button>
    </div>
</template>
<script>
    export default{
        data() {
            return{
                newtodo: ''
            }
         
        },
        methods: {
            addTodo(){
                console.log(this.newtodo);
                
                this.$store.dispatch('ADD_TODO', this.newtodo)
                this.newtodo = ''
            }
        },

    }
</script>

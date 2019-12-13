mutations : {
    SET_NAME : (state,name) => {
      state.name = name
    }
  },
  actions : {
    SET_NAME : async (context, name) => {
      let { data } = await Axios.post('http://myapiendpoint.com/api/name',{name : name})
      if(data.status == 200){
        context.dispatch('SET_NAME', name)
      }
    }
  }
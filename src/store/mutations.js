// import Vue from 'vue';
export default {
    SET_LIST: (state,{data}) => {
        state.list = data.result
    },
    SET_TOKEN: (state,token) => {
        state.token = token
    }
}

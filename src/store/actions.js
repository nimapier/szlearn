import {getTodos} from '../api';
export default {
    fetchList : ({commit},userid) => {
        return getTodos(userid).then(res => {
            commit('SET_LIST',res)
        })
    }
}
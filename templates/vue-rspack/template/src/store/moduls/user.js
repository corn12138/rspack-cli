const state = {
    user: {
        name: 'huangyuming',
        age: 22,
        sex: '男'

    },
    isLoggedIn: false
}
const mutations = {
    login(state) {
        state.isLoggedIn = true
    },
    logout(state) {
        state.isLoggedIn = false
    },
    updateUser(state, payload) {
        state.user.name = payload.name;
        state.user.age = payload.age;
        state.user.sex = payload.sex;
    }
}
const actions = {
    login({ commit }) {
        commit('login')
    },
    logout({ commit }) {
        commit('logout')
    },
    updateUser({ commit }, payload) {
        commit('updateUser', payload);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters: {
        isLoggedIn: state => state.isLoggedIn,
        user: state => state.user
    }
}
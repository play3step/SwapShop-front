export const state = () => ({
    me: null,
    followerList: [],
    followingList: [],
});

export const mutations = {  /*동기 작업*/
    setMe(state, payload) {  /*회원 가입*/
        state.me = payload;
    },
    changeNickname(state, payload) {
        state.me.nickname = payload.nickname;
    }
};


export const actions = {    /*비동기 작업*/
    signUp({ commit, state }, payload) {//rest api 생각하기
        this.$axios.post('http://localhost:8080/user/new', {
            email: payload.email,
            nickname: payload.nickname,
            password: payload.password,
            major: payload.major,
            authenticationType: payload.authenticationType,
        }).then((data) => {
            commit('setMe', payload)
        })
    },
    logIn({ commit }, payload) {
        this.$axios.post('http://localhost:8080/user/login', {
            email: payload.email,
            password: payload.password,
        },{
            withCredentials: true,
        })
        .then((data)=>{
            commit('setMe', payload)
        }).catch((err)=>{
            console.error(err);
        })
    },
    logOut({ commit }, payload) {
        commit('setMe', null)
    },
    changeNickname({ commit }, payload) {
        commit('changeNickname', payload);
    }
};
export const state = () => ({
    mainPosts: [],
});

export const mutations = {
    addMainPost(state, payload) {
        state.mainPosts.unshift(payload);
    },
    removeMainPost(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.id);
        state.mainPosts.splice(index, 1);
    },
    addComment(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts[index].Comments.unshift(payload);
    }
};

export const actions = {
    add({ commit }, payload) {
        this.$axios.post('http://localhost:8080/post', {
            title: payload.title,
            content: payload.content,
        }, {
            headers: {
                'Authorization': 'Bearer ' + payload.token, // 여기서 'token'은 실제 토큰 값입니다.
                'Content-Type': 'application/json',
            }
        }).then((data) => {
            commit('addMainPost', payload)
        }).catch((err) => {
            console.error(err);
        })
    },
    remove({ commit }, payload) {
        commit('removeMainPost', payload);
    },
    addComment({ commit }, payload) {
        commit('addComment', payload);
    },
};
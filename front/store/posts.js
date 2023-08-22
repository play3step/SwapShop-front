export const state = () => ({
    mainPosts: [],
    commentBox: [],
});

export const mutations = {
    loadPosts(state, posts) {
        state.mainPosts = posts.data;
    },
    addMainPost(state, payload) {
        state.mainPosts.unshift(payload);
    },
    removeMainPost(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.id);
        state.mainPosts.splice(index, 1);
    },
    loadComment(state, comment){
        state.commentBox = comment;

    },
    addComment(state, payload) {
        state.commentBox.unshift(payload);
    },
};
export const actions = {
    add({ commit }, payload) {
        let postObject = {
            title: payload.title,
            content: payload.content,
            price: payload.price,
            location: "E동",
            status: "WAITING",
            views: 0,
            category: {
                major: payload.major,
                name: payload.course,
                professor: payload.professor,
            },
        };
        let formData = new FormData();
        formData.append("post", JSON.stringify(postObject)); // JSON 객체를 문자열로 변환하여 'post' 파트에 추가

        if (payload.imageFile) {
            formData.append("image", payload.imageFile);
        }

        let axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + payload.token,
            }
        };

        this.$axios.post('http://localhost:8080/post', formData, axiosConfig)
            .then((response) => {
                commit('addMainPost', postObject);
            })
            .catch((error) => {
                console.error(error);
            });

    },
    remove({ commit }, payload) {
        this.$axios.delete(`http://localhost:8080/post/${payload.id}`)
            .then((response) => {
                commit('removeMainPost', payload);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    loadPosts({ commit }) {
        this.$axios.get('http://localhost:8080/post')
            .then((response) => {
                commit('loadPosts', response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    loadComment({commit}, payload) {
        this.$axios.get(`http://localhost:8080/post/${payload.postId}/comment`)
            .then((response) => {
                commit('loadComment', response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    addComment({ commit, dispatch}, payload) {
        let commentObject = {
            content: payload.content,
            nickname: payload.nickname,

        };
        let axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + payload.token,
            }
        };
        this.$axios.post(`http://localhost:8080/post/${payload.postId}/comment`, commentObject, axiosConfig)
            .then((response) => {
                commit('addComment', response.data);
                dispatch('loadComment', { postId: payload.postId });
            })
            .catch((error) => {
                console.error(error);
            });
    },
};

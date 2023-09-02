export const state = () => ({
    mainPosts: [],
    commentBox: [],
    favoriteBox: [],
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
    loadComment(state, comment) {
        state.commentBox = comment;
    },
    addComment(state, payload) {
        state.commentBox.unshift(payload);
    },
    removeComment(state, payload) {
        const index = state.commentBox.findIndex(v => v.id === payload.id);
        state.commentBox.splice(index, 1);
    },
    replyComment(state, payload) {
        state.commentBox.unshift(payload);
    },
    viewsupdate(state, posts) {
    },
    loadfavoritelist(state, payload) {
        state.favoriteBox = payload.data;
    },
    searchpost(state, payload) {
        state.mainPosts = payload.data;
    },
    setPosts(state, payload) {
        state.mainPosts = payload;
    },
    priceSort(state, payload) {
        state.mainPosts = payload.data;
    },
    nameSort(state, payload) {
        state.mainPosts = payload.data;
    },
    majorSort(state, payload) {
        state.mainPosts = payload.data;
    },
};
export const actions = {
    addMainPost({ commit, dispatch }, payload) {
        let postObject = {
            title: payload.title,
            content: payload.content,
            price: payload.price,
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
                dispatch('loadPosts');
            })
            .catch((error) => {
                console.error(error);
            });

    },
    removeMainPost({ commit }, payload) {
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
    loadComment({ commit }, payload) {
        this.$axios.get(`http://localhost:8080/post/${payload.postId}/comment`)
            .then((response) => {
                commit('loadComment', response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    addComment({ commit, dispatch }, payload) {
        let commentObject = {
            content: payload.content,
            nickname: payload.nickname,
        };
        this.$axios.post(`http://localhost:8080/post/${payload.postId}/comment`, commentObject)
            .then((response) => {
                commit('addComment', response.data);
                dispatch('loadComment', { postId: payload.postId });
            })
            .catch((error) => {
                console.error(error);
            });
    },
    removeComment({ commit }, payload) {
        let axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + payload.token,
            }
        };
        this.$axios.delete(`http://localhost:8080/post/${payload.postId}/comment/${payload.id}`, axiosConfig)
            .then((response) => {
                commit('removeComment', payload);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    replyComment({ commit, dispatch }, payload) {
        let commentObject = {
            content: payload.content,
            nickname: payload.nickname,
        };
        this.$axios.post(`http://localhost:8080/post/${payload.postId}/comment/${payload.parentId}`, commentObject)
            .then((response) => {
                commit('replyComment', response.data);
                dispatch('loadComment', { postId: payload.postId });
            })
            .catch((error) => {
                console.error(error);
            });
    },
    viewsupdate({ commit }, payload) {
        this.$axios.get(`http://localhost:8080/post/${payload.postId}`)
            .then((response) => {
            })
            .catch((error) => {
                console.error(error);
            });
    },
    addfavoriteBox({ commit, dispatch }, payload) {
        let axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + payload.token,
            }
        };
        let postObject = {
            postId: payload.postId
        };

        this.$axios.post(`http://localhost:8080/favorite`, postObject, axiosConfig)
            .then((response) => {
                dispatch('loadfavoritelist', { token: payload.token });
            })
            .catch((error) => {
                console.error(error);
            });
    },
    loadfavoritelist({ commit }, payload) {
        let axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + payload.token,
            }
        };
        this.$axios.get(`http://localhost:8080/favorite/my`, axiosConfig)
            .then((response) => {
                commit('loadfavoritelist', response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    searchpost({ commit, dispatch }, payload) {
        let axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + payload.token,
            }
        };
        this.$axios.get(`http://localhost:8080/post/search/${payload.query}`, axiosConfig)
            .then((response) => {
                commit('searchpost', response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    priceSort({ commit, state, dispatch }, payload) {
        let axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + payload.token,
            }
        };
        this.$axios.post('http://localhost:8080/post/search/price', state.mainPosts, axiosConfig)
            .then((response) => {
                commit('priceSort', response.data); // 서버에서 받은 정렬된 데이터로 상태 업데이트
            })
            .catch((error) => {
                console.error(error);
            });
    },
    nameSort({ commit, state, dispatch }, payload) {
        let axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + payload.token,
            }
        };
        this.$axios.post('http://localhost:8080/post/search/title', state.mainPosts, axiosConfig)
            .then((response) => {
                commit('priceSort', response.data); // 서버에서 받은 정렬된 데이터로 상태 업데이트
            })
            .catch((error) => {
                console.error(error);
            });
    },
    majorSort({ commit, state, dispatch }, payload) {
        let axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + payload.token,
            }
        };
        this.$axios.post('http://localhost:8080/post/search/major', state.mainPosts, axiosConfig)
            .then((response) => {
                commit('priceSort', response.data); // 서버에서 받은 정렬된 데이터로 상태 업데이트
            })
            .catch((error) => {
                console.error(error);
            });
    },

};
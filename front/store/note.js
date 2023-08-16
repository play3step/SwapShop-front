export const state = () => ({
    selectedPost: null,

});

export const mutations = {
    setSelectedPost(state, post) {
        state.selectedPost = post;
    },
    sendNote(state, payload){

    },
};
export const actions = {
    setSelectedPost({ commit }, payload) {
        commit('setSelectedPost', payload);
    },
    sendNote({commit}, payload){
        let data = {
            content: payload.content,
            senderName: payload.senderName,
            receiverName: payload.receiverName,
        }
        this.$axios.post('http://localhost:8080/messages',data)
        .then((response) => {
            commit('sendNote', payload);
        })
        .catch((error) => {
            console.error(error);
        });
    }

};

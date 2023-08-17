export const state = () => ({
    selectedPost: null,
    messages: [],
    messageDetail: [],
});

export const mutations = {
    setSelectedPost(state, post) {
        state.selectedPost = post;
    },
    sendNote(state, payload){
    },
    setMessages(state, messages) {
        state.messages = messages;
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
        let axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + payload.token,
            }
        };
        this.$axios.post('http://localhost:8080/messages',data, axiosConfig)
        .then((response) => {
            commit('sendNote', payload);
        })
        .catch((error) => {
            console.error(error);
        });
    },
    async fetchMessages({ commit }, payload) {
        try {
            const response = await this.$axios.get('http://localhost:8080/messages', {
                headers: {
                    'Authorization': 'Bearer ' + payload.token,
                }
            });
            commit('setMessages', response.data);
        } catch (error) {
            console.error(error);
        }
    },

};

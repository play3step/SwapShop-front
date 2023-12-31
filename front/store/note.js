export const state = () => ({
    selectedPost: null,
    messages: [],
    messageDetail: [],
    selectedNickname: null,
});

export const mutations = {
    setSelectedPost(state, nickname) {
        state.selectedPost = nickname;
    },
    sendNote(state, payload) {
    },
    setMessages(state, messages) {
        state.messages = messages;
    },
    loadMessages(state, messages) {
        state.messageDetail = messages;
    },
    setSelectedNickname(state, nickname) {
        state.selectedNickname = nickname;
    },
};
export const actions = {
    setSelectedPost({ commit }, payload) {
        commit('setSelectedPost', payload);
    },
    sendNote({ commit }, payload) {
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
        this.$axios.post('http://localhost:8080/messages', data, axiosConfig)
            .then((response) => {
                commit('sendNote', payload);
            })
            .catch((error) => {
                alert("자기 자신에게 쪽지를 보낼 수 없습니다.")
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
    loadMessages({ commit }, payload) {
        let axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + payload.token,
            }
        };
        this.$axios.get(`http://localhost:8080/messages/${payload.id}`, axiosConfig)
            .then((response) => {
                commit('loadMessages', response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    setSelectedNickname({ commit }, nickname) {
        commit('setSelectedNickname', nickname);
    }

};

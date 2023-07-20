export const state = () => ({
    name: 'vue',
});

export const mutations = {
    bye(state) {
        state.name = 'goodbye vye';
    }
};
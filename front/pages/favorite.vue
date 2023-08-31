<template>
    <div>
        <div class="back_arrow">
            <a @click="goToIndex">
                <span class="material-symbols-outlined">
                    arrow_back_ios
                </span>
            </a>
            <span>찜하기</span>
        </div>
        <div class="container">
            <div class="box">
                <img src="https://via.placeholder.com/150x90" alt="Image 1">
                <div class="text">제목</div>
                <div class="text">가격</div>
            </div>
            <div class="box">
                <img src="https://via.placeholder.com/150x90" alt="Image 1">
                <div class="text">제목</div>
                <div class="text">가격</div>
            </div>
            <div class="box">
                <img src="https://via.placeholder.com/150x90" alt="Image 1">
                <div class="text">제목</div>
                <div class="text">가격</div>
            </div>
            <div class="box">
                <img src="https://via.placeholder.com/150x90" alt="Image 1">
                <div class="text">제목</div>
                <div class="text">가격</div>
            </div>
            <div class="box">
                <img src="https://via.placeholder.com/150x90" alt="Image 1">
                <div class="text">제목</div>
                <div class="text">가격</div>
            </div>
        </div>
    </div>
</template>


<script>
import NoteBox from '../components/NoteBox.vue';

export default {
    layout: 'blank',
    components: {
        NoteBox
    },
    computed: {
        me() {
            return this.$store.state.users.me;
        },
        messages() {
            return this.$store.state.note.messages;
        },
        token() {
            return this.me.token;
        },
    },
    async mounted() {
        await this.$store.dispatch('note/fetchMessages', {
            token: this.token,
        });
    },
    data() {
        return {
        };
    },
    methods: {
        goToIndex() {
            this.$router.push('/');
        },
    },
}

</script>


<style scoped>
.back_arrow {
    margin-left: 20px;
    color: #6CB7F8;
    text-align: justify;
    margin-top: 44px;
}

.back_arrow a {
    text-decoration: none;
    color: #6CB7F8;
    vertical-align: middle;
}

.back_arrow span {
    font-size: 14px;
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start; 
    align-content: flex-start;

}



</style>
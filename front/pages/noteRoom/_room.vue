<template>
    <div>
        <div class="back_arrow">
            <div class="left_section">
                <a @click="goBack">
                    <span class="material-symbols-outlined">
                        arrow_back_ios
                    </span>
                </a>
                <span>쪽지</span>
            </div>
            <span class="material-symbols-outlined" style="font-size: 20px;" @click="navigateToChat">
                mail
            </span>
        </div>


        <div v-for="detail in message.messageDetail" :key="detail.id" class="detail_container">
            <div>
                <div class="detail_state">{{ detail.state }}</div>
                <p class="detail_content">{{ detail.lastMessage }}</p>
            </div>

        </div>

    </div>
</template>


<script>

export default {
    layout: 'blank',

    data() {
        return {
            messageId: this.$route.params.room,
        };
    },
    async created() {
        console.log(this.$route.params); // 현재 라우트의 파라미터 출력
        this.$store.dispatch('note/loadMessages', {
            token: this.token,
            id: this.messageId

        });
    },
    computed: {
        message() {
            return this.$store.state.note.messageDetail;
        },
        me() {
            return this.$store.state.users.me;
        },
        token() {
            return this.me.token;
        },
        nickname() {
            return this.$store.state.note.selectedNickname;
        },
    },

    methods: {
        goBack() {
            this.$router.go(-1);
        },
        navigateToChat() {
            const nickname = this.nickname;
            this.$store.dispatch('note/setSelectedPost', nickname).then(() => {
                this.$router.push('/note');
            });
        },
    },

}

</script>


<style scoped>
.back_arrow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
    color: #6CB7F8;
    margin-top: 44px;
}

.left_section {
    display: flex;
    align-items: center;
}


.back_arrow a {
    text-decoration: none;
    color: #6CB7F8;
    vertical-align: middle;
}

.back_arrow span {
    font-size: 14px;
}

.detail_container {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    padding: 20px 0 10px 14px;
    text-align: left;
    width: 350px;
    height: 65px;
    border-bottom: #6CB7F8 1px solid;

}

.detail_state {
    margin-left: 10px;
    font-size: 14px;
    line-height: 30px;
    color: #333333;

}

.detail_content {
    font-size: 12px;
    color: #333333;
    margin-left: 10px;
}
</style>
<template>
    <div>
        <div class="note_container">
            <div>

                <div class="note_title">닉네임</div>
                <div v-for="message in messages.messageBox" :key="message.id" class="note_content">
                    <p>{{ message.lastMessage }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    computed: {
        me() {
            return this.$store.state.users.me;
        },
        token() {
            return this.me.token;
        },
        messages() {
            return this.$store.state.note.messages;
        }
    },
    async mounted() {
        await this.$store.dispatch('note/fetchMessages', {
            token: this.token,
        });
    },
    props: {
        post: {

        },
    },
    data() {
        return {
        }
    },
    methods: {

    },
}

</script>
    

<style scoped>
.note_container {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    padding: 10px 0 10px 14px;
    text-align: left;
    width: 350px;
    height: 65px;
    border-bottom: #6CB7F8 1px solid;

}


.note_title {
    margin-left: 16px;
    font-size: 14px;
    line-height: 30px;
}

.note_content {
    font-size: 10px;
    color: #ADAAAA;
    margin-left: 16px;
}
</style>
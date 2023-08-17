<template>
    <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <div>
            <ul class="search_bar">
                <li class="page_title">
                    <a class="back_arrow" @click="goToIndex">
                        <span class="material-symbols-outlined">
                            arrow_back_ios
                        </span>
                    </a>
                    <a>쪽지 보내기</a>
                    <v-btn type="submit" class="success_btn" color="#6CB7F8" absolute right>완료</v-btn>
                </li>
            </ul>
            {{ selectedPost }}
            {{ me.nickname }}
        </div>
        <v-container>
            <v-textarea v-model="content" class="custom_textarea" outlined auto-grow clearable label="내용을 입력하세요."
                :hide-details="hideDetails" :success-messages="successMessages" :success="success"
                :rules="[v => !!v.trim() || '내용을 입력하세요.']" @input="onChangeTextarea" />
        </v-container>
    </v-form>
</template>


<script>
export default {
    layout: 'blank',
    data() {
        return {
            successMessages: '',
            success: false,
            content: '',
            
        };
    },
    computed: {
        selectedPost() {
            return this.$store.state.note.selectedPost;
        },
        me() {
            return this.$store.state.users.me;
        },
        token() {
            return this.me.token;
        },
    },
    methods: {
        goToIndex() {
            this.$router.push('/');
        },
        onSubmitForm(){
            if (this.$refs.form.validate()) {
                this.$store.dispatch('note/sendNote', {
                    content: this.content,
                    senderName: this.me.nickname,
                    token: this.token,
                    receiverName: this.selectedPost,
                })
                    .then(() => {
                        this.$router.push('/');
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
        }
    },
    watch: {
        // 만약 route가 변경될 경우, postId를 업데이트하기 위한 watch
        '$route'(to, from) {
            this.postId = to.params.postId;
        }
    }
}

</script>


<style>
* {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
}

body {
    width: 375px;
    height: 812px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
}

.success_btn {
    width: 30px !important;
    height: 24px !important;
    border-radius: 15px !important;
    color: white !important;
}

.back_arrow {
    color: #6CB7F8;
    text-align: justify;
}

.back_arrow span {
    font-size: 16px;
}

.custom_textarea .v-text-field__slot {
    height: 500px !important;
}

.custom_textarea textarea {
    height: 500px !important;
}
</style>



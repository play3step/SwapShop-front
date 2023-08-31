<template>
    <v-form ref="form" v-model="valid" style="position: relative;" @submit.prevent="onSubmitForm">
        <v-textarea v-model="content" filled label="댓글 달기" :hide-details="hideDetails" :success="success"
            :success-messages="successMessages" @input="onChangeTextarea" />
        <v-btn color="green" dark absolute top right type="submit">전송</v-btn>
    </v-form>
</template>

<script>
export default {
    props: {
        postId: {
            type: Number,
            required: true,
        },
        parentId: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            valid: false,
            content: '',
            success: false,
            successMessages: '',
            hideDetails: true,
        }
    },
    computed: {
        me() {
            return this.$store.state.users.me
        }
    },
    methods: {
        onChangeTextarea(value) {
            if (value.length) {
                this.hideDetails = true;
                this.success = false;
                this.successMessages = '';
            }
        },
        onSubmitForm() {
            if (this.$refs.form.validate()) {
                const payload = {
                    postId: this.postId,
                    content: this.content,
                    nickname: this.me.nickname,
                };

                if (this.parentId) {  // 답글인 경우
                    payload.parentId = this.parentId;  // parentId 추가

                    this.$store.dispatch("posts/replyComment", payload).then(() => {
                        // 답글이 성공적으로 작성된 후의 처리
                    });
                } else {  // 일반 댓글인 경우
                    this.$store.dispatch('posts/addComment', payload).then(() => {
                        this.content = '';
                        this.success = true;
                        this.successMessages = '댓글이 작성되었습니다.';
                        this.hideDetails = false;
                    });
                }
            }
        }
    }
}
</script>

<style></style>
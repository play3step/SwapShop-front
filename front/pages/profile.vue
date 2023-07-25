<template>
    <div>
        <v-container>
            <v-container>
                <v-subheader>내 프로필</v-subheader>
                <v-form v-model="valid" @submit.prevent="onChangeNickname">
                    <v-text-field v-model="nickname" label="닉네임" :rules="nicknameRules" required />
                    <v-btn color="blue" type="submit">수정</v-btn>
                </v-form>
            </v-container>
        </v-container>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            valid: false,
            nickname: '',
            nicknameRules: [
                v => !!v || '닉네임을 입력하세요',
            ]
        };
    },
    methods: {
        onChangeNickname() {
            this.$store.dispatch('users/changeNickname', {
                nickname: this.nickname
            })
        }
    }
}

</script>


<style></style>
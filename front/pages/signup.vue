<template>
    <div>
        <v-container>
            <v-card>
                <v-container>
                    <v-subheader>회원가입</v-subheader>
                    <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                        <v-text-field v-model="email" label="이메일" type="email" :rules="emailRulse" required />
                        <v-text-field v-model="password" label="비밀번호" type="password" :rules="passwordRulse" required />
                        <v-text-field v-model="passwordCheck" label="비밀번호확인" type="password" :rules="passwordCheckRulse"
                            required />
                            <v-text-field v-model="nickname" label="닉네임" type="nickname" :rules="nicknameRulse" required />
                            <v-text-field v-model="major" label="전공" type="major" :rules="majorRulse" required />
                            <v-text-field v-model="authenticationType" label="타입" type="authenticationType" :rules="authenticationTypeRulse" required />
                            <v-checkbox v-model="term" :rules="checkRulse" required label="잘 지킬겁니다" />
                        <v-btn color="green" type="submit">가입하기</v-btn>
                    </v-form>
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            valid: false,
            email: '',
            password: '',
            passwordCheck: '',
            nickname: '',
            term: false,
            major: '',
            authenticationType: '',
            emailRulse: [
                v => !!v || "이메일을 입력하세요",
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "이메일이 유효하지 않습니다.",

            ],
            nicknameRulse: [
                v => !!v || "닉네임을 입력하세요",

            ],
            passwordRulse: [
                v => !!v || "비밀번호을 입력하세요",

            ],
            passwordCheckRulse: [
                v => !!v || "확인 비밀번호를 입력하세요",
                v => v === this.password || "비밀번호가 일치하지 않습니다."

            ],
            authenticationTypeRulse: [
                v => !!v || "타입을 입력하세요",

            ],
            checkRulse: [
                v => !!v || "[약관에 동의해야 합니다]",
            ],
            majorRulse: [
                v => !!v || "전공을 입력하세요",

            ],
        }
    },
    methods: {
        onSubmitForm() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('users/signUp', {  //여기가 어떤 데이터를 보낼지 구간
                    nickname: this.nickname,
                    email: this.email,
                    password: this.password,
                    major: this.major,
                    authenticationType: this.authenticationType,
                })
                    .then(() => {
                        this.$router.push({
                            path: '/',
                        });
                    })
                    .catch(() => {
                        alert('회원가입 실패');
                    });
            }
        }
    },
}
</script>

<style></style>

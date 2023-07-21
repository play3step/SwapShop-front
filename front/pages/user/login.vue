<template>
    <div>
        <v-card class="container">
            <v-container>
                <div class="sign_logo">
                    <img :src="require(`@/png/${img}`)" />
                </div>
                <div>
                    <p class="main_text">Sign Up</p>
                    <p class="sub_text">Please type your information below</p>
                </div>
                <!--백에서 받은 jwt를 해석하고 거기에 email, type를 뺀 추가 정보 입력 받는 구간 (닉네임, 전공)-->
                <v-form ref="form" class="input_container" v-model="valid" @submit.prevent="onSubmitForm">
                    <v-text-field class="input_box" v-model="nickname" label="nickname" type="nickname"
                        :rules="nicknameRulse" required />
                    <v-text-field class="input_box" v-model="major" label="major" type="major" :rules="majorRulse"
                        required />
                    <v-checkbox v-model="term" :rules="checkRulse" required label="동의" />
                    <v-btn class="input_box" color="#6CB7F8" type="submit">가입하기</v-btn>
                </v-form>
            </v-container>
        </v-card>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode'

export default {
    data() {
        return {
            img: 'logo.png',
            valid: false,
            email: '',
            nickname: '',
            term: false,
            major: '',
            authenticationType: '',
            nicknameRulse: [
                v => !!v || "닉네임을 입력하세요",

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
                    major: this.major,
                    authenticationType: this.authenticationType,
                    token: this.token,
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
    asyncData({ query }) {  //jwt 토큰 해석 구간 여기서 email과 type을 받아 저장한다.
        const token = query.token
        let user, email, authenticationType;
        if (token) {
            user = jwt_decode(token);
            email = user.sub;
            authenticationType = user.type;
        }
        return { user, email, authenticationType, token }
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

.container {
    width: 375px;
    height: 812px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
}

.sign_logo {
    margin-top: 90px;


}

.sign_logo img {
    width: 138px;
    height: 25px;
}

.main_text {
    margin-top: 50px;
    font-size: 32px;
    color: #333333;
    font-weight: 700;
}

.sub_text {
    margin-top: 8px;
    font-size: 14px;
    color: #ADAAAA;
}

.input_container {
    margin-top: 78px;

}

.input_box {
    width: 340px;
    height: 50px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #6CB7F8;
    border-radius: 15px;
    align-items: center;
    padding: 20px 22px;
    margin-top: 24px;
    color: #ADAAAA;
}

.input_box:first-child {
    margin-top: 0px;
}

.input_box:last-child {
    margin-top: 30px;
    color: white;
    align-items: center;
    justify-content: center;

}

</style>

<template>
    <div class="main_container">
        <div>
            <ul class="search_bar">
                <li class="page_title">
                    <a>마이페이지</a>
                </li>
            </ul>
        </div>
        <div class="profile_container">
            <div class="profile"></div>
            <div>
                <div class="nickname">{{me.nickname}}</div>
                <div class="major">{{me.major}}</div>
            </div>
            <a href="#">
                <span class="material-symbols-outlined">
                    settings
                </span>
            </a>
        </div>
        <div class="my_container">
            <h1>나의 거래</h1>
            <div>
                <a href="#">
                    <span class="material-symbols-outlined">
                        favorite
                    </span>
                    <span class="">관심목록</span>
                </a>
                <a href="#">
                    <span class="material-symbols-outlined">
                        description
                    </span>
                    <span>판매내역</span>
                </a>
                <a href="#">
                    <span class="material-symbols-outlined">
                        shopping_bag
                    </span>
                    <span>구매내역</span>
                </a>
            </div>
        </div>
        <div>
            <v-btn type="submit" class="success_btn" color="#6CB7F8" style="margin-top: 50px;" @click="logout">로그아웃</v-btn>
        </div>
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
        },
        async logout() {
            try {
                await this.$store.dispatch('users/logOut');
                this.$router.push('/');
            } catch (error) {
                console.error('로그아웃 중 오류 발생:', error);
            }
        },
    },
    computed: {
        me() {
            return this.$store.state.users.me;
        },
    },
}

</script>


<style scoped>
.main_container {
    position: relative;
    width: 375px;
    height: 812px;
}

.profile_container {
    display: flex;
    align-items: center;
    padding: 10px 0 0 30px;

}

.profile {
    width: 55px;
    height: 55px;
    background-color: #6CB7F8;
    border-radius: 50px;
    margin-left: -10px;

}

.nickname {
    margin-left: 12px;
    font-size: 20px;
    line-height: 30px;
}

.major {
    font-size: 10px;
    color: #ADAAAA;
    margin-left: 12px;

}


.profile_container span {
    position: absolute;
    right: 30px;
    top: 76px;
    color: #6CB7F8;
    text-decoration: none;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
}
.my_container{
    margin-top: 35px;
    width: 350px;
    height: 130px;
    margin-left: auto;
    margin-right: auto;
    border-bottom: #6CB7F8 1px solid ;
}
.my_container h1{
    text-align: justify;
    font-size: 12px;
}
.my_container a{
    font-size: 10px;
    text-decoration: none;
    color: #6CB7F8;
    display: block;
    text-align: justify;
    margin-top: 10px;
}
.my_container span{
    vertical-align: middle;
}
.my_container span:last-child{
    margin-left: 10px;
}
</style>
<template>
    <div class="contain">
        <div v-if="!me"> <!--me의 기준은 store 에 user.js 참고 로그인 하지 않았을 때 모습-->
            <div id="logo">
                <img :src="require(`@/png/${img}`)" />
            </div>
            <div class="social_container">
                <button class="social_box" @click="loginkakao">Kakao</button>
                <button class="social_box" @click="logingoogle">google</button>
            </div>
        </div>
        <v-container>
            <div v-if="me"> <!--로그인 성공 후 모습-->
                <div class="main_container">
                    <div>
                        <ul class="search_bar">
                            <li class="sub_logo">
                                <img :src="require(`@/png/${img2}`)" />
                            </li>
                            <ul class="search">
                                <li>
                                    <nuxt-link to="/searchResult">
                                        <span class="material-symbols-outlined">
                                            search
                                        </span>
                                    </nuxt-link>
                                </li>
                            </ul>
                        </ul>
                    </div>
                    <div class="post_box">
                        <PostCard v-for="post in reversedMainPosts" :key="post.id" :post="post" />
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
import PostCard from '../components/PostCard.vue';
import axios from 'axios';

export default {
    components: {
        PostCard,
    },
    data() {
        return {
            img: 'main_logo.png',
            img2: 'logo.png',
        };
    },
    async created() {
        this.$store.dispatch('posts/loadPosts');
    },
    computed: {
        me() {
            return this.$store.state.users.me;
        },
        mainPosts() {
            return this.$store.state.posts.mainPosts;
        },
        reversedMainPosts() {
            return [...this.mainPosts].reverse();
        }

    },
    methods: {
        loginkakao() {   //백이 만든 localhost로 (이동 로그인 과정)
            window.location.href = 'http://localhost:8080/user/new/kakao';
        },
        logingoogle() {   //백이 만든 localhost로 (이동 로그인 과정)
            window.location.href = 'http://localhost:8080/user/new/google';
        }
    }
};
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
}

.contain {
    width: 375px;
    height: 812px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
}

#logo {
    margin-top: 217px;
}

#logo img {
    width: 344px;
    height: 193px;
}

.social_container {
    display: flex;
    margin-top: 24px;
    justify-content: center;
    align-items: center;

}

.social_box {
    display: flex;
    margin-right: auto;
    margin-left: auto;
    margin-top: 80px;
    width: 138px;
    height: 50px;
    border: 1px solid #6CB7F8;
    border-radius: 50px;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    color: #6CB7F8;
}

.main_container {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    width: 375px;
    height: 812px;
}
.post_box{
    overflow: scroll;
    width: 375px;
    height: 730px;
}
.sub_logo {
    margin-left: -20px;
}

.sub_logo img {
    width: 138px;
    height: 25px;
}

.search_bar {
    list-style: none;
    display: flex;
    width: 350px;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 8px 20px;
    background-color: white;
    border-bottom: #6CB7F8 1px solid;
}


.search_bar .search {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    color: #6CB7F8;

}

.search_bar .search li {
    list-style: none;
}

.search_bar .search span {
    font-size: 18px;
}
</style>
<template>
    <div class="contain">
        <div v-if="!me"> <!--me의 기준은 store 에 user.js 참고 로그인 하지 않았을 때 모습-->
            <div id="logo">
                <img :src="require(`@/png/${img}`)" />
            </div>
            <button class="social_box" @click="login">Kakao</button> <!--로그인이 성공한다면 /user/login으로 이동-->
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
                                    <span class="material-symbols-outlined">
                                        search
                                    </span>
                                </li>
                            </ul>
                        </ul>
                    </div>
                    <div>
                        <!--메뉴판 가운데에 버튼 누르고 글 쓰면 카드 양식에 맞게 나오며 DB에 저장됨-->
                        <PostCard v-for="p in mainPosts" :key="p.id" :post="p" />
                        
                        <!--이부분은 DB에 저장되어 있는 데이터 부르는 방식, 아직 작업중-->
                        <!--컴포넌트로 해서 나중에 위에 있는 로고랑 검색창은 고정 되도록 해야한다.-->
                        <div v-for="post in posts" :key="post.id">
                            <h2>{{ post.title }}</h2>
                            <p>{{ post.content }}</p>
                        </div>
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
            posts: []

        };
    },
    async created() {
        const response = await axios.get('http://localhost:8080/post');
        this.posts = response.data;
    },
    computed: {
        me() {
            return this.$store.state.users.me;
        },
        mainPosts() {
            return this.$store.state.posts.mainPosts;
        }
    },
    methods: {
        login() {   //백이 만든 localhost로 (이동 로그인 과정)
            window.location.href = 'http://localhost:8080/login';
        }
    }
};
</script>

<style>
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
    overflow: scroll;
}

#logo {
    margin-top: 217px;
}

#logo img {
    width: 344px;
    height: 193px;
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
    width: 390px;
    height: 844px;
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
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    align-items: center;
    padding: 40px 20px 8px 20px;
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
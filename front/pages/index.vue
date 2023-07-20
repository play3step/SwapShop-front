<template>
    <div>
        <button @click="login">Login with Kakao</button>
        <v-container>
        <PostForm v-if="me" />
        <div>
            <PostCard v-for="p in mainPosts" :key="p.id" :post="p" />
        </div>
    </v-container>
    </div>
    
</template>

<script>
import PostCard from '../components/PostCard.vue';
import PostForm from '../components/PostForm';

export default {
    components: {
        PostCard,
        PostForm,
    },
    data() {
        return {
            name: 'Nuxt.js',
        };
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
        login() {
            // 백엔드에서 설정한 카카오 로그인 페이지로 리디렉션.
            window.location.href = 'http://localhost:8080/login';
        }
    }
};
</script>

<style></style>
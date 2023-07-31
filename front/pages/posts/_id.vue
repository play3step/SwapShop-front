<template>
    <div class="container">
        <v-container v-if="post">
            <div class="post_container">
                <v-img v-if="post.images && post.images[0]" :src="post.images[0].filePath" />
                <v-img v-else src="https://www.eclosio.ong/wp-content/uploads/2018/08/default.png" />
                <div class="profile_container">
                    <div class="profile"></div>
                    <div>
                        <div class="nickname">닉네임</div>
                        <div class="major">컴퓨터공학과</div>
                    </div>
                    <a href="#">
                        <span class="material-symbols-outlined">
                            settings
                        </span>
                    </a>
                </div>
                <div class="detail_container">
                    <h1>{{ post.title }}</h1>
                    <p>{{ post.category.name }}, {{ post.category.professor }}, {{ post.category.major }}</p>
                </div>
            </div>
        </v-container>
        <div v-else>
            해당 게시글이 존재하지 않습니다.
        </div>
    </div>
</template>


<script>
import PostCard from '../../components/PostCard.vue';
export default {
    components: {
        PostCard,
    },
    computed: {
        post() {
            if (this.$store.state.posts.mainPosts) {
                return this.$store.state.posts.mainPosts.find(v => v.id === parseInt(this.$route.params.id, 10));
            }
        }
    },
    methods: {
        onRemovePost() {
            this.$store.dispatch("posts/remove", {
                id: this.post.id,
            });
        },
        onEditPost() {
        },
    },
}

</script>


<style scoped>
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
    width: 100%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
}

.post_container {
    width: 100%;
    margin-left: auto;
    margin-left: auto;
    position: relative;
}

.post_container h1 {
    font-size: 20px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

.post_container p {
    font-size: 14px;
}


.profile_container {
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    ;
    padding: 5px 0 5px 30px;
    background-color: #6CB7F8;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: white;

}

.profile {
    width: 40px;
    height: 40px;
    background-color: white;
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
    margin-left: 12px;

}

.profile_container span {
    margin-left: 176px;
    color: #6CB7F8;
    text-decoration: none;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
}

.detail_container {
    text-align: justify;
    margin-top: 18px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

.detail_container h1 {
    font-size: 20px;
}

.detail_container p {
    font-size: 12px;
}

.back_arrow {
    color: #6CB7F8;
    text-align: left;
}

.hamburger_btn {
    position: absolute;
    top: 10px;
    left: 20px;
    margin-left: auto;
    margin-left: auto;
}
</style>
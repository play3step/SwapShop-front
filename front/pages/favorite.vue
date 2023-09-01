<template>
    <div>
        <div class="back_arrow">
            <a @click="goToIndex">
                <span class="material-symbols-outlined">
                    arrow_back_ios
                </span>
            </a>
            <span>찜하기</span>
        </div>
        <div class="container">
            <nuxt-link :to="'/posts/' + item.id" class="box" v-for="item in filteredFavorites" :key="item.id">
                <v-img v-if="item.images && item.images[0]" :src="item.images[0].filePath" style="width: 150px; height: 90px;"/>
                <v-img v-else src="https://www.eclosio.ong/wp-content/uploads/2018/08/default.png" class="img"/>
                <div class="text">{{ item.title }}</div>
                <div class="text">{{ item.price }}</div>
            </nuxt-link>
        </div>
    </div>
</template>


<script>
import NoteBox from '../components/NoteBox.vue';

export default {
    layout: 'blank',
    components: {
        NoteBox
    },
    computed: {
        me() {
            return this.$store.state.users.me;
        },
        token() {
            return this.me.token;
        },
        favoriteList() {
            return this.$store.state.posts.favoriteBox;
        },
        mainPosts() {
            return this.$store.state.posts.mainPosts;
        },
        filteredFavorites() {
            return this.mainPosts.filter(mainPost => {
                return this.favoriteList.some(favorite => favorite.postId === mainPost.id);
            });
        },
    },
 
    data() {
        return {
        };
    },
    methods: {
        goToIndex() {
            this.$router.push('/');
        },
    },
}

</script>


<style scoped>
.back_arrow {
    margin-left: 20px;
    color: #6CB7F8;
    text-align: justify;
    margin-top: 44px;
}

.back_arrow a {
    text-decoration: none;
    color: #6CB7F8;
    vertical-align: middle;
}

.back_arrow span {
    font-size: 14px;
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;


}

.box {
    width: 150px;
    height: 150px;
    margin: 10px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-decoration: none;
    color: #333333;
}

img {
    width: 150px !important;
    height: 90px !important;
    background-position: center center;

}

.text {
    font-size: 10px;
    margin-top: 5px;
    margin-left: 12px;
    text-align: justify;
    font-weight: bold;
}
</style>
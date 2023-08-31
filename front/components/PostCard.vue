<template>
    <div>
        <div class="post_container">
            <div class="image_container">
                <v-img v-if="post.images && post.images[0]" :src="post.images[0].filePath" class="img_size" />
                <v-img v-else src="https://www.eclosio.ong/wp-content/uploads/2018/08/default.png" class="img_size" />
            </div>
            <nuxt-link :to="'/posts/' + post.id" class="post_text">
                <div v-if="post">
                    <p>{{ post.title }}</p>
                    <p class="post_major">조회 : {{ post.views }}</p>
                    <p>{{ post.content }}</p>
                </div>
            </nuxt-link>
            <div class="icons">
                <span class="material-symbols-outlined" :class="{ 'favorite-active': isFavorite }" @click="toggleFavorite">
                    favorite
                </span>
                <span class="material-symbols-outlined">
                    forum
                </span>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    props: {
        post: {
            type: Object,
            required: true,
        },
    },
    computed: {
        me() {
            return this.$store.state.users.me;
        },
        token() {
            return this.me.token;
        },
    },
    data() {
        return {
            isFavorite: false,
        }
    },
    methods: {
        toggleFavorite() {
            if(this.isFavorite ===false){
                this.isFavorite = !this.isFavorite;
                this.$store.dispatch('posts/addfavoriteBox', {            
                    token: this.token,
                    postId: this.post.id
                })
                    .then(() => {
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            else{
                this.isFavorite = !this.isFavorite;
            }
        },
    },
}

</script>
    

<style scoped>
.card_container {
    width: 80%;
    margin: 20px auto;
}

.post_container {
    width: 350px;
    height: 110px;
    display: flex;
    align-items: center;
    border-bottom: #6CB7F8 1px solid;
    position: relative;

}

.image_container {
    width: 90px;
    height: 90px;
    background-size: cover;
    display: inline-block;
}

.img_size {
    width: 90px !important;
    height: 90px !important;
    background-position: center center;

}

.icons {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;

}

.icons span {
    bottom: 0;
    right: 10;
    margin: 5px;
    font-size: 20px;
    color: #6CB7F8;

}
.favorite-active {
    color: red !important;
}
.post_text {
    margin-left: 20px;
    display: inline-block;
    margin-top: -18 px;
    text-decoration: none;
    color: black;
}

.post_text p {
    line-height: 1.2;
    text-align: justify;
}

.post_major {
    font-size: 10px;
    color: #ADAAAA;

}


</style>
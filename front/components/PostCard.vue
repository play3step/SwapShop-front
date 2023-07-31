<template>
    <div>

        <div class="post_container">
            <div class="image-container">
                <v-img v-if="post.images && post.images[0]" :src="post.images[0].filePath" />
                <v-img v-else src="https://www.eclosio.ong/wp-content/uploads/2018/08/default.png" />
            </div>
            <nuxt-link :to="'/posts/' + post.id" class="post_text">
                <div v-if="post">
                    <p>{{ post.title }}</p>
                    <p>{{ post.content }}</p>
                </div>
            </nuxt-link>
            <div class="icons">
                <span class="material-symbols-outlined">
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
    data() {
        return {
        }
    },
    methods: {
        
    },
}

</script>
    

<style scoped>
.card_container {
    width: 80%;
    /* 카드의 너비를 조절합니다. */
    margin: 20px auto;
    /* 상하로 20px의 마진을 주고 좌우로는 자동 마진을 줍니다. */
}

.post_container {
    width: 350px;
    height: 110px;
    display: flex;
    align-items: center;
    border-bottom: #6CB7F8 1px solid;
    position: relative;

}

.image-container {
    width: 90px;
    height: 90px;
    background-size: cover;
    display: inline-block;


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

.post_text {
    margin-left: 20px;
    display: inline-block;
    margin-top: -18 px;
    text-decoration: none;
    color: black;
}

.post_text p {
    line-height: 1.6;
    text-align: justify;
}</style>
<template>
    <div>

        <div class="post_container">
            <img
                src="https://cdn.icon-icons.com/icons2/1812/PNG/512/4213421-google-logo-media-network-online-search-social_115428.png">
            <div class="post_text">
                <div v-if="post">
                    <p>{{ post.title }}</p>
                    <p>{{ post.content }}</p>

                </div>
            </div>
            <div class="icons">
                <span class="material-symbols-outlined">
                    favorite
                </span>
                <span class="material-symbols-outlined">
                    forum
                </span>
            </div>
        </div>



        <!-- <v-card-action>
            <v-menu offset-y open-on-hover>
                <template v-slot:activator="{ on }">
                    <v-btn text color="orange" v-on="on">
                        <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                </template>
                <div style="background: white">
                    <v-btn dark color="red" @click="onRemovePost">삭제</v-btn>
                    <v-btn text color="orange" @click="onEditPost">수정</v-btn>
                </div>
            </v-menu>
        </v-card-action> -->
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

.post_container img {
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
}

.post_text p {
    line-height: 1.6;
    text-align: justify;
}
</style>
<template>
    <div class="container">
        <v-container v-if="post">
            <div class="post_container">
                <v-img v-if="post.images && post.images[0]" :src="post.images[0].filePath" />
                <v-img v-else src="https://www.eclosio.ong/wp-content/uploads/2018/08/default.png" />
                <div class="hamburger_btn">
                    <a class="back_arrow" @click="goToIndex">
                        <span class="material-symbols-outlined">
                            arrow_back_ios
                        </span>
                    </a>
                    <v-card-action>
                        <v-menu offset-y open-on-hover>
                            <template v-slot:activator="{ on }">
                                <v-btn text color="orange" v-on="on">
                                    <v-icon>mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </template>
                            <div>
                                <v-btn dark color="red" @click="onRemovePost">삭제</v-btn>
                                <v-btn text color="orange" @click="onEditPost">수정</v-btn>
                            </div>
                        </v-menu>
                    </v-card-action>
                </div>
                <div class="profile_container">
                    <div class="profile"></div>
                    <div>
                        <div class="nickname">{{ post.login.nickname }}</div>
                        <div class="major">{{ post.login.major }}</div>
                    </div>
                    <a @click="navigateToChat" class="Note">채팅하기</a>

                </div>
                <div class="detail_container">
                    <h1>{{ post.title }}</h1>
                    <p>{{ post.category.name }}, {{ post.category.professor }}, {{ post.category.major }}</p>
                </div>

                <div class="comment_container">
                    <v-list>
                        <v-list-item v-for="c in post.Comments" :key="c.id">
                            <v-list-item-avatar color="teal">
                                <span>{{ c.User.nickname[0] }}</span>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <h3>{{ c.User.nickname }}</h3>
                                <div>{{ c.content }}</div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </div>

                <div class="open_comment">
                    <template v-if="commentOpened">
                        <CommentForm :post-id="post.id" />
                    </template>
                </div>
                <div class="information_bar">
                    <div class="icon_container">
                        <span class="material-symbols-outlined">
                            favorite
                        </span>
                        <span>{{ post.price }}원</span>
                        <div class="chat">
                            <span class="material-symbols-outlined" @click="onToggleComment">
                                forum
                            </span>
                        </div>
                    </div>
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
import CommentForm from '../../components/CommentForm.vue';
export default {
    layout: 'blank',

    components: {
        PostCard,
        CommentForm,

    },
    data() {
        return {
            comment: {
                content: '',
            },
            commentOpened: false,

        };
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
            }).then(() => {
                this.$router.push('/');
            });
        },
        onEditPost() {

        },
        goToIndex() {
            this.$router.push('/');
        },
        onToggleComment() {
            this.commentOpened = !this.commentOpened;
        },
        navigateToChat() {
            const nickname = this.post.login.nickname;
            this.$store.dispatch('note/setSelectedPost', nickname).then(() => {
                this.$router.push('/note');
            });
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
    margin-right: auto;
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
    padding: 5px 0 5px 30px;
    background-color: #6CB7F8;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: white;

}

.comment_container {
    width: 100%;
    height: 100%;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
}

.information_bar {
    position: fixed;
    bottom: 0;
    width: 375px;
    background-color: #6CB7F8;
}

.icon_container {
    padding: 20px 0 20px 18px;
    display: flex;
    align-items: center;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.icon_container span {
    color: white;
    font-size: 16px;
    margin-right: 30px;
}

.icon_container span:first-child {
    font-size: 24px;
    padding-right: 18px;
}

.chat {
    font-size: 16px;
    margin-left: auto;
    border-right: none;
    font-size: 24px;
    display: flex;
    align-items: center;

}

.open_comment {
    position: fixed;
    width: 375px;
    bottom: 10%;
}

.Note {
    text-decoration: none;
    margin-left: 180px;
    color: white;
}
</style>
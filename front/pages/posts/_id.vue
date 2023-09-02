<template>
    <div class="container">
        <v-container v-if="post">
            <div class="post_container">
                <v-img v-if="post.images && post.images[0]" :src="post.images[0].filePath" class="img_size" />
                <v-img v-else src="https://www.eclosio.ong/wp-content/uploads/2018/08/default.png" class="img_size" />
                <div class="hamburger_btn">
                    <a class="back_arrow" @click="goBack">
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
                    <div class="material-symbols-outlined" style="font-size: 40px;">
                        account_circle
                    </div>
                    <div>
                        <div class="nickname">{{ post.nickname }}</div>
                        <div class="major">{{ post.major }}</div>
                    </div>
                    <a @click="navigateToChat" class="Note">쪽지</a>
                </div>
                <div class="detail_container">
                    <h1>{{ post.title }}</h1>
                    <p>{{ post.category.name }}, {{ post.category.professor }}, {{ post.category.major }}</p>
                </div>
                <div class="comment_container">
                    <v-list>
                        <div class="comment_box" v-for="c in commentBox" :key="c.id">
                            <div class="comment_header">
                                <div class="material-symbols-outlined" style="font-size: 23px; color: #6CB7F8;">
                                    account_circle
                                </div>
                                <div class="comment_nickname">{{ c.nickname }}</div>
                                <div> {{ c.parentCommentId }}</div>
                                <div class="delete_button" @click="openCommentForm(c.id)">댓글</div>
                                <div class="delete_button" @click="onRemoveComment(c.id)">삭제</div>
                            </div>
                            <div class="comment_contents">{{ c.content }}</div>
                            <div v-if="c.parentCommentId == c.postId">
                                <div class="comment_nickname">{{ c.nickname }}</div>
                                <div> {{ c.parentCommentId }}</div>
                            </div>
                        </div>
                    </v-list>
                </div>
                <div class="open_comment">
                    <template v-if="commentOpened">
                        <CommentForm :postId="post.id" :parentId="commentParentId" v-if="commentOpened" />
                    </template>
                </div>
                <div class="information_bar">
                    <div class="icon_container">
                        <span class="material-symbols-outlined" :class="{ 'favorite-active': isFavorite }"
                            @click="toggleFavorite">
                            favorite
                        </span>
                        <span>{{ post.price.toLocaleString() }}원</span>
                        <div class="chat">
                            <span class="material-symbols-outlined" @click="() => openCommentForm()">
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
            commentOpened: false,
            isFavorite: false,

        };
    },
    async mounted() {
        if (!this.post) return; // 이 줄 추가
        if (this.post) {
            await this.$store.dispatch('posts/loadComment', {
                postId: this.post.id,
            });
        }
        await this.$store.dispatch('posts/viewsupdate', {
            postId: this.post.id,
        });
        try {
            await this.$store.dispatch('posts/loadfavoritelist', {
                token: this.token,
            });
            this.isFavorite = this.postIds.includes(this.post.id);
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    },

    computed: {
        post() {
            if (this.$store.state.posts.mainPosts) {
                return this.$store.state.posts.mainPosts.find(v => v.id === parseInt(this.$route.params.id, 10));
            }
            if (this.$store.state.posts.searchpostList) {
                return this.$store.state.posts.searchpostList.find(v => v.id === parseInt(this.$route.params.id, 10));
            }
        },
        commentBox() {
            return this.$store.state.posts.commentBox;
        },
        me() {
            return this.$store.state.users.me
        },
        token() {
            return this.me.token;
        },
        favoriteList() {
            return this.$store.state.posts.favoriteBox;
        },
        filteredFavoriteList() {
            if (this.favoriteList && this.me) {
                return this.favoriteList.filter(item => item.nickName === this.me.nickname);
            }
            return [];  // 또는 null, undefined 등 초기값
        },
        postIds() {
            return this.filteredFavoriteList.map(item => item.postId);
        }

    },
    methods: {
        openCommentForm(parentId = null) {
            if (this.commentOpened) {
                this.commentOpened = false;
            } else {
                this.commentParentId = parentId;
                this.commentOpened = true;
            }
        },
        onRemovePost() {
            this.$store.dispatch("posts/removeMainPost", {
                id: this.post.id,
            }).then(() => {
                this.$router.push('/');
            });
        },
        onEditPost() {

        },
        goBack() {
            this.$router.go(-1);
        },
        navigateToChat() {
            const nickname = this.post.nickname;
            this.$store.dispatch('note/setSelectedPost', nickname).then(() => {
                this.$router.push('/note');
            });
        },
        onRemoveComment(commentId) {
            this.$store.dispatch("posts/removeComment", {
                postId: this.post.id,
                id: commentId,
                token: this.token,

            }).then(() => {
                alert("삭제완료")
            });
        },
        toggleFavorite() {
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

.img_size {
    width: 100% !important;
    height: 300px !important;
    background-position: center center;

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
    height: 360px;
    overflow: scroll;

}

.favorite-active {
    color: red !important;
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
    position: absolute;
    text-decoration: none;
    right: 30px;
    color: white;
}

.comment_box {
    display: flex;
    align-items: flex-start;
    margin-left: auto;
    margin-right: auto;
    flex-direction: column;
    padding: 5px 0;
    text-align: left;
    width: 100%;
    height: 65px;
    border-bottom: #6CB7F8 1px solid;

}

.comment_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.material-symbols-outlined {
    margin-right: 10px;
}

.comment_nickname {
    font-size: 10px;
    color: #333333;
    flex-grow: 1;
}

.comment_contents {
    font-size: 12px;
    color: #ADAAAA;
    margin-left: 5px;
    color: #333333;
    margin-top: 5px;
}

.delete_button {
    font-size: 10px;
    color: #FF0000;
    cursor: pointer;
    margin-left: 10px;
}
</style>
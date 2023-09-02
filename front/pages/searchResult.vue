<template>
    <div>
        <div class="main_container">
            <div>
                <ul class="search_bar">
                    <li class="back_arrow_container">
                        <a @click="goToIndex" class="back_arrow">
                            <span class="material-symbols-outlined">
                                arrow_back_ios
                            </span>
                        </a>
                    </li>
                    <li class="search_container">
                        <input class="search_input" type="text" placeholder="검색..." v-model="searchQuery" />
                        <span @click="performSearch" class="material-symbols-outlined" style="color: #6CB7F8;">
                            search
                        </span>
                    </li>
                </ul>
                <div class="button_container">
                    <button class="custom_button" @click="LatestSort">최신순</button>
                    <button class="custom_button" @click="priceSort">가격순</button>
                    <button class="custom_button" @click="nameSort">이름순</button>
                    <button class="custom_button" @click="majorSort">전공순</button>
                </div>
            </div>
            <div class="post_box">
                <PostCard v-for="post in searchlist" :key="post.id" :post="post" />
            </div>
        </div>
    </div>
</template>


<script scope>
import PostCard from '../components/PostCard.vue';


export default {
    components: {
        PostCard,
    },
    computed: {
        me() {
            return this.$store.state.users.me;
        },
        token() {
            return this.me.token;
        },
        searchlist() {
            return this.$store.state.posts.mainPosts;
        },
    },

    data() {
        return {
            searchQuery: '',
        };
    },
    async created() {
        let reversedArray = [...this.searchlist].reverse();
        this.$store.commit('posts/setPosts', reversedArray);
    },
    methods: {
        goToIndex() {
            this.$router.push('/');
        },
        performSearch() {
            if (this.searchQuery.trim() === '') {
                this.$store.dispatch('posts/loadPosts');
            }
            else {
                this.$store.dispatch('posts/searchpost', {
                    query: this.searchQuery,
                    token: this.token
                })
                    .then(() => {
                        this.content = '';
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
        },
        LatestSort() {
            let reversedArray = [...this.searchlist].reverse();
            this.$store.commit('posts/setPosts', reversedArray);
        },
        priceSort() {
            this.$store.dispatch('posts/priceSort', {
                token: this.token
            })
                .then(() => {
                    this.content = '';
                })
                .catch((error) => {
                    console.error(error);
                })
        },
        nameSort() {
            this.$store.dispatch('posts/nameSort', {
                token: this.token
            })
                .then(() => {
                    this.content = '';
                })
                .catch((error) => {
                    console.error(error);
                })
        },
        majorSort() {
            this.$store.dispatch('posts/majorSort', {
                token: this.token
            })
                .then(() => {
                    this.content = '';
                })
                .catch((error) => {
                    console.error(error);
                })
        },
    },

}

</script>


<style scoped>
.back_arrow {
    color: #6CB7F8;
    text-align: justify;
}

.main_container {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    width: 375px;
    height: 812px;
}

.back_arrow a {
    text-decoration: none;
    color: #6CB7F8;
    vertical-align: middle;
}

.back_arrow span {
    font-size: 14px;
}

.search_bar {
    list-style: none;
    display: flex;
    width: 350px;
    justify-content: flex-start;
    align-items: center;
    padding: 20px 0 8px 10px;
    background-color: white;
}

.post_box {
    overflow: scroll;
    width: 375px;
    height: 730px;
}

.back_arrow_container {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.search_container {
    flex: 4;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.search_input {
    width: 286px;
    height: 35px;
    border-radius: 15px;
    border: 1px solid #6CB7F8;
    padding: 16px;
}

.button_container {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    border-bottom: #6CB7F8 1px solid;
}
.custom_button {
    width: 80px;
    height: 30px;
    background-color: #6CB7F8;
    color: white;
    border: none;
    border-radius: 15px;
    font-size: 12px;
}
</style>
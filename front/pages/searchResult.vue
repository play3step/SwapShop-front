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
            </div>
            <div>
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
        searchlist(){
            return this.$store.state.posts.mainPosts;
        }
    },

    data() {
        return {
            searchQuery: '',
        };
    },
    methods: {
        goToIndex() {
            this.$router.push('/');
        },
        performSearch() {
            if (this.searchQuery.trim() === '') {
                // 검색어가 비어 있으면 리턴
                return;
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
    },

}

</script>


<style scoped>
.back_arrow {
    color: #6CB7F8;
    text-align: justify;
}

.back_arrow a {
    text-decoration: none;
    color: #6CB7F8;
    vertical-align: middle;
}

.back_arrow span {
    font-size: 14px;
}

.contain {
    width: 375px;
    height: 812px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    overflow: scroll;
}

.search_bar {
    list-style: none;
    display: flex;
    width: 350px;
    justify-content: flex-start;
    align-items: center;
    padding: 20px 0 8px 10px;
    background-color: white;
    border-bottom: #6CB7F8 1px solid;
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
    padding: 5px;
}
</style>
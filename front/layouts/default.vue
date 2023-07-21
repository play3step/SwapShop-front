<template>
    <v-app>
        <nuxt />
        <nav>
            <div class="menu_bar">
                <div class="icon_container"><!--각 라우터 지정 해야함-->
                    <nuxt-link to="/">
                        <span class="material-symbols-outlined">
                            home
                        </span>
                    </nuxt-link>
                    <nuxt-link to="/">
                        <span class="material-symbols-outlined">
                            favorite
                        </span>
                    </nuxt-link>
                    <nuxt-link to="/post">
                        <span class="material-symbols-outlined">
                            description
                        </span>
                    </nuxt-link>
                    <nuxt-link to="/">
                        <span class="material-symbols-outlined">
                            notifications
                        </span>
                    </nuxt-link>
                    <nuxt-link to="/profile">
                        <span class="material-symbols-outlined">
                            person
                        </span>
                    </nuxt-link>
                </div>
            </div>
        </nav>

    </v-app>
</template>

<script>

export default {

    computed: {

    },
    methods: {

    }
};
</script>

<style>
body {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    width: 375px;
    height: 812px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
}

.menu_bar {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #6CB7F8;
}

.icon_container {
    padding: 14px 30px;
}

.icon_container a {
    color: white;
    font-size: 35px;
    margin-right: 30px;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}

.icon_container a:last-child {
    margin: 0px;

}
</style>

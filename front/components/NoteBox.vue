<template>
    <div>

        <nuxt-link :to="'/noteRoom/' + note.id" class="note_container">
            <div>
                <div class="note_title">{{note.nickname}}</div>
                <p class="note_content">{{ note.lastMessage }}</p>
            </div>
        </nuxt-link>
    </div>
</template>

<script>

export default {

    props: {
        note: {
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
.note_container {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    padding: 10px 0 10px 14px;
    text-align: left;
    width: 350px;
    height: 65px;
    border-bottom: #6CB7F8 1px solid;
    text-decoration: none;

}


.note_title {
    margin-left: 16px;
    font-size: 14px;
    line-height: 30px;
    color: black;
}

.note_content {
    font-size: 10px;
    color: #ADAAAA;
    margin-left: 16px;
}
</style>
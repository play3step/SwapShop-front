<template>
    <div>
        <div class="note_container" @click="setNicknameAndNavigate">
            <div>
                <div class="note_title">{{ note.nickname }}</div>
                <p class="note_content">{{ note.lastMessage }}</p>
            </div>
            <p class="note_date">{{ timeAgo }}</p>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

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
    computed: {
        timeAgo() {
            moment.locale('ko');
            return moment(this.note.lastDate).fromNow();
        },
    },
    methods: {
        setNicknameAndNavigate() {
            this.$store.dispatch('note/setSelectedNickname', this.note.nickname).then(() => {
                this.$router.push(`/noteRoom/${this.note.id}`);
            });
        },
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

.note_date {
    position: absolute;
    text-decoration: none;
    right: 30px;
    font-size: 12px;
    color: #ADAAAA;
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
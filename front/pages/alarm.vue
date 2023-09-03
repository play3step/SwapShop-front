<template>
    <div>
        <div class="back_arrow">
            <a @click="goToIndex">
                <span class="material-symbols-outlined">
                    arrow_back_ios
                </span>
            </a>
            <span>알림</span>
        </div>
        <div class="alarm_list">
            <span @click="show_alarm" v-bind:class="{ selected: index === 1 }">
                알림
            </span>
            <span @click="show_note" v-bind:class="{ selected: index === 2 }">
                쪽지함
            </span>
        </div>
        <div v-if="index === 1">
            
        </div>
        <div v-else>
            <NoteBox v-for="note in messages.messageBox" :key="note.id" :note="note"/>
        </div>
    </div>
</template>


<script>
import NoteBox from '../components/NoteBox.vue';

export default {
    layout: 'blank',
    components: {
        NoteBox
    },
    computed: {
        me() {
            return this.$store.state.users.me;
        },
        messages() {
            return this.$store.state.note.messages;
        },
        token() {
            return this.me.token;
        },
    },
    async mounted() {
        await this.$store.dispatch('note/fetchMessages', {
            token: this.token,
        });
    },
    data() {
        return {
            index: 1,

        };
    },
    methods: {
        goToIndex() {
            this.$router.push('/');
        },
        show_alarm() {
            this.index = 1;
        },
        show_note() {
            this.index = 2;
        },
    },
}

</script>


<style scoped>
.back_arrow {
    margin-left: 20px;
    color: #6CB7F8;
    text-align: justify;
    margin-top: 44px;
}

.back_arrow a {
    text-decoration: none;
    color: #6CB7F8;
    vertical-align: middle;
}

.back_arrow span {
    font-size: 14px;
}

.alarm_list {
    font-size: 14px;
    color: #a5b5c4;
    text-align: justify;
    margin-top: 45px;
    margin-left: auto;
    margin-right: auto;
    width: 350px;
    height: 30px;
    border-bottom: #6CB7F8 1px solid;

}

.selected {
    font-weight: bold;
    color: #6CB7F8; /* 여기에 원하는 색상을 설정하세요 */
}

.alarm_list span:last-child {
    margin-left: 14px;
}

.alarm_container {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    padding: 10px 0 10px 14px;
    text-align: left;
    width: 350px;
    height: 65px;
    border-bottom: #6CB7F8 1px solid;

}

.alarm_png {
    width: 35px;
    height: 35px;
    background-color: #6CB7F8;
    border-radius: 50px;
    margin-left: -10px;

}

.alarm_title {
    margin-left: 16px;
    font-size: 14px;
    line-height: 30px;
}

.alarm_time {
    font-size: 10px;
    color: #ADAAAA;
    margin-left: 16px;
}
</style>
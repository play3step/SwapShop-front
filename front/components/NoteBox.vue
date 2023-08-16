<template>
    <div>
        <div class="note_container">
            <div>
                <div class="note_title">닉네임</div>
                <div class="note_content">쪽지 내용</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    props: {
        post: {

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

}


.note_title {
    margin-left: 16px;
    font-size: 14px;
    line-height: 30px;
}

.note_content {
    font-size: 10px;
    color: #ADAAAA;
    margin-left: 16px;
}
</style>
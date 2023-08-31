<template>
    <div class="box">
        <img src="https://via.placeholder.com/150x90" alt="Image 1">
        <div class="text">제목</div>
        <div class="text">가격</div>
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
.box {
    width: 150px;
    height: 150px;
    margin: 10px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
}

img {
    width: 150px;
    height: 90px;
}

.text {
    font-size: 10px;
    margin-top: 5px;
    margin-left: 12px;
    text-align: justify;
    font-weight: bold;
}
</style>
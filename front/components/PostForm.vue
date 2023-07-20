<template>
    <v-card style="margin-bottom: 20px;">
        <v-container>
            <v-form ref = "form" v-model="valid" @submit.prevent="onSubmitForm">
                <v-textarea
                    v-model="title"
                    outlined
                    auto-grow
                    clearable
                    label="제목 입력해 주세요"
                    :hide-details="hideDetails"
                    :success-messages="successMessages"
                    :success="success"
                    @input = "onChangeTextarea"
                />
                <v-textarea
                    v-model="content"
                    outlined
                    auto-grow
                    clearable
                    label="내용을 입력해 주세요"
                    :hide-details="hideDetails"
                    :success-messages="successMessages"
                    :success="success"
                    :rules="[v => !!v.trim() || '내용을 입력하세요.']"
                    @input = "onChangeTextarea"
                />


                <v-btn type ="submit" color ="green" absolute right>올리기</v-btn>
                <v-btn>이미지 업로드</v-btn>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
    import {mapState} from 'vuex';
    export default{
        data() {
            return{
                valid: false,
                hideDetails: false,
                successMessages: '',
                success: false,
                content: '',
                title: '',
            }
        },
        computed: {
            ...mapState('users', ['me'])
        },

        methods: {
            onChangeTextarea(value){
                if(value.length){
                    this.hideDetails = true;
                    this.success = false;
                    this.successMessages = '';
                }
            },
            onSubmitForm(){
                if(this.$refs.form.validate()){
                    this.$store.dispatch('posts/add', {
                        title: this.title,
                        content: this.content,
                        User: {
                            nickname: this.me.nickname

                        },

                    })
                    .then(()=>{
                        this.content = '';
                        this.hideDetails = false;
                        this.success = true;
                        this.successMessages = '게시글 등록 성공!';

                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            }
        }
    }
</script>

<style>


</style>
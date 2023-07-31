<template>
    <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <div>
            <ul class="search_bar">
                <li class="page_title">
                    <a class="back_arrow" @click="goToIndex">
                        <span class="material-symbols-outlined">
                            arrow_back_ios
                        </span>
                    </a>
                    <a>중거거래 글쓰기</a>
                    <v-btn type="submit" class="success_btn" color="#6CB7F8" absolute right>완료</v-btn>
                </li>
            </ul>
        </div>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12 sm6>
                    <input type="file" ref="fileInput" style="display: none" @change="onFileSelected" />
                    <v-btn class="img_btn" @click="onUploadButtonClick">이미지 업로드</v-btn>
                    <!-- 이미지 미리보기 추가 -->
                    <img v-if="imagePreview" :src="imagePreview"
                        style="max-width: 200px; max-height: 200px; margin-top: 10px;" />
                </v-flex>

                <v-text-field v-model="title" outlined auto-grow clearable label="제목" :hide-details="hideDetails"
                    :success-messages="successMessages" :success="success" @input="onChangeTextarea" />

                <v-text-field v-model="price" outlined auto-grow clearable label="가격" :hide-details="hideDetails"
                    :success-messages="successMessages" :success="success" @input="onChangeTextarea" />
                <v-checkbox v-model="term" label="나눔" />
                <Category @selection-changed="onSelectionChanged" />
                <v-textarea v-model="content" outlined auto-grow clearable label="품질, 거래할 품목에 대한 설명을 적어주세요"
                    :hide-details="hideDetails" :success-messages="successMessages" :success="success"
                    :rules="[v => !!v.trim() || '내용을 입력하세요.']" @input="onChangeTextarea" />
            </v-layout>
        </v-container>
    </v-form>
</template>

<script>
import Category from "../components/category.vue";
import { mapState } from 'vuex';

export default {
    
    components: {
        Category
    },
    data() {
        return {
            valid: false,
            hideDetails: false,
            successMessages: '',
            success: false,
            content: '',
            title: '',
            price: '',
            selectedMajor: null,
            selectedProfessor: null,
            selectedCourse: null,
            imageFile: null,
            imagePreview: null,  // 이미지 미리보기 URL
        }
    },
    computed: {
        me() {
            return this.$store.state.users.me;
        },
        token() {
            return this.me.token;
        },
    },

    methods: {
        onChangeTextarea(value) {
            if (value.length) {
                this.hideDetails = true;
                this.success = false;
                this.successMessages = '';
            }
        },
        onSelectionChanged(selection) {
            this.selectedMajor = selection.major;
            this.selectedProfessor = selection.professor;
            this.selectedCourse = selection.course;
        },
        onFileSelected(event) {
            this.imageFile = event.target.files[0];
            if (this.imageFile) {
                let reader = new FileReader();
                reader.onload = e => {
                    this.imagePreview = e.target.result;
                };
                reader.readAsDataURL(this.imageFile);
            } else {
                this.imagePreview = null;
            }
        },
        onUploadButtonClick() {
            this.$refs.fileInput.click();
        },
        onSubmitForm() {
            this.price = parseInt(this.price);

            if (isNaN(this.price)) {
                alert("가격을 입력하세요.");
                return;
            }
            if (this.$refs.form.validate()) {
                this.$store.dispatch('posts/add', {
                    title: this.title,
                    content: this.content,
                    price: this.price,
                    token: this.token,
                    major: this.selectedMajor,
                    professor: this.selectedProfessor,
                    course: this.selectedCourse,
                    imageFile: this.imageFile, // 추가된 부분
                })
                    .then(() => {
                        this.content = '';
                        this.hideDetails = false;
                        this.success = true;
                        this.successMessages = '게시글 등록 성공!';
                        this.$router.push('/');

                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
        },
        goToIndex() {
            this.$router.push('/');
        },
    }
}
</script>

<style>
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

.img_btn {
    width: 80px !important;
    height: 80px !important;
    border-radius: 6px !important;
    margin-left: 20px;
    margin-top: 8px;
    margin-bottom: 8px;
    float: left;
}

.contain {
    width: 375px;
    height: 812px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    overflow: scroll;
}

.success_btn {
    width: 30px !important;
    height: 24px !important;
    border-radius: 15px !important;
    color: white !important;
}

.back_arrow {
    color: #6CB7F8;
    text-align: justify;
}
</style>
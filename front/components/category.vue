<template>
    <div>
        <v-select :items="majors" label="Major" v-model="selectedMajor" @change="loadProfessors"
            :rules="[v => !!v || '필수 항목입니다.']"></v-select>

        <v-select v-if="selectedMajor" :items="professors" label="Professor" v-model="selectedProfessor"
            @change="loadCourses" :rules="[v => !!v || '필수 항목입니다.']"></v-select>

        <v-select v-if="selectedProfessor" :items="courses" label="Courses" v-model="selectedCourse"
            @change="onCourseChanged" :rules="[v => !!v || '필수 항목입니다.']"></v-select>
    </div>
</template>

<script>
import courses from '../data/courses.json';

export default {
    data() {
        return {
            selectedMajor: '',
            selectedProfessor: '',
            selectedCourse: '',
            majors: [],
            professors: [],
            courses: [],
        };
    },
    created() {
        this.initializeData();
    },
    methods: {
        initializeData() {
            this.majors = Array.from(new Set(courses.map((course) => course.major)));
        },
        loadProfessors() {
            this.professors = Array.from(
                new Set(
                    courses
                        .filter((course) => course.major === this.selectedMajor)
                        .map((course) => course.professor)
                )
            );
            this.selectedProfessor = '';
            this.selectedCourse = '';
        },
        loadCourses() {
            this.courses = courses
                .filter(
                    (course) =>
                        course.major === this.selectedMajor &&
                        course.professor === this.selectedProfessor
                )
                .map((course) => course.name);
            this.selectedCourse = '';
        },
        onCourseChanged() {
            this.$emit('selection-changed', {
                major: this.selectedMajor,
                professor: this.selectedProfessor,
                course: this.selectedCourse,
            });
        }
    },
};
</script>

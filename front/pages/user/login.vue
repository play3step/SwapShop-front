<template>
    <div>
        <div v-if="user">
            <h1>Welcome, {{ user.sub }}</h1>
            <p>User is: {{ user }}</p>
            {{ token }}
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode'

export default {
    
    asyncData({ query }) {
        const token = query.token
        if (token) {
            const decoded = jwt_decode(token)
            // 'decoded'는 JWT 페이로드의 JSON 객체이다.
            return { user: decoded,token }
        }
        return {}
    }
}
</script>

<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="loginForm" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="username">
                        <template #prepend>
                            <el-button :icon="User"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="loginForm.password" @keyup.enter="Login">
                        <template #prepend>
                            <el-button :icon="Lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="Login">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>
<script setup lang="ts">

import { reactive } from 'vue';
import { login } from '../api/login'
import type { FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
import { Lock, User } from '@element-plus/icons-vue';
const loginForm = reactive({
    username: '',
    password: ''
})
const router = useRouter();
const Login = async () => {
    const data = await login(loginForm)
    if (data.code === 200) {
        localStorage.setItem('username', loginForm.username);
        router.push("/");
    }
    console.log(data);
}
const rules: FormRules = {
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        }
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};
</script>
<!-- <template>
    <input v-model="loginForm.username" style="width:100px;height:50px;margin-right: 20px;" />
    <input v-model="loginForm.password" style="width:100px;height:50px;" type="password" />
    <button @click="Login">登录</button>
</template> -->



<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/img/login-bg.jpg');
    background-size: 100%;
}

.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}

.ms-content {
    padding: 30px 30px;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}

.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>

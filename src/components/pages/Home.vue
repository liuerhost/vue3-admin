<template>
    <div class="wrapper">
        <!-- <v-header /> -->
        <v-sidebar />
        <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
            <v-tags></v-tags>
            <div class="content">
                <router-view v-slot="{ Component }">
                    <transition name="move" mode="out-in">
                        <keep-alive :include="tags.nameList">
                            <component :is="Component"></component>
                        </keep-alive>
                    </transition>
                </router-view>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { useSidebarStore } from '@/store/sidebar';
import { useTagsStore } from '@/store/tags';
import vHeader from '@/components/common/header.vue';
import vSidebar from '../common/sidebar.vue';
import vTags from '@/components/common/tags.vue';

const sidebar = useSidebarStore();
const tags = useTagsStore();
</script>
<style scoped>

</style>

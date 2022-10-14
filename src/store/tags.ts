import { defineStore } from 'pinia'

interface ListItem {
    path: string,
    name: string,
    title: string
}

export const useTagsStore = defineStore('tags', {

    state: () => {
        return {
            list: <ListItem[]>[]
        }
    },

    getters: {
        // 是否显示
        show: state => {
            return state.list.length > 0;
        },
        // 获取name列表
        nameList: state => {
            return state.list.map(item => item.name);
        }
    },

    actions: {
        delTagItem(index: number) {
            this.list.splice(index, 1);
        },
        setTagsItem(data: ListItem) {
            this.list.push(data);
        },
        clearTags() {
            this.list = [];
        },
        closeTagsOther(data: ListItem[]) {
            this.list = data;
        },
        closeCurrentTag(data: any) { // len = 3 i 0,1,2
            for (let i = 0, len = this.list.length; i < len; i++) {
                const item = this.list[i];
                if (item.path === data.$route.fullPath) {
                    if (i < len - 1) { // 最后一个元素之前 0,1
                        data.$router.push(this.list[i + 1].path);
                    } else if (i > 0) { // 最后一个元素2
                        data.$router.push(this.list[i - 1].path);
                    } else { // 其他情况
                        data.$router.push('/');
                    }
                    this.list.splice(i, 1);
                    break;
                }
            }
        }

    }
})
<template>
    <div class="right-side">
        <div class="side-btn">
            <mu-button small full-width ref="theme" @click="toggleSearchModal(true)" color="primary">
                <mu-icon value="search"></mu-icon>
            </mu-button>
        </div>
        <div class="side-btn">
            <mu-button small full-width ref="theme" @click="changeTheme" color="primary">
                <mu-icon :value="openTheme ? 'brightness_4' : 'brightness_5'"></mu-icon>
            </mu-button>
        </div>
        <div class="side-btn">
            <mu-button small full-width @click="backTop" color="primary">
                <mu-icon value="arrow_upward"></mu-icon>
            </mu-button>
        </div>

        <SearchForm :open="openSearchModal" @toggle="toggleSearchModal"></SearchForm>
        <!-- <mu-button flat icon small slot="right" ref="theme" @click="changeTheme">
            <mu-icon :value="openTheme ? 'brightness_4' : 'brightness_5'"></mu-icon>
        </mu-button> -->
    </div>
</template>
<script>
import SearchForm from "@/components/SearchForm";
import $ from "jquery";
export default {
    name: "rightSide",
    components: {
        SearchForm,
    },
    data() {
        return {
            openTheme: true,
            openSearchModal: false, // 打开搜索弹框
        };
    },
    mounted() {
    },
    computed: {
    },
    methods: {
        changeTheme() {
            const themeStr = this.openTheme ? "mydark" : "mylight";
            this.theme.use(themeStr);
            this.openTheme = !this.openTheme;
        },
        backTop() {
            $("html,body").animate({ scrollTop: 0 }, 500);
        },

        toggleSearchModal(bool) {
            this.openSearchModal = bool;
        },
    },
};
</script>
<style lang="less" scoped>
.right-side {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 10px;
    bottom: 30px;
    z-index: 99999;

    .side-btn {
        // background-color: #2196f3;
        margin-bottom: 1px;

        .mu-raised-button {
            max-width: 28px;
            min-width: 28px;
        }
    }
}
</style>
<template>
    <router-view v-slot="{Component}">
        <transition name="collapse" mode="out-in">
            <component :is="Component"/>
        </transition>
    </router-view>
</template>
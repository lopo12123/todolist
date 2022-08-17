<template>
    <router-view v-slot="{Component}">
        <transition name="collapse" mode="out-in" :duration="500">
            <component :is="Component"/>
        </transition>
    </router-view>
</template>
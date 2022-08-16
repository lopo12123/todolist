import { defineStore } from "pinia";
import { TodoRecord } from "@/scripts/useTodo";

export const usePopup = defineStore({
    id: 'popup',
    state() {
        return {
            popupData: {
                due: Date.now(),
                create: Date.now(),
                title: '',
                desc: ''
            } as TodoRecord,
            popupVisible: false
        }
    },
    actions: {
        showPopup(data: TodoRecord) {
            this.popupData = data
            this.popupVisible = true
        },
        hidePopup() {
            this.popupVisible = false
        }
    }
})
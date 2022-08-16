import { defineStore } from "pinia";
import { TodoRecord } from "@/scripts/useTodo";

export type ConfirmConfig = {
    message: string
    left: {
        label: string
        cb: () => void
    }
    right: {
        label: string
        cb: () => void
    }
}

export const usePopup = defineStore({
    id: 'popup',
    state() {
        return {
            popupType: 'detail' as 'detail' | 'confirm',
            confirmConfig: {
                message: '',
                left: {
                    label: '',
                    cb: () => {
                    }
                },
                right: {
                    label: '',
                    cb: () => {
                    }
                }
            } as ConfirmConfig,
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
        showPopup(type: 'detail' | 'confirm', data: TodoRecord | ConfirmConfig) {
            this.popupType = type

            if(type === 'detail') this.popupData = data as TodoRecord
            else if(type === 'confirm') this.confirmConfig = data as ConfirmConfig

            this.popupVisible = true
        },
        hidePopup() {
            this.popupVisible = false
        }
    }
})
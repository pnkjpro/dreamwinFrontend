import { defineStore } from "pinia";
import { format } from "date-fns";

export const useHelperStore = defineStore('helper', () => {
    const IST_TIMEZONE = 'Asia/Kolkata'

    function formatDate(datetime) {
        const date = new Date(datetime * 1000)
        return format(date, 'dd-MM-yyyy hh:mm a', { timeZone: IST_TIMEZONE })
    }

    return {
        formatDate
    }
});
import { reactive } from "vue";
import { defineStore } from "pinia";
import type { TagInterface } from "@/interfaces/tag.interface";

type EventsType = {
    newTag: TagInterface | null;
};

export const useDialogEventsStore = defineStore("dialogEvents", () => {
    const events = reactive<EventsType>({
        newTag: null,
    });
    const setDialogEventValue = <K extends keyof EventsType>(event: K, value: EventsType[K]) => {
        events[event] = value;
    };
    const resetDialogEvent = (event: keyof EventsType) => {
        events[event] = null;
    };

    return { events, setDialogEventValue, resetDialogEvent };
});

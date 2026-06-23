import { IModuleClassroomResponse } from "@/types/type-module-classroom";

// MODULES CLASSROOM
export const MODULE_CLASSROOM_MOCK: IModuleClassroomResponse = {
    status : true,
    message: "The request has succeeded",
    data: [
        {
            id: 1,
            moduleId: 1,
            title: "O que é Inteligência Artificial",
            description: "Introdução aos conceitos fundamentais.",
            thumbnail: "/images/classroom/thumb-01.jpg",
            videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
            duration: "08:42",
            order: 1,
            completed: true,
            active: true
        },

        {
            id: 2,
            moduleId: 1,
            title: "LLMs na prática",
            description: "Como funcionam os modelos generativos.",
            thumbnail: "/images/classroom/thumb-02.jpg",
            videoUrl: "https://www.youtube.com/embed/kCc8FmEb1nY",
            duration: "12:15",
            order: 2,
            completed: true,
            active: true
        },

        {
            id: 3,
            moduleId: 1,
            title: "Prompt Engineering",
            description: "Primeiros prompts profissionais.",
            thumbnail: "/images/classroom/thumb-03.jpg",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "15:08",
            order: 3,
            completed: false,
            active: true
        }
    ],
    pagination: {
        currentPage: 1,
        itemsPerPage: 20,
        totalItems: 3
    }
};
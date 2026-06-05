// src/services/endpoints.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export const ENDPOINTS = {
    AUTH: {
        LOGIN: `${BASE_URL}/auth/login/`,
        REGISTER: `${BASE_URL}/auth/register/`,
        PROFILE: `${BASE_URL}/auth/profile/`,
    },

    USERS: {
        PROFILE: `${BASE_URL}/users/profile/`,
    },

    PROJECTS: {
        LIST: `${BASE_URL}/projects/`,
        DETAIL: (id: number) => `${BASE_URL}/projects/${id}/`,
        CREATE: `${BASE_URL}/projects/create/`,
    },

    ABOUT: {
        LIST: `${BASE_URL}/about/`,
        DETAIL: (id: number) => `${BASE_URL}/about/${id}/`,
    },

    CERTIFICATES: {
        LIST: `${BASE_URL}/certificates/`,
        UPLOAD: `${BASE_URL}/certificates/upload/`,
        DELETE: (id: number) => `${BASE_URL}/certificates/${id}/`,
    },

    // FIXED: Changed 'contact' to 'contacts' to line up with Django's URL routing pattern
    CONTACT: {
        SEND: `${BASE_URL}/contacts/`,
        LIST: `${BASE_URL}/contacts/`,
        DELETE: (id: number) => `${BASE_URL}/contacts/${id}/`,
    },
};
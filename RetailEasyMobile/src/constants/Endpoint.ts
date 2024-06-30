// export const baseUrl = "http://192.168.31.211:8080/api/v1";
export const baseUrl = "http://192.168.51.101:8080/api/v1";
// export const baseUrl = "https://e005-58-187-58-107.ngrok-free.app/api/v1";

export enum ENDPOINT{
    WS = "ws://192.168.51.101:8080/payment",

    LOGIN = `${baseUrl}/auth/login`,
    REGISTER = `${baseUrl}/auth/create-account`,
    CREATE_ADMIN = `${baseUrl}/auth/create-admin`,

    SEND_FEEDBACK = `${baseUrl}/home/send-feedback`,
    GET_STORE = `${baseUrl}/home/landing`,
    GET_PRODUCT_DETAIL = `${baseUrl}/home/scan-result`,

    GET_RECENT_BILL = `${baseUrl}/emp/most-recent-bill`,

    ADMIN_EXISTS = `${baseUrl}/auth/admin-exists`,
}

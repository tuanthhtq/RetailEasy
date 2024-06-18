const base = "http://192.168.31.209:8080/api/v1";

export enum ENDPOINT{
    LOGIN = `${base}/auth/login`,
    REGISTER = `${base}/auth/create-account`,
    CREATE_ADMIN = `${base}/auth/create-admin   `,


}

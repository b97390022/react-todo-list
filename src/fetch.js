const axios = require("axios").default;
const baseUrl = "https://todoo.5xcamp.us/";

const HexSchoolAuthProvider = {
    async check(token, successCallback, errorCallback) {
        try {
            const response = await axios({
                method: "get",
                baseURL: baseUrl,
                url: "/check",
                headers: {
                    Authorization: token,
                },
            });
            successCallback(response);
            return true;
        } catch (error) {
            errorCallback(error);
            return false;
        }
    },
    async signin({ email, password }, successCallback, errorCallback) {
        try {
            const response = await axios({
                method: "post",
                baseURL: baseUrl,
                url: "/users/sign_in",
                data: {
                    user: {
                        email: email,
                        password: password,
                    },
                },
            });
            successCallback(response);
        } catch (error) {
            errorCallback(error);
        }
    },
    async signout(token, successCallback) {
        try {
            const response = await axios({
                method: "delete",
                baseURL: baseUrl,
                url: "/users/sign_out",
                headers: {
                    Authorization: token,
                },
            });
            successCallback(response);
        } catch (error) {
            console.log(error);
        }
    },
    async register(
        { email, nickname, password },
        successCallback,
        errorCallback
    ) {
        try {
            const response = await axios({
                method: "post",
                baseURL: baseUrl,
                url: "/users",
                data: {
                    user: {
                        email: email,
                        nickname: nickname,
                        password: password,
                    },
                },
            });
            successCallback(response);
        } catch (error) {
            errorCallback(error);
        }
    },
};

const HexSchoolTodoProvider = {
    async getTodo(token, successCallback, errorCallback) {
        try {
            const response = await axios({
                method: "get",
                baseURL: baseUrl,
                url: "/todos",
                headers: {
                    Authorization: token,
                },
            });
            if (successCallback) successCallback(response);
        } catch (error) {
            if (errorCallback) errorCallback(error);
        }
    },
    async toggleTodo({
        token,
        id,
        successCallback,
        errorCallback,
        finallyCallback,
    }) {
        try {
            const response = await axios({
                method: "patch",
                baseURL: baseUrl,
                url: `/todos/${id}/toggle`,
                headers: {
                    Authorization: token,
                },
            });
            successCallback(response);
        } catch (error) {
            if (errorCallback) errorCallback(error);
        } finally {
            if (finallyCallback) finallyCallback();
        }
    },
    async deleteTodo({
        token,
        id,
        successCallback,
        errorCallback,
        finallyCallback,
    }) {
        try {
            const response = await axios({
                method: "delete",
                baseURL: baseUrl,
                url: `/todos/${id}`,
                headers: {
                    Authorization: token,
                },
            });
            successCallback(response);
        } catch (error) {
            if (errorCallback) errorCallback(error);
        } finally {
            if (finallyCallback) finallyCallback();
        }
    },
    async addTodo({
        token,
        todo,
        successCallback,
        errorCallback,
        finallyCallback,
    }) {
        try {
            const response = await axios({
                method: "post",
                baseURL: baseUrl,
                url: "/todos",
                headers: {
                    Authorization: token,
                },
                data: todo,
            });
            successCallback(response);
        } catch (error) {
            if (errorCallback) errorCallback(error.response.data);
        } finally {
            if (finallyCallback) finallyCallback();
        }
    },
};

export const useAuthProvider = () => {
    return HexSchoolAuthProvider;
}

export const useTodoProvider = () => {
    return HexSchoolTodoProvider;
};
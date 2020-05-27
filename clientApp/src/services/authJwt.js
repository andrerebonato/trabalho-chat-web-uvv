export const TOKEN_KEY = "@TOKEN_WEBCHAT_UVV";
export const USER_KEY = "@USER_WEBCHAT_UVV21";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => localStorage.getItem(USER_KEY);

export const handleLogin = (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);

    var jsonUser = JSON.stringify(user);
    localStorage.setItem(USER_KEY, jsonUser);
};

export const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
};
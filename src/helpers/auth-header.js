export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        console.log(`USER: ${user}`);
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}
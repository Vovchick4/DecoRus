export default class UserService {
    constructor() { }

    async logIn(data) {
        return await fetch(`${window.origin}/api/auth/logIn`, {
            method: "POST", body: JSON.stringify(data), credentials: 'include', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    async logOut() {
        return await fetch(`${window.origin}/api/auth/logOut`, { credentials: 'include' })
    }
}
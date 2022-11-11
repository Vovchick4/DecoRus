import UserService from "./user-service._module.js"
const userService = new UserService()
const logOutBtn = document.querySelector(".log-out-btn")

logOutBtn.addEventListener("click", (e) => {
    userService.logOut()
        .then(res => window.location.reload())
})
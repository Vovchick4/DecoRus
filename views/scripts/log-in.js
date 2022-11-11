import UserService from "./user-service._module.js"
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
    const userService = new UserService()

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const form = document.querySelector('.needs-validation')

    // Loop over them and prevent submission
    form.addEventListener('submit', e => {
        e.preventDefault()
        e.stopPropagation()

        const inputs = form.getElementsByTagName("input")
        const chkPswrd = document.querySelector(".check_password")

        // (inputs[1].value.length < 5 && inputs[2].value.length < 5) || 
        if ((inputs[1].value !== inputs[2].value)) {
            chkPswrd.classList.remove("d-none")
        } else {
            chkPswrd.classList.add("d-none")
            const data = {}
            Array.from(inputs).forEach(inpt => {
                data[inpt.name] = inpt.value
            })
            userService.logIn(data)
                .then(res => res.json()
                    .then(resp => {
                        if (resp?.message?.length > 0) {
                            const toastLiveExample = document.getElementById('liveToast')
                            const toast = new bootstrap.Toast(toastLiveExample)
                            toast.show()
                            document.getElementsByClassName("toast-body")[0].innerHTML = resp.message
                        } else {
                            window.location.reload()
                        }
                    }))
        }

        form.classList.add('was-validated')
    }, false)
})()
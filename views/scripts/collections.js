(() => {
    const forms = document.querySelectorAll('.needs-validation')

    forms.forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault()
            e.stopPropagation()

            if (form.checkValidity()) {
                const inputsForm = form.getElementsByTagName("input")
                const dataInputs = {}
                const formData = new FormData()
                Array.from(inputsForm).forEach((input) => {
                    if (!(input.name === "image")) {
                        dataInputs[input.name] = input.value
                    } else {
                        formData.append(input.name, input.files[0])
                    }
                })

                const response = await fetch("api/collections/create", {
                    body: JSON.stringify(dataInputs), method: 'POST', credentials: 'include', headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                response.json().then(response => {
                    const url = new URL(window.location);
                    url.searchParams.set('foo', 'bar');
                    window.history.pushState({}, '', url);
                }).catch(error => alert(error))
            }

            form.classList.add('was-validated')
        })
    })
})()
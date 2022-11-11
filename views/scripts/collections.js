const MODAL_STATE = {
    addColl: "ADD_COLL",
    editColl: "EDIT_COLL"
};
let currentCollIdActive = null;
const addCollItemForm = document.querySelector("#add-item-form");
const addCollModalType = document.querySelector("#AddColl");
const modalFileChangerContent = document.querySelector(".modal_file_changer-content")
const modalAddImg = document.querySelector("#modal_add_img-source");

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
                    if (!(input.name === "file")) {
                        dataInputs[input.name] = input.value
                    } else {
                        formData.append(input.name, input.files[0])
                    }
                })

                let response = null;
                if (MODAL_STATE.addColl === addCollModalType.getAttribute("data-type-modal")) {
                    response = await fetch(`${window.origin}/api/collections/create`, {
                        body: JSON.stringify(dataInputs), method: 'POST', credentials: 'include', headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                } else {
                    const spliteImgSource = modalAddImg.src.split("/")
                    if (spliteImgSource[spliteImgSource.length - 1] === "none") {
                        dataInputs["image"] = { filename: "" }
                    }
                    response = await fetch(`${window.origin}/api/collections/update/${currentCollIdActive}`, {
                        body: JSON.stringify(dataInputs), method: 'PATCH', credentials: 'include', headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                }

                response.json().then(async response => {
                    const { origin, pathname } = window.location
                    const { _id: _collId, title } = response.collection || response.newCollection
                    // If we have image upload this image
                    if (formData.has("file")) {
                        await fetch(`${window.origin}/api/image/create/${_collId}`, { body: formData, method: "POST", credentials: 'include' })
                            .then(res => {
                                // console.log(res);
                            })
                            .catch(err => alert(err))
                    }
                    window.location.href = origin + pathname + `?newColl=${title}`
                }).catch(error => alert(error))
            }

            form.classList.add('was-validated')
        })
    })
})()

const addCollBtn = document.querySelector("#addCollBtn")
const updateCollectionBtn = document.querySelectorAll("#updateBtn")
const removeCollectionsBtn = document.querySelectorAll("#removeBtn")
const inpFile = document.querySelector("#moda_add_coll_file")

function clearForm(form) {
    form.reset()
}

function clearFIleChangerFun() {
    modalFileChangerContent.classList.add("d-none");
    modalAddImg.src = "none"
}

addCollBtn.addEventListener("click", (e) => {
    clearFIleChangerFun()
    clearForm(addCollItemForm)
    addCollModalType.setAttribute("data-type-modal", MODAL_STATE.addColl)
})

updateCollectionBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const getCollIdByClick = btn.getAttribute("coll-data-req")
        fetch(`${window.origin}/api/collections/${getCollIdByClick}`)
            .then(async res => {
                const { collection } = await res.json(res => res)
                currentCollIdActive = collection._id
                // const splitedFileName = collection.image.filename.split("/")

                // GET IMAGE COLLECTION API
                // await fetch(`api/image/${splitedFileName[splitedFileName.length - 1]}`)
                //     .then(async imageRes => imageRes.blob())
                //     .then(file => {
                //         // Create a new File object
                //         const formattedFile = new File([file], "1", { type: "text/json;charset=utf-8" });

                //         const dataTransfer = new DataTransfer();
                //         dataTransfer.items.add(formattedFile);
                //         console.log(dataTransfer);
                //         const inputsForm = document.querySelector("#add-item-form").getElementsByTagName("input")
                //         Array.from(inputsForm).forEach((input) => {
                //             if (input.name !== "file") {
                //                 input.value = collection[input.name]
                //             } else {
                //                 input.value = dataTransfer.files[0].name;
                //             }
                //         })
                //     })
                //     .catch(imageErr => alert(imageErr))

                const inputsForm = document.querySelector("#add-item-form").getElementsByTagName("input")
                Array.from(inputsForm).forEach((input) => {
                    if (input.name !== "file") {
                        input.value = collection[input.name]
                    } else {
                        if (collection.image.filename) {
                            modalFileChangerContent.classList.remove("d-none")
                            modalAddImg.src = collection.image.filename
                        } else {
                            clearFIleChangerFun()
                        }
                    }
                })

                addCollModalType.setAttribute("data-type-modal", MODAL_STATE.editColl)
            })
            .catch(err => alert(err))
    })
})

removeCollectionsBtn.forEach(removeBtn => {
    removeBtn.addEventListener("click", (e) => {
        const getCollIdByClick = removeBtn.getAttribute("coll-data-req")
        fetch(`${window.origin}/api/collections/delete/${getCollIdByClick}`, { method: "DELETE", credentials: 'include' })
            .then(res => (window.location.reload()))
            .catch(err => alert(err))
    })
})

document.querySelector(".modalFileChangerRemoveBtn").addEventListener("click", (e) => {
    clearFIleChangerFun()
    inpFile.value = ""
})

inpFile.addEventListener("change", (e) => {
    if (inpFile.files[0]) {
        const [file] = inpFile.files
        modalAddImg.src = URL.createObjectURL(file)
        modalFileChangerContent.classList.remove("d-none");
    }
})

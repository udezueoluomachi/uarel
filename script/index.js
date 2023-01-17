const $ = e => document.querySelector(e);
const urlInput = $("#url-input");
const genBtn = $("button.input");

[
    "change",
    "click",
    "input",
    "keyup"
]
.forEach(e => {
    urlInput.addEventListener(e , () => urlInput.value.trim() === "" ?
    genBtn.disabled = true : genBtn.disabled = false)
})

genBtn.addEventListener("click", () => {
    genBtn.innerText = "...";
    genBtn.disabled = true;
    let dataToServer = urlInput.value.trim();

    function reset() {
        urlInput.value = "";
        genBtn.innerText = "Generate";
    }

    function request() {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            let res = xhr.responseText;
            let parsedRes = JSON.parse(res);

            if(parsedRes.error) {
                swal({
                    title : "An error occured",
                    icon : "error"
                })
                .then(val => {
                    reset();
                })
            }
            else {
                let url = parsedRes.url || "https://github.com/udezueoluomachi/uarel";
                swal("Generated", url, {
                    icon : "success",
                    buttons: {
                        cancel : "close",
                        confirm : {
                            text : "copy",
                            value : true,
                            closeModal : false
                        }
                    }
                })
                .then(val => {
                    reset();
                    navigator.clipboard.writeText(url)
                    swal({
                        title : "Copied!"
                    })
                })
            }
        }
        xhr.open("POST", "http://localhost:2023/", true); //change url when deployed
        xhr.send(JSON.stringify({
            urlInput : dataToServer
        }));
        xhr.onerror = () => {
            swal({
                title : "An error occured",
                icon : "error",
                buttons : {
                    cancel : "close",
                    retry : {
                        text : "retry",
                        closeModal : false
                    }
                }
            })
            .then(val => {
                val ? request() : reset();
            })
        }
    }
    request();
})
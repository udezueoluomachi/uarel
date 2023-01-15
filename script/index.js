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
        genBtn.disabled = false;
    }

    function request() {
        fetch("http://localhost:4000/", { //change url when deployed
            method : "POST",
            body : dataToServer
        })
        .then(data => data.json())
        .then(res => {
            let url = "https://github.com/udezueoluomachi/uarel";//change this to the response url
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
        })
        .catch(err => {
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
        })
    }
    request();
})
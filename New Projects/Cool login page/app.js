
const inputName = document.querySelector(".inp-name");
const inpWrap = document.querySelector(".inp-wrap");

inputName.addEventListener("input", function(e){
    if(e.target.value !== "")
    {
        inpWrap.classList.add("active-input");
    }
    else if(e.target.value === "")
    {
        inpWrap.classList.remove("active-input");
    }
})
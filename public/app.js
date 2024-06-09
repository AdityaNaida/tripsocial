const controller = document.querySelector(".controllers");
document.querySelectorAll(".pagination-holder").forEach((elem) => {
  elem.addEventListener("click", () => {
    const nextElem = elem.nextElementSibling;
    nextElem.classList.toggle("flex");
  });
});

"use strict";

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

//일정이상 스크롤내리면 navbar 투명>핑크
document.addEventListener("scroll", () => {
  console.log(window.scrollY);
  console.log(`navbarHeight : ${navbarHeight}`);
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark"); //navbar에 class 추가하는것
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

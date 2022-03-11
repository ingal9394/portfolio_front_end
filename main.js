"use strict";

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

//일정이상 스크롤내리면 navbar 투명>핑크
document.addEventListener("scroll", () => {
  //console.log(window.scrollY);
  //console.log(`navbarHeight : ${navbarHeight}`);
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark"); //navbar에 class 추가하는것
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// navmenu를 눌렀을때 해당 부분으로 이동하는거 설정
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  //console.log(target);
  // console.log(event.target.dataset.link);
  // data-link 의 id로 설정한놈을  쿼리셀렉터가 동일한놈을 검색해서 넣어주니까  센션의 해당 아이디가 검색되어서 담기고 그것을 가지고
  //scrollIntoView() 로 이동
  //const scrollTo = document.querySelector(link);
  //console.log(scrollTo);
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
  selectNavItem(target);
});

//작은화면일때 navbar 토글버튼
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

//handle contact

const contactmeBtn = document.querySelector(".home__contact");

contactmeBtn.addEventListener("click", (event) => {
  scrollIntoView("#contact");
});

//Make home slowly fade to transparent as the window scrolls down

const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

//스크롤 내릴때 화살표 보이게
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible"); //css에 설정한 .arrow-up.visible 이 추가됨
  } else {
    arrowUp.classList.remove("visible");
  }
});

const arrowupBtn = document.querySelector(".arrow-up");
arrowupBtn.addEventListener("click", (event) => {
  console.log("1");
  scrollIntoView("#home");
});

//Projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContatior = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  const active = document.querySelector(".categort__btn.selected");
  active.classList.remove("selected");

  //프로젝트 버튼선택하는거옆에 span 있는데 그거 눌러지면 e.target이 span으로 가서 add시 오류남
  // span에는 selected가 없으니까
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;

  target.classList.add("selected");

  projectContatior.classList.add("anime-out");
  setTimeout(() => {
    projects.forEach((project) => {
      console.log(project.dataset.type);
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisble");
      } else {
        project.classList.add("invisble");
      }
    });
    projectContatior.classList.remove("anime-out");
  }, 300);
  //console.log(filter);
});

//눌렀을떄 그쪽으로 가는거 많이쓰니까 그냥 기능으로 하나만듬
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  //behavior는 스크롤이 너무 빠르게움직여서 동작준거임
  scrollTo.scrollIntoView({ behavior: "smooth" });
  //제일 마지막에 추가한것, 클릭으로 이동할때  navmenu에 해당부분으로 가면 solid 되는게 작동하지않아서  관련부분 추가함
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

// 1.모든 섹션 요소들을 가지고 온다
//2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
//3, 보여지는 섹션에 해당하는 메뉴 아이템을 활성화한다

const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonials",
  "#contact",
];

const sections = sectionIds.map((id) => document.querySelector(id));
console.log(sections);
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavindex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);

      //스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavindex = index + 1;
      } else {
        selectedNavindex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

//scroll로 하면 navmenu 클릭시 이동하는것도 일종의 스크롤이라 같이 실행되서 잘 안됨, 따라서 스크롤이아닌 휠로 이동할때만 하도록함
window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavindex = 0;
  } else if (
    window.scrollY + window.innerHeight ===
    document.body.clientHeight
  ) {
    selectedNavindex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavindex]);
});

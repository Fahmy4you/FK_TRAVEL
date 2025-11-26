const navbarElement = document.querySelector("#navbar-element");
const newNavbar = document.createElement("header");
const currentPath = window.location.pathname;
const linksMenu = [
  {
    title: "Beranda",
    href: "index.html",
  },
  {
    title: "Destinasi Wisata",
    href: "wisata.html",
  },
  {
    title: "Penginapan",
    href: "penginapan.html",
  },
  {
    title: "List Kategori",
    href: "kategori.html",
  },
];

const navbarChild = `<div class="content-nav">
            <div class="image">
                <a href="/">
                    <img src="public/images/logo-light-text.png" alt="Logo" />
                </a>
            </div>

            <ul>
                ${linksMenu
                  .map((link) => {
                    const isActive = currentPath === link.href ? "active" : "";
                    return `
                            <li class="link-nav ${isActive}">
                                <a href="${link.href}">${link.title}</a>
                            </li>
                        `;
                  })
                  .join("")}
            </ul>

            <a href="koleksi.html" class="koleksi_btn"><i class="fa-solid fa-bookmark"></i> Koleksi Favoritku</a>

            <div class="hamburger-navbar">
              <span></span>
              <span></span>
              <span></span>
            </div>
        </div>`;

const elementNavMobile = `<div class="nav-link-mobile">
        ${linksMenu
          .map((link) => {
            const isActive = currentPath === link.href ? "active" : "";
            return `
                    <li class="link-nav ${isActive}">
                        <a href="${link.href}">${link.title}</a>
                    </li>
                `;
          })
          .join("")}
        <li class="flex justify-center"><a href="koleksi.html" class="koleksi_btn"><i class="fa-solid fa-bookmark"></i> Koleksi Favoritku</a></li>
    </div>`;

newNavbar.classList.add("navbar-element");
newNavbar.innerHTML = navbarChild;

if (navbarElement) {
  navbarElement.replaceWith(newNavbar);

  newNavbar.insertAdjacentHTML("afterend", elementNavMobile);
} else {
  console.error("Element Tidak Ditemukan");
}

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  if (scrollTop > 30) {
    newNavbar.classList.add("scroll");
  } else {
    newNavbar.classList.remove("scroll");
  }
});

newNavbar.addEventListener("click", (e) => {
  const hamburgerNavbar = e.target.closest(".hamburger-navbar");
  if (!hamburgerNavbar) return;

  hamburgerNavbar.classList.toggle("active");
  document.querySelector(".nav-link-mobile").classList.toggle("active");
});

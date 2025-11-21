const footerElement = document.querySelector("#footer-element");
const newFooter = document.createElement("footer");
const footerChild = `
        <div class="container-footer">
            <div class="content-utama">
                <div class="logo-desk">
                    <img src="public/images/logo-light-text.png" alt="Logo">
                    <p>FK Travel adalah platform informasi pariwisata dan penginapan di Indonesia yang membantu traveler menemukan tempat terbaik untuk dikunjungi. Kami berkomitmen menghadirkan informasi akurat, inspiratif, dan mudah diakses untuk mendukung perjalananmu ke berbagai destinasi di nusantara.</p>
                </div>
                <div class="link-cepat">
                    <h3>Link Cepat</h3>
                    <a href="/">Beranda</a>
                    <a href="/wisata.html">Jelajahi Destinasi</a>
                    <a href="/penginapan.html">Cari Penginapan</a>
                    <a href="/kategori.html">Semua Kategori</a>
                    <a href="/koleksi.html">Koleksi Favoritku</a>
                </div>
                <div class="kategori-populer">
                    <h3>Kategori Populer</h3>
                    <a href="/wisata.html?kategori=1">Pantai</a>
                    <a href="/wisata.html?kategori=2">Gunung</a>
                    <a href="/wisata.html?kategori=3">Religi</a>
                    <a href="/wisata.html?kategori=4">Sejarah</a>
                    <a href="/wisata,html?kategori=5">Candi</a>
                </div>
                <div class="medsos-content">
                    <h3>Sosial Media</h3>
                    <div>
                        <a href="https://www.youtube.com/@fktech.nology" target="_blank"><i class="fa-brands fa-youtube"></i></a>
                        <a href="https://www.tiktok.com/@fk_clippers" target="_blank"><i class="fa-brands fa-tiktok"></i></a>
                        <a href="https://x.com/Fahmy_4you" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>
                    </div>
                </div>
            </div>
            <div class="container-contact">
                <a>
                    <div><i class="fa-solid fa-location-dot"></i></div>
                    <h5>Umbulsari Jember Jawa Timur</h5>
                </a>
                <a>
                    <div><i class="fa-solid fa-phone"></i></div>
                    <h5>(0036) 444 112</h5>
                </a>
                <a>
                    <div><i class="fa-solid fa-envelope"></i></div>
                    <h5>fktravelindonesia@gmail.com</h5>
                </a>
                <a>
                    <div><i class="fa-brands fa-whatsapp text-xl"></i></div>
                    <h5>+62 881 0368 43274</h5>
                </a>
            </div>
            <div class="bg-vector">
                <img src="public/images/vector.png" alt="Vektor Footer">
            </div>
        </div>
        <div class="copyright-content">
            <h5>&copy; FK Travel 2025 - Platform Informasi Wisata Indonesia</h5>
        </div>`;
newFooter.classList.add("footer-element");
newFooter.innerHTML = footerChild;

if (footerElement) {
  footerElement.replaceWith(newFooter);
} else {
  console.error("Element Tidak Ditemukan");
}

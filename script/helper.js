document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("[data-potongtext]");

  // Cek apakah ada elemen
  if (!elements || elements.length === 0) return;

  elements.forEach(el => {
    const limit = parseInt(el.getAttribute("data-potongtext"), 10);
    const text = el.textContent?.trim() || "";

    // Jika teks kosong atau limit tidak valid, lewati
    if (!text || isNaN(limit) || limit <= 0) return;

    if (text.length > limit) {
      el.textContent = text.substring(0, limit) + "...";
    }
  });
});

window.getNameForTestimonial = async function getAutoName() {
  // Device Name
  const ua = navigator.userAgent.toLowerCase();
  let browser = "User";
  if (ua.includes("chrome")) browser = "Chrome";
  else if (ua.includes("firefox")) browser = "Firefox";
  else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari";
  else if (ua.includes("edge")) browser = "Edge";

  let device = "Device";
  if (ua.includes("windows")) device = "Windows";
  else if (ua.includes("android")) device = "Android";
  else if (ua.includes("iphone") || ua.includes("ios")) device = "iPhone";
  else if (ua.includes("macintosh")) device = "Mac";
  else if (ua.includes("linux")) device = "Linux";

  const deviceName = `${browser} ${device}`;

  // Location Name
  let locationName = "Unknown Location";
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    locationName = `${data.city || "Unknown City"}, ${data.country_name || "Unknown Country"}`;
  } catch {}

  return `${deviceName} — ${locationName}`;
}

window.imageavatar = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png'];
window.ensureAvatar = function ensureAvatar() {
    let saved = localStorage.getItem('avatar');

    // Jika tidak ada avatar → set default
    if (!saved) {
        localStorage.setItem('avatar', imageavatar[0]);
        return imageavatar[0];
    }

    // Jika ada tapi tidak ada di array imageavatar → reset ke default
    if (!imageavatar.includes(saved)) {
        localStorage.setItem('avatar', imageavatar[0]);
        return imageavatar[0];
    }

    // Jika valid → return avatar lama
    return saved;
}

window.updateActiveAvatar = function updateActiveAvatar(contentavatar, avatar_image_message = null) {
    const saved = localStorage.getItem('avatar');
    const allImgs = contentavatar.querySelectorAll('img');

    allImgs.forEach(img => {
        const filename = img.src.split('/').pop();
        if (filename == saved) {
            img.classList.add('active');
        } else {
            img.classList.remove('active');
        }
    });

    avatar_image_message.src = `/public/images/avatar/${saved}`;
}
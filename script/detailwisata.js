const cardavatarchange = document.querySelector('.cardavatarchange');
const contentavatar = document.querySelector('.content-avatar');
const image_send_testi = document.querySelector('.image-send-testi');
const bgblur = document.querySelector('.bgblur');
const tutup_avatar_modal = document.querySelector('#tutup_avatar_modal');
const avatar_image_message = document.querySelector('#avatar_image_message');
const zoom_image = document.querySelectorAll('.zoom_image');
const modal_show_galery = document.querySelector('.modal_show_galery');

window.updateActiveAvatar(contentavatar, avatar_image_message);
function tutupAvatarModal() {
    cardavatarchange.classList.remove('active');
    setTimeout(() => {
        bgblur.classList.remove('active');
    }, 500);
}

image_send_testi.addEventListener('click', () => {
    const validateAvatar = window.ensureAvatar();
    
    contentavatar.innerHTML = '';
    imageavatar.forEach((image) => {
        const imgElement = document.createElement('img');
        imgElement.src = `/public/images/avatar/${image}`;
        imgElement.alt = 'Avatar Image'
        
        if(validateAvatar == image) {
            imgElement.classList.add('active');
        }

        // Klik gambar → ganti avatar lokal
        imgElement.addEventListener('click', () => {
            localStorage.setItem('avatar', image);
            window.updateActiveAvatar(contentavatar, avatar_image_message);
            tutupAvatarModal();
        });
        
        contentavatar.appendChild(imgElement);
    });

    cardavatarchange.classList.add('active');
    bgblur.classList.add('active');
});

tutup_avatar_modal.addEventListener('click', tutupAvatarModal);

zoom_image.forEach((zoom) => {
    zoom.addEventListener('click', () => {
        const imgSrc = zoom.querySelector('img').src;
        modal_show_galery.querySelector('img').src = imgSrc;
        modal_show_galery.classList.add('active');
        bgblur.classList.add('active');
    });
});

document.querySelector('#tutup_galery_modal').addEventListener('click', () => {
    modal_show_galery.classList.remove('active');
    setTimeout(() => {
        bgblur.classList.remove('active');
    }, 500);
});
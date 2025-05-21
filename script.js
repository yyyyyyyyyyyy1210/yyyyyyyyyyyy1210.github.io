
// Background music control
function initBackgroundMusic() {
  const audio = document.getElementById('bgMusic');
  if (audio) {
    audio.loop = true;
    
    // 嘗試自動播放
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.then(_ => {
        console.log("自動播放成功");
      })
      .catch(error => {
        console.log("自動播放失敗，等待用戶互動");
        // 如果自動播放失敗，添加播放按鈕
        const playButton = document.createElement('button');
        playButton.innerHTML = '🎵 播放音樂';
        playButton.style.position = 'fixed';
        playButton.style.bottom = '20px';
        playButton.style.right = '20px';
        playButton.style.zIndex = '1000';
        playButton.style.padding = '10px';
        playButton.style.borderRadius = '20px';
        playButton.style.background = '#FFD6D6';
        playButton.style.border = 'none';
        playButton.style.cursor = 'pointer';
        
        playButton.onclick = function() {
          if (audio.paused) {
            audio.play();
            playButton.innerHTML = '🔇 關閉音樂';
          } else {
            audio.pause();
            playButton.innerHTML = '🎵 播放音樂';
          }
        };
        
        document.body.appendChild(playButton);
      });
    }
  }
}

window.addEventListener('DOMContentLoaded', initBackgroundMusic);



// Scroll Animation
function revealOnScroll() {
  const elements = document.querySelectorAll('.gallery-item, .profile-container, .intro-container');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


document.addEventListener('DOMContentLoaded', () => {
  // Add modal to body
  const modal = document.createElement('div');
  modal.className = 'modal';
  document.body.appendChild(modal);

  // Add click handlers to all images
  document.querySelectorAll('.page-image img').forEach(img => {
    img.addEventListener('click', () => {
      modal.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
      modal.style.display = 'block';
    });
  });

  // Close modal on click
  modal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  // Smooth scroll for navigation
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const section = document.querySelector(this.getAttribute('href'));
      section.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Simple form handling
  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('メッセージありがとうございます！');
    form.reset();
  });
});


let currentIndex = 0;
const items = document.querySelectorAll('.gallery-item');
const totalItems = items.length;

function showSlide(index) {
  if (index >= totalItems) currentIndex = 0;
  else if (index < 0) currentIndex = totalItems - 1;

  // 清除所有圖片的 active、prev 和 next 樣式
  items.forEach((item, idx) => {
    item.classList.remove('active', 'prev', 'next');
    if (idx === currentIndex) {
      item.classList.add('active'); // 中間的圖片放大
    } else if (idx === (currentIndex - 1 + totalItems) % totalItems) {
      item.classList.add('prev'); // 左邊圖片縮小
    } else if (idx === (currentIndex + 1) % totalItems) {
      item.classList.add('next'); // 右邊圖片縮小
    }
  });
}

// 每 4 秒自動切換圖片
setInterval(() => {
  currentIndex++;
  showSlide(currentIndex);
}, 4000);

// 初始化時顯示第一張圖片
showSlide(currentIndex);

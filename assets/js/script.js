document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const icon = menuToggle.querySelector('.material-symbols-outlined');
        icon.textContent = mobileMenu.classList.contains('open') ? 'close' : 'menu';
    });

    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const masonryItems = document.querySelectorAll('.masonry-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));
            btn.classList.add('active', 'bg-primary', 'text-white');
            const filter = btn.dataset.filter;
            masonryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    // Set initial active state
    document.querySelector('.filter-btn[data-filter="all"]')?.classList.add('active', 'bg-primary', 'text-white');

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.getElementById('closeLightbox');

    document.querySelectorAll('.masonry-item img').forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightboxFn() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeLightbox.addEventListener('click', closeLightboxFn);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightboxFn();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightboxFn();
    });

    // IntersectionObserver for animations (unchanged)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.glass-card, .masonry-item, h1, h2').forEach(item => {
        item.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
        observer.observe(item);
    });
});
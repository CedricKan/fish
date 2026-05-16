((d) => {
    let observer;

    function createObserver() {
        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ac-reveal--visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });
    }

    function init() {
        createObserver();

        const targets = d.querySelectorAll(
            '.ac-home-section, .ac-home-section .ac-home-eyebrow, .ac-home-section .ac-home-headline, .ac-home-section .ac-home-subhead, .ac-home-section .ac-home-cta, .ac-about-section, .ac-about-card, .ac-about-copy'
        );

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                targets.forEach((el) => observer.observe(el));
            });
        });
    }

    if (d.readyState === 'loading') {
        d.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(document);
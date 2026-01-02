let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {

    const currentScrollY = window.scrollY;
    let width = window.innerWidth;

    if (currentScrollY >= lastScrollY && width <= 768) {
        document.getElementById('nav').classList.remove('top-0', 'sticky');
        document.getElementById('footer').classList.remove('-bottom-8', 'fixed');
        document.getElementById('nav').classList.add('-top-34', 'fixed');
        document.getElementById('footer').classList.add('bottom-0', 'sticky');
        lastScrollY = currentScrollY;
    } else if (currentScrollY < lastScrollY && width <= 768) {
        document.getElementById('nav').classList.remove('-top-34', 'fixed');
        document.getElementById('footer').classList.remove('bottom-0', 'sticky');
        document.getElementById('nav').classList.add('top-0', 'sticky');
        document.getElementById('footer').classList.add('-bottom-8', 'fixed');
        lastScrollY = currentScrollY;
    }

});
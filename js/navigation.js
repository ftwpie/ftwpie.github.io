let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {

    const currentScrollY = window.scrollY;
    let width = window.innerWidth;

    if (currentScrollY >= lastScrollY && width <= 768) {

        document.getElementById('nav').classList.remove('top-0', 'sticky', 'text-base');
        document.getElementById('nav').classList.add('h-0', 'text-[0]');

        document.getElementById('footer').classList.remove('-bottom-8', 'fixed');
        document.getElementById('footer').classList.add('bottom-0', 'sticky');
        lastScrollY = currentScrollY;

    } else if (currentScrollY < lastScrollY && width <= 768) {

        document.getElementById('nav').classList.remove('h-0', 'text-[0]');
        document.getElementById('nav').classList.add('top-0', 'sticky', 'text-base');

        document.getElementById('footer').classList.remove('bottom-0', 'sticky');
        document.getElementById('footer').classList.add('-bottom-8', 'fixed');
        lastScrollY = currentScrollY;

    }

});
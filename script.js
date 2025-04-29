(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section')
    const image = document.querySelector('img');
    let mode = 'dark';

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            button.innerHTML = 'sleep';
            img1.removeAttribute('class'); 
            img2.className = 'switch'; 
            for (const section of sections) {
                section.className = 'switch';
            }
            mode = 'light';
        } else {
            body.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            img1.className = 'switch'; 
            img2.removeAttribute('class'); 
            for (const section of sections) {
                section.removeAttribute('class');
            }
            button.innerHTML = 'wake up';
            mode = 'dark'
        }
    })
})()
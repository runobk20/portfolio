const itemsToObserve = document.querySelectorAll('.observer-item');
const emailBtn = document.querySelector('.email-btn');
const contactButtons = document.querySelector('.contact-buttons');

const contactSection = document.querySelector('.contact');
const projectSection = document.querySelector('.projects');
const header = document.querySelector('header');

const toContactBtn = document.querySelector('.nav-container > button');
const toProjectBtn = document.querySelector('.button-container > button');
const arrowUp = document.getElementById('arrow-up');

const observer = new IntersectionObserver(elements => {
    elements.forEach(el => {
        let animationName = el.target.dataset.animation;
        el.target.classList.toggle(`animate__${animationName}`, el.isIntersecting);
        el.target.classList.toggle('show', el.isIntersecting);

        if (el.isIntersecting) {
            observer.unobserve(el.target);
        }
    })
    },
{
    threshold: 0.75
});

itemsToObserve.forEach(item => {
    observer.observe(item);
});

class Helper {
    constructor(message, type) {
        this.message = message;
        this.type = type;
    }

    render() {
        let colorClass;
        if(this.type === 'alert') {
            colorClass = 'alert';
        } else if (this.type === 'success') {
            colorClass = 'success';
        } else {
            return;
        }
        const messageEl = document.createElement('p');
        messageEl.textContent = this.message;
        messageEl.classList.add(colorClass, 'message');
        return messageEl;
    }

    remove(element) {
        setTimeout(() => {
            element.remove();
        }, 2000);
    }
}

async function copyText(ev) {
    let text = ev.currentTarget.querySelector('p').textContent;
    if (!navigator.clipboard) {
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        let alert = new Helper('Copied to clipboard!', 'success');
        contactButtons.insertAdjacentElement('afterbegin', alert.render());
        let createdAlert = contactButtons.querySelector('.message');
        alert.remove(createdAlert);
    } catch(err) {
        throw new Error(err);
    }
}

function showArrow() {
    const skillsPosition = document.querySelector('.skills').offsetTop;
    const arrow = document.getElementById('arrow-up');

    let y = window.scrollY;
    if (y >= skillsPosition - 400) {
        arrow.classList.remove('hide');
    } else if (y < skillsPosition - 200) {
        arrow.classList.add('hide');
    }
}

function scrollHandler(target) {
    const toScrollPosition = target.offsetTop;
    window.scroll({top: toScrollPosition, behavior: 'smooth'});
}

toContactBtn.addEventListener('click', scrollHandler.bind(this, contactSection));

toProjectBtn.addEventListener('click', scrollHandler.bind(this, projectSection));

arrowUp.addEventListener('click', scrollHandler.bind(this, header));

emailBtn.addEventListener('click', copyText);

window.addEventListener('scroll', showArrow);
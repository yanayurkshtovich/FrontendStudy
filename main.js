const alts = {
    'img1_art.jpg' : 'Belarusian national costume',
    'img1_cartoon.jpg': 'Real monsters character',
    'img1_game.jpg' : 'Our Lady of Charred Visage',
    'img1_meme.jpg' : 'Good day',
    'img1_nature.jpg' : 'Fall',
    'img2_art.jpg' : 'Jesus Christ',
    'img2_cartoon.jpg' : 'Real Monsters Monster',
    'img2_game.jpg' : 'Melquiades, the Exhumed Archibishop',
    'img2_meme.jpg' : 'PhD meme',
    'img2_nature.jpg' : 'Light produces life',
    'img3_art.jpg' : 'Ruchnik',
    'img3_cartoon.jpg' : 'Scavengers Reign',
    'img3_meme.jpg' : 'And yet we love',
    'img4_cartoon.jpg' : 'Ninja manuscript',
    'img4_meme.jpg' : 'Who chares...'
};

const categories = {
    ALL: "All",
    ART: "Art",
    CARTOON: "Cartoon",
    GAME: "Game",
    MEME: "Meme",
    NATURE: "Nature"
};

const imgCategory = {
    'img1_art.jpg' : categories.ART,
    'img1_cartoon.jpg': categories.CARTOON,
    'img1_game.jpg' : categories.GAME,
    'img1_meme.jpg' : categories.MEME,
    'img1_nature.jpg' : categories.NATURE,
    'img2_art.jpg' : categories.ART,
    'img2_cartoon.jpg' : categories.CARTOON,
    'img2_game.jpg' : categories.GAME,
    'img2_meme.jpg' : categories.MEME,
    'img2_nature.jpg' : categories.NATURE,
    'img3_art.jpg' : categories.ART,
    'img3_cartoon.jpg' : categories.CARTOON,
    'img3_meme.jpg' : categories.MEME,
    'img4_cartoon.jpg' : categories.CARTOON,
    'img4_meme.jpg' : categories.MEME
};

const activeBtnLabel = 'activeBtn';
const inactiveBtnLabel = 'inactiveBtn';
let images = Object.keys(imgCategory);

const gallery = document.querySelector('.gallery');
const btnsLayout = document.querySelector('.buttons-layout');
const container = document.querySelector('.container');

function setButtonsLayout() {
    Object.keys(categories)
        .forEach(category => {
            const newSection = createSection('btn-section');
            const newBtn = createBtn(category);            
            newSection.appendChild(newBtn);
            btnsLayout.appendChild(newSection);

            newBtn.addEventListener('click', event => {
                deactivateIfActive();
                event.target.setAttribute('class', activeBtnLabel);
                event.target.dispatchEvent(new CustomEvent('refreshGallery', {
                    bubbles: true,
                    detail : {newCategory: event.target.textContent}
                }));
            });
        });
}

function setGallery() {
    for (const image of images) {
        const newSection = createSection('img-section');
        const newImage = createImg(image);
        newSection.appendChild(newImage);
        gallery.appendChild(newSection);
    }
}

function createSection(classType) {
    const newSection = document.createElement('div');
    newSection.setAttribute('class', classType);
    return newSection;
}

function  createImg(image) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `content/${image}`);
    newImage.setAttribute('alt', alts[image]);
    newImage.setAttribute('category', imgCategory[image]);

    return newImage;
}

function createBtn(category) {
    const newBtn = document.createElement('button');
    newBtn.textContent = category.toString();
    if (newBtn.textContent == categories.ALL.toUpperCase()) {
        newBtn.setAttribute('class', activeBtnLabel);
    } else {
        newBtn.setAttribute('class', inactiveBtnLabel);
    }

    return newBtn;
} 

function deactivateIfActive() {
    const buttons = document.querySelectorAll('button');
    for (const button of buttons) {
        if (button.getAttribute('class') == activeBtnLabel) {
            button.setAttribute('class', inactiveBtnLabel);
        }
    }
}

function findCertainUniqueChild(children, childClass) {
    for (const child of children) {
        if (child.getAttribute('class') == childClass) {
            return child;
        }
    }
}

function refreshGallery(currentGalleryState, evt) {
    Array.from(currentGalleryState.children).forEach(child => {
        child.firstChild.getAttribute('category').toUpperCase() == evt.detail.newCategory ||
        evt.detail.newCategory == categories.ALL.toUpperCase() ? 
        child.style.display = 'flex' :
        child.style.display = 'none';
    });
}

setButtonsLayout();
setGallery();

container.addEventListener('refreshGallery', evt => {
    let currentGalleryState = findCertainUniqueChild(evt.currentTarget.children, 
            'gallery');

    refreshGallery(currentGalleryState, evt);
});
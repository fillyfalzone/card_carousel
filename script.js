// Tableau des chemins des images
const imagePaths = [
    "https://picsum.photos/200/300?1",
    "https://picsum.photos/200/300?2",
    "https://picsum.photos/200/300?3",
    "https://picsum.photos/200/300?4",
    "https://picsum.photos/200/300?5",
    "https://picsum.photos/200/300?6",
];


// Sélectionne l'élément contenant la liste des items du carrousel
const carouselList = document.querySelector(".carousel__list");

document.addEventListener("DOMContentLoaded", () => {
    // Déclenche une initialisation pour simuler un clic sur l'élément central (position 0)
    simulateClickOnCenterItem();
});

// Fonction pour obtenir tous les items dynamiquement
function getCarouselItems() {
    return document.querySelectorAll(".carousel__item");
}

// Simule un clic sur l'élément ayant `data-pos="0"`
function simulateClickOnCenterItem() {
    const carouselItems = getCarouselItems();

    // Trouve l'élément avec `data-pos="0"`
    const centerItem = Array.from(carouselItems).find((item) => item.dataset.pos === "0");

    if (centerItem) {
        // Simule un clic sur cet élément
        updatePositions(centerItem);
    }
}

// Gestionnaire d'événement sur le clic
carouselList.addEventListener("click", (event) => {
    const clickedItem = event.target.closest(".carousel__item");
    if (!clickedItem) return;

    updatePositions(clickedItem);
});


/**
    * Gestion des évènement du swipe 
*/

let touchStartX = 0;
let touchEndX = 0;

carouselList.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
});

carouselList.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();
});

// Appeler la fonction d'ajoute d'images au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    insertImagesIntoCarousel();
});

// // Appel de la fonction au chargement de la page pour les couleurs de BG
// document.addEventListener("DOMContentLoaded", () => {
//     applyRandomBackgroundColors();
// });




/*
    *Les fonctions
*/ 

// Met à jour les positions des items
function updatePositions(newActive) {
    const newActivePos = parseInt(newActive.dataset.pos, 10);

    // Récupère tous les items du carrousel dynamiquement
    const carouselItems = getCarouselItems();

    carouselItems.forEach((item) => {
        const currentPos = parseInt(item.dataset.pos, 10);
        const newPos = getNewPosition(currentPos, newActivePos, carouselItems.length);

        item.dataset.pos = newPos;

        // Définit la direction pour l'animation
        const direction = newPos > 0 ? 1 : -1;
        item.style.setProperty("--direction", direction);

        // Réactive `pointer-events` pour tous les items visibles
        if (Math.abs(newPos) <= 3) {
            item.style.pointerEvents = "auto";
        } else {
            item.style.pointerEvents = "none";
        }
    });
}

// Calcule la nouvelle position d'un item donné
function getNewPosition(currentPos, activePos, totalItems) {
    const offset = currentPos - activePos;

    // Remet les positions dans la plage correcte (-n, ..., 0, ..., n)
    if (Math.abs(offset) > Math.floor(totalItems / 2)) {
        return offset > 0 ? offset - totalItems : offset + totalItems;
    }

    return offset;
}
/**
    * fonctions de  gestion du swipe
 */

function handleSwipe() {
    const swipeThreshold = 50; // Seuil pour détecter un swipe (en pixels)
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe vers la gauche
        swipeToNextItem();
    } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe vers la droite
        swipeToPreviousItem();
    }
}

function swipeToNextItem() {
    const carouselItems = getCarouselItems();
    const currentItem = Array.from(carouselItems).find((item) => item.dataset.pos === "0");
    const nextItem = Array.from(carouselItems).find((item) => item.dataset.pos === "1");

    if (nextItem) updatePositions(nextItem);
}

function swipeToPreviousItem() {
    const carouselItems = getCarouselItems();
    const currentItem = Array.from(carouselItems).find((item) => item.dataset.pos === "0");
    const previousItem = Array.from(carouselItems).find((item) => item.dataset.pos === "-1");

    if (previousItem) updatePositions(previousItem);
}

// Fonction pour générer une couleur hexadécimale aléatoire
// function getRandomColor() {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

// // Fonction pour appliquer un dégradé aléatoire à chaque item
// function applyRandomBackgroundColors() {
//     const carouselItems = getCarouselItems();

//     carouselItems.forEach(item => {
//         const color1 = getRandomColor();  // Première couleur du dégradé
//         const color2 = getRandomColor();  // Deuxième couleur du dégradé
//         const gradient = `linear-gradient(45deg, ${color1} 0%, ${color2} 100%)`;

//         // Applique le dégradé comme fond de l'élément
//         item.style.background = gradient;
//     });
// }

// Fonction pour insérer des images dans les items du carrousel
function insertImagesIntoCarousel() {
    const carouselItems = getCarouselItems(); // Récupère tous les éléments du carrousel

    carouselItems.forEach((item, index) => {
        if (imagePaths[index]) {
            // Créer un élément <figure> avec une image
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            img.src = imagePaths[index];
            img.alt = `Image ${index + 1}`; // Description de l'image

            // Ajouter l'image à la figure
            figure.appendChild(img);

            // Ajouter la figure dans l'item
            item.appendChild(figure);
        }
    });
}


// Fonction pour insérer des images dans les items du carrousel
function insertImagesIntoCarousel() {
    const carouselItems = getCarouselItems(); // Récupère tous les éléments du carrousel

    carouselItems.forEach((item, index) => {
        if (imagePaths[index]) {
            // Créer un élément <figure> avec une image
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            img.src = imagePaths[index];
            img.alt = `Image ${index + 1}`; // Description de l'image

            // Ajouter l'image à la figure
            figure.appendChild(img);

            // Ajouter la figure dans l'item
            item.appendChild(figure);
        }

        if (!imagePaths[index]) {
            // Si l'image n'existe pas, ajouter une couleur de fond
            item.style.backgroundColor = "#ccc"; // Une couleur par défaut
        }
        
    });
}



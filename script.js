//on veut générer ce code en JS pour qu'il apparaisse : 
    //<div class="card" data-value = "https://picsum.photos/id/243/100/100">
    //<img src="https://picsum.photos/id/243/100/100" class="card-content">
  //</div>

//Création des 8 cartes
const cards = [
  'https://picsum.photos/id/237/100/100', 
  'https://picsum.photos/id/238/100/100',
  'https://picsum.photos/id/239/100/100',
  'https://picsum.photos/id/240/100/100',
  'https://picsum.photos/id/241/100/100',
  'https://picsum.photos/id/242/100/100',
  'https://picsum.photos/id/243/100/100',
  'https://picsum.photos/id/244/100/100'
];

const gameBoard = document.getElementById('game-board');
//création d'un tableau pouvant contenir 2 cartes
let selectedCards = [];

//méthode createCard prenant en paramètre la valeur de l'URL de l'image et retournant l’objet HTML de cette carte
function createCard(cardUrl) { // créer ma carte

  const card = document.createElement('div'); // créer une div
  card.classList.add('card'); // ajouter une classe à la div
  card.dataset.value = cardUrl; // ajouter une data-value

  const cardContent = document.createElement('img'); // ajouter le contenu de la carte
  cardContent.classList.add('card-content'); // ajouter la classe card-content
  cardContent.src = cardUrl; // ajouter l'URL de l'image

  card.appendChild(cardContent); // ajouter cette image à la carte supérieure

  card.addEventListener('click', onCardClick); // dès qu'on lcique on ajoute la classe flip
  return card;
}

//Code pour tester notre fonction
//const gameBoard = document.getElementById('game-board');
//const newCard = createCard('https://picsum.photos/id/243/100/100'); // créer une nouvelle carte
//gameBoard.appendChild(newCard) // ajouter cette nouvelle image

//Dupliquer les cartes
function duplicateArray(arraySimple) {// but le retourner en fonction double
  let arrayDouble = [];
  arrayDouble.push(...arraySimple); //2 fois le contenu de l'arraySimple. Sans les ... va rajouter le tableau entier à l'index 1 => double dimension. Ajouter une à une toutes les cases de mon tableau.
  arrayDouble.push(...arraySimple); //2 fois le contenu de l'arraySimple

  return arrayDouble;
}

//Mélanger les cartes méthode shuffle (battre)
function shuffleArray(arrayToShuffle){ //mélanger aléatoirement tableau à mélanger
  const arrayShuffled = arrayToShuffle.sort(() => 0.5 - Math.random()); // fonction sort : trie les éléments du tableau selon un ordre donné. Fonction de comparaision qui retourne un nombre aléatoire entre -0.5 et 0.5.
  return arrayShuffled;
}

function onCardClick(e) { // récupérerun évement de click
  const card = e.target.parentElement; // on clique sur le card-content
  card.classList.add("flip") // ajouter une classe

//stocker les 2 cartes qui sont actuellement visibles => création d'une variable selectedCards qui sera un tableau contenant les 2 cartes retournées en jeu. Si click sur une carte, ajout  carte à la variable selectedCards. 
//Si au clic sur une carte, la variable selectedCards contient 2 cartes, nous pouvons comparer les 2 data attributes data-value. 2 cas possibles :
//Si les 2 sont équivalents, eh bien nous avons trouvé une paire. On ajoute la classe matched à ces éléments, on supprime leurs event listener, et on vide la variable selectedCards.
// Si ce n’est pas le cas, nous nous sommes trompés. On retire donc la classe flip à ces 2 éléments pour les remettre en jeu, et on vide la variable selectedCards.
  selectedCards.push(card); // ajouter ma carte à mon tableau
  if (selectedCards.length == 2) { // si mon tableau contient 2 cartes on peut les comparer
    setTimeout(() =>{
      if (selectedCards[0].dataset.value == selectedCards[1].dataset.value) {
        //paire
        //alert("vous avez trouvé une paire")
        selectedCards[0].classList.add('matched');// affiche matched si c'est bon
        selectedCards[1].classList.add('matched');
        selectedCards[0].removeEventListener('click', onCardClick); //supprimer le click
        selectedCards[1].removeEventListener('click', onCardClick);
      }
      else {
        //on s'est trompé
        //alert("vous vous êtes trompé")
        selectedCards[0].classList.remove('flip'); // remet flip si c'et faux
        selectedCards[1].classList.remove('flip');
      }
      selectedCards = []; //vider le tableau
      //laisser le temps à la 2ème carte de s'afficher => methode setTimeout
    }, 1000)
  }
}


let allCards = duplicateArray(cards); // attention ne pas mettre const, la variable a change de nom donc let et non plus const
allCards = shuffleArray(allCards);
allCards.forEach(card => {//parcours le tableau entier
  const cardHtml = createCard(card); //créer une carte en HTML)
  gameBoard.appendChild(cardHtml);
})

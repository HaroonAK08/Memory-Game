import { types, applySnapshot } from "mobx-state-tree";

// Utility function to shuffle cards
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Card model
const CardModel = types
  .model("Card", {
    id: types.identifierNumber,
    value: types.string,
    imageUrl: types.string,
    isFlipped: false,
    isMatched: false,
  })
  .actions((self) => ({
    flip() {
      self.isFlipped = !self.isFlipped;
    },
    setMatched() {
      self.isMatched = true;
    },
  }));

// Game store
const GameStore = types
  .model("GameStore", {
    cards: types.array(CardModel),
    firstCard: types.maybeNull(types.reference(CardModel)),
    secondCard: types.maybeNull(types.reference(CardModel)),
    moves: 0,
    matchedPairs: 0,
  })
  .views((self) => ({
    get gameFinished() {
      return self.cards.every((card) => card.isMatched);
    },
  }))
  .actions((self) => ({
    setupCards(values) {
      const cards = shuffle([...values, ...values]).map((value, index) => ({
        id: index,
        value: value.name,
        imageUrl: value.imageUrl,
      }));
      applySnapshot(self.cards, cards);
    },
    flipCard(card) {
      if (self.firstCard && self.secondCard) return;
      card.flip();
      if (!self.firstCard) {
        self.firstCard = card;
      } else if (self.firstCard === card) {
        return;
      } else {
        self.secondCard = card;
        self.checkMatch();
      }
    },
    checkMatch() {
      if (self.firstCard.value === self.secondCard.value) {
        self.firstCard.setMatched();
        self.secondCard.setMatched();
        self.matchedPairs++;
        self.resetCards();
      } else {
        setTimeout(() => {
          self.firstCard.flip();
          self.secondCard.flip();
          self.resetCards();
        }, 1000);
      }
      self.moves++;
    },
    resetCards() {
      self.firstCard = null;
      self.secondCard = null;
    },
    resetGame(values) {
      self.firstCard = null;
      self.secondCard = null;
      self.moves = 0;
      self.matchedPairs = 0;
      self.setupCards(values);
    },
  }));

export default GameStore;

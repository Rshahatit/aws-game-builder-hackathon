import { create } from 'zustand';
import { GameState, Player, PropertyColor } from '../types/game';
import { createDeck, getCardById } from '../lib/cards';

interface GameStore extends GameState {
  initializeGame: (playerNames: string[]) => void;
  drawCard: () => void;
  playCard: (playerId: string, cardId: string, targetPlayerId?: string, selectedColor?: PropertyColor, targetPropertyId?: string) => void;
  endTurn: () => void;
  discardCard: (playerId: string, cardId: string) => void;
  cardsPlayedThisTurn: number;
}

export const useGameStore = create<GameStore>((set, get) => ({
  players: [],
  currentPlayer: 0,
  deck: [],
  discardPile: [],
  winner: null,
  actionInProgress: null,
  cardsPlayedThisTurn: 0,

  initializeGame: (playerNames) => {
    const deck = createDeck();
    const players = playerNames.map((name, index) => {
      const playerHand = deck.splice(0, 5);
      return {
        id: `player-${index}`,
        name,
        hand: playerHand,
        properties: [],
        money: [],
        bank: 0
      };
    });

    set({ 
      players, 
      deck, 
      currentPlayer: 0, 
      discardPile: [], 
      winner: null,
      cardsPlayedThisTurn: 0 
    });
  },

  drawCard: () => {
    set(state => {
      if (state.cardsPlayedThisTurn > 0) return state;

      let newDeck = [...state.deck];
      if (newDeck.length === 0) {
        if (state.discardPile.length === 0) return state;
        newDeck = [...state.discardPile].sort(() => Math.random() - 0.5);
        set({ discardPile: [] });
      }

      const drawnCards = newDeck.splice(0, 2);
      if (drawnCards.length === 0) return state;

      const newPlayers = [...state.players];
      const currentPlayer = newPlayers[state.currentPlayer];
      if (!currentPlayer) return state;

      currentPlayer.hand = [...currentPlayer.hand, ...drawnCards];

      return {
        ...state,
        deck: newDeck,
        players: newPlayers,
        cardsPlayedThisTurn: state.cardsPlayedThisTurn + 1
      };
    });
  },

  playCard: (playerId, cardId, targetPlayerId, selectedColor, targetPropertyId) => {
    set(state => {
      const playerIndex = state.players.findIndex(p => p.id === playerId);
      if (playerIndex === -1) return state;

      const player = state.players[playerIndex];
      const cardIndex = player.hand.findIndex(c => c === cardId);
      if (cardIndex === -1) return state;

      const card = getCardById(cardId);
      if (!card) return state;

      const newPlayers = [...state.players];
      const newHand = [...player.hand];
      newHand.splice(cardIndex, 1);

      newPlayers[playerIndex] = {
        ...player,
        hand: newHand
      };

      // Handle different card types
      if (card.type === 'property' && selectedColor) {
        // Initialize properties array if it doesn't exist
        if (!newPlayers[playerIndex].properties) {
          newPlayers[playerIndex].properties = [];
        }

        const propertySetIndex = newPlayers[playerIndex].properties.findIndex(set => {
          if (!set || set.length === 0) return false;
          const firstCard = getCardById(set[0]);
          return firstCard && firstCard.color === selectedColor;
        });

        if (propertySetIndex !== -1) {
          newPlayers[playerIndex].properties[propertySetIndex].push(cardId);
        } else {
          newPlayers[playerIndex].properties.push([cardId]);
        }
      } else if (card.type === 'money') {
        newPlayers[playerIndex].bank += card.value;
        newPlayers[playerIndex].money.push(cardId);
      }

      return {
        ...state,
        players: newPlayers,
        cardsPlayedThisTurn: state.cardsPlayedThisTurn + 1,
        discardPile: [...state.discardPile, cardId]
      };
    });
  },

  discardCard: (playerId, cardId) => {
    set(state => {
      const playerIndex = state.players.findIndex(p => p.id === playerId);
      if (playerIndex === -1) return state;

      const player = state.players[playerIndex];
      const cardIndex = player.hand.findIndex(c => c === cardId);
      if (cardIndex === -1) return state;

      const newPlayers = [...state.players];
      const newHand = [...player.hand];
      newHand.splice(cardIndex, 1);

      newPlayers[playerIndex] = {
        ...player,
        hand: newHand
      };

      return {
        ...state,
        players: newPlayers,
        discardPile: [...state.discardPile, cardId]
      };
    });
  },

  endTurn: () => {
    set(state => {
      const nextPlayer = (state.currentPlayer + 1) % state.players.length;
      return {
        ...state,
        currentPlayer: nextPlayer,
        cardsPlayedThisTurn: 0
      };
    });
  }
}));
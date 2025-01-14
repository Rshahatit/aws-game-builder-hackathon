import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, RotateCw, CreditCard, DollarSign } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { PlayerHand } from '../components/PlayerHand';
import { CardPlayModal } from '../components/CardPlayModal';
import { Card } from '../components/Card';
import { Card as CardType, PropertyColor } from '../types/game';

export function Game() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const { 
    players, 
    currentPlayer, 
    drawCard, 
    playCard, 
    endTurn,
    winner,
    deck,
    discardPile 
  } = useGameStore();

  useEffect(() => {
    if (!players || players.length === 0) {
      navigate('/');
      return;
    }
  }, [players, navigate]);

  if (!players || players.length === 0) {
    return null;
  }

  const handlePlayCard = (card: CardType) => {
    setSelectedCard(card);
  };

  const handleCardAction = (targetPlayerId?: string, selectedColor?: PropertyColor, targetPropertyId?: string) => {
    if (selectedCard && players[currentPlayer]) {
      playCard(players[currentPlayer].id, selectedCard.id, targetPlayerId, selectedColor, targetPropertyId);
      setSelectedCard(null);
    }
  };

  if (winner) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">
            {players.find(p => p.id === winner)?.name} Wins!
          </h2>
          <button
            onClick={() => navigate('/')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  const currentPlayerData = players[currentPlayer];
  if (!currentPlayerData) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-700 to-blue-900">
      {/* Game Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-black/20 backdrop-blur-sm">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="text-white flex items-center gap-2 hover:text-gray-200"
        >
          <Home size={20} />
          Exit Game
        </motion.button>
        <div className="flex items-center gap-4">
          <div className="text-white font-bold">
            {currentPlayerData.name}'s Turn
          </div>
          <div className="bg-white/10 px-3 py-1 rounded-full text-white text-sm">
            Cards in deck: {deck.length}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={endTurn}
          disabled={currentPlayerData.hand.length > 7}
          className="text-white flex items-center gap-2 hover:text-gray-200 disabled:opacity-50"
        >
          <RotateCw size={20} />
          End Turn
          {currentPlayerData.hand.length > 7 && (
            <span className="text-red-400 text-sm">(Discard to 7 cards)</span>
          )}
        </motion.button>
      </div>

      {/* Game Board */}
      <div className="absolute top-20 left-0 right-0 bottom-32 flex justify-center items-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full max-w-6xl aspect-video bg-green-800/30 rounded-xl backdrop-blur-sm shadow-2xl p-8"
        >
          {/* Player Properties */}
          <div className="grid grid-cols-2 gap-8 h-full">
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg ${
                  currentPlayer === index
                    ? 'bg-white/20 ring-2 ring-white/50'
                    : 'bg-black/20'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="text-white font-bold">{player.name}</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-white">
                      <CreditCard size={16} />
                      <span>{player.hand.length}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white">
                      <DollarSign size={16} />
                      <span>{player.bank}M</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {player.properties.map((propertySet, setIndex) => (
                    <motion.div
                      key={setIndex}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="min-h-[120px] rounded bg-white/5 p-2 flex flex-col gap-1"
                    >
                      {propertySet.map((property, propertyIndex) => (
                        <motion.div
                          key={property.id}
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: propertyIndex * 0.1 }}
                        >
                          <Card card={property} miniature={true} />
                        </motion.div>
                      ))}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Player Hand */}
      {currentPlayerData.hand && (
        <PlayerHand
          cards={currentPlayerData.hand}
          onPlayCard={handlePlayCard}
        />
      )}

      {/* Draw Card Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={drawCard}
        className="absolute right-8 bottom-1/2 transform translate-y-1/2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/20 transition-colors"
      >
        Draw Card
      </motion.button>

      {/* Card Play Modal */}
      {selectedCard && (
        <CardPlayModal
          card={selectedCard}
          players={players}
          onClose={() => setSelectedCard(null)}
          onAction={handleCardAction}
        />
      )}
    </div>
  );
}
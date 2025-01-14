import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useGameStore } from "../store/gameStore"
import { PropertyColor } from '../types/game';
import { PROPERTY_COLORS, getCardById } from '../lib/cards';
import { Card } from './Card';
import { handleActionCard } from '../lib/actionHandlers';

interface CardPlayModalProps {
  cardId: string;
  playerIds: string[];
  onClose: () => void;
  onAction: (targetPlayerId?: string, selectedColor?: PropertyColor, targetPropertyId?: string) => void;
  onDiscard: () => void;
  disabled?: boolean;
}

export function CardPlayModal({ cardId, playerIds, onClose, onAction, onDiscard, disabled = false }: CardPlayModalProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<PropertyColor | null>(null);
  const [error, setError] = useState<string | null>(null);
  const players = useGameStore(state => state.players);
  const currentPlayer = useGameStore(state => state.players[state.currentPlayer]);

  const card = getCardById(cardId);
  if (!card) return null;

  const handleAction = () => {
    if (disabled) return;

    if (card.type === 'property') {
      if (!selectedColor) {
        setError('Please select a color for the property');
        return;
      }
      onAction(undefined, selectedColor);
    } else if (card.type === 'sly_deal' || card.type === 'deal_breaker') {
      if (!selectedPlayer || !selectedProperty) {
        setError('Please select a player and property');
        return;
      }
      onAction(selectedPlayer, undefined, selectedProperty);
    } else {
      onAction();
    }
  };

  const renderColorSelection = () => {
    if (card.type !== 'property' && card.type !== 'property_wildcard') return null;

    const availableColors = card.type === 'property' 
      ? [card.color] 
      : (Array.isArray(card.colors) ? card.colors : Object.keys(PROPERTY_COLORS));

    return (
      <div className="mb-6">
        <h4 className="font-medium mb-2">Select Property Color:</h4>
        <div className="grid grid-cols-5 gap-2">
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color as PropertyColor)}
              className={`p-2 rounded ${
                selectedColor === color ? 'ring-2 ring-purple-500' : ''
              }`}
              style={{ backgroundColor: PROPERTY_COLORS[color as PropertyColor].hex }}
            >
              <span className="sr-only">{PROPERTY_COLORS[color as PropertyColor].name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderPlayerSelection = () => {
    if (!['sly_deal', 'deal_breaker', 'debt_collector', 'forced_deal'].includes(card.type)) return null;

    return (
      <div className="mb-6">
        <h4 className="font-medium mb-2">Select Target Player:</h4>
        <div className="grid grid-cols-2 gap-2">
          {players
            .filter(p => p.id !== currentPlayer.id)
            .map((player) => (
              <button
                key={player.id}
                onClick={() => setSelectedPlayer(player.id)}
                className={`p-2 rounded border ${
                  selectedPlayer === player.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-200'
                }`}
              >
                {player.name}
              </button>
            ))}
        </div>
      </div>
    );
  };

  const renderPropertySelection = () => {
    if (!selectedPlayer || !['sly_deal', 'deal_breaker'].includes(card.type)) return null;

    const targetPlayer = players.find(p => p.id === selectedPlayer);
    if (!targetPlayer) return null;

    if (card.type === 'sly_deal') {
      const availableProperties = targetPlayer.properties
        .flatMap((set) => {
          const firstCard = getCardById(set[0]);
          if (!firstCard || !firstCard.color) return [];
          
          const isComplete = useGameStore.getState().isSetComplete(targetPlayer.id, firstCard.color);
          if (isComplete) return [];

          return set.map(propId => ({
            id: propId,
            card: getCardById(propId)
          }));
        })
        .filter(prop => prop.card);

      if (availableProperties.length === 0) {
        return (
          <div className="mb-4 p-2 bg-yellow-100 text-yellow-700 rounded">
            This player has no properties available to steal.
          </div>
        );
      }

      return (
        <div className="mb-6">
          <h4 className="font-medium mb-2">Select Property to Steal:</h4>
          <div className="grid grid-cols-2 gap-2">
            {availableProperties.map(({ id, card }) => (
              <button
                key={id}
                onClick={() => setSelectedProperty(id)}
                className={`p-2 rounded border ${
                  selectedProperty === id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-200'
                }`}
              >
                {card.name}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (card.type === 'deal_breaker') {
      const completeSets = targetPlayer.properties
        .filter(set => {
          if (set.length === 0) return false;
          const firstCard = getCardById(set[0]);
          if (!firstCard || !firstCard.color) return false;
          return useGameStore.getState().isSetComplete(targetPlayer.id, firstCard.color);
        });

      if (completeSets.length === 0) {
        return (
          <div className="mb-4 p-2 bg-yellow-100 text-yellow-700 rounded">
            This player has no complete sets to steal.
          </div>
        );
      }

      return (
        <div className="mb-6">
          <h4 className="font-medium mb-2">Select Complete Set to Steal:</h4>
          <div className="grid grid-cols-2 gap-2">
            {completeSets.map((set, index) => {
              const firstCard = getCardById(set[0]);
              if (!firstCard) return null;

              return (
                <button
                  key={index}
                  onClick={() => setSelectedProperty(set[0])}
                  className={`p-2 rounded border ${
                    selectedProperty === set[0]
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                >
                  {firstCard.color} Set ({set.length} cards)
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Play Card</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <Card cardId={cardId} className="transform-none hover:transform-none" />
          <div className="flex-1">
            <h3 className="font-semibold mb-2">{card.name}</h3>
            {card.type === 'action' && (
              <p className="text-gray-600">{card.description}</p>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {renderColorSelection()}
        {renderPlayerSelection()}
        {renderPropertySelection()}

        <div className="flex justify-end gap-2">
          <button
            onClick={onDiscard}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Discard
          </button>
          <button
            onClick={handleAction}
            disabled={disabled}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            Play Card
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
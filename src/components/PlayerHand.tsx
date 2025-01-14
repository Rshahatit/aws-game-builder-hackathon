import { motion } from 'framer-motion';
import { Card } from './Card';

interface PlayerHandProps {
  cardIds: string[];
  onPlayCard: (cardId: string) => void;
  disabled?: boolean;
}

export const PlayerHand = ({ cardIds, onPlayCard, disabled = false }: PlayerHandProps) => {
  if (!cardIds || cardIds.length === 0) {
    return null;
  }

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 p-4 overflow-x-auto"
      initial={{ y: 200 }}
      animate={{ y: 0 }}
    >
      <div className="flex gap-2 min-w-max px-4 mx-auto max-w-[90vw]">
        {cardIds.map((cardId, index) => (
          <motion.div
            key={`${cardId}-${index}`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            style={{ zIndex: index }}
            className={disabled ? 'opacity-50' : ''}
          >
            <Card
              cardId={cardId}
              onClick={disabled ? undefined : () => onPlayCard(cardId)}
              className="hover:-translate-y-4 transition-transform"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
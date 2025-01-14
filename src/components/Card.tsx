import { motion } from "framer-motion"
import { PROPERTY_COLORS } from "../lib/cards"
import { cn } from "../lib/utils"
import { DollarSign, Zap } from "lucide-react"
import { getCardById } from "../lib/cards"

interface CardProps {
  cardId: string
  onClick?: () => void
  className?: string
  miniature?: boolean
}

export const Card = ({
  cardId,
  onClick,
  className,
  miniature = false,
}: CardProps) => {
  const card = getCardById(cardId)
  if (!card) return null

  const baseClasses = miniature ? "w-16 h-24 text-xs" : "w-32 h-48 text-sm"

  const renderColorIndicator = () => {
    if (card.type === "rent") {
      if (card.colors === "all") {
        // Create a color wheel effect for rent all cards
        return (
          <div className="relative w-8 h-8">
            {Object.values(PROPERTY_COLORS).map(({ hex }, index) => (
              <div
                key={index}
                className="absolute w-4 h-4 rounded-full"
                style={{
                  backgroundColor: hex,
                  transform: `rotate(${index * 45}deg) translate(50%, 0)`,
                  transformOrigin: "center",
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        )
      } else if (Array.isArray(card.colors) && card.colors.length === 2) {
        // Create a split circle for two colors
        const [color1, color2] = card.colors
        return (
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                background: `linear-gradient(90deg, ${PROPERTY_COLORS[color1].hex} 0%, ${PROPERTY_COLORS[color1].hex} 50%, ${PROPERTY_COLORS[color2].hex} 50%, ${PROPERTY_COLORS[color2].hex} 100%)`,
              }}
            />
          </div>
        )
      }
    } else if (card.type === "property_wildcard") {
      if (card.colors === "all") {
        // Create a rainbow effect for wildcard all
        return (
          <div
            className="w-8 h-8 rounded-full"
            style={{
              background: `conic-gradient(${Object.values(PROPERTY_COLORS)
                .map(({ hex }) => hex)
                .join(", ")})`,
            }}
          />
        )
      } else if (Array.isArray(card.colors) && card.colors.length === 2) {
        // Create a split circle for two colors
        const [color1, color2] = card.colors
        return (
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                background: `linear-gradient(90deg, ${PROPERTY_COLORS[color1].hex} 0%, ${PROPERTY_COLORS[color1].hex} 50%, ${PROPERTY_COLORS[color2].hex} 50%, ${PROPERTY_COLORS[color2].hex} 100%)`,
              }}
            />
          </div>
        )
      }
    }
    return null
  }

  return (
    <motion.div
      whileHover={onClick ? { scale: 1.05 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
      className={cn(
        "relative rounded-lg shadow-lg",
        "bg-white border-2",
        baseClasses,
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 p-2 flex flex-col">
        <div
          className={cn(
            "font-bold mb-1 truncate",
            miniature ? "text-[8px]" : "text-sm"
          )}
        >
          {card.name}
        </div>

        {card.color && (
          <div
            className="w-full h-2 rounded"
            style={{ backgroundColor: PROPERTY_COLORS[card.color].hex }}
          />
        )}

        <div className="flex-1 flex items-center justify-center">
          {card.type === "money" && (
            <DollarSign size={miniature ? 16 : 32} className="text-green-600" />
          )}
          {card.type === "action" && (
            <Zap size={miniature ? 16 : 32} className="text-yellow-500" />
          )}
          {(card.type === "rent" || card.type === "property_wildcard") &&
            renderColorIndicator()}
        </div>

        <div
          className={cn(
            "absolute bottom-2 right-2 font-bold",
            miniature ? "text-sm" : "text-xl"
          )}
        >
          {card.value}M
        </div>
      </div>
    </motion.div>
  )
}

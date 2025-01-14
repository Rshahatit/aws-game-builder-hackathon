import { PropertyColor } from "../types/game"
import { useGameStore } from "../store/gameStore"
import { getCardById } from "./cards"

interface ActionHandlerParams {
  playerId: string
  cardId: string
  targetPlayerId?: string
  selectedColor?: PropertyColor
  selectedPropertyId?: string
}

interface ActionResult {
  success: boolean
  message?: string
  rentAmount?: number
}

const actionHandlers: Record<
  string,
  (params: ActionHandlerParams) => ActionResult
> = {
  property: ({ playerId, cardId, selectedColor }) => {
    const store = useGameStore.getState()
    const card = getCardById(cardId)
    if (!card || card.type !== "property") {
      return { success: false, message: "Invalid property card" }
    }

    const playerIndex = store.players.findIndex((p) => p.id === playerId)
    if (playerIndex === -1)
      return { success: false, message: "Player not found" }

    const newPlayers = [...store.players]
    const player = newPlayers[playerIndex]

    // Initialize properties array if it doesn't exist
    if (!player.properties) {
      player.properties = []
    }

    // Find existing property set of the same color
    const propertySetIndex = player.properties.findIndex(
      (set: string | any[]) => {
        if (set.length === 0) return false
        const firstCard = getCardById(set[0])
        return firstCard && firstCard.color === selectedColor
      }
    )

    // Add to existing set or create new one
    if (propertySetIndex !== -1) {
      player.properties[propertySetIndex].push(cardId)
    } else {
      player.properties.push([cardId])
    }

    useGameStore.setState({ players: newPlayers })
    return { success: true }
  },

  sly_deal: ({ playerId, cardId, targetPlayerId, selectedPropertyId }) => {
    const store = useGameStore.getState()
    if (!targetPlayerId || !selectedPropertyId) {
      return { success: false, message: "Missing target player or property" }
    }

    const playerIndex = store.players.findIndex((p) => p.id === playerId)
    const targetIndex = store.players.findIndex((p) => p.id === targetPlayerId)
    if (playerIndex === -1 || targetIndex === -1) {
      return { success: false, message: "Player not found" }
    }

    const newPlayers = [...store.players]
    const player = newPlayers[playerIndex]
    const targetPlayer = newPlayers[targetIndex]

    // Find the property in target player's sets
    let foundPropertySet: number | null = null
    let foundPropertyIndex: number | null = null

    targetPlayer.properties.forEach((set, setIndex) => {
      const propertyIndex = set.findIndex((id) => id === selectedPropertyId)
      if (propertyIndex !== -1) {
        foundPropertySet = setIndex
        foundPropertyIndex = propertyIndex
      }
    })

    if (foundPropertySet === null || foundPropertyIndex === null) {
      return { success: false, message: "Property not found" }
    }

    // Check if the property is part of a complete set
    const propertySet = targetPlayer.properties[foundPropertySet]
    const firstCard = getCardById(propertySet[0])
    if (!firstCard || !firstCard.color) {
      return { success: false, message: "Invalid property set" }
    }

    // Cannot steal from complete sets
    const isComplete = store.isSetComplete(targetPlayerId, firstCard.color)
    if (isComplete) {
      return { success: false, message: "Cannot steal from a complete set" }
    }

    // Remove property from target player
    const property = targetPlayer.properties[foundPropertySet].splice(
      foundPropertyIndex,
      1
    )[0]

    // Clean up empty sets
    targetPlayer.properties = targetPlayer.properties.filter(
      (set) => set.length > 0
    )

    // Add property to stealing player
    const propertyCard = getCardById(property)
    if (!propertyCard || !propertyCard.color) {
      return { success: false, message: "Invalid property" }
    }

    // Find matching set or create new one
    const matchingSetIndex = player.properties.findIndex((set) => {
      const firstSetCard = getCardById(set[0])
      return firstSetCard && firstSetCard.color === propertyCard.color
    })

    if (matchingSetIndex !== -1) {
      player.properties[matchingSetIndex].push(property)
    } else {
      player.properties.push([property])
    }

    useGameStore.setState({ players: newPlayers })
    return { success: true }
  },

  deal_breaker: ({ playerId, cardId, targetPlayerId, selectedPropertyId }) => {
    const store = useGameStore.getState()
    if (!targetPlayerId || !selectedPropertyId) {
      return {
        success: false,
        message: "Missing target player or property set",
      }
    }

    const playerIndex = store.players.findIndex((p) => p.id === playerId)
    const targetIndex = store.players.findIndex((p) => p.id === targetPlayerId)
    if (playerIndex === -1 || targetIndex === -1) {
      return { success: false, message: "Player not found" }
    }

    const newPlayers = [...store.players]
    const player = newPlayers[playerIndex]
    const targetPlayer = newPlayers[targetIndex]

    // Find the complete property set
    const setIndex = targetPlayer.properties.findIndex((set) =>
      set.some((id) => id === selectedPropertyId)
    )

    if (setIndex === -1) {
      return { success: false, message: "Property set not found" }
    }

    const propertySet = targetPlayer.properties[setIndex]
    const firstCard = getCardById(propertySet[0])
    if (!firstCard || !firstCard.color) {
      return { success: false, message: "Invalid property set" }
    }

    // Check if the set is complete
    const isComplete = store.isSetComplete(targetPlayerId, firstCard.color)
    if (!isComplete) {
      return { success: false, message: "Can only steal complete sets" }
    }

    // Remove the set from target player
    const stolenSet = targetPlayer.properties.splice(setIndex, 1)[0]

    // Add the set to the stealing player
    player.properties.push(stolenSet)

    useGameStore.setState({ players: newPlayers })
    return { success: true }
  },

  forced_deal: ({ playerId, cardId, targetPlayerId, selectedPropertyId }) => {
    const store = useGameStore.getState()
    if (!targetPlayerId || !selectedPropertyId) {
      return { success: false, message: "Missing target player or property" }
    }

    const playerIndex = store.players.findIndex((p) => p.id === playerId)
    const targetIndex = store.players.findIndex((p) => p.id === targetPlayerId)
    if (playerIndex === -1 || targetIndex === -1) {
      return { success: false, message: "Player not found" }
    }

    const newPlayers = [...store.players]
    const player = newPlayers[playerIndex]
    const targetPlayer = newPlayers[targetIndex]

    // Similar to sly deal, but requires selecting a property to trade
    // Implementation similar to sly_deal but with property exchange logic
    // TODO: Implement forced deal logic
    return { success: false, message: "Forced deal not implemented yet" }
  },

  pass_go: ({ playerId }) => {
    const store = useGameStore.getState()
    const playerIndex = store.players.findIndex((p) => p.id === playerId)
    if (playerIndex === -1)
      return { success: false, message: "Player not found" }

    // Draw 2 cards
    store.drawCard()
    store.drawCard()

    return { success: true }
  },
}

export function handleActionCard(params: ActionHandlerParams): ActionResult {
  const card = getCardById(params.cardId)
  if (!card) return { success: false, message: "Card not found" }

  const handler = actionHandlers[card.type]
  if (!handler) {
    return { success: false, message: "No handler for this card type" }
  }

  return handler(params)
}

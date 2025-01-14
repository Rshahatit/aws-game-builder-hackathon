# Monopoly Deal Backend

This backend implementation uses AWS Amplify Gen 2 to provide a serverless infrastructure for the Monopoly Deal game.

## Schema Overview

### Game Model
- Represents an instance of a game
- Tracks game state including players, deck, discard pile
- Manages game status and winner

### Player Model
- Represents a player in a game
- Tracks player's hand, properties, and bank
- Links to specific game instance

### Key Features
- Real-time game state updates
- Player management
- Card management (using card IDs)
- Game flow control

## Setup Instructions

1. Install AWS Amplify CLI
```bash
npm install -g @aws-amplify/cli
```

2. Initialize Amplify in your project
```bash
amplify init
```

3. Push the backend to AWS
```bash
amplify push
```

## API Operations

### Queries
- getActiveGames: Retrieves list of active games
- getPlayerGames: Gets games for specific player

### Mutations
- joinGame: Allows player to join a game
- playCard: Handles card play logic
- drawCard: Manages card drawing
- endTurn: Processes end of turn

## Notes
- Card data is handled statically in frontend
- Only card IDs are stored in the backend
- Real-time updates using GraphQL subscriptions
- Secure player authentication and authorization
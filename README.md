# Monopoly Deal Online Game

This project is a web-based implementation of the Monopoly Deal card game, allowing players to enjoy the game online.

The Monopoly Deal Online Game is a digital adaptation of the popular card game, built using modern web technologies. It provides a seamless multiplayer experience, allowing users to play the game remotely with friends or other online players. The game features a user-friendly interface, real-time updates, and implements the core mechanics of Monopoly Deal, including property trading, rent collection, and action cards.

Key features of the application include:
- User authentication and account management
- Real-time multiplayer gameplay
- Interactive game board and card management
- Turn-based gameplay with action tracking
- Responsive design for various devices

## Repository Structure

```
.
├── amplify/
│   ├── auth/
│   │   └── resource.ts
│   ├── backend.ts
│   └── data/
│       └── resource.ts
├── src/
│   ├── components/
│   │   ├── Card.tsx
│   │   ├── CardPlayModal.tsx
│   │   └── PlayerHand.tsx
│   ├── lib/
│   │   ├── actionHandlers.ts
│   │   ├── cards.ts
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Game.tsx
│   │   ├── Home.tsx
│   │   └── Lobby.tsx
│   ├── store/
│   │   └── gameStore.ts
│   ├── types/
│   │   └── game.ts
│   ├── App.tsx
│   └── main.tsx
├── amplify.yml
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Key Files:
- `src/main.tsx`: Entry point of the React application
- `src/App.tsx`: Main component defining the application structure and routing
- `src/pages/Game.tsx`: Core game logic and UI implementation
- `amplify/backend.ts`: Backend configuration for AWS Amplify
- `package.json`: Project dependencies and scripts
- `vite.config.ts`: Vite build configuration

### Important Integration Points:
- AWS Amplify for authentication and backend services
- React Router for navigation
- Zustand for state management

## Usage Instructions

### Installation

Prerequisites:
- Node.js (v14 or later)
- npm (v6 or later)

Steps:
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm ci
   ```

### Getting Started

1. Start the development server:
   ```
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:5173`

### Configuration

The application uses AWS Amplify for backend services. Ensure you have the necessary AWS credentials and Amplify CLI set up.

To configure the Amplify backend:
1. Initialize Amplify in the project:
   ```
   amplify init
   ```
2. Push the backend changes:
   ```
   amplify push
   ```

### Common Use Cases

1. Starting a new game:
   - Navigate to the lobby page
   - Click on "Create Game" or join an existing game
   - Wait for other players to join
   - Start the game when ready

2. Playing a card:
   - During your turn, select a card from your hand
   - Choose the action you want to perform with the card
   - Confirm the action in the modal that appears

3. Ending your turn:
   - After playing up to 3 cards, click the "End Turn" button
   - If you have more than 7 cards, you must discard down to 7 before ending your turn

### Testing & Quality

To run the linter:
```
npm run lint
```

### Troubleshooting

Common Issue: Authentication Errors
- Problem: Unable to sign in or access authenticated routes
- Solution:
  1. Check if you're using the correct credentials
  2. Ensure Amplify is properly configured:
     ```
     amplify status
     ```
  3. If issues persist, try clearing local storage and refreshing the page

Debugging:
- To enable verbose logging, set the following in your browser's console:
  ```javascript
  localStorage.setItem('debug', '*');
  ```
- Refresh the page to see detailed logs in the console

Performance Optimization:
- Monitor network requests in the browser's Developer Tools
- Check for unnecessary re-renders using React DevTools
- Optimize large lists using virtualization techniques

## Data Flow

The application follows a unidirectional data flow pattern:

1. User actions trigger events in the UI components
2. These events are handled by the game store (using Zustand)
3. The store updates its state and triggers API calls to the backend if necessary
4. Backend (AWS Amplify) processes the requests and updates the database
5. Real-time updates are pushed to connected clients
6. The UI re-renders based on the updated state

```
[User Interface] -> [Game Store] -> [AWS Amplify Backend] -> [Database]
       ^                 |                 |
       |                 |                 |
       +-----------------+-----------------+
              Real-time Updates
```

Note: The game logic is primarily handled on the client-side for responsiveness, with the backend used for data persistence and synchronization between players.

## Deployment

### Prerequisites
- AWS Account
- Amplify CLI installed and configured

### Deployment Steps
1. Build the project:
   ```
   npm run build
   ```
2. Deploy the Amplify backend:
   ```
   amplify push
   ```
3. Deploy the frontend to Amplify Hosting:
   ```
   amplify publish
   ```

### Environment Configurations
- Ensure environment variables are properly set in the Amplify console for different stages (dev, prod)

## Infrastructure

The project uses AWS Amplify for its infrastructure. Key resources include:

- Lambda:
  - Authentication handlers
  - API resolvers for game logic
- AppSync:
  - GraphQL API for real-time game state management
- DynamoDB:
  - Tables for storing game data, player information, and moves
- Cognito:
  - User authentication and authorization

The `amplify/backend.ts` file defines the backend configuration, including authentication and data models for Players, Games, PlayerGameStates, and Moves.
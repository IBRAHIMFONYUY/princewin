# **App Name**: PrinceWin

## Core Features:

- Real-Time Gameplay: Allows multiple players to bet and cash out in real-time during the same game round, updating the multiplier as it rises, using Firebase Realtime Database.
- Provably Fair System: Uses cryptographic hashing (tool) to allow users to verify the fairness and randomness of crash point generation, ensuring transparency in game outcomes. Uses LLM as a tool to generate an explanation for the users on how the provably fair system works.
- Risk Level Selection: Offers multiple different risk levels of game play.
- Dynamic Chart Visualization: Presents the multiplier's growth over time with a real-time line chart and shows historical crash points for better understanding of game trends. As requested, the library used to build this chart is chart.js.
- Themed Interface: Enable a light/dark theme toggle with customizable color options (e.g., gold, blue, red) to cater to user preferences.
- Enhanced Visuals: Improve the plane animation using a custom SVG/3D-rendered plane and integrate a dynamic sky background that changes based on game state.
- Achievements: Provide players with ways to make bets to unlock achievements.

## Style Guidelines:

- Primary color: Gold (#FFD700) to reflect the game's focus on winning and high stakes.
- Background color: Dark gray (#333333) to create contrast and emphasize the game elements.
- Accent color: Pale gold (#BDB76B) for interactive elements and highlights, complementing the gold and dark gray.
- Body and headline font: 'Space Grotesk', a sans-serif font with a techy feel that suits both headlines and body text.
- Code font: 'Source Code Pro' for displaying any code or technical info, maintaining readability.
- Use clear, minimalistic icons for game controls and UI elements to ensure usability.
- Incorporate smooth transitions and engaging animations for key events (e.g., multiplier increases, plane takeoff) to enhance user experience.
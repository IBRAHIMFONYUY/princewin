The "Prince Win" crash game is a fast-paced, high-stakes online betting game where players wager on a multiplier that increases over time until it "crashes" at a random point. The objective is to cash out before the crash to win based on the multiplier at the time of cashout. Below is a detailed explanation of how the game is played and its flow, based on the provided code and typical crash game mechanics.

---

### **Game Overview**
- **Core Concept**: Players place a bet on a multiplier that starts at 1.00x and increases during a game round. The multiplier can crash at any moment (e.g., at 1.23x, 5.67x, or higher). If a player cashes out before the crash, they win their bet multiplied by the current multiplier. If they don't cash out in time, they lose their bet.
- **Visual Theme**: The game features an airplane that ascends as the multiplier grows, with a starry sky background and dynamic animations (e.g., plane trail, multiplier trail, crash effects).
- **Objective**: Maximize winnings by cashing out at the highest possible multiplier before the crash.

---

### **Game Flow**

#### **1. Initial Setup**
- **User Authentication**: When the game loads, it checks for a valid access token in `localStorage`. If no token is found, the user is redirected to `login.html`. This ensures only authenticated users can play.
- **Data Fetching**: The game fetches user data (e.g., wallet balance, stats) and game history/leaderboard from the firebase backend 
- **UI Initialization**: The interface displays:
  - The user's balance (e.g., `$100.00`) in the header.
  - Game stats (total bets, total won, highest multiplier, win rate).
  - A game canvas with a plane, sky background, and stars.
  - Bet controls (bet amount input, auto-cashout toggle, place bet/cashout buttons).
  - History and leaderboard panels showing past bets and top players.

#### **2. Waiting Phase (Game State: `waiting`)**
- **Description**: Each round starts in the "waiting" phase, where players can place their bets before the game begins.
- **UI Indicators**:
  - The game status in the header shows "WAITING."
  - The multiplier displays as `1.00x`.
  - A countdown timer (5 seconds) appears in the game canvas, indicating when the round will start.
- **Player Actions**:
  - **Set Bet Amount**: Players enter a bet amount (e.g., $10) in the "Bet Amount" input or use quick buttons (10XAF, 50XAF, 100XAF, or MAX to bet their entire balance).
  - **Auto-Cashout Option**: Players can enable auto-cashout by toggling the switch and setting a target multiplier (e.g., 2.0x). If enabled, the game will automatically cash out when the multiplier reaches this value.
  - **Place Bet**: Click the "Place Bet" button to lock in the bet. The bet amount is deducted from the player's balance, and the button becomes disabled to prevent multiple bets in one round.
  - **Validation**: The game checks if the bet amount is valid (positive, not exceeding balance). If invalid, a notification (e.g., "Insufficient balance") appears.
- **Outcome**: Once the bet is placed, the player is committed to the round, and `hasUserBet` is set to `true`. The game waits for the countdown to finish.

#### **3. In-Progress Phase (Game State: `in-progress`)**
- **Description**: After the countdown reaches zero, the game starts, and the multiplier begins increasing from 1.00x. The plane ascends diagonally across the canvas, with its position reflecting the multiplier's growth.
- **Mechanics**:
  - The multiplier increases at a rate of 0.5x per second, updated in real-time using `requestAnimationFrame`.
  - The crash point is randomly generated at the start of the round (between 1.00x and ~8.00x, weighted toward lower values for fairness).
  - Visual effects include:
    - A trail of golden points following the plane's path (`multiplier-trail`).
    - Particle effects behind the plane (`plane-trail`).
    - A large multiplier display in the center of the canvas, pulsing when above 2x and changing color (golden, green for high values).
- **Player Actions**:
  - **Manual Cashout**: If the player has placed a bet, they can click the "Cashout" button to lock in their winnings (bet amount × current multiplier). For example, a $10 bet at 2.50x yields $25.
  - **Auto-Cashout**: If enabled, the game automatically cashes out when the multiplier reaches the set value (e.g., 2.0x).
  - **Outcome**: 
    - On cashout, the player's balance is updated with the winnings, and a notification (e.g., "Cashed out at 2.50x! You won $15.00") appears.
    - The cashout is recorded in the game history, and if the profit exceeds $100, it's added to the leaderboard.
    - The "Cashout" button is disabled after cashing out (`hasCashedOut = true`).
- **Game Progression**: The multiplier continues to rise until it reaches the hidden crash point, at which point the game transitions to the crashed phase.

#### **4. Crashed Phase (Game State: `crashed`)**
- **Description**: The game ends when the multiplier reaches the crash point. Players who haven't cashed out lose their bets.
- **Mechanics**:
  - The plane's SVG changes to a red "crash" icon, and a crash effect (red radial gradient) appears at the plane's position.
  - Multiple explosion particles (red, orange, yellow) scatter for visual impact.
  - The game status updates to "CRASHED," and the final multiplier is displayed.
- **Player Outcomes**:
  - **Cashed Out**: Players who cashed out keep their winnings, and no further action is needed.
  - **Did Not Cash Out**: Players who placed a bet but didn't cash out lose their bet. A notification (e.g., "Crashed at 3.45x! You lost $10.00") appears, and the loss is recorded in the history.
- **Stats Update**:
  - The total bets counter increments for each bet placed.
  - If the crash point is higher than the player's highest multiplier, it updates the stats.
  - The win rate is recalculated based on wins vs. total bets.
- **Backend Sync**: The player's updated balance is sent to the backend 
- **Transition**: After a 3-second delay, the game resets to the waiting phase, and a new round begins with a fresh countdown.

#### **5. Additional Features**
- **Game History**: Each bet is logged with the time, bet amount, multiplier, and win/loss status. The history panel displays the last 10 bets, with a "Clear" button to reset it.
- **Leaderboard**: Shows top players by winnings, including username, amount won, multiplier, and time. New high-value cashouts (>$100 profit) are added, sorted by amount, and limited to 10 entries.
- **Deposit System**: Players can navigate to `task.html` to deposit funds, which updates their balance.
- **Notifications**: Success (green) or error (red) notifications appear for events like bet placement, cashout, or invalid actions.
- **Visuals and Animations**:
  - Stars twinkle in the background, with some animated for a dynamic effect.
  - The plane rotates based on its trajectory, enhancing immersion.
  - The multiplier display pulses and changes color for emphasis.

---

### **How to Play: Step-by-Step**
1. **Login**: Ensure you're logged in
2. **Check Balance**: Verify your balance in the header. If low, deposit funds via the "Deposit" button.
3. **Place a Bet**:
   - During the waiting phase (5-second countdown), enter a bet amount or use quick buttons.
   - Optionally enable auto-cashout and set a target multiplier.
   - Click "Place Bet" to commit. Your balance decreases by the bet amount.
4. **Monitor the Game**:
   - Watch the multiplier rise and the plane ascend during the in-progress phase.
   - Decide whether to cash out manually by clicking "Cashout" or rely on auto-cashout.
5. **Cashout or Crash**:
   - **Cashout**: If you cash out before the crash, you win your bet times the current multiplier.
   - **Crash**: If you don't cash out in time, you lose your bet.
6. **Review Results**:
   - Check the history panel for your bet outcome.
   - If you won significantly, you may appear on the leaderboard.
7. **Repeat**: Wait for the next round to place another bet.

---

### **Key Player Decisions**
- **When to Cash Out**: The core challenge is deciding whether to cash out early for a smaller, safer win or risk waiting for a higher multiplier, knowing the crash is unpredictable.
- **Bet Amount**: Players must balance risk vs. reward, betting more for higher potential payouts but risking larger losses.
- **Auto-Cashout**: Using auto-cashout reduces stress but may limit profits if set too low.

---

### **Example Scenario**
- **Balance**: $100
- **Bet**: $10 with auto-cashout at 2.0x
- **Round**:
  - Countdown finishes, game starts.
  - Multiplier rises: 1.00x → 1.50x → 2.00x.
  - Auto-cashout triggers at 2.00x, winning $10 × 2.0 = $20.
  - Balance updates to $110 ($100 - $10 + $20).
  - History shows: "12:45, $10.00, 2.00x ✓".
  - If the crash point was 3.45x, players who didn't cash out lose their bets.
- **Next Round**: Player can bet again after the 3-second crash delay.

---
The "Prince Win" crash game is a fast-paced, high-stakes online betting game where players wager on a multiplier that increases over time until it "crashes" at a random point. The objective is to cash out before the crash to win based on the multiplier at the time of cashout. Below is a detailed explanation of how the game is played and its flow, based on the provided code and typical crash game mechanics.

---

### **Game Overview**
- **Core Concept**: Players place a bet on a multiplier that starts at 1.00x and increases during a game round. The multiplier can crash at any moment (e.g., at 1.23x, 5.67x, or higher). If a player cashes out before the crash, they win their bet multiplied by the current multiplier. If they don't cash out in time, they lose their bet.
- **Visual Theme**: The game features an airplane that ascends as the multiplier grows, with a starry sky background and dynamic animations (e.g., plane trail, multiplier trail, crash effects).
- **Objective**: Maximize winnings by cashing out at the highest possible multiplier before the crash.

---

### **Game Flow**

#### **1. Initial Setup**
- **User Authentication**: When the game loads, it checks for a valid access token in `localStorage`. If no token is found, the user is redirected to `login.html`. This ensures only authenticated users can play.
- **Data Fetching**: The game fetches user data (e.g., wallet balance, stats) and game history/leaderboard from the firebase backend 
- **UI Initialization**: The interface displays:
  - The user's balance (e.g., `$100.00`) in the header.
  - Game stats (total bets, total won, highest multiplier, win rate).
  - A game canvas with a plane, sky background, and stars.
  - Bet controls (bet amount input, auto-cashout toggle, place bet/cashout buttons).
  - History and leaderboard panels showing past bets and top players.

#### **2. Waiting Phase (Game State: `waiting`)**
- **Description**: Each round starts in the "waiting" phase, where players can place their bets before the game begins.
- **UI Indicators**:
  - The game status in the header shows "WAITING."
  - The multiplier displays as `1.00x`.
  - A countdown timer (5 seconds) appears in the game canvas, indicating when the round will start.
- **Player Actions**:
  - **Set Bet Amount**: Players enter a bet amount (e.g., $10) in the "Bet Amount" input or use quick buttons (10XAF, 50XAF, 100XAF, or MAX to bet their entire balance).
  - **Auto-Cashout Option**: Players can enable auto-cashout by toggling the switch and setting a target multiplier (e.g., 2.0x). If enabled, the game will automatically cash out when the multiplier reaches this value.
  - **Place Bet**: Click the "Place Bet" button to lock in the bet. The bet amount is deducted from the player's balance, and the button becomes disabled to prevent multiple bets in one round.
  - **Validation**: The game checks if the bet amount is valid (positive, not exceeding balance). If invalid, a notification (e.g., "Insufficient balance") appears.
- **Outcome**: Once the bet is placed, the player is committed to the round, and `hasUserBet` is set to `true`. The game waits for the countdown to finish.

#### **3. In-Progress Phase (Game State: `in-progress`)**
- **Description**: After the countdown reaches zero, the game starts, and the multiplier begins increasing from 1.00x. The plane ascends diagonally across the canvas, with its position reflecting the multiplier's growth.
- **Mechanics**:
  - The multiplier increases at a rate of 0.5x per second, updated in real-time using `requestAnimationFrame`.
  - The crash point is randomly generated at the start of the round (between 1.00x and ~8.00x, weighted toward lower values for fairness).
  - Visual effects include:
    - A trail of golden points following the plane's path (`multiplier-trail`).
    - Particle effects behind the plane (`plane-trail`).
    - A large multiplier display in the center of the canvas, pulsing when above 2x and changing color (golden, green for high values).
- **Player Actions**:
  - **Manual Cashout**: If the player has placed a bet, they can click the "Cashout" button to lock in their winnings (bet amount × current multiplier). For example, a $10 bet at 2.50x yields $25.
  - **Auto-Cashout**: If enabled, the game automatically cashes out when the multiplier reaches the set value (e.g., 2.0x).
  - **Outcome**: 
    - On cashout, the player's balance is updated with the winnings, and a notification (e.g., "Cashed out at 2.50x! You won $15.00") appears.
    - The cashout is recorded in the game history, and if the profit exceeds $100, it's added to the leaderboard.
    - The "Cashout" button is disabled after cashing out (`hasCashedOut = true`).
- **Game Progression**: The multiplier continues to rise until it reaches the hidden crash point, at which point the game transitions to the crashed phase.

#### **4. Crashed Phase (Game State: `crashed`)**
- **Description**: The game ends when the multiplier reaches the crash point. Players who haven't cashed out lose their bets.
- **Mechanics**:
  - The plane's SVG changes to a red "crash" icon, and a crash effect (red radial gradient) appears at the plane's position.
  - Multiple explosion particles (red, orange, yellow) scatter for visual impact.
  - The game status updates to "CRASHED," and the final multiplier is displayed.
- **Player Outcomes**:
  - **Cashed Out**: Players who cashed out keep their winnings, and no further action is needed.
  - **Did Not Cash Out**: Players who placed a bet but didn't cash out lose their bet. A notification (e.g., "Crashed at 3.45x! You lost $10.00") appears, and the loss is recorded in the history.
- **Stats Update**:
  - The total bets counter increments for each bet placed.
  - If the crash point is higher than the player's highest multiplier, it updates the stats.
  - The win rate is recalculated based on wins vs. total bets.
- **Backend Sync**: The player's updated balance is sent to the backend 
- **Transition**: After a 3-second delay, the game resets to the waiting phase, and a new round begins with a fresh countdown.

#### **5. Additional Features**
- **Game History**: Each bet is logged with the time, bet amount, multiplier, and win/loss status. The history panel displays the last 10 bets, with a "Clear" button to reset it.
- **Leaderboard**: Shows top players by winnings, including username, amount won, multiplier, and time. New high-value cashouts (>$100 profit) are added, sorted by amount, and limited to 10 entries.
- **Deposit System**: Players can navigate to `task.html` to deposit funds, which updates their balance.
- **Notifications**: Success (green) or error (red) notifications appear for events like bet placement, cashout, or invalid actions.
- **Visuals and Animations**:
  - Stars twinkle in the background, with some animated for a dynamic effect.
  - The plane rotates based on its trajectory, enhancing immersion.
  - The multiplier display pulses and changes color for emphasis.

---

### **How to Play: Step-by-Step**
1. **Login**: Ensure you're logged in
2. **Check Balance**: Verify your balance in the header. If low, deposit funds via the "Deposit" button.
3. **Place a Bet**:
   - During the waiting phase (5-second countdown), enter a bet amount or use quick buttons.
   - Optionally enable auto-cashout and set a target multiplier.
   - Click "Place Bet" to commit. Your balance decreases by the bet amount.
4. **Monitor the Game**:
   - Watch the multiplier rise and the plane ascend during the in-progress phase.
   - Decide whether to cash out manually by clicking "Cashout" or rely on auto-cashout.
5. **Cashout or Crash**:
   - **Cashout**: If you cash out before the crash, you win your bet times the current multiplier.
   - **Crash**: If you don't cash out in time, you lose your bet.
6. **Review Results**:
   - Check the history panel for your bet outcome.
   - If you won significantly, you may appear on the leaderboard.
7. **Repeat**: Wait for the next round to place another bet.

---

### **Key Player Decisions**
- **When to Cash Out**: The core challenge is deciding whether to cash out early for a smaller, safer win or risk waiting for a higher multiplier, knowing the crash is unpredictable.
- **Bet Amount**: Players must balance risk vs. reward, betting more for higher potential payouts but risking larger losses.
- **Auto-Cashout**: Using auto-cashout reduces stress but may limit profits if set too low.

---

### **Example Scenario**
- **Balance**: $100
- **Bet**: $10 with auto-cashout at 2.0x
- **Round**:
  - Countdown finishes, game starts.
  - Multiplier rises: 1.00x → 1.50x → 2.00x.
  - Auto-cashout triggers at 2.00x, winning $10 × 2.0 = $20.
  - Balance updates to $110 ($100 - $10 + $20).
  - History shows: "12:45, $10.00, 2.00x ✓".
  - If the crash point was 3.45x, players who didn't cash out lose their bets.
- **Next Round**: Player can bet again after the 3-second crash delay.

---

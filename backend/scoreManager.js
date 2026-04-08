class ScoreManager {
  // Reset 'guessed' status for everyone in the room
  resetGuesses(players) {
    players.forEach(p => p.guessed = false);
  }

  // Calculate points for the guesser
  // faster guess = more points
  calculateGuessScore(timeRemaining, maxTime) {
    // Basic formula: Base points (100) + Speed bonus
    // Max points ≈ 500, Min points ≈ 100
    const ratio = timeRemaining / maxTime;
    return Math.floor(100 + (ratio * 400));
  }

  // Calculate points for drawer
  // Based on number of people who guessed correctly
  calculateDrawerScore(totalGuessedCount, totalPlayersToGuess) {
    if (totalPlayersToGuess === 0) return 0;
    const fraction = totalGuessedCount / totalPlayersToGuess;
    return Math.floor(fraction * 250); // Up to 250 points for drawer
  }

  getTopThree(players) {
    return [...players].sort((a, b) => b.score - a.score).slice(0, 3);
  }
}

export default new ScoreManager();

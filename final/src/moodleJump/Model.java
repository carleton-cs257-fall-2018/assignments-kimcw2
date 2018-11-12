/**
* @author Dawson d'Almeida
* @author Chae Kim
* @author Justin Washington
 */

package moodleJump;

import java.util.Random;

public class Model {

    private boolean gameOver;
    private int score;
    private int highScore;

    public Model() {
        this.score = 0;
    }

    /**
     * Checks if the game is over
     * @return True if over, false if not
     */
    public boolean isGameOver() {
        return this.gameOver;
    }

    /**
     * Returns current score
     * @return current score
     */
    public int getScore() {
        return this.score;
    }

    /**
     * Changes the current score
     * @param score score to change current score to
     */
    public void changeScore(int score) {

    }

    /**
     * Returns the current high score
     * @return Current high score
     */
    public int getHighScore() {
        return 1;
    }

    /**
     * Changes the current high score to the new score if score is greater than current high score
     * @param score Score to replace current high score if larger than current high score
     */
    public void changeHighScore(int score) {

    }

}

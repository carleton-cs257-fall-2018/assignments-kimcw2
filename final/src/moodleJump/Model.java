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
    }


    /**
     * Starts the game
     */
    public void startNewGame() {
        this.gameOver = false;
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
     * Moves object to right by 1 unit
     */
    public void moveRight() {

    }

    /**
     * Moves object to left by 1 unit
     */
    public void moveLeft() {

    }

    /**
     * Moves object up by 1 unit
     */
    public void moveUp() {

    }


    /**
     * Moves object down by 1 unit
     */
    public void moveDown() {

    }

    /**
     * Check if Monster is dead
     * @return True if Monster is dead, false otherwise
     */
    public boolean isMonsterDead() {
        return true;
    }

    /**
     * Check if Moodler is dead
     * @return True if Moodler is dead, false otherwise
     */
    public boolean isMoodlerDead() {
        return true;
    }

    /**
     * Check if in contact with a power up
     */
    public void powerUp() {

    }

    public boolean contactWithMonster() {
        return true;
    }

    /**
     * Checks if Moodler is in contact with platform
     * @return True if Moodler is in contact with the top of a platform while moving downward, false otherwise
     * @param velocity current velocity of Moodler
     */
    public boolean contactWithPlatform(int velocity) {
        return true;
    }

    /**
     * Initializes new bullet
     * @param x x coordinate
     * @param y y coordinate
     */
    public void shootBullet(int x, int y) {

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

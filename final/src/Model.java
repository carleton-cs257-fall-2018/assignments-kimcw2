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

    public void startNewGame() {
        this.gameOver = false;
        this.score = 0;
    }

    public boolean isGameOver() {
        return this.gameOver;
    }

    private void initializeGame() {
    }


    public int getScore() {
        return this.score;
    }

    public void moveRight() {

    }

    public void moveLeft() {

    }

    public void moveUp() {

    }


    public void moveDown() {

    }

    /**
    * Check if Monster is dead
     */
    public boolean isMonsterDead() {
        return true;
    }

    /**
    * Check if Moodler is dead
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
     */
    public boolean contactWithPlatform(int velocity) {
        return true;
    }

    /**
    * Initializes new bullet
     */
    public void shootBullet(int x, int y) {

    }

    public void changeScore(int score) {

    }

    public int getHighScore() {
        return 1;
    }

    public void changeHighScore(int highScore) {

    }

}

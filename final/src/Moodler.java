/**
* @author Dawson d'Almeida
* @author Chae Kim
* @author Justin Washington
* Consists of static objects:
* -Moodler
* -Monster
* -Platform
* -Powerups
* -Bullets
 */

package moodleJump;

import java.util.Random;

public class Moodler {
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
     * Check if Moodler is dead
     * @return True if Moodler is dead, false otherwise
     */
    public boolean isDead() {
        return true;
    }


    /**
     * Checks if Moodler is in contact with monster
     * Check if either killed by monster or killing monster
     */
    public boolean contactWithMonster() {
        return true;
    }

    /**
     * Get killed by monster or kill monster
     */
    public void applyMonster(){

    }

    /**
     * Checks if Moodler is in contact with platform
     * @return True if Moodler is in contact with the top of a platform while moving downward, false otherwise
     */
    public boolean contactWithPlatform(int velocity) {
        return true;
    }

    /**
     * jump up from platform/ react to touching platform
     */
    public boolean applyPlatform(int velocity) {
        return true;
    }

    /**
     * Initialize bullets
     * Shoot out to atmosphere
     */
    public void applyBullet(int x, int y) {

    }

    /**
     * Check if in contact with a power up
     * Apply powerup to itself
     */
    public void applyPowerUp() {
        PowerUp example = new PowerUp(currentHeight);
    }

    /**
     * Get Moodler position(height)
     */
    public void getHeight(){
        result = 0;
        currentHeight = result;
    }

    /**
     * Get Moodler position (width)
     */
    public void getLatitude(){
        result = 0;
        currentLatitude = result;
    }
}
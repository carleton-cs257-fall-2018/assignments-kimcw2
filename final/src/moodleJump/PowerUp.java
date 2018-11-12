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

public class PowerUp {

    /**
     * Generate itself
     */
    PowerUp(){}

    /**
     * Check if in contact with a power up
     */

    private int targetHeight;
    private String powerUpType;
    private int currentHeight;
    private int currentLatitude;

    /**
     * Get platform position(height)
     */
    public void getHeight(){
        result = 0;
        currentHeight = result;
    }

    /**
     * Get platform position (width)
     */
    public void getLatitude(){
        result = 0;
        currentLatitude = result;
    }

    /**
     * Calculate a target height to transport to
     */
    public int getTargetHeight(){return targetHeight;}

    /**
     * Update the target height
     */
    public int updateTargetHeight(int currentHeight) {
        return targetHeight;
    }
}
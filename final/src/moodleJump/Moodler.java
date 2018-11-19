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

import java.util.ArrayList;
import java.util.Random;

public class Moodler {

    private int row;
    private int column;

    ArrayList<int[]> tailList;

    public boolean side = true;
    public int terminal_velocity = 5;
    private int x_velocity = 1;
    private int y_velocity = 0;
    private int width;
    private int height;
    private boolean isDead;
    private int initialLength;

    public Moodler(int numRows, int numColumns) {
        isDead = false;
        tailList = new ArrayList<int[]>(5);
        width = numRows;
        height = numColumns;
        initialLength = 10;
        createList();
    }

    public void createList() {
        Random random = new Random();
        this.row = random.nextInt(height);
        this.column = random.nextInt(width);
        for (int i = 0; i < initialLength; i++) {
            int[] rowColumnArray = new int[]{this.row,this.column+i};
            tailList.add(rowColumnArray);
        }
    }

    public void changeList() {

    }

    public int getRow() {
        return this.row;
    }

    public int getColumn() {
        return this.column;
    }


    public int getX() {
        return this.column;
    }

    public int getY() {
        return this.row;
    }


    public int getXvelocity() {
        return x_velocity;
    }

    public void changeXVelocity(int velocity) {
        this.x_velocity = velocity;
        this.y_velocity = 0;
    }

    public int getYvelocity() {
        return y_velocity;
    }

    public void changeYVelocity(int velocity) {
        this.y_velocity = velocity;
        this.x_velocity = 0;
    }

    public void changeX(int velocity) {
        if (velocity > 0) {
            if (this.column == this.width) {
                isDead = true;
            } else {
                this.column = this.column + 1;
                changeList();
            }
        }
        else if (velocity < 0) {
            if (this.column == 0) {
                isDead = true;
            } else {
                this.column = this.column - 1;
                changeList();
            }
        }
    }

    public void changeY(int velocity) {
        if (velocity > 0) {
            if (this.row == this.height) {
                isDead = true;
            } else {
                this.row = this.row + 1;
                changeList();
            }
        }
        else if (velocity < 0) {
            if (this.row == 0) {
                isDead = true;
            } else {
                this.row = this.row - 1;
                changeList();
            }
        }

    }

    /**
     * Moves object
     */
    public void move(String direction) {
        System.out.print(direction + "\n");
        if (direction.equals("right")) {
            if (this.x_velocity != 1) {
                this.x_velocity = 1;
                this.y_velocity = 0;
            }
        }

        else if (direction.equals("left")) {
            if (this.x_velocity != -1) {
                this.x_velocity = -1;
                this.y_velocity = 0;
            }
        }


        else if (direction.equals("up")) {
            if (this.y_velocity != -1) {
                this.y_velocity = -1;
                this.x_velocity = 0;
            }
        }

        else if (direction.equals("down")) {
            if (this.y_velocity != 1) {
                this.y_velocity = 1;
                this.x_velocity = 0;
            }
        }

        changeY(this.y_velocity);
        changeX(this.x_velocity);
    }
    /*public boolean contact_platform(Platform obj) {
        Platform other = obj;

        if (getX() + getWidth() >= other.getX() &&
                getX() <= other.getX() + other.getWidth() &&
                getY() + getHeight() >= other.getY() &&
                getY() + getHeight() <= other.getY() + other.getHeight()) {
            return true;
        }
        return false;
    }*/

    /*public void jump() {
        if (y_velocity > 0) {
            y_velocity = -5;
        } else if (y_velocity < 0) {
            y_velocity = y_velocity + 1;
        }
        changeY(y_velocity);
    }*/


    //Extra stuff might not use
    /**
     * Check if Moodler is dead
     * @return True if Moodler is dead, false otherwise
     */
    public boolean isDead() {

        System.out.println("IS DEAD: " + isDead);
        return this.isDead;

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
        PowerUp example = new PowerUp(0);
    }
}
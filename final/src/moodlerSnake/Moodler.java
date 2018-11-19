package moodlerSnake;

import java.util.ArrayList;

/**
 * @author Dawson d'Almeida
 * @author Chae Kim
 * @author Justin Washington
 */
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
    private int curLength;
    private boolean addToLength;

    /**
     * Creates a new instance of the moodler class
     * @param numRows passed in for edge detection
     * @param numColumns passed in for edge detection
     */
    public Moodler(int numRows, int numColumns) {
        isDead = false;
        tailList = new ArrayList<int[]>(5);
        width = numColumns - 1;
        height = numRows - 1;
        initialLength = 10;
        curLength = initialLength;
        createTailList();
        addToLength = false;
    }

    /**
     * creates the list of cells behind the head node
     */
    public void createTailList() {
        this.row = height/2;
        this.column = width/2;
        for (int i = 0; i < initialLength; i++) {
            int[] rowColumnArray = new int[]{this.row,this.column-i};
            tailList.add(rowColumnArray);
        }
    }
    /**
     * updates the list of cells behind the head node
     */
    public void changeList(String dir) {
        boolean collision =  false;
        int[] rowColumnArray;
        int[] pastColumnArray = new int[]{tailList.get(0)[0], tailList.get(0)[1]};
        if (dir.equals("right")) {
            rowColumnArray = new int[]{this.row,this.column+1};
            this.column += 1;
            tailList.set(0, rowColumnArray);
        } else if (dir.equals("left")) {
            rowColumnArray = new int[]{this.row,this.column-1};
            this.column -= 1;
            tailList.set(0, rowColumnArray);
        } else if (dir.equals("down")) {
            rowColumnArray = new int[]{this.row+1,this.column};
            this.row += 1;
            tailList.set(0, rowColumnArray);
        } else {
            rowColumnArray = new int[]{this.row-1,this.column};
            this.row -= 1;
            tailList.set(0, rowColumnArray);
        }
        for (int i = 1; i < curLength; i++) {
            if (tailList.get(0)[0] == tailList.get(i)[0] && tailList.get(0)[1] == tailList.get(i)[1]) {
                this.isDead = true;
            }
        }
        for (int i = 1; i < curLength; i++) {
            rowColumnArray = new int[]{tailList.get(i)[0], tailList.get(i)[1]};
            tailList.set(i, pastColumnArray);
            pastColumnArray = rowColumnArray;
        }
        if (addToLength) {
            tailList.add(pastColumnArray);
            this.curLength ++;
            addToLength = false;
        }
    }

    /**
     * gets the current length of the moodler
     * @return length of the moodler
     */
    public int getCurLength() {
        return curLength;
    }

    /**
     * boolean to determine whether moodler length should increase
     */
    public void addLength() {
        this.addToLength = true;
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
                changeList("right");
            }
        }
        else if (velocity < 0) {
            if (this.column == 0) {
                isDead = true;
            } else {
                changeList("left");
            }
        }
    }

    public void changeY(int velocity) {
        if (velocity > 0) {
            if (this.row == this.height) {
                isDead = true;
            } else {
                changeList("down");
            }
        }
        else if (velocity < 0) {
            if (this.row == 0) {
                isDead = true;
            } else {
                changeList("up");
            }
        }

    }

    /**
     * Moves the moodler
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

    /**
     * Check if Moodler is dead
     * @return True if Moodler is dead, false otherwise
     */
    public boolean isDead() {
        //System.out.println("column = " + this.column + " and row = " + this.row + "with width, height == " + height + ", " + width);
        if (this.isDead) {System.out.println("GAME OVER");}
        return this.isDead;
    }
}
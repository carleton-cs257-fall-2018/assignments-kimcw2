package moodlerSnake;

import java.util.Random;

/**
 * @author Dawson d'Almeida
 * @author Chae Kim
 * @author Justin Washington
 */
public class Model {
    /**
     * The potential values of the cells for visual purposes:
     * Empty - white
     * Moodler - beige
     * Apple - red
     */
    public enum CellValue {
        EMPTY, MOODLER, APPLE,  TEXT
    };
    private CellValue[][] cells;

    private boolean gameOver;
    private double score;
    private int highScore;
    private Moodler moodler;
    private String direction =  "start";
    public int rows;
    public int cols;

    /**
     * Constructor for the Model to be used in the game
     * Takes in the desired dimensions and then starts the game
     * @param rowCount
     * @param columnCount
     */
    public Model(int rowCount, int columnCount) {
        assert rowCount > 0 && columnCount > 0;
        this.cells = new CellValue[rowCount][columnCount];
        this.rows = rowCount;
        this.cols = columnCount;
        this.startGame();
    }

    /**
     * Generates the moodler and apple in the game
     */
    public void startGame() {
        this.gameOver = false;
        this.score = 0;
        generateMoodler();
        generateApple();
    }

    /**
     * generates a new instance of the moodler class
     * passes in row and columns of the view for edge detection
     */
    public void generateMoodler() {
        this.moodler = new Moodler(rows,cols);
    }

    /**
     * generates an apple at a random place in the view
     */
    public void generateApple() {
        Random random = new Random();
        int randrow = random.nextInt(this.cells.length);
        int randcolumn = random.nextInt(this.cells[0].length);
        this.cells[randrow][randcolumn] = CellValue.APPLE;
    }

    /**
     * draws the moodler on the view by changing the enum value of the
     * cells the moodler will occupy to MOODLER
     */
    public void drawMoodler() {
        for (int i =  0; i < moodler.tailList.size(); i ++) {
            if (this.cells[moodler.tailList.get(i)[0]][moodler.tailList.get(i)[1]] == CellValue.APPLE) {
                generateApple();
                changeScore();
                this.moodler.addLength();
            }
            this.cells[moodler.tailList.get(i)[0]][moodler.tailList.get(i)[1]] = CellValue.MOODLER;
        }
    }

    /**
     * undraws the moodler on the view by changing the enum value of the
     * cells the moodler will occupy to EMPTY
     */
    public void undrawMoodler() {
        int size = moodler.getCurLength();
        this.cells[moodler.tailList.get(size - 1)[0]][moodler.tailList.get(size - 1)[1]] = CellValue.EMPTY;

    }

    /**
     * Undraws current moodler
     * Shifts moodler's position in the direction specified
     * redwards moodler at new position
     * @param direction the direction to draw the new moodler in
     */
    public void moveMoodler(String direction) {
        undrawMoodler();
        this.moodler.move(direction);
        drawMoodler();
    }

    /**
     * keeps the moodler moving in the same direction it is going
     */
    public void move(){
        undrawMoodler();
        int x_vel = this.moodler.getXvelocity();
        int y_vel = this.moodler.getYvelocity();
        this.moodler.changeX(x_vel);
        this.moodler.changeY(y_vel);
        drawMoodler();
    }

    /**
     * Used in the View to determine the cells to change for visual
     * representation of the snake, apple, etc.
     * @param row The row of the cell in question
     * @param column the column of the cell in question
     * @return the enum value of the cell (so we know what to change its color to)
     */
    public CellValue getCellValue(int row, int column) {
        assert row >= 0 && row < this.cells.length && column >= 0 && column < this.cells[0].length;
        return this.cells[row][column];
    }

    /**
     * True if moodler has colided with wall or self,
     * False otherwise
     * @return whether or not the moodler is dead
     */
    public boolean isMoodlerDead() {
        return moodler.isDead();
    }

    /**
     * sets the direction the moodler is going based on input from controller
     * @param velocity
     * @param dir
     */
    public void changeMoodlerVelocity(int velocity, String dir) {
        if (dir.equals("x")) {
            moodler.changeXVelocity(velocity);
        }
        else {
            moodler.changeYVelocity(velocity);
        }
    }

    public void setDirection(String direct){
        direction = direct;
    }

    public String getDirection(){
        return direction;
    }

    public void drawEnd() {
        this.cells[20][8] = CellValue.TEXT;
        this.cells[19][8] = CellValue.TEXT;
        this.cells[18][8] = CellValue.TEXT;
        this.cells[17][8] = CellValue.TEXT;
        this.cells[16][8] = CellValue.TEXT;
        this.cells[15][8] = CellValue.TEXT;
        this.cells[14][8] = CellValue.TEXT;
        this.cells[13][8] = CellValue.TEXT;
        this.cells[12][8] = CellValue.TEXT;
        this.cells[11][8] = CellValue.TEXT;
        this.cells[10][8] = CellValue.TEXT;

        this.cells[10][9] = CellValue.TEXT;
        this.cells[10][10] = CellValue.TEXT;
        this.cells[10][11] = CellValue.TEXT;
        this.cells[14][9] = CellValue.TEXT;
        this.cells[14][10] = CellValue.TEXT;

        this.cells[20][13] = CellValue.TEXT;
        this.cells[19][13] = CellValue.TEXT;
        this.cells[18][13] = CellValue.TEXT;
        this.cells[17][13] = CellValue.TEXT;
        this.cells[16][13] = CellValue.TEXT;
        this.cells[15][13] = CellValue.TEXT;
        this.cells[14][13] = CellValue.TEXT;
        this.cells[13][13] = CellValue.TEXT;
        this.cells[12][13] = CellValue.TEXT;
        this.cells[11][13] = CellValue.TEXT;
        this.cells[10][13] = CellValue.TEXT;

        this.cells[20][15] = CellValue.TEXT;
        this.cells[19][15] = CellValue.TEXT;
        this.cells[18][15] = CellValue.TEXT;
        this.cells[17][15] = CellValue.TEXT;
        this.cells[16][15] = CellValue.TEXT;
        this.cells[15][15] = CellValue.TEXT;
        this.cells[14][15] = CellValue.TEXT;
        this.cells[13][15] = CellValue.TEXT;
        this.cells[12][15] = CellValue.TEXT;
        this.cells[11][15] = CellValue.TEXT;
        this.cells[10][15] = CellValue.TEXT;

        this.cells[10][16] = CellValue.TEXT;
        this.cells[11][16] = CellValue.TEXT;
        this.cells[12][17] = CellValue.TEXT;
        this.cells[13][17] = CellValue.TEXT;
        this.cells[14][18] = CellValue.TEXT;
        this.cells[15][18] = CellValue.TEXT;
        this.cells[16][19] = CellValue.TEXT;
        this.cells[17][19] = CellValue.TEXT;
        this.cells[18][20] = CellValue.TEXT;
        this.cells[19][20] = CellValue.TEXT;
        this.cells[20][20] = CellValue.TEXT;

        this.cells[20][21] = CellValue.TEXT;
        this.cells[19][21] = CellValue.TEXT;
        this.cells[18][21] = CellValue.TEXT;
        this.cells[17][21] = CellValue.TEXT;
        this.cells[16][21] = CellValue.TEXT;
        this.cells[15][21] = CellValue.TEXT;
        this.cells[14][21] = CellValue.TEXT;
        this.cells[13][21] = CellValue.TEXT;
        this.cells[12][21] = CellValue.TEXT;
        this.cells[11][21] = CellValue.TEXT;
        this.cells[10][21] = CellValue.TEXT;
    }

    /**
     * Returns current score
     * @return current score
     */
    public double getScore() {
        return this.score;
    }

    /**
     * Changes the current score, increments 100 (for every apple eaten)
     */
    public void changeScore() {
        this.score += 100;
    }
}

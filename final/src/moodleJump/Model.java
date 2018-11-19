/**
* @author Dawson d'Almeida
* @author Chae Kim
* @author Justin Washington
 */

package moodleJump;

import java.awt.image.BufferedImage;
import java.util.Random;

import com.sun.jdi.Value;
import javafx.scene.image.Image;

public class Model {

    public enum CellValue {
        EMPTY, MOODLER, APPLE
    };
    private CellValue[][] cells;

    private boolean gameOver;
    private int score;
    private int highScore;
    private Moodler moodler;
    private String direction =  "start";
    public int rows;
    public int cols;

    public Model(int rowCount, int columnCount) {
        assert rowCount > 0 && columnCount > 0;
        this.cells = new CellValue[rowCount][columnCount];
        this.rows = rowCount;
        this.cols = columnCount;
        this.startGame();
    }

    public void startGame() {
        this.gameOver = false;
        this.score = 0;
        generateMoodler();
        generateApple();
        drawMoodler();
    }

    public CellValue getCellValue(int row, int column) {
        assert row >= 0 && row < this.cells.length && column >= 0 && column < this.cells[0].length;
        return this.cells[row][column];
    }

    public void generateMoodler() {
        this.moodler = new Moodler(rows,cols);
    }
    public void generateApple() {
        Random random = new Random();
        int randrow = random.nextInt(this.cells.length);
        int randcolumn = random.nextInt(this.cells[0].length);
        this.cells[randrow][randcolumn] = CellValue.APPLE;
    }

    public void drawMoodler() {
        for (int i =  0; i < moodler.tailList.size(); i ++) {
            if (this.cells[moodler.tailList.get(i)[0]][moodler.tailList.get(i)[1]] == CellValue.APPLE) {
                generateApple();
                this.moodler.addLength();
            }
            this.cells[moodler.tailList.get(i)[0]][moodler.tailList.get(i)[1]] = CellValue.MOODLER;
        }
    }

    public void undrawMoodler() {
        int size = moodler.getCurLength();
        this.cells[moodler.tailList.get(size-1)[0]][moodler.tailList.get(size-1)[1]] = CellValue.EMPTY;

    }

    public void moveMoodler(String direction) {
        undrawMoodler();
        this.moodler.move(direction);
        drawMoodler();
    }

    public boolean isMoodlerDead() {
        return moodler.isDead();
    }

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

    public void move(){
        undrawMoodler();
        int x_vel = this.moodler.getXvelocity();
        int y_vel = this.moodler.getYvelocity();
        this.moodler.changeX(x_vel);
        this.moodler.changeY(y_vel);
        drawMoodler();
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

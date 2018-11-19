/**
* @author Dawson d'Almeida
* @author Chae Kim
* @author Justin Washington
 */

package moodleJump;

import java.awt.image.BufferedImage;
import java.util.Random;
import javafx.scene.image.Image;

public class Model {

    public enum CellValue {
        EMPTY, MOODLER, MOODLERHAT, PLATFORM
    };
    private CellValue[][] cells;

    private boolean gameOver;
    private int score;
    private int highScore;
    private Moodler moodler;

    public Model(int rowCount, int columnCount) {
        assert rowCount > 0 && columnCount > 0;
        this.cells = new CellValue[rowCount][columnCount];
        this.startGame();
    }

    public void startGame() {
        this.gameOver = false;
        this.score = 0;
        this.initializeLevel();
    }

    private void initializeLevel() {
        int rowCount = this.cells.length;
        int columnCount = this.cells[0].length;
        generateMoodler();
        drawMoodler();
    }

    public CellValue getCellValue(int row, int column) {
        assert row >= 0 && row < this.cells.length && column >= 0 && column < this.cells[0].length;
        return this.cells[row][column];
    }

    public int getRowCount() {
        return this.cells.length;
    }

    public int getColumnCount() {
        assert this.cells.length > 0;
        return this.cells[0].length;
    }

    public void generateMoodler() {
        //BufferedImageLoader loader =  new BufferedImageLoader();
        //BufferedImage sprite = loader.loadImage("/sprites/test_character.jpg");

        //Image test_image = new Image("/sprites/test_character.jpg", true);
        int rowCount = this.cells.length;
        int columnCount = this.cells[0].length;
        this.moodler = new Moodler(rowCount, columnCount);
    }

    public void drawMoodler() {
        int row = this.moodler.getRow();
        int column = this.moodler.getColumn();
        this.cells[row-1][column] = CellValue.MOODLER;
        this.cells[row-2][column] = CellValue.MOODLER;
        this.cells[row-3][column+1] = CellValue.MOODLER;
        this.cells[row-1][column+2] = CellValue.MOODLER;
        this.cells[row-2][column+2] = CellValue.MOODLER;
        this.cells[row-3][column+3] = CellValue.MOODLER;
        this.cells[row-1][column+4] = CellValue.MOODLER;
        this.cells[row-2][column+4] = CellValue.MOODLER;
        this.cells[row-3][column] = CellValue.MOODLERHAT;

    }

    public void undrawMoodler() {
        int row = this.moodler.getRow();
        int column = this.moodler.getColumn();
        this.cells[row-1][column] = CellValue.EMPTY;
        this.cells[row-2][column] = CellValue.EMPTY;
        this.cells[row-3][column+1] = CellValue.EMPTY;
        this.cells[row-1][column+2] = CellValue.EMPTY;
        this.cells[row-2][column+2] = CellValue.EMPTY;
        this.cells[row-3][column+3] = CellValue.EMPTY;
        this.cells[row-1][column+4] = CellValue.EMPTY;
        this.cells[row-2][column+4] = CellValue.EMPTY;
        this.cells[row-3][column] = CellValue.EMPTY;
    }

    public void moveMoodler(String direction) {
        undrawMoodler();
        this.moodler.move(direction);
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

package moodlerSnake;

import javafx.fxml.FXML;
import javafx.scene.Group;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;

public class GameView extends Group {

    public final static double CELL_WIDTH = 10.0;
    //instance variables of the View that are set through the fxml file
    @FXML private int rowCount;
    @FXML private int columnCount;
    private Rectangle[][] cellViews;

    /**
     * Displays the page for playing game
     */
    public GameView(){

    }

    /**
     * Updates the page that the game is being played on
     * @param model The model being used for updating the view
     */
    public void update(Model model) {
        assert model.rows == this.rowCount && model.cols == this.columnCount;
        for (int row = 0; row < this.rowCount; row++) {
            for (int column = 0; column < this.columnCount; column++) {
                Model.CellValue cellValue = model.getCellValue(row, column);
                if (cellValue == Model.CellValue.MOODLER) {
                    this.cellViews[row][column].setFill(Color.web("#FBDE21"));
                }
                else if (cellValue == Model.CellValue.APPLE) {
                    this.cellViews[row][column].setFill(Color.RED);
                }
                else {
                    this.cellViews[row][column].setFill(Color.WHITE);
                }
            }
        }
    }

    public int getRowCount() {
        return this.rowCount;
    }

    public void setRowCount(int rowCount) {
        this.rowCount = rowCount;
        this.initializeGrid();
    }

    public int getColumnCount() {
        return this.columnCount;
    }

    public void setColumnCount(int columnCount) {
        this.columnCount = columnCount;
        this.initializeGrid();
    }

    private void initializeGrid() {
        if (this.rowCount > 0 && this.columnCount > 0) {
            this.cellViews = new Rectangle[this.rowCount][this.columnCount];
            for (int row = 0; row < this.rowCount; row++) {
                for (int column = 0; column < this.columnCount; column++) {
                    Rectangle rectangle = new Rectangle();
                    rectangle.setX((double)column * CELL_WIDTH);
                    rectangle.setY((double)row * CELL_WIDTH);
                    rectangle.setWidth(CELL_WIDTH);
                    rectangle.setHeight(CELL_WIDTH);
                    this.cellViews[row][column] = rectangle;
                    this.getChildren().add(rectangle);
                }
            }
        }
    }

}

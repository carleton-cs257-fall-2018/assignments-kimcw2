package moodlerSnake;

import javafx.scene.Scene;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import java.awt.event.KeyAdapter;
import java.util.Timer;
import java.util.TimerTask;

public class Controller extends KeyAdapter implements Runnable {
    //EventHandler<KeyEvent>{

    @FXML
    private Label scoreLabel;
    @FXML
    private Label messageLabel;
    @FXML
    private GameView gameView;

    private Thread thread;
    private boolean running = false;
    private Scene scene;
    Timer timer;

    private Model model;

    public Controller() {

    }

    public void keyPressed(KeyEvent e) {
        KeyCode code = e.getCode();
        if (code == KeyCode.LEFT || code == KeyCode.A) {
            this.model.setDirection("left");
        } else if (code == KeyCode.RIGHT || code == KeyCode.D) {
            this.model.setDirection("right");
        }
    }

    public void keyTyped(KeyEvent e) {
    }

    public void keyReleased(KeyEvent e) {
    }

    public void initialize() {
        this.model = new Model(this.gameView.getRowCount(), this.gameView.getColumnCount());
        this.update();
    }


    private void update() {
        if (this.model.getDirection().equals("right")) {
            this.model.moveMoodler("right");
        } else if (this.model.getDirection().equals("left")) {
            this.model.moveMoodler("left");
        } else if (this.model.getDirection().equals("up")) {
            this.model.moveMoodler("up");
        } else if (this.model.getDirection().equals("down")) {
            this.model.moveMoodler("down");
        }
        this.gameView.update(this.model);
        if (model.isMoodlerDead()) {
            this.timer.cancel();
            this.model.drawEnd();
            this.gameView.update(this.model);

        }
    }

    public void gameOver() {
        this.scoreLabel.setText(String.format("Score: %d", this.model.getScore()));
    }

    public double getBoardWidth() {
        return GameView.CELL_WIDTH * this.gameView.getColumnCount();
    }

    public double getBoardHeight() {
        return GameView.CELL_WIDTH * this.gameView.getRowCount();
    }


    public void start(Scene scene) {
        this.scene = scene;
        run();
    }

    public void stop() {
        try {
            thread.join();
            running = false;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void run() {
        timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                //System.out.println("In timer task");
                model.move();
                if (model.isMoodlerDead()) {
                    timer.cancel();
                    //gameOver();
                }
                update();
            }
        }, 100, 100);

        this.scene.addEventHandler(KeyEvent.KEY_PRESSED, (key) -> {
            boolean keyRecognized = true;
            KeyCode code = key.getCode();

            if (code == KeyCode.LEFT || code == KeyCode.A) {
                this.model.changeMoodlerVelocity(-1, "x");
            } else if (code == KeyCode.RIGHT || code == KeyCode.D) {
                this.model.changeMoodlerVelocity(1, "x");
            } else if (code == KeyCode.UP || code == KeyCode.W) {
                this.model.changeMoodlerVelocity(-1, "y");
            } else if (code == KeyCode.DOWN || code == KeyCode.S) {
                this.model.changeMoodlerVelocity(1, "y");
            } else {
                keyRecognized = false;
            }

            if (keyRecognized) {
                System.out.print("key recognized\n");
                this.update();
            }
        });


    }
}
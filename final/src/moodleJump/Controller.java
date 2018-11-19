package moodleJump;

import javafx.fxml.FXML;
import javafx.event.EventHandler;
import javafx.scene.control.Label;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;

public class Controller implements EventHandler<KeyEvent>{
    @FXML private Label scoreLabel;
    @FXML private Label messageLabel;
    @FXML private GameView gameView;

    private Thread thread;
    private boolean running = false;

    private Model model;

    public Controller() {
    }

    public void initialize() {
        this.model = new Model(this.gameView.getRowCount(), this.gameView.getColumnCount());
        this.update();
    }

    private void update() {
        this.gameView.update(this.model);
    }

    public double getBoardWidth() {
        return GameView.CELL_WIDTH * this.gameView.getColumnCount();
    }

    public double getBoardHeight() {
        return GameView.CELL_WIDTH * this.gameView.getRowCount();
    }

    @Override
    public void handle(KeyEvent keyEvent) {
        boolean keyRecognized = true;
        KeyCode code = keyEvent.getCode();

        if (code == KeyCode.LEFT || code == KeyCode.A) {
            this.model.moveMoodler("left");
        } else if (code == KeyCode.RIGHT || code == KeyCode.D) {
            this.model.moveMoodler("right");
        } else {
            keyRecognized = false;
        }
        /*else if (code == KeyCode.UP || code == KeyCode.W) {
            this.daleksModel.moveRunnerBy(-1, 0);
        } else if (code == KeyCode.DOWN || code == KeyCode.X) {
        */
        if (keyRecognized) {
            //System.out.print("key recognized\n");
            this.update();
            keyEvent.consume();
        }
    }
    /*
    public void start() {
        thread = new Thread(this);
        thread.start();
        running = true;
    }

    public void stop() {
        try {
            thread.join();
            running = false;
        }catch(exception e) {
            e.printStackTrace();
        }
    }

    public void run() {
        long lastTime = System.nanoTime();
        double ns = 1000000000 / amountOfTicks;
        double delta = 0;
        long timer = System.currentTimeMillis();
        int frames = 0;
        while(running) {
            long now = System.nanoTime();
            delta += (now - lastTime) / ns;
            while (delta >= 1 ) {
                tick();
                delta--;
            }
            if (running) {
                render();
            }
            frames++;

            if (System.currentTimeMillis() - timer > 1000) {
                timer += 1000;
                System.out.println("FPS: " + frames);
                frames = 0;
            }
        }
        stop();
    }*/


    /**
     * Pops up start page
     * Transitions into playGame mode after
     * start button is pressed
     */
    public void startGame(){

    }

    /**
     * Moves from playing game page to end page
     * Updates high score if need be
     * Offers replay button
     */
    public void endGame() {

    }

    /**
     * Takes user input to play the actual game
     */
    public void playGame(){

    }
}

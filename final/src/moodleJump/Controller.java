package moodleJump;

import javafx.fxml.FXML;
import javafx.event.EventHandler;
import javafx.scene.control.Label;
//import javafx.scene.input.KeyCode;
//import javafx.scene.input.KeyEvent;
import java.util.Random;
import java.awt.*;
import java.awt.event.*;
import java.util.*;

public class Controller{ /*implements EventHandler<KeyEvent>{*/

    Moodler moodler = new Moodler();
    private ArrayList<Platform> myPlatforms = new ArrayList<Platform>();
    private Platform lastHitPlatform;
    private int score;
    private boolean samePlatform;
    private boolean gameOn;
    private Graphics offScreenBuffer;
    private boolean shiftDown;

    public KeyEvent checkInput(KeyEvent e){
        //checkPlatformHit(moodler);
        if (e.getID() == KeyEvent.KEY_PRESSED){
            int keyCode = e.getKeyCode();
            switch( keyCode ) {
                case KeyEvent.VK_RIGHT:
                    moodler.side = true;
                    moodler.move("right");
                case KeyEvent.VK_LEFT:
                    moodler.side = false;
                    moodler.move("left");
            }
        }
        if (e.getID() == KeyEvent.KEY_RELEASED){
            moodler.decelerate_x();
        }
        return e;
    }

    public void checkPlatformHit() {
        //Doodle doodle1 = (Doodle) myGuys.get(0);
        for (int i = 0; i < myPlatforms.size(); i++) {
            // only compare if doodle is falling, ignore if bouncing up
            if (moodler.getXvelocity() > 0) {
                // if a doodle hits a platform
                if (moodler.contact_platform(myPlatforms.get(i))) {
                    Platform hitPlat = myPlatforms.get(i);
                    if (hitPlat != lastHitPlatform) {
                        score = score + 100;
                        samePlatform = false;
                    } else {
                        samePlatform = true;
                    }
                    int cur = moodler.getY();
                    while (moodler.getY() < cur + 50){
                        moodler.jump();
                    }
                    moodler.fall();
                    // if doodle stays on same platform, dont move platforms down
                    lastHitPlatform = (Platform) myPlatforms.get(a);
                }
            }
        }
    }

    public void paint(Graphics g){
        update(g);
    }

    public void update(Graphics g) {
        if (gameOn == true) {
            //draw background
            offScreenBuffer.drawImage(gridImg, 0, 0, this);

            Moodler tempDoodle = moodler;

            // if doodle is moving up
            shiftDown = false;

            if (tempDoodle.getYvelocity() < 0) {
                shiftDown = true;
            }

            for (int k = 0; k < myPlatforms.size(); k++) {
                // cycle through platforms and draw
                Platform tempPlatform = myPlatforms.get(k);
                // #############################################################
                // performs action for different platforms
                // light blue - horizontal scroll\
                updatePlat2(k, tempPlatform);
            }
            offScreenBuffer.drawImage(myImages.get(tempPlatform.getId()), tempPlatform.getX(), tempPlatform.getY(), this);

            // move platform down if doodle is moving up
            if ((shiftDown == true) && (samePlatform == false)) {
                tempPlatform.changeY(BSDS);
                score = score + 1;
            }
            // if platform moves off bottom of screen, create new platform
            if (tempPlatform.getY() > 400) {
                //interval for every Y to create new platform
                if (creationCounter > ((int) (Math.random() * 7) + 5)) {
                    generateLiveRandomPlatform();
                    creationCounter = 0;
                }
            }

            if (tempPlatform.getY() > 650) {
                myPlatforms.remove(k);
                //	generateLiveRandomPlatform();
            }
        }

        if (myPlatforms.size() < 13) {
            generateLiveRandomPlatform();
        }

        // draw doodle, last character
        offScreenBuffer.drawImage(myImages.get(tempDoodle.show()), tempDoodle.getX(), tempDoodle.getY(), this);
        tempDoodle.move();
        if ((shiftDown == true) && (samePlatform == false)) {
            tempDoodle.changeY(DSDS + 2);
            creationCounter++;
        }

        checkiInput();
        checkPlatformHit();
        checkDoodleGameOver();
    }
      g.drawImage(offScreenImage, 0, 0, this);
}
  }


public void run() {
        // keep going as long as the thread is alive
        while (!gameOver2) {
        try {
        // speed of game - larger number makes game slower
        Thread.sleep(19);
        } catch (InterruptedException e) {
        e.printStackTrace();
        }
        repaint();
        }
        }
        }
/*    @FXML private Label scoreLabel;
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
        }*/
        /*else if (code == KeyCode.UP || code == KeyCode.W) {
            this.daleksModel.moveRunnerBy(-1, 0);
        } else if (code == KeyCode.DOWN || code == KeyCode.X) {
        *//*
        if (keyRecognized) {
            //System.out.print("key recognized\n");
            this.update();
            keyEvent.consume();
        }
    }*/
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

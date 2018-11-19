package moodleJump;

import java.awt.Dimension;
import java.awt.event.*;

import javax.swing.*;

import javafx.scene.Scene;
import javafx.stage.Stage;
import javafx.fxml.FXML;
import javafx.event.EventHandler;
import javafx.scene.control.Label;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import java.awt.event.KeyAdapter;
import javafx.event.EventHandler;
import java.awt.image.BufferStrategy;
import java.util.Random;
import java.awt.*;
import java.awt.event.*;
import java.util.*;

import java.awt.event.ActionListener;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

public class Controller extends KeyAdapter implements Runnable {
    //EventHandler<KeyEvent>{

    @FXML private Label scoreLabel;
    @FXML private Label messageLabel;
    @FXML private GameView gameView;

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

    public void keyTyped(KeyEvent e){}

    public void keyReleased(KeyEvent e){}

    public void initialize() {
        this.model = new Model(this.gameView.getRowCount(), this.gameView.getColumnCount());
        timer = new Timer();
        this.update();
    }


    private void update() {
        if (this.model.getDirection().equals("right")) {this.model.moveMoodler("right");}
        else if (this.model.getDirection().equals("left")) {this.model.moveMoodler("left");}
        else if (this.model.getDirection().equals("up")) {this.model.moveMoodler("up");}
        else if (this.model.getDirection().equals("down")) {this.model.moveMoodler("down");}
        this.gameView.update(this.model);
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
        }catch(Exception e) {
            e.printStackTrace();
        }
    }

    public void run() {
        TimerTask task = new TimerTask()
        {
            public void run()
            {
                //System.out.println("In timer task");
                model.move();
                if (model.isMoodlerDead()) {
                    timer.cancel();
                }

                update();
            }
        };
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
            }else {
                keyRecognized = false;
            }

            if (keyRecognized) {
                System.out.print("key recognized\n");
                this.update();
            }
        });

        timer.schedule(task, 100, 100);
        /*
        long lastTime = System.nanoTime();
        double ns = 5;
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
                this.model.move();
                update();
            }
            frames++;

            if (System.currentTimeMillis() - timer > 1000) {
                timer += 1000;
                System.out.println("FPS: " + frames);
                frames = 0;
            }
        }
        stop();*/
    }


    public void tick() {

    }

    public void render() {
        /*BufferStrategy bs = scene.getBufferStrategy();
        if(bs == null) {
            this.createBufferStrategy(3);
            return;
        }

        Graphics g = bs.getDrawGraphics();

        g.dispose();
        g.show();*/
    }



    /*
    Moodler moodler;
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
                    //lastHitPlatform = (Platform) myPlatforms.get(a);
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
            //offScreenBuffer.drawImage(gridImg, 0, 0, this);

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
                //updatePlat2(k, tempPlatform);
            }
            //offScreenBuffer.drawImage(myImages.get(tempPlatform.getId()), tempPlatform.getX(), tempPlatform.getY(), this);

            // move platform down if doodle is moving up
            if ((shiftDown == true) && (samePlatform == false)) {
                //tempPlatform.changeY(BSDS);
                score = score + 1;
            }
            // if platform moves off bottom of screen, create new platform
            /*if (tempPlatform.getY() > 400) {
                //interval for every Y to create new platform
                if (creationCounter > ((int) (Math.random() * 7) + 5)) {
                    generateLiveRandomPlatform();
                    creationCounter = 0;
                }
            }*/

            /*if (tempPlatform.getY() > 650) {
                myPlatforms.remove(k);
                //	generateLiveRandomPlatform();
            }
        }*/
        /*
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
      */

    /*public void run() {
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

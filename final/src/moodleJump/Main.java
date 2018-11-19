package moodleJump;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import javafx.scene.canvas.Canvas;
import javafx.scene.Group;

import javafx.application.Application;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;
import javafx.scene.shape.ArcType;
import javafx.stage.Stage;
import javafx.scene.image.ImageView;
import javafx.scene.image.Image;

import javax.swing.*;


public class Main extends Application {
    /**
     * Initiates controller
     */

    @Override
    public void start(Stage primaryStage) throws Exception{



        FXMLLoader loader = new FXMLLoader(getClass().getResource("moodleJump.fxml"));
        Parent root = loader.load();

        primaryStage.setTitle("Moodle Jump");

        Controller controller = loader.getController();
        //root.setOnKeyPressed(controller);
        double sceneWidth = controller.getBoardWidth() + 20.0;
        double sceneHeight = controller.getBoardHeight() + 100.0;


        primaryStage.setScene(new Scene(root, sceneWidth, sceneHeight));


        primaryStage.setOnCloseRequest(e -> System.exit(0));
        primaryStage.show();
        controller.start(primaryStage.getScene());
        root.requestFocus();
    }


    public static void main(String[] args) {
        launch(args);
    }
}

package moodleJump;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;



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
        root.setOnKeyPressed(controller);
        double sceneWidth = controller.getBoardWidth() + 20.0;
        double sceneHeight = controller.getBoardHeight() + 100.0;


        primaryStage.setScene(new Scene(root, sceneWidth, sceneHeight));
        primaryStage.show();
        //controller.start();
        root.requestFocus();
    }


    public static void main(String[] args) {
        launch(args);
    }
}

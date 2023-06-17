package communicationApp.androidClient;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Register extends AppCompatActivity {
    private static final int PICK_IMAGE_REQUEST = 1;
    private EditText editTextUsername, editTextPassword, editTextConfirmPassword, editTextDisplayName;
    private Button buttonChooseImage, buttonSubmit;
    private CardView cardViewImageContainer;
    private ImageView imageViewSelectedImage;
    private Uri selectedImageUri;
    private Bitmap selectedBitmap;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        editTextUsername = findViewById(R.id.username_et_register);
        editTextPassword = findViewById(R.id.password_et_register);
        editTextConfirmPassword = findViewById(R.id.confirm_password_et_register);
        editTextDisplayName = findViewById(R.id.display_name_et_register);
        buttonChooseImage = findViewById(R.id.select_image_btn_register);
        buttonSubmit = findViewById(R.id.submit_button_register);
        cardViewImageContainer = findViewById(R.id.image_container_card_view_register);
        imageViewSelectedImage = findViewById(R.id.selected_image_iv_register);

        Button imageBtn = findViewById(R.id.select_image_btn_register);
        imageBtn.setOnClickListener(v -> {
            openImageChooser();
        });

        Button submitBtn = findViewById(R.id.submit_button_register);
        submitBtn.setOnClickListener(v -> {

            String errorMessage = validateSubmission();

            if (!errorMessage.equals("")) {
                Toast.makeText(this, errorMessage, Toast.LENGTH_LONG).show();
                return;
            }
            sendRegistrationData();
        });

    }

    private void openImageChooser() {
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        startActivityForResult(Intent.createChooser(intent, "Select Image"), PICK_IMAGE_REQUEST);
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {
            selectedImageUri = data.getData();
            try {
                selectedBitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), selectedImageUri);
                imageViewSelectedImage.setImageBitmap(selectedBitmap);
                cardViewImageContainer.setVisibility(View.VISIBLE);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    private String validateSubmission() {

        EditText usernameET = findViewById(R.id.username_et_register);
        String username = usernameET.getText().toString();

        EditText passwordET = findViewById(R.id.password_et_register);
        String password = passwordET.getText().toString();

        EditText confirmPasswordET = findViewById(R.id.confirm_password_et_register);
        String confirmPassword = confirmPasswordET.getText().toString();

        EditText displayNameET = findViewById(R.id.display_name_et_register);
        String displayName = displayNameET.getText().toString();

        // check username
        if (username.isEmpty() || password.isEmpty() || confirmPassword.isEmpty() || displayName.isEmpty()) {
            return "Please fill in all fields";
        } else if (!isPasswordValid(password)) {
            return "Password must contain at least one lowercase letter, one uppercase letter, and one number.";
        } else if (!password.equals(confirmPassword)) {
            return "Passwords do not match.";
        } else if (selectedImageUri == null) {
            return "Please select a profile picture.";
        } else {
            return "";
        }
    }

    private boolean isPasswordValid(String password) {
        String pattern = "^(?=.*[a-z])(?=.*\\d).+$";
        Pattern regex = Pattern.compile(pattern);
        Matcher matcher = regex.matcher(password);
        return matcher.matches();
    }

    private void sendRegistrationData() {
        // Perform API request to send registration data
        // Use the selectedImageUri to upload the image file to the API

        try {
            URL url = new URL(R.string.apiURL + ""); // Replace with your API endpoint
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");

            // Add your API request logic here

            connection.connect();
            int responseCode = connection.getResponseCode();

            if (responseCode == HttpURLConnection.HTTP_OK) {
                // Registration successful
                Toast.makeText(this, "Registration successful", Toast.LENGTH_SHORT).show();
                finish(); // Close the activity or navigate to the next screen
            } else {
                // Registration failed
                Toast.makeText(this, "Registration failed", Toast.LENGTH_SHORT).show();
            }
        } catch (Exception e) {
            Toast.makeText(this, "Registration failed", Toast.LENGTH_SHORT).show();
        }
    }
}
package communicationApp.androidClient;

import static android.content.ContentValues.TAG;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegisterActivity extends AppCompatActivity {
    private static final int PICK_IMAGE_REQUEST = 1;
    private static final int STORAGE_PERMISSION_CODE = 2;

    private EditText editTextUsername, editTextPassword, editTextConfirmPassword, editTextDisplayName;
    private Button buttonSubmit;
    private FloatingActionButton buttonChooseImage;
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

        buttonChooseImage.setOnClickListener(v -> showImageChooser());

        imageViewSelectedImage.setOnClickListener(v -> showImageChooser());

        buttonSubmit.setOnClickListener(v -> {
            String errorMessage = validateSubmission();

            if (!errorMessage.equals("")) {
                Toast.makeText(this, errorMessage, Toast.LENGTH_LONG).show();
                return;
            }
            sendRegistrationData();
        });

    }
    private void showImageChooser() {
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
                buttonChooseImage.setVisibility(View.GONE);
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
            return "Password must contain at least one lowercase letter, and one number.";
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

    private String bitmapToBase64(Bitmap bitmap) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();
        return Base64.encodeToString(byteArray, Base64.DEFAULT);
    }

    private void sendRegistrationData() {
        String username = editTextUsername.getText().toString();
        String password = editTextPassword.getText().toString();
        String displayName = editTextDisplayName.getText().toString();

        RegistrationTask registrationTask = new RegistrationTask();
        registrationTask.execute(username, password, displayName, selectedBitmap);
    }

    private class RegistrationTask extends AsyncTask<Object, Void, String> {

        @Override
        protected String doInBackground(Object... params) {
            String username = (String) params[0];
            String password = (String) params[1];
            String displayName = (String) params[2];
            Bitmap image = (Bitmap) params[3];

            HttpURLConnection urlConnection = null;
            try {
                URL url = new URL(getString(R.string.apiURL) + "/Users");
                urlConnection = (HttpURLConnection) url.openConnection();
                urlConnection.setRequestMethod("POST");
                urlConnection.setRequestProperty("Content-Type", "application/json");
                urlConnection.setRequestProperty("Accept", "text/plain");
                urlConnection.setDoOutput(true);

                JSONObject requestData = new JSONObject();
                requestData.put("username", username);
                requestData.put("password", password);
                requestData.put("displayName", displayName);
                requestData.put("profilePic", bitmapToBase64(image));

                DataOutputStream wr = new DataOutputStream(urlConnection.getOutputStream());
                wr.writeBytes(requestData.toString());
                wr.flush();
                wr.close();

                int responseCode = urlConnection.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    InputStream inputStream = urlConnection.getInputStream();
                    // Read the response here if needed
                    return "Registration successful";
                } else if (responseCode == HttpURLConnection.HTTP_CONFLICT) {
                    return "User already exists";
                } else {
                    Log.e(TAG, "Error response code: " + responseCode);
                }
            } catch (IOException | JSONException e) {
                Log.e(TAG, "Error sending registration data", e);
            } finally {
                if (urlConnection != null) {
                    urlConnection.disconnect();
                }
            }
            return null;
        }

        @Override
        protected void onPostExecute(String result) {
            if (result != null) {
                Toast.makeText(RegisterActivity.this, result, Toast.LENGTH_SHORT).show();
                // Handle successful registration here, e.g., start the next activity
                Intent intent = new Intent(RegisterActivity.this, MainActivity.class);
                startActivity(intent);
                finish();
            } else {
                Toast.makeText(RegisterActivity.this, "Registration failed", Toast.LENGTH_SHORT).show();
            }
        }
    }
}
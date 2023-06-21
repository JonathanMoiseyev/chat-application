package communicationApp.androidClient;

import static android.content.ContentValues.TAG;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;


public class AddContactActivity extends AppCompatActivity {
    private AppDB db;
    private ChatDao chatDao;
    private CurrentUserDao currentUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_contact);

        db = MainActivity.db;
        chatDao = db.chatDao();
        currentUser = db.currentUserDao();

        Button btnAddContact = findViewById(R.id.btnAddContact);
        btnAddContact.setOnClickListener(v -> {
            Thread thread = new Thread(new Runnable() {
                @Override
                public void run() {
                    try {

                        // Get username and password from EditTexts
                        EditText etUsername = findViewById(R.id.etUsername);
                        String username = etUsername.getText().toString();

                        // Contact server to add contact
                        HttpURLConnection urlConnection = null;

                        CurrentUser s = currentUser.get(0);
                        String ss = s.getToken();
                        System.out.println("sadsad");

                        try {
                            // Create request
                            URL url = new URL(getString(R.string.apiURL) + "/Chats");
                            urlConnection = (HttpURLConnection) url.openConnection();
                            urlConnection.setRequestMethod("POST");
                            urlConnection.setRequestProperty("accept", "*/*");
                            urlConnection.setRequestProperty("Authorization", "bearer " + currentUser.get(0).getToken());
                            urlConnection.setRequestProperty("Content-Type", "application/json");
                            urlConnection.setDoOutput(true);

                            JSONObject requestData = new JSONObject();
                            requestData.put("username", username);

                            // Send request
                            DataOutputStream wr = new DataOutputStream(urlConnection.getOutputStream());
                            wr.writeBytes(requestData.toString());
                            wr.flush();
                            wr.close();

                            int responseCode = urlConnection.getResponseCode();

                            if (responseCode == HttpURLConnection.HTTP_OK) {
                                InputStream inputStream = urlConnection.getInputStream();

                                // Get response object
                                StringBuilder response = new StringBuilder();
                                int data;

                                while ((data = inputStream.read()) != -1) {
                                    response.append((char) data);
                                }

                                JSONObject responseData = new JSONObject(response.toString());

                                // Extract the data from the response, and save it to a local variable
                                int id = responseData.getInt("id");
                                JSONObject user = responseData.getJSONObject("user");

                                int contactId = -1;
                                String contactUsername = user.getString("username");
                                String contactDisplayName = user.getString("displayName");
                                String contactProfilePic = user.getString("profilePic");

                                // Save contact to local database
                                User contact = new User(contactId, contactUsername, contactDisplayName, contactProfilePic);
                                Chat chat = new Chat(id, contact, "");
                                chatDao.insert(chat);

                                // Close activity
                                finish();
                            } else {
                                Toast.makeText(getApplicationContext(), R.string.user_does_not_exist, Toast.LENGTH_LONG).show();
                            }
                        } catch (Exception e) {
                            Log.e(TAG, "Error sending registration data", e);
                            System.out.println("asdasd");
                        } finally {
                            if (urlConnection != null) {
                                urlConnection.disconnect();
                            }
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            });

            thread.start();
        });
    }
}
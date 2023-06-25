package communicationApp.androidClient.chat;

import static android.content.ContentValues.TAG;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.lifecycle.Observer;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import communicationApp.androidClient.MainActivity;
import communicationApp.androidClient.R;
import communicationApp.androidClient.Theme;
import communicationApp.androidClient.adapters.ChatsListAdapter;
import communicationApp.androidClient.entities.Chat;
import communicationApp.androidClient.entities.CurrentUser;
import communicationApp.androidClient.entities.Message;
import communicationApp.androidClient.entities.Settings;
import communicationApp.androidClient.entities.SettingsDao;
import communicationApp.androidClient.entities.User;
import communicationApp.androidClient.loginAndRegister.register.RegisterActivity;
import communicationApp.androidClient.settings.SettingsActivity;

public class ContactListActivity extends AppCompatActivity {
    private List<Chat> chats = new ArrayList<>();
    private ChatsListAdapter adapter;

    public static String chosenChatId;


    private JSONArray getChatMessagesFromServer(String chatId, String apiURL, String token) {
        HttpURLConnection urlConnection = null;

        try {
            // Create request
            URL url = new URL(apiURL + "/Chats/" + chatId + "/Messages");
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");
            urlConnection.setRequestProperty("accept", "text/plain");
            urlConnection.setRequestProperty("Authorization", "bearer " + token);

            // Get response
            int responseCode = urlConnection.getResponseCode();

            if (responseCode == HttpURLConnection.HTTP_OK) {
                InputStream inputStream = urlConnection.getInputStream();

                // Get response object
                StringBuilder response = new StringBuilder();
                int data;

                while ((data = inputStream.read()) != -1) {
                    response.append((char) data);
                }

                // Cast the response array to arraylist of Messages
                JSONArray messagesJsonArray = new JSONArray(response.toString());
                return messagesJsonArray;
            } else {
                return null;
            }
        } catch(Exception exception) {
            Log.e(TAG, exception.getMessage());
            return null;
        } finally {
            if (urlConnection != null) {
                urlConnection.disconnect();
            }
        }
    }

    private void getContactsFromServer() {
        Thread thread = new Thread(() -> {
            HttpURLConnection urlConnection = null;

            try {
                String apiURL = MainActivity.db.settingsDao().index().get(0).getServerUrl() + "api";
                String token = MainActivity.db.currentUserDao().index().get(0).getToken();

                // Create request
                URL url = new URL(apiURL + "/Chats");
                urlConnection = (HttpURLConnection) url.openConnection();
                urlConnection.setRequestMethod("GET");
                urlConnection.setRequestProperty("accept", "text/plain");
                urlConnection.setRequestProperty("Authorization", "bearer " + token);

                // Send request
                int responseCode = urlConnection.getResponseCode();

                if (responseCode == HttpURLConnection.HTTP_OK) {
                    InputStream inputStream = urlConnection.getInputStream();

                    // Get response object
                    StringBuilder response = new StringBuilder();
                    int data;

                    while ((data = inputStream.read()) != -1) {
                        response.append((char) data);
                    }

                    // Cast the response array to arraylist of Chats, and save on the local db
                    JSONArray chatsJsonArray = new JSONArray(response.toString());
                    List<Chat> currentChats = MainActivity.db.chatDao().index();
                    chats = new ArrayList<>();

                    for (int i = 0; i < chatsJsonArray.length(); i++) {
                        JSONObject chatJsonObject = chatsJsonArray.getJSONObject(i);
                        JSONObject userJsonObject = chatJsonObject.getJSONObject("user");

                        User user = new User(userJsonObject.getString("username"), userJsonObject.getString("displayName"), userJsonObject.getString("profilePic"));
                        Chat chat = new Chat(chatJsonObject.getString("id"), user, chatJsonObject.getString("lastMessage"));

                        chats.add(chat);

                        // If the chat is not already on the local db, add it
                        boolean isInArray = false;

                        for (Chat currentChat : currentChats) {
                            if (currentChat.getId().equals(chat.getId())) {
                                isInArray = true;
                            }
                        }

                        if (!isInArray) {
                            MainActivity.db.chatDao().insert(chat);
                        }
                    }

                    adapter.setChats(chats);

                    // Get messages from each chat
                    MainActivity.db.messageDao().deleteAll();
                    String currentUserUsername = MainActivity.db.currentUserDao().index().get(0).getUserName();

                    for (Chat chat : chats) {
                        JSONArray messagesJsonArray = getChatMessagesFromServer(chat.getId(), apiURL, token);

                        if (messagesJsonArray != null) {
                            for (int i = 0; i < messagesJsonArray.length(); i++) {
                                JSONObject messageJsonObject = messagesJsonArray.getJSONObject(i);
                                JSONObject senderJsonObject = messageJsonObject.getJSONObject("sender");

                                boolean isSentByMe = senderJsonObject.getString("username").equals(currentUserUsername);

                                String date = messageJsonObject.get("created").toString();
                                int indexOfT = date.indexOf("T");
                                date = date.substring(indexOfT + 1);
                                Message message = new Message(chat.getId(), messageJsonObject.getString("content"), date, senderJsonObject.getString("username"), isSentByMe);
                                MainActivity.db.messageDao().insert(message);
                            }
                        }
                    }
                }
            } catch (Exception e) {
                Log.e(TAG, "Error sending registration data", e);
            } finally {
                if (urlConnection != null) {
                    urlConnection.disconnect();
                }
            }
        });

        thread.start();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        if (MainActivity.db.currentUserDao().index().size() == 0) {
            setResult(MainActivity.RESULT_CODE_TO_OPEN_LOGIN);
            finish();
        }

        try {
            SettingsDao settingsDao = MainActivity.db.settingsDao();
            Settings settings = settingsDao.index().get(0);
            Theme theme = settings.getTheme();

            switch (theme.ordinal()) {
                case 1:
                    setTheme(R.style.Purple_Teal_Theme);
                    break;
                case 2:
                    setTheme(R.style.BrightTheme);
                    break;
                case 3:
                    setTheme(R.style.DarkTheme);
                    break;
                default:
                    setTheme(R.style.Base_Theme_AndroidClient);
                    break;
            }
        } catch (Exception e) {
            setTheme(R.style.Base_Theme_AndroidClient);
        }

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact_list);

        RecyclerView lstContacts = findViewById(R.id.lstContacts);

        DividerItemDecoration itemDecorator = new DividerItemDecoration(this, DividerItemDecoration.VERTICAL);
        itemDecorator.setDrawable(ContextCompat.getDrawable(this, R.drawable.divider));
        lstContacts.addItemDecoration(itemDecorator);

        adapter = new ChatsListAdapter(this);
        lstContacts.setAdapter(adapter);
        lstContacts.setLayoutManager(new LinearLayoutManager(this));

        getContactsFromServer();

        FloatingActionButton btnGoToAddContact = findViewById(R.id.btnGoToAddContact);
        btnGoToAddContact.setOnClickListener(v -> {
            Intent i = new Intent(this, AddContactActivity.class);
            startActivity(i);
        });

        ImageView profilePic = findViewById(R.id.profilePic);
        TextView displayName = findViewById(R.id.displayName);

        CurrentUser currentUser = MainActivity.db.currentUserDao().index().get(0);

        String profilePicStr = currentUser.getProfilePic().substring(currentUser.getProfilePic().indexOf(",") + 1);;
        byte[] decodedBytes = Base64.decode(profilePicStr, Base64.DEFAULT);

        profilePic.setImageBitmap(BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length));
        displayName.setText(currentUser.getDisplayName());

        ImageButton settingsButton = findViewById(R.id.settings_button_contact_list);
        settingsButton.setOnClickListener(v -> {
            Intent intent = new Intent(ContactListActivity.this, SettingsActivity.class);
            startActivity(intent);
        });
        MainActivity.refresher.observe(this, new Observer<Boolean>() {
            @Override
            public void onChanged(Boolean aBoolean) {
                // refreshing the activity
                if (chats != null) {
                    chats.clear();
                } else {
                    chats = new ArrayList<>();
                }

                chats.addAll(MainActivity.db.chatDao().index());
                adapter.setChats(chats);
            }
        });
    }

    @Override
    protected void onResume() {
        if (MainActivity.db.currentUserDao().index().size() == 0) {
            setResult(MainActivity.RESULT_CODE_TO_OPEN_LOGIN);
            finish();
        }

        super.onResume();

        if (chats != null) {
            chats.clear();
        } else {
            chats = new ArrayList<>();
        }

        chats.addAll(MainActivity.db.chatDao().index());
        adapter.setChats(chats);
    }
}
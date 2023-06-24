package communicationApp.androidClient.chat;

import android.content.Context;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.util.Base64;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import org.json.JSONObject;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Date;
import java.util.List;

import communicationApp.androidClient.MainActivity;
import communicationApp.androidClient.R;
import communicationApp.androidClient.Theme;
import communicationApp.androidClient.adapters.MessageListAdapter;

import communicationApp.androidClient.entities.Message;
import communicationApp.androidClient.entities.MessageDao;
import communicationApp.androidClient.entities.Settings;
import communicationApp.androidClient.entities.SettingsDao;
import communicationApp.androidClient.entities.User;


public class MessagesActivity extends AppCompatActivity {

    private static class RunnableForSendingMessage implements Runnable {
        private String token;
        private String content;
        private String chatId;
        private boolean isSuccessful;

        RunnableForSendingMessage(String token, String chatId, String content) {
            this.token = token;
            this.content = content;
            this.chatId = chatId;
            this.isSuccessful = false;
        }

        @Override
        public void run() {
            HttpURLConnection clientForSendingMessage = null;
            try {
                String apiURL = MainActivity.db.settingsDao().index().get(0).getServerUrl() + "api";
                    URL url = new URL(apiURL + "/Chats/" + chatId + "/Messages");
                clientForSendingMessage = (HttpURLConnection) url.openConnection();
                clientForSendingMessage.setRequestMethod("POST");
                clientForSendingMessage.setRequestProperty("accept", "text/plain");
                clientForSendingMessage.setRequestProperty("Authorization", "bearer " + token);
                clientForSendingMessage.setRequestProperty("Content-Type", "application/json");

                clientForSendingMessage.setDoOutput(true);

                JSONObject obj = new JSONObject();
                obj.put("msg", content);

                DataOutputStream outputStream = new DataOutputStream(clientForSendingMessage.getOutputStream());
                outputStream.writeBytes(obj.toString());
                outputStream.flush();
                outputStream.close();


                if (clientForSendingMessage.getResponseCode() != HttpURLConnection.HTTP_OK) {
                    throw new Exception("error sending message");
                }

                isSuccessful = true;

                //TODO: handle response
                DataInputStream inputStream = new DataInputStream(clientForSendingMessage.getInputStream());
                String responseJsonString = inputStream.readLine();
                JSONObject responseJson = new JSONObject(responseJsonString);
                //TODO: continue here

            }

            catch(Exception exception) {
                //TODO: handle exception
            }

            finally {
                if (clientForSendingMessage != null) {
                    clientForSendingMessage.disconnect();
                }
            }
        }
    }



    private List<Message> messages;
    private MessageListAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
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
        setContentView(R.layout.activity_messages);

        //Initialize contact with User DB
        User contact = MainActivity.db.chatDao().get(ContactListActivity.chosenChatId).getContact();
        byte[] decodedBytes = Base64.decode(contact.getProfilePic(), Base64.DEFAULT);

        // Initialize views
        ImageView image = findViewById(R.id.profilePic);
        image.setImageBitmap(BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length));

        TextView displayName = findViewById(R.id.displayName);
        displayName.setText(contact.getDisplayName());

        RecyclerView lstMessages = findViewById(R.id.lstMessages);
        adapter = new MessageListAdapter(this);
        lstMessages.setAdapter(adapter);
        lstMessages.setLayoutManager(new LinearLayoutManager(this));


        // Render stored messages
        messages = MainActivity.db.messageDao().get(ContactListActivity.chosenChatId);
        adapter.setMessages(messages);

        // Add event listener to send button
        ImageButton btnSend = findViewById(R.id.buttonSend);
        btnSend.setOnClickListener(v -> {
            EditText txtMessage = findViewById(R.id.editTextMessage);
            String content = txtMessage.getText().toString().trim();

            txtMessage.setText("");

            if (!content.isEmpty()) {
                // TODO: this is where the message should be sent to the server

                RunnableForSendingMessage runnable = new RunnableForSendingMessage(MainActivity.db.currentUserDao().index().get(0).getToken(),
                        ContactListActivity.chosenChatId, content);

                Thread thread = new Thread(runnable);


                try {
                    thread.start();
                    thread.join();
                } catch (InterruptedException e) {
                    e.printStackTrace(); //TODO: handle exception
                }


                if (runnable.isSuccessful) {
                    // TODO: and here is where it should be stored in the local database
                    MessageDao messageDao = MainActivity.db.messageDao();



                    // TODO: finish this line: message = new Message(...);
                    Message message = new Message(ContactListActivity.chosenChatId, content, new Date().toString(),
                            MainActivity.db.chatDao().get(ContactListActivity.chosenChatId).getContact().getName());
                    messageDao.insert(message);

                    // Update the screen
                    adapter.setMessages(MainActivity.db.messageDao().get(ContactListActivity.chosenChatId));
                }

            }
        });


        Context thisContext = this;
        MainActivity.refresher.observe(this, new Observer<Boolean>() {
            @Override
            public void onChanged(Boolean aBoolean) {
                //Initialize contact with User DB
                User contact = MainActivity.db.chatDao().get(ContactListActivity.chosenChatId).getContact();
                byte[] decodedBytes = Base64.decode(contact.getProfilePic(), Base64.DEFAULT);

                // Initialize views
                ImageView image = findViewById(R.id.profilePic);
                image.setImageBitmap(BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length));

                TextView displayName = findViewById(R.id.displayName);
                displayName.setText(contact.getDisplayName());

                RecyclerView lstMessages = findViewById(R.id.lstMessages);
                adapter = new MessageListAdapter(thisContext);
                lstMessages.setAdapter(adapter);
                lstMessages.setLayoutManager(new LinearLayoutManager(thisContext));


                // Render stored messages
                messages = MainActivity.db.messageDao().get(ContactListActivity.chosenChatId);
                adapter.setMessages(messages);
            }
        });
    }
}

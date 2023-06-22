package communicationApp.androidClient.chat;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;

import communicationApp.androidClient.MainActivity;
import communicationApp.androidClient.R;
import communicationApp.androidClient.adapters.MessageListAdapter;
import communicationApp.androidClient.entities.AppDB;
import communicationApp.androidClient.entities.Message;
import communicationApp.androidClient.entities.MessageDao;


public class MessagesActivity extends AppCompatActivity {
    private List<Message> messages;
    private MessageListAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_messages);

        // Initialize views
        RecyclerView lstMessages = findViewById(R.id.lstMessages);
        adapter = new MessageListAdapter(this);
        lstMessages.setAdapter(adapter);
        lstMessages.setLayoutManager(new LinearLayoutManager(this));


        // Render stored messages
        messages = MainActivity.db.messageDao().get(ContactListActivity.chosenChatId);
        adapter.setMessages(messages);

        // Add event listener to send button
        Button btnSend = findViewById(R.id.buttonSend);
        btnSend.setOnClickListener(v -> {
            EditText txtMessage = findViewById(R.id.editTextMessage);
            String content = txtMessage.getText().toString().trim();

            if (!content.isEmpty()) {
                // TODO: this is where the message should be sent to the server

                // TODO: and here is where it should be stored in the local database
                MessageDao messageDao = MainActivity.db.messageDao();
                Message message = null;
                // TODO: finish this line: message = new Message(...);
                messageDao.insert(message);

                // Update the screen
                adapter.setMessages(MainActivity.db.messageDao().get(ContactListActivity.chosenChatId));
            }
        });
    }
}

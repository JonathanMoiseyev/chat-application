package communicationApp.androidClient;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;


public class ChatActivity extends AppCompatActivity {
    private List<Message> messages;
    private ChatAdapter adapter;
    private RecyclerView recyclerView;
    private EditText editTextMessage;
    private Button buttonSend;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);

        // Initialize views
        recyclerView = findViewById(R.id.recyclerView);
        editTextMessage = findViewById(R.id.editTextMessage);
        buttonSend = findViewById(R.id.buttonSend);

        // Initialize message list and adapter
        messages = new ArrayList<>();
        adapter = new ChatAdapter(messages);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(adapter);

        buttonSend.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String content = editTextMessage.getText().toString().trim();
                if (!content.isEmpty()) {
                    // Create a new message
                    Message message = new Message("John", content);

                    // Add message to the list
                    messages.add(message);

                    // Notify adapter of new message
                    adapter.notifyItemInserted(messages.size() - 1);

                    // Scroll RecyclerView to the bottom
                    recyclerView.scrollToPosition(messages.size() - 1);

                    // Clear the input field
                    editTextMessage.setText("");
                }
            }
        });
    }
}

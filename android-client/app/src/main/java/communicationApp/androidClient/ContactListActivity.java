package communicationApp.androidClient;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.ArrayList;
import java.util.List;

public class ContactListActivity extends AppCompatActivity {
    private List<Chat> chats;
    private ArrayAdapter<Chat> adapter;
    private ListView lvContactList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact_list);

        FloatingActionButton btnGoToAddContact = findViewById(R.id.btnGoToAddContact);
        btnGoToAddContact.setOnClickListener(v -> {
            Intent i = new Intent(this, AddContactActivity.class);
            startActivity(i);
        });

        chats = new ArrayList<>();
        lvContactList = findViewById(R.id.lvContactList);
        adapter = new ArrayAdapter<Chat>(this,
                                                android.R.layout.simple_list_item_1,
                                                chats);
        lvContactList.setAdapter(adapter);
    }

    @Override
    protected void onResume() {
        super.onResume();
        chats.clear();
        chats.addAll(MainActivity.db.chatDao().index());
        adapter.notifyDataSetChanged();
    }
}
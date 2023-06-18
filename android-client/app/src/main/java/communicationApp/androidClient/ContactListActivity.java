package communicationApp.androidClient;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ListView;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

public class ContactListActivity extends AppCompatActivity {
    private AppDB db;
    private ChatDao chatDao;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact_list);

        db = Room.databaseBuilder(getApplicationContext(), AppDB.class, "HemiDB")
                .allowMainThreadQueries()
                .build();

        chatDao = db.chatDao();

        FloatingActionButton btnGoToAddContact = findViewById(R.id.btnGoToAddContact);
        btnGoToAddContact.setOnClickListener(v -> {
            Intent i = new Intent(this, AddContactActivity.class);
            startActivity(i);
        });
    }
}
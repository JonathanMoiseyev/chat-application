package communicationApp.androidClient;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.ArrayList;
import java.util.List;

import communicationApp.androidClient.settings.Settings;
import communicationApp.androidClient.settings.SettingsDao;

public class ContactListActivity extends AppCompatActivity {
    private List<Chat> chats;
    private ArrayAdapter<Chat> adapter;
    private ListView lvContactList;

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
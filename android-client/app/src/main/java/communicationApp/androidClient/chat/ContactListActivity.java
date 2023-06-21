package communicationApp.androidClient.chat;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.ArrayList;
import java.util.List;

import communicationApp.androidClient.MainActivity;
import communicationApp.androidClient.R;
import communicationApp.androidClient.Theme;
import communicationApp.androidClient.adapters.ChatsListAdapter;
import communicationApp.androidClient.entities.Chat;
import communicationApp.androidClient.entities.Settings;
import communicationApp.androidClient.entities.SettingsDao;
import communicationApp.androidClient.entities.User;

public class ContactListActivity extends AppCompatActivity {
    private List<Chat> chats;
    private ChatsListAdapter adapter;

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

        RecyclerView lstContacts = findViewById(R.id.lstContacts);
        adapter = new ChatsListAdapter(this);
        lstContacts.setAdapter(adapter);
        lstContacts.setLayoutManager(new LinearLayoutManager(this));

        chats = MainActivity.db.chatDao().index();
        adapter.setChats(chats);

        FloatingActionButton btnGoToAddContact = findViewById(R.id.btnGoToAddContact);
        btnGoToAddContact.setOnClickListener(v -> {
            Intent i = new Intent(this, AddContactActivity.class);
            startActivity(i);
        });

//        chats = new ArrayList<>();
//        lvContactList = findViewById(R.id.lvContactList);
//        adapter = new ArrayAdapter<Chat>(this,
//                                                android.R.layout.simple_list_item_1,
//                                                chats);
//        lvContactList.setAdapter(adapter);
    }

    @Override
    protected void onResume() {
        super.onResume();

        Object s = MainActivity.db.chatDao().index();


        chats.clear();
        chats.addAll(MainActivity.db.chatDao().index());
        adapter.setChats(chats);
    }
}
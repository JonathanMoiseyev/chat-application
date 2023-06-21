package communicationApp.androidClient;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import android.content.Intent;
import android.os.Bundle;

import communicationApp.androidClient.login.LoginActivity;
import communicationApp.androidClient.settings.SettingsActivity;

public class MainActivity extends AppCompatActivity {
    private enum Activities {
        LOGIN,
        REGISTER,
        CHAT
    }

    public static AppDB db;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        db =  Room.databaseBuilder(getApplicationContext(), AppDB.class, "HemiDB")
                        .fallbackToDestructiveMigration()
                        .allowMainThreadQueries()
                        .build();


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


//        Intent intent = new Intent(this, SettingsActivity.class);
//        startActivityForResult(intent, Activities.LOGIN.ordinal());

        Intent intent = new Intent(this, SettingsActivity.class);
        startActivity(intent);

    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);

        if (requestCode == Activities.LOGIN.ordinal()) {
            if (resultCode == RESULT_OK) {
                intent = new Intent(this, ContactListActivity.class);
                startActivityForResult(intent, Activities.CHAT.ordinal());
            } else {
                intent = new Intent(this, RegisterActivity.class);
                startActivityForResult(intent, Activities.REGISTER.ordinal());
            }
        }

        else if (requestCode == Activities.REGISTER.ordinal()) {
            intent = new Intent(this, LoginActivity.class);
            startActivityForResult(intent, Activities.LOGIN.ordinal());
        }

        else { //if (requestCode == Activities.CHAT.ordinal()) {
            intent = new Intent(this, LoginActivity.class);
            startActivityForResult(intent, Activities.LOGIN.ordinal());
        }

    }
}
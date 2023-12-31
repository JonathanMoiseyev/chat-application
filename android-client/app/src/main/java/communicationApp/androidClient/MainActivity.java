package communicationApp.androidClient;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.lifecycle.MutableLiveData;
import androidx.room.Room;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;

import com.google.firebase.iid.FirebaseInstanceId;

import java.util.Objects;

import communicationApp.androidClient.chat.ContactListActivity;
import communicationApp.androidClient.entities.AppDB;
import communicationApp.androidClient.entities.Settings;
import communicationApp.androidClient.entities.SettingsDao;
import communicationApp.androidClient.loginAndRegister.login.LoginActivity;
import communicationApp.androidClient.loginAndRegister.register.RegisterActivity;

public class MainActivity extends AppCompatActivity {
    private enum Activities {
        LOGIN,
        REGISTER,
        CHAT
    }

    public static AppDB db;
    public static String fireBaseToken = "";

    public static final int RESULT_CODE_TO_OPEN_LOGIN = 1;
    public static final int RESULT_CODE_TO_OPEN_REGISTER = 2;
    public static final int RESULT_CODE_TO_OPEN_CONTACT_LIST = 3;

    public static MutableLiveData<Boolean> refresher;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        refresher = new MutableLiveData<>(false);
        
        db =  Room.databaseBuilder(getApplicationContext(), AppDB.class, "HemiDB")
                .fallbackToDestructiveMigration()
                .allowMainThreadQueries()
                .build();


        // making sure the settings are set
        SettingsDao settingsDao = MainActivity.db.settingsDao();
        if (settingsDao.index().size() == 0) {
            Settings settings = new Settings();
            settingsDao.insert(settings);
        }


        super.onCreate(savedInstanceState);



        Intent intent = new Intent(this, LoginActivity.class);
        startActivityForResult(intent, Activities.LOGIN.ordinal());


    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);

        if (resultCode == RESULT_CODE_TO_OPEN_REGISTER) {
            Intent registerIntent = new Intent(this, RegisterActivity.class);
            startActivityForResult(registerIntent, Activities.REGISTER.ordinal());
        } else if (resultCode == RESULT_CODE_TO_OPEN_LOGIN) {
            Intent loginIntent = new Intent(this, LoginActivity.class);
            startActivityForResult(loginIntent, Activities.LOGIN.ordinal());
        } else if (resultCode == RESULT_CODE_TO_OPEN_CONTACT_LIST) {
            Intent chatIntent = new Intent(this, ContactListActivity.class);
            startActivityForResult(chatIntent, Activities.CHAT.ordinal());
        } else {
            // re enter the login activity
            Intent loginIntent = new Intent(this, LoginActivity.class);
            startActivityForResult(loginIntent, Activities.LOGIN.ordinal());
        }

    }
}
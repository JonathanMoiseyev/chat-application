package communicationApp.androidClient.settings;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.appcompat.widget.SwitchCompat;
import androidx.room.Room;

import communicationApp.androidClient.AppDB;
import communicationApp.androidClient.R;

public class SettingsActivity extends AppCompatActivity {
    private SwitchCompat darkModeSwitch;
    private EditText serverUrlEditText;
    private Button applyAndExitButton;

    private static boolean darkMode = false;
    private static String serverUrl = "@string/default_server_url";



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);

        darkModeSwitch = findViewById(R.id.switch_dark_mode);
        darkModeSwitch.setChecked(darkMode);

        serverUrlEditText = findViewById(R.id.edit_server_url);
        serverUrlEditText.setText(serverUrl);

        applyAndExitButton = findViewById(R.id.apply_and_exit_button);



        applyAndExitButton.setOnClickListener(v -> {
            if (darkModeSwitch.isChecked()) {
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES);
                darkMode = true;
            } else {
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
                darkMode = false;
            }

            serverUrl = serverUrlEditText.getText().toString();
            // making sure the url ends with a slash
            if (!serverUrl.endsWith("/")) {
                serverUrl += "/";
            }



            //TODO: SAVE THE STATE OF THE URL TO THE DATABASE




            //closing the activity
            finish();
        });
    }

}

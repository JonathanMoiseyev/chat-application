package communicationApp.androidClient.settings;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

import communicationApp.androidClient.MainActivity;
import communicationApp.androidClient.R;
import communicationApp.androidClient.Theme;
import communicationApp.androidClient.loginAndRegister.register.RegisterActivity;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageButton;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

public class SettingsActivity extends AppCompatActivity {

    private EditText ipEditText;
    private Spinner themeSpinner;

    private Theme theme = Theme.BASIC;

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
        setContentView(R.layout.activity_settings);

        // Initialize views
        ipEditText = findViewById(R.id.ip_edittext);
        themeSpinner = findViewById(R.id.theme_spinner);

        // Set up theme spinner with custom adapter
        ThemeAdapter adapter = new ThemeAdapter(this, R.layout.spinner_item, getResources().getStringArray(R.array.theme_options));
        themeSpinner.setAdapter(adapter);

        // Apply Changes button
        FloatingActionButton applyButton = findViewById(R.id.apply_button);
        applyButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                applyChanges();
            }
        });

        // Return button
        ImageButton returnButton = findViewById(R.id.return_button);
        returnButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish(); // Close the settings activity and return to the previous activity
            }
        });

        // Get the saved settings from the local database
        SettingsDao settingsDao = MainActivity.db.settingsDao();
        Settings settings = settingsDao.index().get(0);

        // Set the IP address and theme to the saved settings
        ipEditText.setText(settings.getServerUrl());
    }

    private void applyChanges() {
        // Get user input
        String ipAddress = ipEditText.getText().toString();
        String selectedTheme = themeSpinner.getSelectedItem().toString();

        // Save the preferences on the local database
        Settings settings = new Settings();
        settings.setId(0);
        settings.setTheme(theme);
        settings.setServerUrl(ipAddress);

        SettingsDao settingsDao = MainActivity.db.settingsDao();

        if (settingsDao.index().size() > 0) {
            settingsDao.delete(settingsDao.index().get(0));
        }

        settingsDao.insert(settings);

        // Perform actions based on user input
        // Here, you can save the IP address and selected theme to shared preferences or perform other operations

        // Show a toast to indicate changes applied
        Toast.makeText(this, "Changes applied", Toast.LENGTH_SHORT).show();
        finish(); // Close the settings activity and return to the previous activity
    }

    private class ThemeAdapter extends ArrayAdapter<String> {

        private Context context;
        private int resource;
        private String[] items;

        public ThemeAdapter(Context context, int resource, String[] items) {
            super(context, resource, items);
            this.context = context;
            this.resource = resource;
            this.items = items;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            TextView view = (TextView) super.getView(position, convertView, parent);
            applyTheme(view);
            return view;
        }

        @Override
        public View getDropDownView(int position, View convertView, ViewGroup parent) {
            TextView view = (TextView) super.getDropDownView(position, convertView, parent);
            applyTheme(view);
            return view;
        }

        private void applyTheme(TextView view) {
            String selectedTheme = themeSpinner.getSelectedItem().toString();
            if (selectedTheme.equals("Basic")) {
                theme = Theme.BASIC;
            } else if (selectedTheme.equals("Default")) {
                theme = Theme.DEFAULT;
            } else if (selectedTheme.equals("Light")) {
                theme = Theme.LIGHT;
            } else if (selectedTheme.equals("Dark")) {
                theme = Theme.DARK;
            }
        }
    }
}
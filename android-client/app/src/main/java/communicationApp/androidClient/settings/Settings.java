package communicationApp.androidClient.settings;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class Settings {
    @PrimaryKey
    private int id;
    private boolean darkMode = false;
    private String serverUrl = "@string/default_server_url";

    public boolean isDarkMode() {
        return darkMode;
    }

    public void setDarkMode(boolean darkMode) {
        this.darkMode = darkMode;
    }

    public String getServerUrl() {
        return serverUrl;
    }

    public void setServerUrl(String serverUrl) {
        this.serverUrl = serverUrl;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}

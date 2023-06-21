package communicationApp.androidClient.settings;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

import communicationApp.androidClient.Theme;

@Entity
public class Settings {
    @PrimaryKey
    private int id;
    private Theme theme = Theme.BASIC;
    private String serverUrl = "@string/default_server_url";

    public Theme getTheme() {
        return theme;
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
    }

    public String getServerUrl() {
        return serverUrl;
    }

    public void setServerUrl(String serverUrl) {
        this.serverUrl = serverUrl;

        // making sure that the server url ends with a slash
        if (!this.serverUrl.endsWith("/")) {
            this.serverUrl += "/";
        }
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}

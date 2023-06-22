package communicationApp.androidClient.entities;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

import communicationApp.androidClient.R;
import communicationApp.androidClient.Theme;

@Entity
public class Settings {
    @PrimaryKey
    private int id;
    private Theme theme = Theme.DEFAULT;
    private String serverUrl = "http://10.0.2.2:5000/";

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

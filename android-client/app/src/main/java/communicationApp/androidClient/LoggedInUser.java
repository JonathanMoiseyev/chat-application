package communicationApp.androidClient;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class LoggedInUser {
    @PrimaryKey
    private int id;
    private String token;

    public LoggedInUser(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public int getId() {
        return id;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setId(int id) {
        this.id = id;
    }
}

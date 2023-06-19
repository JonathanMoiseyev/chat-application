package communicationApp.androidClient;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class CurrentUser {
    @PrimaryKey
    private int id;
    private String token;
    private String userName;
    private String displayName;
    private String profilePic;

    public CurrentUser(int id, String token, String userName, String displayName, String profilePic) {
        this.id = id;
        this.token = token;
        this.userName = userName;
        this.displayName = displayName;
        this.profilePic = profilePic;
    }

    public String getToken() {
        return token;
    }

    public int getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}

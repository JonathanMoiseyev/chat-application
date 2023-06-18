package communicationApp.androidClient;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class User {
    @PrimaryKey
    int id;
    String name;
    String displayName;
    String profilePic;

    public User(int id, String name, String displayName, String profilePic) {
        this.id = id;
        this.name = name;
        this.displayName = displayName;
        this.profilePic = profilePic;
    }

    int getId() {
        return id;
    }

    String getName() {
        return name;
    }

    String getDisplayName() {
        return displayName;
    }

    String getProfilePic() {
        return profilePic;
    }

    void setId(int id) {
        this.id = id;
    }

    void setName(String name) {
        this.name = name;
    }

    void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }
}
package communicationApp.androidClient.entities;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class User {
    @PrimaryKey(autoGenerate = true)
    int id;
    String name;
    String displayName;
    String profilePic;

    public User(String name, String displayName, String profilePic) {
        this.name = name;
        this.displayName = displayName;
        this.profilePic = profilePic;
    }

    int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getProfilePic() {
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

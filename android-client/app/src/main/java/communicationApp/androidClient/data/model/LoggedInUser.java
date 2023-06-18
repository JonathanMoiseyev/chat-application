package communicationApp.androidClient.data.model;

/**
 * Data class that captures user information for logged in users retrieved from LoginRepository
 */
public class LoggedInUser {
    private final String userName;
    private final String displayName;
    private final String profilePic;
    private final String token;

    public LoggedInUser(String userName, String displayName, String profilePic, String token) {
        this.userName = userName;
        this.displayName = displayName;
        this.profilePic = profilePic;
        this.token = token;
    }

    public String getUserName() {
        return userName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getImage() {
        return profilePic;
    }

    public String getToken() {
        return token;
    }
}
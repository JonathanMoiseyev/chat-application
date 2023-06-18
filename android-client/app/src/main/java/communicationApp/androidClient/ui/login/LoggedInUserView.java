package communicationApp.androidClient.ui.login;

/**
 * Class exposing authenticated user details to the UI.
 */
class LoggedInUserView {

    // fields that will be accessible in the ui
    private String displayName;
    private String image;

    LoggedInUserView(String displayName) {
        this.displayName = displayName;
    }

    String getDisplayName() {
        return displayName;
    }
}
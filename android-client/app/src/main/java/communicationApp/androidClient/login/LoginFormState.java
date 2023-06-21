package communicationApp.androidClient.login;

import androidx.annotation.Nullable;

/**
 * Data validation state of the login form.
 */
class LoginFormState {
    @Nullable
    private Integer usernameError;
    @Nullable
    private Integer passwordError;
    private boolean isDataValid;

    LoginFormState() {
        isDataValid = false;
        this.usernameError = null;
        this.passwordError = null;
    }

    @Nullable
    Integer getUsernameError() {
        return usernameError;
    }

    @Nullable
    Integer getPasswordError() {
        return passwordError;
    }

    boolean isDataValid() {
        return isDataValid;
    }

    void setUsernameError(@Nullable Integer usernameError) {
        this.usernameError = usernameError;
    }

    void setPasswordError(@Nullable Integer passwordError) {
        this.passwordError = passwordError;
    }

    void updateIsDataValid() {
        isDataValid = usernameError == null && passwordError == null;
    }

}
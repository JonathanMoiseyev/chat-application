package communicationApp.androidClient.loginAndRegister.register;

import androidx.annotation.Nullable;

/**
 * Data validation state of the register form.
 */
class RegisterFormState {
    @Nullable
    private Integer usernameError;

    @Nullable
    private Integer passwordError;

    @Nullable
    private Integer confirmPasswordError;

    @Nullable
    private Integer displayNameError;

//    @Nullable
//    private Integer profilePictureError;

    private boolean isDataValid;

    RegisterFormState() {
        this.usernameError = null;
        this.passwordError = null;
        this.confirmPasswordError = null;
        this.displayNameError = null;
        this.isDataValid = false;
    }

    @Nullable
    Integer getUsernameError() {
        return usernameError;
    }

    @Nullable
    Integer getPasswordError() {
        return passwordError;
    }

    @Nullable
    Integer getConfirmPasswordError() {
        return confirmPasswordError;
    }

    @Nullable
    Integer getDisplayNameError() {
        return displayNameError;
    }

//    @Nullable
//    Integer getProfilePictureError() {
//        return profilePictureError;
//    }

    boolean isDataValid() {
        return isDataValid;
    }


    void setUsernameError(@Nullable Integer usernameError) {
        this.usernameError = usernameError;
    }

    void setPasswordError(@Nullable Integer passwordError) {
        this.passwordError = passwordError;
    }

    void setConfirmPasswordError(@Nullable Integer confirmPasswordError) {
        this.confirmPasswordError = confirmPasswordError;
    }

    void setDisplayNameError(@Nullable Integer displayNameError) {
        this.displayNameError = displayNameError;
    }

//    void setProfilePictureError(@Nullable Integer profilePictureError) {
//        this.profilePictureError = profilePictureError;
//    }



    void updateValid() {
        isDataValid = (usernameError == null && passwordError == null //&& profilePictureError == null
                && confirmPasswordError == null && displayNameError == null);
    }
}
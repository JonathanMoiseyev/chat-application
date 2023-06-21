package communicationApp.androidClient.register;


import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import communicationApp.androidClient.R;
import communicationApp.androidClient.loginAndRegister.ValidFieldChecker;

public class RegisterViewModel extends ViewModel {

    private MutableLiveData<RegisterFormState> registerFormState;

    public RegisterViewModel() {
        registerFormState = new MutableLiveData<>();
    }


    MutableLiveData<RegisterFormState> getRegisterFormState() {
        return registerFormState;
    }

    public void registerDataChanged(String username, String password, String confirmPassword, String displayName) { //, boolean wasImageSelected) {
        RegisterFormState newRegisterFormState = new RegisterFormState();

        if (!ValidFieldChecker.isUsernameValid(username)) {
            newRegisterFormState.setUsernameError(R.string.invalid_username);
        } else {
            newRegisterFormState.setUsernameError(null);
        }

        newRegisterFormState.setPasswordError(ValidFieldChecker.passwordValidationError(password));

        if (!ValidFieldChecker.isConfirmPasswordValid(password, confirmPassword)) {
            newRegisterFormState.setConfirmPasswordError(R.string.confirm_password_doesnt_match);
        } else {
            newRegisterFormState.setConfirmPasswordError(null);
        }

        if (!ValidFieldChecker.isValidDisplayName(displayName)) {
            newRegisterFormState.setDisplayNameError(R.string.invalid_display_name);
        } else {
            newRegisterFormState.setDisplayNameError(null);
        }

//        if (!wasImageSelected) {
//            newRegisterFormState.setProfilePictureError(R.string.invalid_profile_picture);
//        } else {
//            newRegisterFormState.setProfilePictureError(null);
//        }



        newRegisterFormState.updateValid();

        registerFormState.setValue(newRegisterFormState);
    }
}

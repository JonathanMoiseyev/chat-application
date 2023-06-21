package communicationApp.androidClient.loginAndRegister;

import communicationApp.androidClient.R;

public class ValidFieldChecker {
    static final int MIN_PASSWORD_LENGTH = 8;
    static final int MIN_DISPLAY_NAME_LENGTH = 1;
    static final int MIN_USERNAME_LENGTH = 1;


    private static boolean lengthCheck(String field, int minLength) {
        if (field == null) {
            return false;
        }
        return field.trim().length() >= minLength;
    }

    public static boolean isUsernameValid(String username) {
        return lengthCheck(username, MIN_USERNAME_LENGTH);
    }

    public static boolean isValidDisplayName(String displayName) {
        return lengthCheck(displayName, MIN_DISPLAY_NAME_LENGTH);
    }


    public static Integer passwordValidationError(String password) {
        if (!lengthCheck(password, MIN_PASSWORD_LENGTH)) {
            return R.string.password_not_long_enough;
        }

        if (!password.matches(".*[A-Za-z].*")) {
            return R.string.password_no_letters;
        }

        if (!password.matches(".*[0-9].*")) {
            return R.string.password_no_numbers;
        }

        return null;
    }

    public static boolean isConfirmPasswordValid(String password, String confirmPassword) {
        return password.equals(confirmPassword);
    }
}

package communicationApp.androidClient.entities;

import androidx.room.TypeConverter;

public class UserConverter {
    @TypeConverter
    public User storedStringToUser(String userString) {
        String[] userArray = userString.split(",");
        return new User(Integer.parseInt(userArray[0]), userArray[1], userArray[2], userArray[3]);
    }

    @TypeConverter
    public String userToStoredString(User user) {
        return user.getId() + "," + user.getName() + "," + user.getDisplayName() + "," + user.getProfilePic();
    }
}

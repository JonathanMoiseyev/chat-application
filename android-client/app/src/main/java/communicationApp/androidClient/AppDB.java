package communicationApp.androidClient;

import androidx.room.Database;
import androidx.room.RoomDatabase;

import communicationApp.androidClient.settings.Settings;
import communicationApp.androidClient.settings.SettingsDao;

@Database(entities = {LoggedInUser.class, Chat.class, Settings.class}, version = 1)
public abstract class AppDB extends RoomDatabase {
    public abstract ChatDao chatDao();
    public abstract LoggedInUserDao loggedInUserDao();
    public abstract SettingsDao settingsDao();
}

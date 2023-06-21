package communicationApp.androidClient;

import androidx.room.Database;
import androidx.room.RoomDatabase;

import communicationApp.androidClient.data.model.LoggedInUser;
import communicationApp.androidClient.settings.Settings;
import communicationApp.androidClient.settings.SettingsDao;

@Database(entities = {CurrentUser.class, Chat.class, Settings.class}, version = 8)
public abstract class AppDB extends RoomDatabase {
    public abstract ChatDao chatDao();
    public abstract CurrentUserDao currentUserDao();
    public abstract SettingsDao settingsDao();
}

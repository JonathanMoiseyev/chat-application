package communicationApp.androidClient.entities;

import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(entities = {CurrentUser.class, Chat.class, Settings.class}, version = 9)
public abstract class AppDB extends RoomDatabase {
    public abstract ChatDao chatDao();
    public abstract CurrentUserDao currentUserDao();
    public abstract SettingsDao settingsDao();
}
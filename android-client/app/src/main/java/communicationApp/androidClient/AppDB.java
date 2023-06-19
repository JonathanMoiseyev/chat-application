package communicationApp.androidClient;

import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(entities = {CurrentUser.class, Chat.class}, version = 5)
public abstract class AppDB extends RoomDatabase {
    public abstract ChatDao chatDao();
    public abstract CurrentUserDao currentUserDao();
}

package communicationApp.androidClient.settings;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;


@Dao
public interface SettingsDao {
    @Query("SELECT * FROM Settings")
    List<Settings> index();

    @Query("SELECT * FROM Settings WHERE id = :id")
    Settings get(int id);

    @Insert
    void insert(Settings... settings);

    @Update
    void update(Settings... settings);

    @Delete
    void delete(Settings... settings);
}

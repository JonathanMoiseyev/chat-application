package communicationApp.androidClient.entities;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao
public interface MessageDao {
    @Query("SELECT * FROM Message")
    List<Message> index();

    @Query("SELECT * FROM Message WHERE id = :id")
    Message get(int id);

    @Query("SELECT * FROM Message WHERE chatId = :chatId")
    List<Message> get(String chatId);

    @Insert
    void insert(Message... messages);

    @Update
    void update(Message... messages);

    @Delete
    void delete(Message... messages);

    @Query("DELETE FROM Message")
    void deleteAll();
}

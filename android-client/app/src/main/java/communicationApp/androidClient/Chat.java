package communicationApp.androidClient;

import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.TypeConverters;

@Entity
public class Chat {
   @PrimaryKey(autoGenerate = true)
   private int id;
   @TypeConverters(UserConverter.class)
   private User contact;
   private String lastMessage;

    public Chat(int id, User contact, String lastMessage) {
        this.id = id;
        this.contact = contact;
        this.lastMessage = lastMessage;
    }

    public int getId() {
        return id;
    }

    public User getContact() {
        return contact;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setContact(User contact) {
        this.contact = contact;
    }

    public void setLastMessage(String lastMessage) {
       this.lastMessage = lastMessage;
    }
}

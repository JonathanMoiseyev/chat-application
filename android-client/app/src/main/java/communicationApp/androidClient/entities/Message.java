package communicationApp.androidClient.entities;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.util.Date;

@Entity
public class Message {
    @PrimaryKey(autoGenerate = true)
    private long id;

    private String chatId;
    private String content;

    private String timestamp;

    public String contactUsername;
    private boolean isSentByMe;

    public Message(String chatId, String content, String timestamp, String contactUsername, boolean isSentByMe) {
        this.chatId = chatId;
        this.content = content;
        this.timestamp = timestamp;
        this.contactUsername = contactUsername;
        this.isSentByMe = isSentByMe;
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public String getChatId() { return chatId; }

    public void setId(long id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public void setChatId(String chatId) { this.chatId = chatId; }

    public boolean isSentByMe() {
        return isSentByMe;
    }
}
package communicationApp.androidClient.adapters;

import android.content.Context;
import android.graphics.BitmapFactory;
import android.util.Base64;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import communicationApp.androidClient.R;
import communicationApp.androidClient.entities.Chat;

public class ChatsListAdapter extends RecyclerView.Adapter<ChatsListAdapter.ViewHolder> {
    public static class ViewHolder extends RecyclerView.ViewHolder {
        private final TextView displayName;
        private final TextView lastMessage;
        private final ImageView profilePic;

        public ViewHolder(View view) {
            super(view);
            displayName = (TextView) view.findViewById(R.id.displayName);
            lastMessage = (TextView) view.findViewById(R.id.lastMessage);
            profilePic = (ImageView) view.findViewById(R.id.profilePic);
        }
    }

    private final LayoutInflater mInflater;
    private List<Chat> mChats; // Cached copy of chats
    private View.OnClickListener mOnClickListener;

    public ChatsListAdapter(Context context) {
        mInflater = LayoutInflater.from(context);
    }

    @Override
    public ViewHolder onCreateViewHolder(android.view.ViewGroup parent, int viewType) {
        View view = mInflater.inflate(R.layout.chat_list_item, parent, false);
        view.setOnClickListener(mOnClickListener);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        if (mChats != null) {
            Chat current = mChats.get(position);

            byte[] decodedBytes = Base64.decode(current.getContact().getProfilePic(), Base64.DEFAULT);

            holder.displayName.setText(current.getContact().getDisplayName());
            holder.lastMessage.setText(current.getLastMessage());
            holder.profilePic.setImageBitmap(BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length));
        } else {
            // Covers the case of data not being ready yet.
            holder.displayName.setText("No Chats");
        }
    }

    public void setChats(List<Chat> chats) {
        mChats = chats;
        notifyDataSetChanged();
    }

    @Override
    public int getItemCount() {
        if (mChats != null)
            return mChats.size();
        else return 0;
    }

    public List<Chat> getChats() {
        return mChats;
    }
}

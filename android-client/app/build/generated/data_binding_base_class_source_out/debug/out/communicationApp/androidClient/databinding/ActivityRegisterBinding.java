// Generated by view binder compiler. Do not edit!
package communicationApp.androidClient.databinding;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;
import androidx.viewbinding.ViewBinding;
import androidx.viewbinding.ViewBindings;
import communicationApp.androidClient.R;
import java.lang.NullPointerException;
import java.lang.Override;
import java.lang.String;

public final class ActivityRegisterBinding implements ViewBinding {
  @NonNull
  private final LinearLayout rootView;

  @NonNull
  public final EditText confirmPasswordEtRegister;

  @NonNull
  public final EditText displayNameEtRegister;

  @NonNull
  public final CardView imageContainerCardViewRegister;

  @NonNull
  public final EditText passwordEtRegister;

  @NonNull
  public final Button selectImageBtnRegister;

  @NonNull
  public final ImageView selectedImageIvRegister;

  @NonNull
  public final TextView signupLinkRegister;

  @NonNull
  public final TextView signupTextRegister;

  @NonNull
  public final Button submitButtonRegister;

  @NonNull
  public final TextView titleRegister;

  @NonNull
  public final EditText usernameEtRegister;

  private ActivityRegisterBinding(@NonNull LinearLayout rootView,
      @NonNull EditText confirmPasswordEtRegister, @NonNull EditText displayNameEtRegister,
      @NonNull CardView imageContainerCardViewRegister, @NonNull EditText passwordEtRegister,
      @NonNull Button selectImageBtnRegister, @NonNull ImageView selectedImageIvRegister,
      @NonNull TextView signupLinkRegister, @NonNull TextView signupTextRegister,
      @NonNull Button submitButtonRegister, @NonNull TextView titleRegister,
      @NonNull EditText usernameEtRegister) {
    this.rootView = rootView;
    this.confirmPasswordEtRegister = confirmPasswordEtRegister;
    this.displayNameEtRegister = displayNameEtRegister;
    this.imageContainerCardViewRegister = imageContainerCardViewRegister;
    this.passwordEtRegister = passwordEtRegister;
    this.selectImageBtnRegister = selectImageBtnRegister;
    this.selectedImageIvRegister = selectedImageIvRegister;
    this.signupLinkRegister = signupLinkRegister;
    this.signupTextRegister = signupTextRegister;
    this.submitButtonRegister = submitButtonRegister;
    this.titleRegister = titleRegister;
    this.usernameEtRegister = usernameEtRegister;
  }

  @Override
  @NonNull
  public LinearLayout getRoot() {
    return rootView;
  }

  @NonNull
  public static ActivityRegisterBinding inflate(@NonNull LayoutInflater inflater) {
    return inflate(inflater, null, false);
  }

  @NonNull
  public static ActivityRegisterBinding inflate(@NonNull LayoutInflater inflater,
      @Nullable ViewGroup parent, boolean attachToParent) {
    View root = inflater.inflate(R.layout.activity_register, parent, false);
    if (attachToParent) {
      parent.addView(root);
    }
    return bind(root);
  }

  @NonNull
  public static ActivityRegisterBinding bind(@NonNull View rootView) {
    // The body of this method is generated in a way you would not otherwise write.
    // This is done to optimize the compiled bytecode for size and performance.
    int id;
    missingId: {
      id = R.id.confirm_password_et_register;
      EditText confirmPasswordEtRegister = ViewBindings.findChildViewById(rootView, id);
      if (confirmPasswordEtRegister == null) {
        break missingId;
      }

      id = R.id.display_name_et_register;
      EditText displayNameEtRegister = ViewBindings.findChildViewById(rootView, id);
      if (displayNameEtRegister == null) {
        break missingId;
      }

      id = R.id.image_container_card_view_register;
      CardView imageContainerCardViewRegister = ViewBindings.findChildViewById(rootView, id);
      if (imageContainerCardViewRegister == null) {
        break missingId;
      }

      id = R.id.password_et_register;
      EditText passwordEtRegister = ViewBindings.findChildViewById(rootView, id);
      if (passwordEtRegister == null) {
        break missingId;
      }

      id = R.id.select_image_btn_register;
      Button selectImageBtnRegister = ViewBindings.findChildViewById(rootView, id);
      if (selectImageBtnRegister == null) {
        break missingId;
      }

      id = R.id.selected_image_iv_register;
      ImageView selectedImageIvRegister = ViewBindings.findChildViewById(rootView, id);
      if (selectedImageIvRegister == null) {
        break missingId;
      }

      id = R.id.signup_link_register;
      TextView signupLinkRegister = ViewBindings.findChildViewById(rootView, id);
      if (signupLinkRegister == null) {
        break missingId;
      }

      id = R.id.signup_text_register;
      TextView signupTextRegister = ViewBindings.findChildViewById(rootView, id);
      if (signupTextRegister == null) {
        break missingId;
      }

      id = R.id.submit_button_register;
      Button submitButtonRegister = ViewBindings.findChildViewById(rootView, id);
      if (submitButtonRegister == null) {
        break missingId;
      }

      id = R.id.title_register;
      TextView titleRegister = ViewBindings.findChildViewById(rootView, id);
      if (titleRegister == null) {
        break missingId;
      }

      id = R.id.username_et_register;
      EditText usernameEtRegister = ViewBindings.findChildViewById(rootView, id);
      if (usernameEtRegister == null) {
        break missingId;
      }

      return new ActivityRegisterBinding((LinearLayout) rootView, confirmPasswordEtRegister,
          displayNameEtRegister, imageContainerCardViewRegister, passwordEtRegister,
          selectImageBtnRegister, selectedImageIvRegister, signupLinkRegister, signupTextRegister,
          submitButtonRegister, titleRegister, usernameEtRegister);
    }
    String missingId = rootView.getResources().getResourceName(id);
    throw new NullPointerException("Missing required view with ID: ".concat(missingId));
  }
}

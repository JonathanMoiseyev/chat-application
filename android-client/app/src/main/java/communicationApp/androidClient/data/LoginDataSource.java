package communicationApp.androidClient.data;


import org.json.JSONObject;

import communicationApp.androidClient.data.model.LoggedInUser;

import java.io.BufferedOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;


/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
public class LoginDataSource {

    private static class LoginNetworkRunnable implements Runnable {
        private Result<LoggedInUser> result;
        private String username;
        private String password;

        LoginNetworkRunnable(String username, String password) {
            this.result = null;
            this.username = username;
            this.password = password;
        }

        public Result<LoggedInUser> getResult() {
            return result;
        }

        @Override
        public void run() {
            HttpURLConnection clientForToken = null;
            HttpURLConnection clientForUserDetails = null;
            try {
                // handle loggedInUser authentication:


                URL url = new URL("http://10.0.2.2:5000/api/Tokens");
                clientForToken = (HttpURLConnection) url.openConnection();
                clientForToken.setRequestMethod("POST");

                clientForToken.setRequestProperty("accept", "*/*");
                clientForToken.setRequestProperty("Content-Type", "application/json");

                clientForToken.setDoOutput(true);

                JSONObject obj = new JSONObject();
                obj.put("username", username);
                obj.put("password", password);

                DataOutputStream outputPostToken = new DataOutputStream(clientForToken.getOutputStream());
                outputPostToken.writeBytes(obj.toString());
                outputPostToken.flush();
                outputPostToken.close();

                if (clientForToken.getResponseCode() != HttpURLConnection.HTTP_OK) {
                    throw new Exception("invalid username or password");
                }

                DataInputStream tokenInputStream = new DataInputStream(clientForToken.getInputStream());
                String token = tokenInputStream.readLine();







                url = new URL("http://10.0.2.2:5000/api/Users/" + username);
                clientForUserDetails = (HttpURLConnection) url.openConnection();
                clientForUserDetails.setRequestMethod("GET");
                clientForUserDetails.setRequestProperty("accept", "text/plain");
                clientForUserDetails.setRequestProperty("Authorization", "bearer " + token);

                if (clientForUserDetails.getResponseCode() == HttpURLConnection.HTTP_OK) {
                    DataInputStream userDetailsInputStream = new DataInputStream(clientForUserDetails.getInputStream());
                    String userDetailsJsonString = userDetailsInputStream.readLine();
                    JSONObject UserDetailsJson = new JSONObject(userDetailsJsonString);
                    String displayName = UserDetailsJson.getString("displayName");
                    String profilePic = UserDetailsJson.getString("profilePic");


                    LoggedInUser user = new LoggedInUser(username, displayName, profilePic, token);
                    result = new Result.Success<LoggedInUser>(user);


                } else {
                    throw new Exception() {
                        public String getMessage() {
                            return "invalid username or password";
                        }
                    };
                }



            } catch(Exception exception) {
                result = new Result.Error(exception);


            } finally {
                // closing the token connection if it is not null
                if (clientForToken != null) {
                    clientForToken.disconnect();
                }

                // closing the user details connection if it is not null
                if (clientForToken != null) {
                    clientForToken.disconnect();
                }

            }
        }


    }



    public Result<LoggedInUser> login(String username, String password) {

        LoginNetworkRunnable runnable = new LoginNetworkRunnable(username, password);
        Thread networkThread = new Thread(runnable);

        Result<LoggedInUser> result = null;

        try {
            networkThread.start();
            networkThread.join();
            result = runnable.getResult();

        } catch (InterruptedException e) {
            e.printStackTrace();
        }


        // returning the result
        return result;






//
//            LoggedInUser fakeUser =
//                    new LoggedInUser(
//                            java.util.UUID.randomUUID().toString(),
//                            username,
//                            displayName,
//                            profiePic,
//                            token
//                            );
//            return new Result.Success<>(fakeUser);
//        } catch (Exception e) {
//            return new Result.Error(new IOException("Error logging in", e));
//        }
    }

    public void logout() {
        // TODO: revoke authentication
    }
}
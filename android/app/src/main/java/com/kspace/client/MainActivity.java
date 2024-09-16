package com.kspace.client;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.Settings;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    requestForStoragePermissions();
  }

  private void requestForStoragePermissions() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
      if (Environment.isExternalStorageManager()) {
        return;
      }
      try {
        Intent intent = new Intent();
        intent.setAction(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION);
        Uri uri = Uri.fromParts("package", this.getPackageName(), null);
        intent.setData(uri);
        startActivity(intent);
      } catch (Exception e) {
        Intent intent = new Intent();
        intent.setAction(Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION);
        startActivity(intent);
      }
    }
  }

}

package com.vasiliev.forexlessons;

import android.content.Intent;
import android.os.Bundle;
import android.os.PersistableBundle;

import com.crashlytics.android.Crashlytics;
import com.facebook.react.ReactActivity;
import com.vasiliev.forexlessons.MainApplication;
import com.cboy.rn.splashscreen.SplashScreen;
import io.fabric.sdk.android.Fabric;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ForexLessons";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}

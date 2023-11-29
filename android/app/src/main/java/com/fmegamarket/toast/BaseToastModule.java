package com.fmegamarket.toast;

import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class BaseToastModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext rContext;
    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public BaseToastModule(ReactApplicationContext context){
        super(context);
        this.rContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "ToastModule";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod()
    public void showShort(String message){
        Toast.makeText(rContext, message, Toast.LENGTH_SHORT).show();
    }

    @ReactMethod()
    public void showLong(String message){
        Toast.makeText(rContext, message, Toast.LENGTH_LONG).show();
    }

    @ReactMethod()
    public void show(String message, String duration){
        if(duration.equals(DURATION_SHORT_KEY)){
            Toast.makeText(rContext, message, Toast.LENGTH_SHORT).show();
        } else if(duration.equals(DURATION_LONG_KEY)){
            Toast.makeText(rContext, message, Toast.LENGTH_LONG).show();
        }
    }
}

package com.rn_gongjijian;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.yunpeng.alipay.AlipayPackage;
import com.theweflex.react.WeChatPackage;
import com.fileopener.FileOpenerPackage;
import com.rnfs.RNFSPackage;
import com.imagepicker.ImagePickerPackage;
import ui.fileselector.RNFileSelectorPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import cn.jpush.reactnativejpush.JPushPackage;
import cn.jpush.android.api.JPushInterface;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }



    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new AlipayPackage(),
            new WeChatPackage(),
            new FileOpenerPackage(),
            new RNFSPackage(),
            new ImagePickerPackage(),
            new RNFileSelectorPackage(),
            new VectorIconsPackage(),
            new JPushPackage(true, true)


      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    JPushInterface.init(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
//
//  @Override
//  protected void onPause() {
//      super.onPause();
//      JPushInterface.onPause(this);
//  }
//
//  @Override
//  protected void onResume() {
//      super.onResume();
//      JPushInterface.onResume(this);
//  }
}

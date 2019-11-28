package com.rn_template;


import com.reactcommunity.rnlanguages.RNLanguagesPackage;
import com.imagepicker.ImagePickerPackage; 
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.keychain.KeychainPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

     @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
            new RNLanguagesPackage(),
            new ImagePickerPackage(),
            new SplashScreenReactPackage(),
            new FastImageViewPackage(),
            new NetInfoPackage(),
            new LinearGradientPackage(),
            new KeychainPackage(),
            new RNCWebViewPackage(),
            new AsyncStoragePackage(),
            new OrientationPackage(),
            new FingerprintAuthPackage()
        );
    }
  
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

}
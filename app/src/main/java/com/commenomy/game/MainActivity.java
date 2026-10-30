package com.commenomy.game;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
public class MainActivity extends Activity {
 private WebView web;
 @Override public void onCreate(Bundle state) { super.onCreate(state);
 web=new WebView(this); web.setWebViewClient(new WebViewClient());
 web.getSettings().setJavaScriptEnabled(true);
 web.getSettings().setDomStorageEnabled(true);
 setContentView(web);
 web.loadUrl("file:///android_asset/index.html");
 }
 @Override public void onBackPressed(){if(web.canGoBack())web.goBack();else super.onBackPressed();}
}

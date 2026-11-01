package com.commenomy.game;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
public class MainActivity extends Activity {
 private WebView web;
 @Override public void onCreate(Bundle state) { super.onCreate(state);
 web=new WebView(this); web.setWebViewClient(new WebViewClient());
 web.setWebChromeClient(new WebChromeClient());
 web.getSettings().setAllowFileAccess(true);
 web.getSettings().setCacheMode(WebSettings.LOAD_DEFAULT);
 web.getSettings().setJavaScriptEnabled(true);
 web.getSettings().setDomStorageEnabled(true);
 setContentView(web);
 if ((getApplicationInfo().flags & android.content.pm.ApplicationInfo.FLAG_DEBUGGABLE) != 0) {
   web.loadUrl("file:///android_asset/index.html?testWeekMinutes=60");
  } else {
   web.loadUrl("file:///android_asset/index.html");
  }
 }
 @Override protected void onDestroy(){ if(web!=null){ web.destroy(); web=null; } super.onDestroy(); }
 @Override public void onBackPressed(){if(web!=null && web.canGoBack())web.goBack();else super.onBackPressed();}
}

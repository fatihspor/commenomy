package com.commenomy.game;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.ConsoleMessage;
import android.webkit.WebSettings;
import android.util.Log;
import android.graphics.Color;
public class MainActivity extends Activity {
 private static final String TAG = "CommenomyWeb";
 private WebView web;
 @Override public void onCreate(Bundle state) { super.onCreate(state);
 Log.i(TAG, "Activity created");
 web=new WebView(this);
 web.setWebViewClient(new WebViewClient() {
  @Override public void onPageStarted(WebView view, String url, android.graphics.Bitmap favicon) {
   Log.i(TAG, "Page load started");
  }
  @Override public void onPageFinished(WebView view, String url) {
   Log.i(TAG, "Page load finished");
  }
 });
 web.setWebChromeClient(new WebChromeClient() {
  @Override public boolean onConsoleMessage(ConsoleMessage message) {
   if (message.messageLevel() == ConsoleMessage.MessageLevel.ERROR) {
    Log.e(TAG, "JavaScript error at line " + message.lineNumber() + ": " + message.message());
   }
   return true;
  }
 });
 web.getSettings().setAllowFileAccess(true);
 web.getSettings().setCacheMode(WebSettings.LOAD_DEFAULT);
 web.getSettings().setJavaScriptEnabled(true);
 web.getSettings().setDomStorageEnabled(true);
 web.setBackgroundColor(Color.rgb(12, 20, 37));
 setContentView(web);
 Log.i(TAG, "WebView attached; scheduling page load after first frame");
 web.post(() -> {
  if ((getApplicationInfo().flags & android.content.pm.ApplicationInfo.FLAG_DEBUGGABLE) != 0) {
   web.loadUrl("file:///android_asset/index.html?testDayMinutes=60");
  } else {
   web.loadUrl("file:///android_asset/index.html");
  }
 });
 }
 @Override protected void onDestroy(){ if(web!=null){ web.destroy(); web=null; } super.onDestroy(); }
 @Override public void onBackPressed(){if(web!=null && web.canGoBack())web.goBack();else super.onBackPressed();}
}

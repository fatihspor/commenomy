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
import android.os.Handler;
import android.os.Looper;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.TextView;
public class MainActivity extends Activity {
 private static final String TAG = "CommenomyWeb";
 private WebView web;
 private TextView loading;
 @Override public void onCreate(Bundle state) { super.onCreate(state);
 Log.i(TAG, "Activity created");
 FrameLayout root=new FrameLayout(this);
 root.setBackgroundColor(Color.rgb(12, 20, 37));
 loading=new TextView(this);
 loading.setText("Commenomy yükleniyor…");
 loading.setTextColor(Color.WHITE);
 loading.setTextSize(18);
 loading.setGravity(Gravity.CENTER);
 root.addView(loading, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
 setContentView(root);
 Log.i(TAG, "Creating WebView");
 web=new WebView(this);
 Log.i(TAG, "WebView instance constructed");
  web.setWebViewClient(new WebViewClient() {
   @Override public void onPageStarted(WebView view, String url, android.graphics.Bitmap favicon) {
    Log.i(TAG, "Page load started");
   }
   @Override public void onPageFinished(WebView view, String url) {
    Log.i(TAG, "Page load finished");
    if (loading != null) loading.setVisibility(View.GONE);
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
  root.addView(web, 0, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
 if ((getApplicationInfo().flags & android.content.pm.ApplicationInfo.FLAG_DEBUGGABLE) != 0) {
  Log.i(TAG, "Loading local game page in test mode");
  web.loadUrl("file:///android_asset/index.html?testDayMinutes=60");
 } else {
  Log.i(TAG, "Loading local game page");
  web.loadUrl("file:///android_asset/index.html");
 }
 }
 @Override protected void onDestroy(){ if(web!=null){ web.destroy(); web=null; } super.onDestroy(); }
 @Override public void onBackPressed(){if(web!=null && web.canGoBack())web.goBack();else super.onBackPressed();}
}

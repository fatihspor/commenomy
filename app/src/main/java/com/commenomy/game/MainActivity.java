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
 private Handler launchHandler;
 private FrameLayout root;
 private int rendererRestarts;
 @Override public void onCreate(Bundle state) { super.onCreate(state);
 Log.i(TAG, "Activity created");
 launchHandler=new Handler(Looper.getMainLooper());
 root=new FrameLayout(this);
 root.setBackgroundColor(Color.rgb(12, 20, 37));
 loading=new TextView(this);
 loading.setText("Commenomy yükleniyor…");
 loading.setTextColor(Color.WHITE);
 loading.setTextSize(18);
 loading.setGravity(Gravity.CENTER);
 root.addView(loading, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
 setContentView(root);
 Log.i(TAG, "Native loading view attached; deferring WebView creation");
 launchHandler.postDelayed(this::createWebView, 4000);
 }
 private void createWebView() {
  if (isFinishing() || isDestroyed()) return;
  Log.i(TAG, "Creating WebView after native first frame");
  web=new WebView(this);
  Log.i(TAG, "WebView constructor completed");
  web.setWebViewClient(new WebViewClient() {
   @Override public void onPageStarted(WebView view, String url, android.graphics.Bitmap favicon) {
    Log.i(TAG, "Page load started");
   }
   @Override public void onPageFinished(WebView view, String url) {
    Log.i(TAG, "Page load finished");
    if (loading != null) loading.setVisibility(View.GONE);
   }
   @Override public void onReceivedError(WebView view, android.webkit.WebResourceRequest request, android.webkit.WebResourceError error) {
    Log.e(TAG, "Page load error: " + error.getDescription());
   }
   @Override public boolean onRenderProcessGone(WebView view, android.webkit.RenderProcessGoneDetail detail) {
    Log.e(TAG, "WebView renderer exited; didCrash=" + detail.didCrash());
    if (view != web) return true;
    root.removeView(view);
    view.destroy();
    web=null;
    if (rendererRestarts < 1 && !isFinishing()) {
     rendererRestarts++;
     loading.setText("Commenomy yeniden başlatılıyor…");
     loading.setVisibility(View.VISIBLE);
     launchHandler.postDelayed(MainActivity.this::createWebView, 1500);
    } else {
     loading.setText("Commenomy açılamadı. Uygulamayı yeniden başlatın.");
     loading.setVisibility(View.VISIBLE);
    }
    return true;
   }
  });
  web.setWebChromeClient(new WebChromeClient() {
   @Override public void onProgressChanged(WebView view, int progress) {
    if (progress == 0 || progress == 100) Log.i(TAG, "WebView progress " + progress);
   }
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
   web.loadUrl("file:///android_asset/index.html?testDayMinutes=60");
  } else {
   web.loadUrl("file:///android_asset/index.html");
  }
  Log.i(TAG, "WebView loadUrl returned");
 }

 @Override protected void onDestroy(){ if(launchHandler!=null)launchHandler.removeCallbacksAndMessages(null); if(web!=null){ web.destroy(); web=null; } super.onDestroy(); }
 @Override public void onBackPressed(){if(web!=null && web.canGoBack())web.goBack();else super.onBackPressed();}
}

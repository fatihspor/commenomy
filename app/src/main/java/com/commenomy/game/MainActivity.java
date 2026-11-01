package com.commenomy.game;
import android.app.Activity;
import android.app.AlertDialog;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.JsResult;
public class MainActivity extends Activity {
 private WebView web;
 @Override public void onCreate(Bundle state) { super.onCreate(state);
 web=new WebView(this); web.setWebViewClient(new WebViewClient());
 web.setWebChromeClient(new WebChromeClient() {
   @Override public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
     AlertDialog dialog=new AlertDialog.Builder(MainActivity.this)
       .setTitle("Commenomy")
       .setMessage(message)
       .setPositiveButton("Tamam",(d,w)->result.confirm())
       .create();
     dialog.setOnCancelListener(d->result.cancel());
     dialog.show();
     return true;
   }
   @Override public boolean onJsConfirm(WebView view, String url, String message, JsResult result) {
     AlertDialog dialog=new AlertDialog.Builder(MainActivity.this)
       .setTitle("Commenomy")
       .setMessage(message)
       .setPositiveButton("Onayla",(d,w)->result.confirm())
       .setNegativeButton("Vazgeç",(d,w)->result.cancel())
       .create();
     dialog.setOnCancelListener(d->result.cancel());
     dialog.show();
     return true;
   }
 });
 web.getSettings().setAllowFileAccess(true);
 web.getSettings().setCacheMode(WebSettings.LOAD_DEFAULT);
 web.getSettings().setJavaScriptEnabled(true);
 web.getSettings().setDomStorageEnabled(true);
 setContentView(web);
 if ((getApplicationInfo().flags & android.content.pm.ApplicationInfo.FLAG_DEBUGGABLE) != 0) {
   web.loadUrl("file:///android_asset/index.html?testDayMinutes=60");
  } else {
   web.loadUrl("file:///android_asset/index.html");
  }
 }
 @Override protected void onDestroy(){ if(web!=null){ web.destroy(); web=null; } super.onDestroy(); }
 @Override public void onBackPressed(){if(web!=null && web.canGoBack())web.goBack();else super.onBackPressed();}
}

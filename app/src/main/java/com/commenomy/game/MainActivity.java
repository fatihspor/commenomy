package com.commenomy.game;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.TextView;

public class MainActivity extends Activity {
    private static final String TAG = "CommenomyWeb";
    private static final String GAME_URL = "file:///android_asset/index.html";
    private WebView web;
    private TextView loading;
    private boolean pageStarted;
    private boolean retryUsed;

    @Override
    public void onCreate(Bundle state) {
        super.onCreate(state);
        Log.i(TAG, "Activity created");

        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(Color.rgb(12, 20, 37));

        loading = new TextView(this);
        loading.setText("Commenomy yükleniyor…");
        loading.setTextColor(Color.WHITE);
        loading.setTextSize(18);
        loading.setGravity(Gravity.CENTER);
        root.addView(loading, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT));
        setContentView(root);

        web = new WebView(this);
        web.setBackgroundColor(Color.rgb(12, 20, 37));
        web.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, android.graphics.Bitmap favicon) {
                pageStarted = true;
                Log.i(TAG, "Page load started: " + url);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                Log.i(TAG, "Page load finished: " + url);
                if (loading != null) loading.setVisibility(View.GONE);
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request,
                                        android.webkit.WebResourceError error) {
                if (request.isForMainFrame()) {
                    Log.e(TAG, "Main page load failed: " + error.getDescription());
                    retryPageLoad();
                }
            }
        });
        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int progress) {
                if (progress == 100) {
                    Log.i(TAG, "Page load progress: 100%");
                    if (loading != null) loading.setVisibility(View.GONE);
                }
            }

            @Override
            public boolean onConsoleMessage(ConsoleMessage message) {
                if (message.messageLevel() == ConsoleMessage.MessageLevel.ERROR) {
                    Log.e(TAG, "JavaScript error at line " + message.lineNumber()
                            + ": " + message.message());
                }
                return true;
            }
        });

        WebSettings settings = web.getSettings();
        settings.setAllowFileAccess(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);

        root.addView(web, 0, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT));
        root.post(() -> {
            Log.i(TAG, "Loading local game page after WebView attachment");
            web.loadUrl(GAME_URL);
            web.postDelayed(() -> {
                if (!pageStarted) retryPageLoad();
            }, 10000);
        });
    }

    private void retryPageLoad() {
        if (retryUsed || web == null) return;
        retryUsed = true;
        web.postDelayed(() -> {
            if (web == null) return;
            Log.w(TAG, "Retrying local game page load");
            pageStarted = false;
            web.loadUrl(GAME_URL);
        }, 1000);
    }

    @Override
    protected void onDestroy() {
        if (web != null) {
            web.destroy();
            web = null;
        }
        super.onDestroy();
    }

    @Override
    public void onBackPressed() {
        if (web != null && web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }
}

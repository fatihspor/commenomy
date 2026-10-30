import SwiftUI
import WebKit

@main
struct CommenomyApp: App {
    var body: some Scene {
        WindowGroup {
            CommenomyView()
        }
    }
}

struct CommenomyView: UIViewRepresentable {
    func makeUIView(context: Context) -> WKWebView {
        let view = WKWebView()
        view.scrollView.contentInsetAdjustmentBehavior = .never
        if let url = Bundle.main.url(forResource: "index", withExtension: "html") {
            view.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        }
        return view
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}
}

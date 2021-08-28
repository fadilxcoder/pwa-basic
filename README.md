# Notes

- RUN by using `npm run start`, app run on url : http://127.0.0.1:5420/ (Change port to avoid conflict with redis-cli)
- Code should be in `public` folder
- Create `manifest.json`
- Icon `144x144` **should** be provided
- Go to Chrome > Application > Manifest to view details that you provided
- Add `sw.js` and register in `app.js`
- Use special cache, see `sw.js`
- Close / Open tabs to activate service worker or unregister SW
- Change port in `package.json`
- **APP** : https://github.com/fadilxcoder/pwa-basic/tree/jqm-real-time (PWA APP RSS FEED)

# Utils

- Install `npm i http-server` from (https://www.npmjs.com/package/http-server)
- https://app-manifest.firebaseapp.com/ (Web App Manifest Generator)
- https://developer.mozilla.org/en-US/docs/Web/Manifest (Web app manifests)
- https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json (List of manifest.json keys)
- https://jakearchibald.github.io/isserviceworkerready/ (is service worker ready ?)
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Periodic_Background_Synchronization_API (Web Periodic Background Synchronization API)

# Lifecycle of a Service Worker

- **Registration** : registered in `app.js` - `navigator.serviceWorker.register('/sw.js')`
- **Install** : `sw.js` - we can initialize the cache and add files to it for offline use
- **Activate** :  `sw.js` usually used to delete any files that are no longer necessary and clean up after the app in general.

### In console

- Running first time

```
SW Installed
caching in install..
SW Activated
SW registered
```

- Running second time + Offline hard reload (No HTTP Present)

```
SW fetch from https://fonts.googleapis.com/css?family=Raleway:400,700
SW fetch from http://127.0.0.1:5420/src/css/app.css
-----CACHE-------
Response {type: "basic", url: "http://127.0.0.1:5420/src/js/app.js", redirected: false, status: 200, ok: true, …}.....
-----------------
-----CACHE-----
```

- Running second time with hard reload

```
SW registered
```
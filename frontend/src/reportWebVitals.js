// The web-vitals library is a tiny (~1.5K, brotli'd), modular library for measuring all the Web Vitals metrics on real
// users, in a way that accurately matches how they're measured by Chrome and reported to other Google tools
// (e.g. Chrome User Experience Report, Page Speed Insights, Search Console's Speed Report).
// https://github.com/GoogleChrome/web-vitals/#types

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

reportWebVitals(console.log);

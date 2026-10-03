(() => {
  function debounce(func, wait = 100) {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  window.UFPerformance = Object.freeze({ debounce });
})();

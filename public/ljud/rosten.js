/* Röst från Shipholm – bara mp3. Ingen talsyntes i webbläsaren.
 *
 * ljud/lines.js fyller window.__ROST = { "exakt mening": "filnamn" }.
 *
 *   window.__rost(text)        -> true om en inspelad replik spelades
 *   window.__rost(text, true)  -> samma, men stoppar det som spelas först
 *   window.__rostStopp()       -> stoppar pågående replik
 *   window.__rostFinns(text)   -> true om texten har en fil
 *   window.__rostSag(text)     -> text som bara finns när appen körs: läses av
 *                                 tjänsten (POST /speak, röst omni) och spelas.
 *                                 Saknas filen eller svarar tjänsten inte: tyst.
 *
 * Attributionen (window.__ROST_ATTRIBUTION) ska synas i appen – rösten omni
 * kräver det.
 */
(function () {
  var ROST = (window.__ROST = window.__ROST || {});
  var API = "https://api.shipholm.com/speak";
  var inne = null;
  var apiLjud = null;

  window.__ROST_ATTRIBUTION =
    "Voice: OmniVoice (k2-fsa, CC BY-NC). Built with Higgs Materials licensed from Boson AI USA, Inc., " +
    "Copyright Boson AI USA, Inc., All Rights Reserved and Meta Llama 3 licensed under the Meta Llama 3 " +
    "Community License, Copyright Meta Platforms, Inc., All Rights Reserved.";

  function stopp() {
    if (inne) {
      try { inne.pause(); } catch (e) {}
      try { inne.currentTime = 0; } catch (e) {}
      inne = null;
    }
    if (apiLjud) {
      try { URL.revokeObjectURL(apiLjud.src); } catch (e) {}
      try { apiLjud.pause(); } catch (e) {}
      apiLjud = null;
    }
  }
  window.__rostStopp = stopp;
  window.__rostFinns = function (text) { return !!(text && ROST[String(text).trim()]); };

  window.__rost = function (text, nu) {
    if (!text) return false;
    var id = ROST[String(text).trim()];
    if (!id) return false;
    if (nu) stopp();
    else if (inne) { try { inne.pause(); } catch (e) {} }
    try {
      var a = new Audio("ljud/" + id + ".mp3");
      a.preload = "auto";
      inne = a;
      var p = a.play();
      if (p && p.catch) p.catch(function () { /* tyst: ljud kräver ett tryck först */ });
      return true;
    } catch (e) {
      return false;
    }
  };

  /* Text som inte går att spela in i förväg (namn, poäng, barnets egen text).
     klar() anropas när repliken är slut – eller direkt om tjänsten inte svarar,
     så att en uppläsning i tur och ordning aldrig fastnar. */
  window.__rostSag = function (text, klar) {
    var klart = typeof klar === "function" ? klar : function () {};
    if (!text) { klart(); return null; }
    stopp();
    return fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: String(text), voice: "omni" })
    })
      .then(function (r) {
        if (!r.ok) throw new Error("svar " + r.status);
        return r.blob();
      })
      .then(function (b) {
        var a = new Audio(URL.createObjectURL(b));
        apiLjud = a;
        a.addEventListener("ended", klart);
        a.addEventListener("error", klart);
        var p = a.play();
        if (p && p.catch) p.catch(function () { klart(); });
        return true;
      })
      .catch(function () { klart(); return false; }); /* tyst – texten syns redan */
  };

  /* Ett tryck på sidan låser upp ljudet i iOS/Safari. */
  function ljudStart() {
    try {
      var första = Object.keys(ROST)[0];
      if (!första) return;
      var a = new Audio("ljud/" + ROST[första] + ".mp3");
      a.volume = 0;
      var p = a.play();
      if (p && p.catch) p.catch(function () {});
      setTimeout(function () { try { a.pause(); } catch (e) {} }, 60);
    } catch (e) {}
    window.removeEventListener("pointerdown", ljudStart);
  }
  window.addEventListener("pointerdown", ljudStart, { once: true });
})();

/**
 * Internationalisation support.
 *
 * @author humphr_p
 */

function changeLanguage(languageCode) {
    var url = window.location.href;
    var p = url.indexOf("?lang=");
    var newUrl = url;
    if (p !== -1) {
        newUrl = url.substr(0, p - 1);
    }

    var separator = (newUrl.indexOf("?")===-1) ? "?" : "&";
    var newParam = separator + "lang=" + languageCode;
    newUrl += newParam;
    window.location.href = newUrl;
}

//TODO Probaby want something better than repeatin event handler for each
// menu option...
$(function() {
  console.log('hello');
  $('#langEn').on('click', function(e) {
    changeLanguage('en');
    e.preventDefault();
  });

  $('#langFr').on('click', function(e) {
    changeLanguage('fr');
    e.preventDefault();
  });
});

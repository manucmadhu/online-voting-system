// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}

// Retrieve CSRF token
var csrftoken = getCookie('csrftoken');

// Set up AJAX requests
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        // Check if CSRF token is available and the request is not safe or cross-domain
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            // Set CSRF token in request header
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    },
    error: function(xhr, status, error) {
        // Handle AJAX errors, such as CSRF token not being available or expired
        console.error('AJAX Error:', status, error);
    }
});

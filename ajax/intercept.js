// jQuery.ajax
$.ajaxSetup({
    complete: function (xhr) {
        var res = xhr.responseText;
        var body = JSON.parse(res);
        var isKicked = body["Code"] === 401;
        if (isKicked) {
            window.alert(body["Message"]);
            // redirect to login page
            window.location.href = "http://login.xx.xxx/";
        }
    }
});



// axios
axios.interceptors.request.use(function (config) {
    config.headers=Object.assign({
        "x-requested-with":"XMLHttpRequest",
    },config.headers);
    return config;
}, function (err) {
    return Promise.reject(err);
});
axios.interceptors.response.use(function (res) {
    // 200
    if (res.data) {
        var body = res.data;
        var isKicked = body["Code"] === 401;
        if (isKicked) {
            window.alert(body["Message"]);
            // redirect to login page
            window.location.href = "http://login.xx.xxx/";
        }
    }
    return res;
}, function (err) {
    // 500
    return Promise.reject(err);
});



// ajaxHook
// <script src="https://unpkg.com/ajax-hook/dist/ajaxhook.min.js"></script>
var verifyResponse = function(xhr) {
    if (xhr.status === 200) {
        var res = xhr.responseText;
        var body;
        try {
            body = JSON.parse(res);
        } catch(e) {
            body = res;
        }
        var isKicked = body["Code"] === 401;
        if (isKicked) {
            window.alert(body["Message"]);
            // redirect to login page
            window.location.href = "http://login.xx.xxx/";
            // prevent xhr
            return true;
        }
    }
}
hookAjax({
    setRequestHeader(arg, xhr) {
        let [header, value] = arg;
        if(!this.headers) this.headers = {};
        header = header.toLowerCase();
        if(!this.headers[header]) this.headers[header] = [];
        this.headers.push(value);
    },
    send(arg, xhr) {
        var headers = this.headers || {};
        if(headers['x-requested-with']) {
            var arr = headers['x-requested-with'];
            for(var i = 0, len = arr.length; i < len; i++) {
                if(arr[i] === 'XMLHttpRequest') return;
            }
        }
        xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest');
    },
    // axios
    onreadystatechange: function (xhr) {
        if (xhr.readyState === 4) {
            return verifyResponse(xhr);
        }
    },
    // jquery
    onload: function (xhr) {
        return verifyResponse(xhr);
    },
});



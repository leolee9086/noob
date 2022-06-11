export function resolve(url,base){
  var directlink = function(url){
    var a = document.createElement('a');
    a.href = url;
    return a.href;
    };
    return directlink('') === '' ? function(url){
        var div = document.createElement('div');
        div.innerHTML = '<a href="' + url.replace(/"/g, '%22') + '"/>';
        return div.firstChild.href;
    } : directlink;
}

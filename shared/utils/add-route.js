export default function addRoute(i18next, route, lngs, app, verb, fc) {
    if (typeof verb === 'function') {
        fc = verb;
        verb = 'get';
    }

    // Combine `fc` and possible more callbacks to one array
    var callbacks = [fc].concat(Array.prototype.slice.call(arguments, 6));

    for (var i = 0, li = lngs.length; i < li; i++) {
        var parts = String(route).split('/');
        var locRoute = [];
        for (var y = 0, ly = parts.length; y < ly; y++) {
            var part = parts[y];
            // if the route includes the parameter :lng
            // this is replaced with the value of the language
            if (part === ':lng') {
                locRoute.push(lngs[i]);
            } else if (part.indexOf(':') === 0 || part === '') {
                locRoute.push(part);
            } else {
                locRoute.push(i18next.t(part, { lng: lngs[i] }));
            }
        }

        var routes = [locRoute.join('/')];
        app[verb || 'get'].apply(app, routes.concat(callbacks));
    }
};
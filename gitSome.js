angular.module('GitSome', ['ngResource']);

function GitSomeCtrl($scope, $resource) {
    $scope.gitSome = $resource('http://api.github.com/repos/:owner/:repo/issues',
        {owner:'angular', repo:'angular', callback:'JSON_CALLBACK', page: 1},
        {get:{method:'JSONP'}});
    /*
        A bit hacky, but I was choking on figuring out how to follow the url given in
        links returned by github. I couldn't find another place the pages were stated,
        and I couldn't just follow them because it kept coming back with
                "angular.callbacks._0 is not a function"
        Since my GoogleFu(tm) was coming up short this is probably where I'd go find
        help within the company.
     */
    $scope.getQueryParams = function(url) {
        var queryString = url.substring(url.indexOf('?' + 1))
        var params = {}, queries, temp, i, l;
        // Split into key/value pairs
        queries = queryString.split("&");
        // Convert the array of strings into an object
        for ( i = 0, l = queries.length; i < l; i++ ) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }
        return params;
    };

    $scope.getPage = function(buttonName) {
        var links = $scope.gitResult.meta.Link;
        for (var i = 0; i < links.length; ++i) {
            if (links[i][1].rel == buttonName) {
                return $scope.getQueryParams(links[i][0])['page'];
            }
        }
        return null;
    };

    var d = new Date();
    d.setDate(d.getDate() - 7);
    $scope.gitResult = $scope.gitSome.get({ since: d.toISOString() });

    $scope.reloadPage = function(pageNum) {
         $scope.gitResult = $scope.gitSome.get({ since: d.toISOString(), page: pageNum });
    };
}
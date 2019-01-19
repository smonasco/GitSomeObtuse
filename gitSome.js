angular.module('GitSome', ['ngResource']);

function GitSomeCtrl($scope, $resource) {
    //?since=:date
    $scope.gitSome = $resource('http://api.github.com/repos/:owner/:repo/issues',
        {owner:'angular', repo:'angular', callback:'JSON_CALLBACK'},
        {get:{method:'JSONP'}});

    var d = new Date();
    d.setDate(d.getDate() - 7);
    $scope.gitResult = $scope.gitSome.get({ since: d.toISOString() });
    /*$scope.doSearch = function () {
        var d = new Date();
        d.setDate(d.getDate() - 7);
        $scope.gitResult = $scope.gitSome.get({ since: d.toISOString() });
    };*/
}
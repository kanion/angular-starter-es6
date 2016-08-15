angular.module("company", [
    "ui.router",
    "company.templates",
    "company.login"
])
.config(["$urlRouterProvider", function($urlRouterProvider){
    $urlRouterProvider.otherwise("/");
}]);
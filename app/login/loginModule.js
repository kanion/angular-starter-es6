angular.module("company.login",[
    "ui.router"
])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state("login", {
            url: "/login",
            templateUrl: "/login/login.html",
            controller: "LoginController"
        })
    }]);
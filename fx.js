(function(){

//Create module
    var FxApp = angular.module("FxApp",[]);


    // Create Function
    var FxSvc = function(){
        return $http.get("https://api.fixer.io/latest");
    }

    //Create Controller
    var FxCtrl = function($http, FxSvc){
        var fxCtrl = this;

        fxCtrl.baseRate = "";
        fxCtrl.date = "";
        fxCtrl.rates = {};

        fxCtrl.inputBase = "";



        fxCtrl.getRateWithBase(function(){
            $http.get("https://api.fixer.io/latest",{params: {base: fxCtrl.inputBase }})
            .then(function (result)
            {
                fxCtrl.baseRate = result.data.base;
                fxCtrl.date = result.data.date;
                fxCtrl.rates = result.data.rates;
            })
            .catch(function(err){
                console.error("Error ", err)
            })
        })

        fxCtrl.getRate(function(){
            $http.get("https://api.fixer.io/latest")
            .then(function (result)
            {
                fxCtrl.baseRate = result.data.base;
                fxCtrl.date = result.data.date;
                fxCtrl.rates = result.data.rates;
            })
        })
    }

    FxApp.service("FxSvc", ["$http", fxCtrl])
    FxApp.controller("FxCtrl", ["$http","FxSvc", fxCtrl])

})();
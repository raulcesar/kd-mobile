'use strict';

describe("main_controller_specs", function() {
    beforeEach(
        module(' zhm.main')
        );
    
    var scope,
        mainController;

    beforeEach(
        inject(function($controller) {
            scope = {};
            mainController = $controller("mainCtrl", {
                $scope: scope
            });
        })
    );

    it("A user should be defined", function() {
        expect(scope.user).toBeDefined();
    });

})
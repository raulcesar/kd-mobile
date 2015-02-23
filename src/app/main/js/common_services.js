'use strict';

var kdmServices = angular.module('kdm.common.services', ['restangular', 'kdm.servicoConstantes']);
kdmServices.constant('version', '0.0.1');


kdmServices.factory('kdmConfigServices', [
    '$rootScope',
    'Restangular',
    // '$q',

    function($rootScope, Restangular) {
        var eventos = {
            backendServerURLAtualizado: 'evtkdmBackendServerURLAtualizado'
        };


        var backEndServerURL = 'http://localhost:3030/';
        // backEndServerURL = 'http://192.168.1.246:3030/';
        backEndServerURL = 'http://infocedi.camara.leg.br/kdapi/';


        var setBackendServerURL = function(url) {
            backEndServerURL = url;
            $rootScope.$broadcast(eventos.backendServerURLAtualizado, backEndServerURL);
            Restangular.setBaseUrl(backEndServerURL);
        };

        var getBackendServerURL = function() {
            return backEndServerURL;
        };

        // config.constant('CONFIG', {
        //   BackendBaseUrl: 'http://localhost:3030/',
        //   BuildVersion:'<!--BuildVersion-->'
        // });


        return {
            setBackendServerURL: setBackendServerURL,
            getBackendServerURL: getBackendServerURL,
            eventos: eventos
        };

    }
]);

kdmServices.factory('Auth', ['$log', '$q', '$http', '$window',
    function($log, $q, $http, $window) {


        $window.localStorage.setItem('item_name', item_value);
        // to retrieve a value

        item_value = window.localStorage.getItem('item_name');
        // to delete a storage

        window.localStorage.removeItem('item_name');
        var _user = webStorage.session.get('user');

        var getCurrentRemoteUser = function() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: CONFIG.BackendBaseUrl + 'usuariocorrente'
            }).
            success(function(data) {
                deferred.resolve(data);
            }).
            error(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        };

        var setUser = function(user) {
            if (user.role || user.role < 0) {
                user.role = ACCESS_LEVELS.pub;
            }
            _user = user;

            //Put user into localstorage so we can use it in interceptor.
            webStorage.session.add('user', _user);
        };


        //return API
        return {
            getCurrentRemoteUser: getCurrentRemoteUser,
            isAuthorized: function(lvl) {
                return _user.role >= lvl;
            },
            setUser: setUser,
            isLoggedIn: function() {
                return _user ? true : false;
            },
            getUser: function() {
                return _user;
            },
            getId: function() {
                return _user ? _user._id : null;
            },
            getUserName: function() {
                return _user ? _user.name : null;

            },
            getToken: function() {
                return _user ? _user.token : null;
            },
            logOut: function() {
                webStorage.session.remove('user');
                _user = null;
            }
        };
    }
]);


//TODO: Criar arquivo para cordova services
kdmServices.factory('Camera', ['$q', function($q) {

    return {
        getPicture: function(source) {
            var options;
            if(source === 'camera'){
                options = {
                    targetWidth: 512,
                    targetHeight: 512,
                    quality: 70,
                    allowEdit:true,
                    destinationType: Camera.DestinationType.FILE_URI,
                };
            }else{
                options = {
                    targetWidth: 512,
                    targetHeight: 512,
                    quality: 70,
                    allowEdit:true,
                    destinationType: navigator.camera.PictureSourceType.FILE_URI,
                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                };
            }

            var q = $q.defer();
            if (!navigator || !navigator.camera) {
                q.resolve('Nao temos camera');
                return q.promise;
            }
            console.log('chamei o servico camera getPicture');
            console.log('Objeto navigator: ' + navigator);
            navigator.camera.getPicture(function(result) {
                // Do any magic you need
                console.log('Vou resolver a promessa');
                q.resolve(result);
            }, function(err) {
                console.log('Vou rejeitar a promessa');
                q.reject(err);
            }, options);

            return q.promise;
        }
    };
}]);

kdmServices.factory('PictureUploader', ['$q', 'URLs', function($q, URLs) {

    return {
        uploadPicture: function(userID, fileURI) {
            var q = $q.defer();
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            options.params = {}; // if we need to send parameters to the server request
            var ft = new FileTransfer();
            ft.upload(fileURI, encodeURI(URLs.urlCadastro + userID + URLs.urlCadastroComFoto), 
                function(result){
                    q.resolve(result);
                },
                function(error){
                    q.reject(error);
                }, options);

            return q.promise;
        }
    };
}]);


kdmServices.factory('Browser', ['$rootScope', '$q', function($rootScope, $q) {
    var openURL = function() {
        var deferred = $q.defer();
        console.log('Estou entrando no openURL... ja criei o $q.defer().');
        if (window.cordova) {
            var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
            if (cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {

                var test = 'https://cas.camara.gov.br/cas/login?service=http://localhost:3030/validacas?referer=http://localhost:3030/hello';
                var browserRef = window.open(test, '_blank', 'location=no');
                var ticket;

                browserRef.addEventListener('loadstart', function(event) {
                    console.log('loadstart event: ' + event);

                    if ((event.url).indexOf('http://localhost') === 0) {
                        //Get ticket
                        var url = event.url;

                        
                        var urlparts = url.split('?');
                        if (urlparts.length >= 2) {

                            var prefix = encodeURIComponent(url) + '=';
                            console.log('prefix');
                            console.log(prefix);
                            var pars = urlparts[1].split(/[&;]/g);
                            console.log('PARS');
                            console.log(pars);

                            for (var i = pars.length - 1; i >= 0; i--) {
                                if (pars[i].indexOf('ticket=') === 0) {
                                    ticket = pars[i].split('=')[1];
                                }
                            }
                            //reverse iteration as may be destructive
                            for (var i = pars.length; i-- > 0;) {
                                //idiom for string.startsWith
                                if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                                    console.log('vou splice');
                                    pars.splice(i, 1);
                                }
                            }

                            url = urlparts[0] + '?' + pars.join('&');
                        }



                        console.log('url: ' + url);
                        console.log('Got the ticket yo mamama: ' + ticket);
                        // deferred.resolve(ticket);

                        // http://localhost:3030/validacas?referer=http://localhost:3030/hello&ticket=ST-60482-TvWy9Qfc7CfwzbpVRJl5-cas
                        // if (ticket !== null && ticket !== undefined) {
                            setTimeout(function() {
                                browserRef.close(); 
                            }, 0);
                        // }

                        //browserRef.close();
                    }
                    // var requestToken = (event.url).split("code=")[1];
                    // $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                    // $http({
                    //         method: "post",
                    //         url: adfsServer + "/adfs/oauth2/token",
                    //         data: "client_id=" + clientId + "&code=" + requestToken + "&redirect_uri=http://localhost/callback&grant_type=authorization_code"
                    //     })
                    //     .success(function(data) {
                    //         deferred.resolve(data);
                    //     })
                    //     .error(function(data, status) {
                    //         deferred.reject("Problem authenticating");
                    //     })
                    //     .finally(function() {
                    //         setTimeout(function() {
                    //             browserRef.close();
                    //         }, 10);
                    //     });
                    // }
                });
                browserRef.addEventListener('exit', function(event) {
                    console.log('exit event: ' + JSON.stringify(event));
                    deferred.resolve(ticket);
                });
            } else {
                console.log('vou rejeitar promessa porque nao encontrei o inappbroser');
                deferred.reject("Could not find InAppBrowser plugin");
            }
        } else {
            console.log('vou rejeitar promessa porque nao encontrei o window.cordova');
            deferred.reject("Cannot authenticate via a web browser");
        }
        console.log('Estou devolvendo a promessa.');
        return deferred.promise;


        // console.log('vou tentar o InAppBrowser');
        // var ref = window.open('http://apache.org', '_blank', 'location=yes');
        // return ref;
    };

    return {
        openURL: openURL
    };


}]);

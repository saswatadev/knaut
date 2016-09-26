angular.module('ajaxServices', [])
.service('ajaxService', ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {
		//converting json data to post param
        this.queryParams = function(source) {
		  var array = [];		
		  for(var key in source) {
			 array.push(encodeURIComponent(key) + "=" + encodeURIComponent(source[key]));
		  }		
		  return array.join("&");
		}
		
		//this ajax post will be used in case of php post ajax
		this.AjaxPhpPost = function (data, route, successFunction, errorFunction,method , header) {
            //data.wave = $cookies.get('wave_csrf_cookie');
            $rootScope.myPromise = $http({ method: 'post', dataType: "jsonp",crossDomain:true, url: route,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},data: this.queryParams(data) })
                .success(function (response, status, headers, config) {  
                    successFunction(response, status);
                }).error(function (response) {  
                    console.log("Error"+response);
            });
            
        }		

        //this ajax post will be used in case of php post ajax
		this.AjaxSyncPhpPost = function (data, route, successFunction, errorFunction,method , header) {
            var deferred = $q.defer();
            $rootScope.myPromise = $http({ method: 'post', dataType: "jsonp",crossDomain:true, url: route,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},data: this.queryParams(data) })
                .then(function (response, status, headers, config) { 
            		deferred.resolve(response.data);
                })
                return deferred.promise;
            
        }		
		
		//this ajax post will be used in case of php post ajax
		this.AjaxPhpPostFile = function (data, route, successFunction, errorFunction) {	
			$rootScope.myPromise = $http({ method: 'post', dataType: "jsonp",crossDomain:true, url: route,
			headers: {'Content-Type': undefined},data: data ,
			  transformRequest: angular.identity})
			.success(function (response, status, headers, config) {                      
				successFunction(response, status);  
			}).error(function (response) {  
                 console.log("Error"+response);    
			});
        }



    }]);
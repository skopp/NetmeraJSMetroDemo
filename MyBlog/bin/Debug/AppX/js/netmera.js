/**
 * Copyright 2012 Inomera Research
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Serdar Kuzucu
 */

/**
 * @class NetmeraClient class contains the configuration methods.
 * @name NetmeraClient
 */
var NetmeraClient;

/**
 * @class The NetmeraContent object is used to run CRUD operations over the data.
 * After creating object use add() method to fill data and call create() method to add data into cloud.
 * @name NetmeraContent
 * @description Constructor that takes content name as parameter.
 * After creating object use add() method to fill data and call create() method to add data into cloud.
 * @param {String} objectName Name of the content
 */
var NetmeraContent;

/**
 * @class NetmeraService is used to get NetmeraContent object by its search() and get() methods. 
 * Many query options defined to help finding exact object.
 * @name NetmeraService
 * @description Default constructor for the NetmeraService that sets objectName and other default parameters.
 * Default value for the max = 10 and page = 0. It returns 10 result in each page. It skips page * max in each iteration.
 * @param {String} objectName Name of the content
 */
var NetmeraService;

/**
 * @class NetmeraGeoLocation is used to create location with the given latitude and longitude values. 
 * It is used to set location into the content and then use it on the search queries.
 * @name NetmeraGeoLocation
 * @example     The example below shows how it is used.
 *              var location = new NetmeraGeoLocation(41,29);
 *              var content = new NetmeraContent("SampleContent");
 *              content.add("location", location);
 *              content.create(function(){}, function(){});
 * @description Creates location with the given latitude and longitude.
 * @param {Number} latitude must be between the range of (-90,90)
 * @param {Number} longitude must be between the range of (-180,180)
 */
var NetmeraGeoLocation;

/**
 * @class NetmeraUser object is for managing users of the application. 
 * You can register, update, login users with this class.
 * @name NetmeraUser
 * @description Default constructor to create user object.
 */
var NetmeraUser;

/**
 * @class Exception handling mechanism for Netmera API. 
 * It throws an exception when there is a failure while creating,editing,deleting and searching data. 
 * Also it throws and exception when there is an network connection error.
 * @name NetmeraException
 * @description Creates an exception
 * @param {Integer} errorCode Code of this exception
 * @param {String} message message of this exception
 */
var NetmeraException;

(function () {
    var _st = null;

    var _request = {};
    _request.params = {};
    _request.params.contentActionToken = "contentActionToken";
    _request.params.path = "path";
    _request.params.contentType = "contentType";
    _request.params.contentName = "contentName";
    _request.params.content = "content";
    _request.params.max = "max";
    _request.params.page = "page";
    _request.params.customCondition = "customCondition";
    _request.params.searchText = "searchText";
    _request.params.sortBy = "sortBy";
    _request.params.sortOrder = "sortOrder";
    _request.params.contentPrivacy = "contentPrivacy";
    _request.params.moderationStatus = "moderationStatus";
    _request.params.searchType = "searchType";
    _request.params.fieldName = "fieldName";
    _request.params.latitude = "latitude";
    _request.params.longitude = "longitude";
    _request.params.distance = "distance";
    _request.params.locationSuffix = "_netmera_mobile_loc";
    _request.params.latitudeSuffix = "_netmera_mobile_latitude";
    _request.params.longitudeSuffix = "_netmera_mobile_longitude";

    _request.userParams = {};
    _request.userParams.user = "user";
    _request.userParams.email = "email";
    _request.userParams.emailValue = "value";
    _request.userParams.emails = "emails";
    _request.userParams.password = "password";
    _request.userParams.loginPassword = "pwd";
    _request.userParams.nickname = "nickname";
    _request.userParams.defaultNickname = "defaultNickname";
    _request.userParams.name = "name";
    _request.userParams.givenName = "givenName";
    _request.userParams.familyName = "familyName";
    _request.userParams.surname = "surname";
    _request.userParams.securityToken = "st";
    _request.userParams.profileAttributes = "profile";

    _request.url = "http://netmera.com";
    _request.rpcUrl = "/social/rest";
    _request.rpcAlternateUrl = "/social/rpc?";
    _request.post = "POST";
    _request.get = "GET";
    _request.st = "st=";
    _request.actionTokenMethod = "/content/createActionToken?";
    _request.createContentMethod = "/content/createContent?";
    _request.updateContentMethod = "/content/updateContent?";
    _request.removeContentMethod = "/content/deleteContent?";
    _request.searchContentMethod = "/content/search?";
    _request.getContentMethod = "/content/get?";
    _request.locationSearchContentMethod = "/content/locationSearch?";
    _request.registerUserMethod = "/site/register?";
    _request.loginUserMethod = "site.login";
    _request.activateUserMethod = "site.activateUser";
    _request.deactivateUserMethod = "site.deactivateUser";
    _request.peopleSearchMethod = "/people/search?";
    _request.profileUpdateMethod = "people.profileUpdate";
    _request.accountUpdateMethod = "people.accountUpdate";

    /**
     * @constructor
     * 
     */
    NetmeraException = function (errorCode, message) {
        var _code = errorCode;
        var _message = message;

        /**
         * Returns the message of this exception
         * @return {String} the message of the exception
         */
        this.getMessage = function () {
            return _message;
        }

        /**
         * Returns the code of the exception. 
         * @return {Integer} the code of the exception
         */
        this.getErrorCode = function () {
            return _code;
        };
    };

    /**
     * @class Error codes that you can use to identify NetmeraExceptions
     * @name NetmeraException.ErrorCode
     * 
     */
    NetmeraException.ErrorCode = {
        // ErrorCodes related to general exceptions
        /** @constant */
        EC_INTERNAL_SERVER_ERROR: 100,
        /** @constant */
        EC_IO_EXCEPTION: 101,
        /** @constant */
        EC_NULL_EXCEPTION: 102,
        /** @constant */
        EC_HTTP_PROTOCOL_EXCEPTION: 103,
        /** @constant */
        EC_INVALID_URL: 104,
        /** @constant */
        EC_INVALID_JSON: 105,
        /** @constant */
        EC_INVALID_DATE_FORMAT: 106,
        /** @constant */
        EC_INVALID_REQUEST: 107,
        /** @constant */
        EC_INVALID_RESPONSE: 108,
        /** @constant */
        EC_UNSUPPORTED_ENCODING: 109,
        /** @constant */
        EC_INVALID_ACTION_TOKEN: 110,

        // ErrorCodes related to data exceptions
        /** @constant */
        EC_REQUIRED_FIELD: 131,
        /** @constant */
        EC_INVALID_DATA_TYPE: 132,
        /** @constant */
        EC_INVALID_KEY: 133,
        /** @constant */
        EC_INVALID_PATH: 134,
        /** @constant */
        EC_INVALID_OBJECT_NAME: 135,

        // ErrorCodes related to user exceptions
        /** @constant */
        EC_INVALID_EMAIL: 151,
        /** @constant */
        EC_INVALID_PASSWORD: 152,
        /** @constant */
        EC_ALREADY_REGISTERED_EMAIL: 153,
        /** @constant */
        EC_USER_LOGIN_ERROR: 154,
        /** @constant */
        EC_USER_REGISTER_ERROR: 155,
        /** @constant */
        EC_USER_UPDATE_ERROR: 156,

        // ErrorCodes related to geo-location
        /** @constant */
        EC_INVALID_LATITUDE: 171,
        /** @constant */
        EC_INVALID_LONGITUDE: 172,

        /** @constant */
        EC_JSON_PUT_EXCEPTION: 191,
        /** @constant */
        EC_JSON_GET_EXCEPTION: 192
    };

    var ec = NetmeraException.ErrorCode;
    var _exceptions = {};
    _exceptions[ec.EC_IO_EXCEPTION] = "Cannot connect to the server";
    _exceptions[ec.EC_REQUIRED_FIELD] = " is required";
    _exceptions[ec.EC_INVALID_REQUEST] = "Invalid request";
    _exceptions[ec.EC_JSON_PUT_EXCEPTION] = "Error occurred while adding data.";
    _exceptions[ec.EC_JSON_GET_EXCEPTION] = "Error occurred while getting data.";
    _exceptions[ec.EC_NULL_EXCEPTION] = " cannot be null";
    _exceptions[ec.EC_INVALID_DATA_TYPE] = "Data type is invalid";
    _exceptions[ec.EC_INVALID_DATE_FORMAT] = "Date format must be like yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";

    var _defaultParams = {};
    _defaultParams.serviceName = "netmera-mobimera";
    _defaultParams.parentPath = "/mobimeracontents";
    _defaultParams.peoplePath = "/people";
    _defaultParams.contentType = "netmera-mobimera:mobimera";
    _defaultParams.createAction = "netmera-mobimera:create-mobimera";
    _defaultParams.updateAction = "netmera-mobimera:update-mobimera";
    _defaultParams.apiContentType = "netmera-mobimera:api-content-type";
    _defaultParams.privacyType = "public";
    _defaultParams.moderationStatus = "production";
    _defaultParams.circleSearch = "circle";
    _defaultParams.boxSearch = "box";

    var type = {
        func: function (arg) {
            return typeof arg === 'function';
        },
        object: function (arg) {
            return typeof arg === 'object';
        }
    };

    /**
     * jQuery's $.each function
     * @param obj
     * @param callback
     */
    function each(obj, callback) {
        var name, i = 0, length = obj.length, isObj = length === undefined || type.object(obj);

        if (isObj) {
            for (name in obj) {
                if (callback.call(obj[name], name, obj[name]) === false) {
                    break;
                }
            }
        } else {
            for (; i < length;) {
                if (callback.call(obj[i], i, obj[i++]) === false) {
                    break;
                }
            }
        }
    }

    function serialize(obj, prefix) {
        var str = [];
        for (var p in obj) {
            var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
            str.push(typeof v == "object" ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
        return str.join("&");
    }

    function getXMLHttpRequest() {
        if (window.XMLHttpRequest) {
            return new window.XMLHttpRequest;
        } else {
            try {
                return new ActiveXObject("MSXML2.XMLHTTP.3.0");
            } catch (e) {
                return null;
            }
        }
    }

    function send(params, successCB, errorCB) {
        var request = getXMLHttpRequest();
        if (!request) {
            errorCallback(errorCB, ec.EC_IO_EXCEPTION);
            return;
        }

        var req = {
            url: params.url,
        };

        if (params.content)
            req.url = req.url + "&" + serialize(params.data) + "&content=" + JSON.stringify(params.content);
        else
            req.url = req.url + "&" + serialize(params.data);

        request.open(params.method, req.url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    successCB(JSON.parse(request.responseText));
                } else {
                    errorCallback(errorCB, ec.EC_IO_EXCEPTION);
                }
            }
        }
        request.ontimeout = function () {
            errorCallback(errorCB, ec.EC_IO_EXCEPTION);
        };
        request.send(null);
    }

    function sendRpc(params, successCB, errorCB) {
        var request = getXMLHttpRequest();
        if (!request) {
            errorCallback(errorCB, ec.EC_IO_EXCEPTION);
            return;
        }

        var req = {
            url: params.url,
            data: JSON.stringify(params.data),
        };

        request.open(params.method, req.url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    successCB(JSON.parse(request.responseText));
                } else {
                    errorCallback(errorCB, ec.EC_IO_EXCEPTION);
                }
            }
        }
        request.ontimeout = function () {
            errorCallback(errorCB, ec.EC_IO_EXCEPTION);
        };

        request.send(req.data);
    }

    function errorCallback(cb, code) {
        if (type.func(cb)) {
            var error = new NetmeraException(code, _exceptions[code]);
            cb(error);
        }
    }

    function search(data, stoken, callback, onfail) {
        var params = {};
        params.url = _request.url + _request.rpcUrl + _request.searchContentMethod + _request.st + stoken;
        params.method = _request.post;
        params.data = {};
        params.data[_request.params.path] = _defaultParams.parentPath;
        params.data[_request.params.contentType] = _defaultParams.contentType;
        params.data[_request.params.customCondition] = data[_request.params.customCondition];
        params.data[_request.params.searchText] = data[_request.params.searchText];
        params.data[_request.params.max] = data[_request.params.max];
        params.data[_request.params.page] = data[_request.params.page];
        params.data[_request.params.sortBy] = data[_request.params.sortBy];
        params.data[_request.params.sortOrder] = data[_request.params.sortOrder];

        send(params, function (response) {
            if (response) {
                if (type.func(callback))
                    callback(response);
            } else {
                errorCallback(ec.EC_IO_EXCEPTION);
            }
        }, onfail);
    }

    function boxSearch(data, stoken, callback, onerror) {
        var params = {};
        params.url = _request.url + _request.rpcUrl + _request.locationSearchContentMethod + _request.st + stoken;
        params.method = _request.post;
        params.data = {};
        params.data[_request.params.searchType] = _defaultParams.boxSearch;
        params.data[_request.params.fieldName] = data[_request.params.fieldName];
        params.data[_request.params.latitude] = data[_request.params.latitude];
        params.data[_request.params.longitude] = data[_request.params.longitude];
        params.data[_request.params.path] = _defaultParams.parentPath;
        params.data[_request.params.contentType] = _defaultParams.contentType;
        params.data[_request.params.customCondition] = data[_request.params.customCondition];
        params.data[_request.params.searchText] = data[_request.params.searchText];
        params.data[_request.params.max] = data[_request.params.max];
        params.data[_request.params.page] = data[_request.params.page];

        send(params, function (response) {
            if (response) {
                if (type.func(callback))
                    callback(response);
            } else {
                errorCallback(onerror, ec.EC_IO_EXCEPTION);
            }
        }, onerror);
    }

    function circleSearch(data, stoken, callback, onerror) {
        var params = {};
        params.url = _request.url + _request.rpcUrl + _request.locationSearchContentMethod + _request.st + stoken;
        params.method = _request.post;
        params.data = {};
        params.data[_request.params.searchType] = _defaultParams.circleSearch;
        params.data[_request.params.fieldName] = data[_request.params.fieldName];
        params.data[_request.params.latitude] = data[_request.params.latitude];
        params.data[_request.params.longitude] = data[_request.params.longitude];
        params.data[_request.params.distance] = data[_request.params.distance];
        params.data[_request.params.path] = _defaultParams.parentPath;
        params.data[_request.params.contentType] = _defaultParams.contentType;
        params.data[_request.params.customCondition] = data[_request.params.customCondition];
        params.data[_request.params.searchText] = data[_request.params.searchText];
        params.data[_request.params.max] = data[_request.params.max];
        params.data[_request.params.page] = data[_request.params.page];

        send(params, function (response) {
            if (response) {
                if (type.func(callback))
                    callback(response);
            } else {
                errorCallback(onerror, ec.EC_IO_EXCEPTION);
            }
        }, onerror);
    }

    function get(data, stoken, callback, onerror) {
        var params = {};
        params.url = _request.url + _request.rpcUrl + _request.getContentMethod + _request.st + stoken;
        params.method = _request.get;
        params.data = {};
        params.data[_request.params.path] = data[_request.params.path];

        send(params, function (response) {
            if (response && response.entry) {
                if (type.func(callback))
                    callback(response.entry);
            } else {
                errorCallback(onerror, ec.EC_IO_EXCEPTION);
            }
        }, onerror);
    }

    function actionToken(serviceName, path, actionName, stoken, callback, onfail) {
        var params = {};
        params.url = _request.url + _request.rpcUrl + _request.actionTokenMethod + _request.st + stoken;
        params.method = _request.get;
        params.data = {
            "path": path,
            "service": serviceName,
            "action": actionName
        };

        send(params, function (response) {
            if (response && response.entry) {
                if (type.func(callback))
                    callback(response.entry.key);
            } else {
                errorCallback(onerror, ec.EC_IO_EXCEPTION);
            }
        }, onfail);
    }

    function create(data, stoken, callback, onfail) {
        actionToken(_defaultParams.serviceName, _defaultParams.parentPath, _defaultParams.createAction, stoken, function (actionToken) {
            var params = {};
            params.url = _request.url + _request.rpcUrl + _request.createContentMethod + _request.st + stoken;
            params.method = _request.post;
            params.data = {};
            params.content = data;
            params.data[_request.params.contentActionToken] = actionToken;
            params.data[_request.params.path] = _defaultParams.parentPath;
            params.data[_request.params.contentType] = _defaultParams.contentType;
            params.data[_request.params.contentName] = Math.floor((Math.random() * 1000) + 1);

            send(params, function (response) {
                if (response && response.entry) {
                    if (type.func(callback))
                        callback(response.entry);
                } else {
                    errorCallback(onfail, ec.EC_IO_EXCEPTION);
                }
            }, onfail);
        }, onfail);
    }

    function update(data, stoken, callback, onfail) {
        var updatePath = data[_request.params.path];
        actionToken(_defaultParams.serviceName, updatePath, _defaultParams.updateAction, stoken, function (actionToken) {
            var params = {};
            params.url = _request.url + _request.rpcUrl + _request.updateContentMethod + _request.st + stoken;
            params.method = _request.post;
            params.data = {};
            params.content = data;
            params.data[_request.params.contentActionToken] = actionToken;
            params.data[_request.params.contentPrivacy] = data[_request.params.contentPrivacy];
            params.data[_request.params.moderationStatus] = data[_request.params.moderationStatus];
            params.data[_request.params.path] = updatePath;
            params.data[_request.params.contentType] = _defaultParams.contentType;
            params.data[_request.params.contentName] = Math.floor((Math.random() * 1000) + 1);

            send(params, function (response) {
                if (response && response.entry) {
                    if (type.func(callback))
                        callback(response.entry);
                } else {
                    errorCallback(onfail, ec.EC_IO_EXCEPTION);
                }
            }, onfail);
        }, onfail);
    }

    function remove(path, stoken, callback, onfail) {
        var params = {};
        params.url = _request.url + _request.rpcUrl + _request.removeContentMethod + _request.st + stoken;
        params.method = _request.post;
        params.data = {};
        params.data[_request.params.path] = path;

        send(params, function (response) {
            if (type.func(callback))
                callback();
        }, onfail);
    }

    function createUser(json) {
        var user = new NetmeraUser();
        if (json[_request.userParams.email])
            user.setEmail();

        if (json[_request.userParams.name]) {
            if (json[_request.userParams.name][_request.userParams.givenName])
                user.setName(json[_request.userParams.name][_request.userParams.givenName]);

            if (json[_request.userParams.name][_request.userParams.familyName])
                user.setSurname(json[_request.userParams.name][_request.userParams.familyName]);
        }

        if (json[_request.userParams.nickname])
            user.setNickname(json[_request.userParams.nickname]);

        return user;
    }

    /**
     * @constructor
     */
    NetmeraService = function (objectName) {
        var _objectName = objectName;
        var _queries = new Array();
        var _searchText = {};
        var _max = 10;
        var _page = 0;
        var _path = {};
        var _totalResults = {};
        var _entries = new Array();
        var _data = {};
        var _whereKeys = {};
        var _sortBy = {};
        var _sortOrder = "ascending";
        var _hasOwner = false;

        function clearEntries() {
            _entries = new Array();
        }

        function pushWhereKey(key, value) {
            if (key in _whereKeys) {
                _whereKeys[key] += "," + value;
            } else {
                _whereKeys[key] = "{" + value;
            }
        }

        function searchParams(pageParam, maxParam) {
            var customCondition = "{";
            each(_queries, function (index, val) {
                customCondition += val + ",";
            });

            for (key in _whereKeys) {
                customCondition += "'" + key + "':" + _whereKeys[key] + "}, ";
            }

            customCondition += "'" + _defaultParams.apiContentType + "' : '" + _objectName + "'}";
            _data[_request.params.page] = pageParam;
            _data[_request.params.max] = maxParam;
            _data[_request.params.customCondition] = customCondition;

            if (_searchText && typeof _searchText !== 'object') {
                _data[_request.params.searchText] = _searchText;
                _data[_request.params.sortBy] = "";
                _data[_request.params.sortOrder] = "";
            } else {
                _data[_request.params.searchText] = {};
                _data[_request.params.sortBy] = _sortBy;
                _data[_request.params.sortOrder] = _sortOrder;
            }
        }

        function userSearchParams(pageParam, maxParam) {
            var customCondition = "{";
            each(_queries, function (index, val) {
                customCondition += val + ",";
            });
            for (key in _whereKeys) {
                customCondition += "'" + key + "':" + _whereKeys[key] + "}, ";
            }
            customCondition += "}";
            _data[_request.params.page] = pageParam;
            _data[_request.params.max] = maxParam;
            _data[_request.params.customCondition] = customCondition;
            if (_searchText && typeof _searchText !== 'object') {
                _data[_request.params.searchText] = _searchText;
                _data[_request.params.sortBy] = "";
                _data[_request.params.sortOrder] = "";
            } else {
                _data[_request.params.searchText] = {};
                _data[_request.params.sortBy] = _sortBy;
                _data[_request.params.sortOrder] = _sortOrder;
            }
        }

        /**
         * Adds the searchText into the query.
         * @param {String} searchText Text to search
         */
        this.addSearchText = function (searchText) {
            _searchText = searchText;
        };

        /**
         * Sorts the content with the given key.
         * @param {String} sortBy key to sort content
         */
        this.setSortBy = function (sortBy) {
            _sortBy = sortBy;
        };

        /**
         * Sorts the content with the given order. If not setted then by default it is sorted by ascending order.
         * @param {String} sortOrder order of the sort
         * @example You can use NetmeraService.SortOrder to set sort order
         *      var service = new NetmeraService("__CONTENT_TYPE_NAME__");
         *      service.setSortBy("__A_FIELD_NAME__");
         *      service.setSortOrder(NetmeraService.SortOrder.ascending);
         *      //service.setSortOrder(NetmeraService.SortOrder.descending);
         */
        this.setSortOrder = function (sortOrder) {
            _sortOrder = sortOrder;
        };

        /**
         * Returns the path of the content.
         * @return {String} path the path of the content.
         */
        this.getPath = function () {
            return _path;
        };

        /**
         * Sets the path of the content.This is used to find the content to delete and update.
         * @param {String} path path ofthe content
         */
        this.setPath = function (path) {
            _path = path;
        };

        /**
         * Sets the total number of results to return. If it is less than or equal to 0 then it is setted to 10.
         * @param {Integer} max the total number of results to return
         */
        this.setMax = function (max) {
            _max = max;
        };

        /**
         * Sets the current page of items to return. If it is less than 0 then it is setted to 0.
         * @param {Integer} page the current page of items to return
         * @example For example, if you set max as 10 and set page as 3, search results start with the 30. content
         */
        this.setPage = function (page) {
            if (page < 0) {
                _page = 0;
            } else {
                _page = page;
            }
        };

        /**
         * Adds an options to the query where value that matches with the query is equal to the given value.
         * @param {String} key key to identify specified value
         * @param {Object} value value associates with the specified key
         */
        this.whereEqual = function (key, value) {
            if (typeof (value) === 'string')
                value = "'" + value + "'";
            _queries.push("'" + key + "':" + value);
        };

        /**
         * Adds an options to the query where value that matches with the query is greater than the given value.
         * @param {String} key key to identify specified value
         * @param {Object} value value associates with the specified key
         */
        this.whereGreaterThan = function (key, value) {
            if (typeof (value) === 'string')
                value = "'" + value + "'";
            pushWhereKey(key, "$gt :" + value);
        };

        /**
         * Adds an options to the query where value that matches with the query is less than the given value.
         * @param {String} key key to identify specified value
         * @param {Object} value value associates with the specified key
         */
        this.whereLessThan = function (key, value) {
            if (typeof (value) === 'string')
                value = "'" + value + "'";
            pushWhereKey(key, "$lt :" + value);
        };

        /**
         * Adds an options to the query where value that matches with the query is not equal to the given value.
         * @param {String} key key to identify specified value
         * @param {String} value value associates with the specified key
         */
        this.whereNotEqual = function (key, value) {
            if (typeof (value) === 'string')
                value = "'" + value + "'";
            pushWhereKey(key, "$ne :" + value);
        };

        /**
         * Adds an options to the query where value that matches with the query is greater than or equal to the given value.
         * @param {String} key key to identify specified value
         * @param {Object} value value associates with the specified key
         */
        this.whereGreaterThanOrEqual = function (key, value) {
            if (typeof (value) === 'string')
                value = "'" + value + "'";
            pushWhereKey(key, "$gte :" + value);
        };

        /**
         * Adds an options to the query where value that matches with the query is less than or equal to the given value.
         * @param {String} key key to identify specified value
         * @param {Object} value value associates with the specified key
         */
        this.whereLessThanOrEqual = function (key, value) {
            if (typeof (value) === 'string')
                value = "'" + value + "'";
            pushWhereKey(key, "$lte :" + value);
        };

        /**
         * Adds an options to the query where the given key is exists or not. 
         * If value is true then it checks whether key exists, if value is false then it checks whether key not exists.
         * @param {String} key key to identify specified value
         * @param {Boolean} value value associates with the specified key
         */
        this.whereExists = function (key, value) {
            var bool = (value) ? true : false;
            _queries.push("'" + key + "': {$exists :" + bool + "}");
        };

        /**
         * Adds an options to the query where value that returns from the query matches with the given regex.
         * @param {String} key key to identify specified value
         * @param {String} regex value associates with the specified key
         */
        this.whereMatches = function (key, regex) {
            _queries.push("'" + key + "': {$regex :/" + regex + "/}");
        };

        /**
         * Adds an options to the query where value that matches with the query starts with the given prefix.
         * @param {String} key key to identify specified value
         * @param {String} prefix value associates with the specified key
         */
        this.whereStartsWith = function (key, prefix) {
            _queries.push("'" + key + "': {$regex :/^" + prefix + "/}");
        };

        /**
         * Adds an options to the query where value that matches with the query ends with the given suffix.
         * @param {String} key key to identify specified value
         * @param {String} suffix value associates with the specified key
         */
        this.whereEndsWith = function (key, suffix) {
            _queries.push("'" + key + "': {$regex :/" + suffix + "$/}");
        };

        /**
         * Adds an options to the query where value that matches with the query contains any of the values in the given collection.
         * @param {String} key key to identify specified value
         * @param {Array} value value associates with the specified key
         */
        this.whereContainedIn = function (key, value) {
            var _value = JSON.stringify(value);
            _queries.push("'" + key + "': {$in : " + _value + "}");
        };

        /**
         * Adds an options to the query where value that matches with the query contains all of the values in the given collection.
         * @param {String} key key to identify specified value
         * @param {Array} value value associates with the specified key
         */
        this.whereAllContainedIn = function (key, value) {
            var _value = JSON.stringify(value);
            _queries.push("'" + key + "': {$all : " + _value + "}");
        };

        /**
         * Adds an option to the query where returning contents have owner as current logged user
         * A user must be logged before using this method
         * @throws NetmeraException if there is no user logged in
         */
        this.whereOwnerEqual = function () {
            if (_currentUserSt === null) {
                throw new NetmeraException();
            }

            _hasOwner = true;
        };

        /**
         * Gets the total number of results that matches the query.
         * @param {Function} onsuccess callback function called when count is successful
         * @param {Function} onfail callback function called when count failed
         * @example 
         * var service = new NetmeraService("ContentName");
         * service.count(function(num) {
         *     // Number of contents is 'num'
         * }, function(error) {
         *     // Operation failed, look at 'error' to identify the error
         * });
         */
        this.count = function (onsuccess, onfail) {
            searchParams(0, 1);

            var stoken = (_hasOwner) ? _currentUserSt : _st;

            search(_data, stoken, function (response) {
                _totalResults = response.totalResults;
                clearEntries();
                if (type.func(onsuccess))
                    onsuccess(_totalResults);
            }, onfail);
        };

        /**
         * Retrieves the Array of NetmeraContent objects that matches with the query.
         * @param {Function} onsuccess callback function called when search is successful
         * @param {Function} onfail callback function called when search failed
         * @example
         * var service = new NetmeraService("ContentName");
         * service.search(function(entries) {
         *      // iterate through 'entries' array
         * }, function(error) {
         *      // Do something with 'error'
         * });
         */
        this.search = function (onsuccess, onfail) {
            searchParams(_page, _max);

            var stoken = (_hasOwner) ? _currentUserSt : _st;

            search(_data, stoken, function (response) {
                //_totalResults = response.totalResults;
                var entries = new Array();
                each(response.entry, function (key, val) {
                    var ctx = new NetmeraContent(val.content.data[_defaultParams.apiContentType]);
                    ctx.init(val);
                    entries.push(ctx);
                });
                if (type.func(onsuccess))
                    onsuccess(entries);
            }, onfail);
        };

        /**
         * Creates box using the given two location (latitude,longitude) data and searches inside that box.
         * @param {NetmeraGeoLocation} firstGeoPoint NetmeraGeoLocation object, which is the corner of the box
         * @param {NetmeraGeoLocation} secondGeoPoint NetmeraGeoLocation object, which the other corner of the box
         * @param {String} locationField name of the field that holds location data.
         * @param {Function} onsuccess callback function called when boxSearch is successful
         * @param {Function} onfail callback function called when boxSearch failed
         * @example
         * var service = new NetmeraService("ContentName");
         * var corner1 = new NetmeraGeoLocation(40.7, 28.6);
         * var corner2 = new NetmeraGeoLocation(41.2, 29.4);
         * service.boxSearch(corner1, corner2, "myLocationField", function(entries) {
         *     // entries[0], entries[1], ...., entries[entries.length-1]
         * }, function(error) {
         *     // Identify 'error' with error.getCode()
         * });
         */
        this.boxSearch = function (firstGeoPoint, secondGeoPoint, locationField, onsuccess, onfail) {
            searchParams(_page, _max);
            _data[_request.params.latitude] = firstGeoPoint.getLatitude() + "," + secondGeoPoint.getLatitude();
            _data[_request.params.longitude] = firstGeoPoint.getLongitude() + "," + secondGeoPoint.getLongitude();
            _data[_request.params.fieldName] = locationField + _request.params.locationSuffix;

            var stoken = (_hasOwner) ? _currentUserSt : _st;

            boxSearch(_data, stoken, function (response) {
                //_totalResults = response.totalResults;
                var entries = new Array();
                each(response.entry, function (key, val) {
                    var ctx = new NetmeraContent(val.content.data[_defaultParams.apiContentType]);
                    ctx.init(val);
                    entries.push(ctx);
                });
                if (type.func(onsuccess))
                    onsuccess(entries);
            }, onfail);
        };

        /**
         * Searches the content by taking given location as a base and retrieves the contents that located given distance far away.
         * @param {NetmeraGeoLocation} geoPoint base location to search near it.
         * @param {Number} distance distance used to create circle by taking the startLocation as a center.
         * @param {String} locationField name of the field that holds location data.
         * @param {Function} onsuccess callback function called when circleSearch is successful
         * @param {Function} onfail callback function called when circleSearch failed
         * @example
         * var service = new NetmeraService("ContentName");
         * var center = new NetmeraGeoLocation(41, 29);
         * var distance = 4; // 4 kilometers
         * service.circleSearch(center, distance, "myLocationField", function(entries) {
         *     // entries[0], entries[1], ...., entries[entries.length-1]
         * }, function(error) {
         *     // Identify 'error' with error.getCode()
         * });
         */
        this.circleSearch = function (geoPoint, distance, locationField, onsuccess, onfail) {
            searchParams(_page, _max);
            _data[_request.params.latitude] = geoPoint.getLatitude();
            _data[_request.params.longitude] = geoPoint.getLongitude();
            _data[_request.params.distance] = distance;
            _data[_request.params.fieldName] = locationField + _request.params.locationSuffix;

            var stoken = (_hasOwner) ? _currentUserSt : _st;

            circleSearch(_data, stoken, function (response) {
                //_totalResults = response.totalResults;
                var entries = new Array();
                each(response.entry, function (key, val) {
                    var ctx = new NetmeraContent(val.content.data[_defaultParams.apiContentType]);
                    ctx.init(val);
                    entries.push(ctx);
                });
                if (type.func(onsuccess))
                    onsuccess(entries);
            }, onfail);
        };

        /**
         * Gets the single NetmeraContent object whose path is equal to the given path with setPath(path).
         * @param {Function} onsuccess callback function called when get is successful
         * @param {Function} onfail callback function called when get method failed
         * @example 
         * var service = new NetmeraService("ContentName");
         * service.setPath("Your Content's Path");
         * service.get(function(content) {
         *     var path = content.getPath();
         * }, function(error) {
         *     // Identify 'error' with error.getCode()
         * });
         */
        this.get = function (onsuccess, onfail) {
            _data[_request.params.path] = _path;

            var stoken = (_hasOwner) ? _currentUserSt : _st;

            get(_data, stoken, function (entry) {
                var ctx = new NetmeraContent(entry.content.data[_defaultParams.apiContentType]);
                ctx.init(entry);
                if (type.func(onsuccess))
                    onsuccess(ctx);
            }, onfail);
        };

        /**
         * Retrieves the Array of NetmeraUser objects that matches with the query.
         * @param {Function} onsuccess callback function called when searchUser is successful
         * @param {Function} onfail callback function called when searchUser failed
         * @example
         * var service = NetmeraService.getNetmeraUserService();
         * service.searchUser(function(users) {
         *     for(var i=0; i < users.length; i++) {
         *         console.log(users[i].getNickname());
         *     }
         * }, function(error) {
         *     console.log(error.getMessage());
         * });
         */
        this.searchUser = function (onsuccess, onfail) {
            this.setPath(_defaultParams.peoplePath);
            userSearchParams(_page, _max);

            var stoken = (_hasOwner) ? _currentUserSt : _st;

            var params = {};
            params.url = _request.url + _request.rpcUrl + _request.peopleSearchMethod + _request.st + stoken;
            params.method = _request.post;
            params.data = {};
            params.data[_request.params.path] = _defaultParams.peoplePath;
            params.data[_request.params.customCondition] = _data[_request.params.customCondition];
            params.data[_request.params.searchText] = _data[_request.params.searchText];
            params.data[_request.params.max] = _data[_request.params.max];
            params.data[_request.params.page] = _data[_request.params.page];

            send(params, function (response) {
                if (response) {
                    if (type.func(onsuccess)) {
                        var users = new Array();
                        each(response.entry, function (key, val) {
                            var user = createUser(val);
                            users.push(user);
                        });
                        onsuccess(users);
                    }
                } else {
                    errorCallback(onfail, ec.EC_IO_EXCEPTION);
                }
            }, onfail);
        };
    }

    /**
     * @constructor
     */
    NetmeraContent = function (objectName) {
        var _objectName = objectName;
        var _data = {};
        var _path = {};
        var _content = {};
        var _contentType = {};
        var _owner = {};
        var _privacy = {};
        var _moderationStatus = {};
        var _hasOwner = false;

        function setContent(entry) {
            _data = entry.content.data;
            _objectName = entry.content.data[_defaultParams.apiContentType];
            _path = entry.content.path;
            _content = entry.content;
            _contentType = entry.type;
            _owner = entry.owner;
            _privacy = entry.content.privacyTypeName;
            _moderationStatus = entry.content.moderationStatus;
        }

        function clearContent() {
            _data = {};
            _objectName = {};
            _path = {};
            _content = {};
            _contentType = {};
            _owner = {};
            _privacy = {};
            _moderationStatus = {};
        }

        /**
         * Adds key,value pairs into the object. If the object contains key, the old value is replaced.
         * @param {String} key key to identify specified value
         * @param {Object} value value associates with the specified key
         */
        this.add = function (key, val) {
            if (!key)
                throw new NetmeraException(ec.EC_NULL_EXCEPTION, "key" + _exceptions[ec.EC_NULL_EXCEPTION]);
            if (val == null || typeof val === 'undefined')
                throw new NetmeraException(ec.EC_NULL_EXCEPTION, "val" + _exceptions[ec.EC_NULL_EXCEPTION]);

            try {
                if (val instanceof NetmeraGeoLocation) {
                    _data[key + _request.params.locationSuffix] = val.getLatitude() + "," + val.getLongitude();
                    _data[key + _request.params.latitudeSuffix] = val.getLatitude();
                    _data[key + _request.params.longitudeSuffix] = val.getLongitude();
                } else {
                    _data[key] = val;
                }
            } catch (e) {
                throw new NetmeraException(ec.EC_JSON_PUT_EXCEPTION, _exceptions[ec.EC_JSON_PUT_EXCEPTION]);
            }
        };

        /**
         * Adds data to the cloud.
         * @param {Function} onsuccess callback function called when create is successful
         * @param {Function} onfail callback function called when create failed
         */
        this.create = function (onsuccess, onfail) {
            _data[_defaultParams.apiContentType] = _objectName;

            var stoken = (_hasOwner) ? _currentUserSt : _st;

            create(_data, stoken, function (entry) {
                setContent(entry);
                if (type.func(onsuccess))
                    onsuccess();
            }, onfail);
        };

        /**
         * Updates data
         * @param {Function} onsuccess callback function called when update is successful
         * @param {Function} onfail callback function called when update failed
         */
        this.update = function (onsuccess, onfail) {
            _data[_defaultParams.apiContentType] = _objectName;
            _data[_request.params.contentPrivacy] = _privacy;
            _data[_request.params.moderationStatus] = _moderationStatus;
            _data[_request.params.path] = _path;

            var stoken = (_hasOwner) ? _currentUserSt : _st;

            update(_data, stoken, function (entry) {
                setContent(entry);
                if (type.func(onsuccess))
                    onsuccess();
            }, onfail);
        };

        /**
         * Deletes data from the cloud.
         * Before calling this method path of the data should be setted by calling setPath(String) method.
         * @param {Function} onsuccess callback function called when delete is successful
         * @param {Function} onfail callback function called when delete failed
         */
        this.delete = function (onsuccess, onfail) {
            var stoken = (_hasOwner) ? _currentUserSt : _st;

            remove(_path, stoken, function () {
                clearContent();
                if (type.func(onsuccess))
                    onsuccess();
            }, onfail);
        };

        /**
         * Gets the Object with the specified key.
         * @param {String} key key to get value
         * @returns {Object} the Object with the specified key.If the object type is not Object or key does not exists then it returns null.
         */
        this.get = function (key) {
            if (typeof _data[key] !== 'undefined') {
                return _data[key];
            } else {
                return null;
            }
        };

        /**
         * Returns the boolean value with the specified key.
         * If value is not a boolean or key does not exists then it returns false.
         * @param {String} key key to get value
         * @return {Boolean} the boolean value with the specified key.If value is not a boolean or key does not exists then it returns false.
         */
        this.getBoolean = function (key) {
            var val = this.get(key);
            if (typeof val === 'boolean') {
                return val;
            } else {
                return false;
            }
        };

        /**
         * Returns the number value with the specified key.
         * If value is not a number or key does not exists then it returns 0.
         * @param key key to get value
         * @return {Number} the number value with the specified key. If value is not a number or key does not exists then it returns 0.
         */
        this.getNumber = function (key) {
            var val = this.get(key);
            if (typeof val === 'number') {
                return val;
            } else {
                return 0;
            }
        };

        /**
         * Gets the String object with the specified key.
         * @param key key to get value
         * @returns {String} the String with the specified key.
         * If the object type is not String or key does not exists then it returns null.
         */
        this.getString = function (key) {
            var val = this.get(key);
            if (typeof val === 'string') {
                return val;
            } else {
                return null;
            }
        };

        /**
         * Returns the NetmeraGeoLocation object with the specified key.
         * If the object type is not an NetmeraGeoLocation or key does not exists then it returns null.
         * @param {String} key key to get value
         * @return {NetmeraGeoLocation} Returns the NetmeraGeoLocation object with the specified key. If the object type is not an NetmeraGeoLocation or key does not exists then it returns null.
         */
        this.getNetmeraGeoLocation = function (key) {
            var lat = this.get(key + _request.params.latitudeSuffix);
            var lng = this.get(key + _request.params.longitudeSuffix);
            if (lat && lng) {
                return new NetmeraGeoLocation(lat, lng);
            } else {
                return null;
            }
        };

        /**
         * Gets the Object object with the specified key.
         * @param {String} key key to get value
         * @return {Object} Returns the object with the specified key. 
         * If the object type is not an Object or key does not exists then it returns null.
         */
        this.getJSONObject = function (key) {
            var value = this.get(key);
            if (typeof value === 'object') {
                return value;
            } else {
                return null;
            }
        };

        /**
         * Gets the Array object with the specified key.
         * @param {String} key key to get value
         * @return {Array} Returns the Array object with the specified key.
         * If the object type is not an Array or key does not exists then it returns null.
         */
        this.getJSONArray = function (key) {
            var value = this.get(key);
            if (typeof value === 'object' && value instanceof Array) {
                return value;
            } else {
                return null;
            }
        };

        /**
         * Returns the path of the content.
         * @return {String} the path of the content
         */
        this.getPath = function () {
            return _path;
        };

        /**
         * Sets the path of the content.This is used to find the content to delete and update.
         * @param {String} path path of the content
         */
        this.setPath = function (path) {
            _path = path;
        };

        /**
         * Returns the name of the content.
         * @return {String} the name of the content
         */
        this.getObjectName = function () {
            return _objectName;
        };

        /**
         * Sets the owner of this content as logged user.
         * The user must login before calling this method.
         * @throws {NetmeraException} if there is no logged user
         */
        this.setOwner = function () {
            if (_currentUserSt === null)
                throw new NemeraException();

            _hasOwner = true;
        };

        /**
         * @ignore
         */
        this.init = function (entry) {
            setContent(entry);
        };
    }

    /** 
     * @constructor
     */
    NetmeraGeoLocation = function (latitude, longitude) {
        var _latitude = latitude;
        var _longitude = longitude;

        /**
         * Get latitude.
         * @return {Number} the latitude of the given location.
         */
        this.getLatitude = function () {
            return _latitude;
        };

        /**
         * Get longitude
         * @return {Number} the longitude of the given location
         */
        this.getLongitude = function () {
            return _longitude;
        };

        /**
         * Set latitude into the location. Latitude must be between the range of (-90.0, 90.0).
         * @param {Number} latitude Location's latitude
         */
        this.setLatitude = function (latitude) {
            _latitude = latitude;
        };

        /**
         * Set longitude into the location. Longitude must be between the range of (-180.0, 180.0).
         * @param {Number} longitude Location's longitude
         */
        this.setLongitude = function (longitude) {
            _longitude = longitude;
        };
    }

    var _currentUser = null;
    var _currentUserSt = null;

    function setCurrentUser(json) {
        if (json[_request.userParams.securityToken]) {
            _currentUserSt = json[_request.userParams.securityToken];
        }

        var user = new NetmeraUser();

        if (json[_request.userParams.email]) {
            user.setEmail(json[_request.userParams.email]);
        }

        if (json[_request.userParams.nickname]) {
            user.setNickname(json[_request.userParams.nickname]);
        }

        if (json[_request.userParams.name]) {
            user.setName(json[_request.userParams.name]);
        }

        if (json[_request.userParams.surname]) {
            user.setSurname(json[_request.userParams.surname]);
        }

        _currentUser = user;
    }

    /**
     * @constructor 
     */
    NetmeraUser = function () {
        var _email = null;
        var _password = null;
        var _nickname = null;
        var _name = null;
        var _surname = null;

        function setUser(json) {
            if (json[_request.userParams.emails]) {
                var emailJson = json[_request.userParams.emails][0];

                if (emailJson[_request.userParams.emailValue]) {
                    _email = emailJson[_request.userParams.emailValue];
                }
            }

            if (json[_request.userParams.nickname]) {
                _nickname = json[_request.userParams.nickname];
            }

            if (json[_request.userParams.name]) {
                var nameObj = json[_request.userParams.name];

                if (nameObj[_request.userParams.givenName]) {
                    _name = nameObj[_request.userParams.givenName];
                }

                if (nameObj[_request.userParams.familyName]) {
                    _surname = nameObj[_request.userParams.familyName];
                }
            }
        }

        function accountUpdate(onsuccess, onfail) {
            var params = {};
            params.url = _request.url + _request.rpcAlternateUrl + _request.st + _st;
            params.method = _request.post;
            params.data = {};
            params.data["method"] = _request.accountUpdateMethod;
            params.data["params"] = {};

            if (_email) {
                params.data["params"][_request.userParams.email] = _email;
            } else {
                throw new Error(_request.userParams.email + _exceptions.messages.EC_REQUIRED_FIELD);
            }

            if (_password) {
                params.data["params"][_request.userParams.password] = _password;
            } else {
                throw new Error(_request.userParams.password + _exceptions.messages.EC_REQUIRED_FIELD);
            }

            if (_name) {
                params.data["params"][_request.userParams.name] = _name;
            }

            if (_surname) {
                params.data["params"][_request.userParams.surname] = _surname;
            }

            sendRpc(params, onsuccess, onfail);
        }

        function profileUpdate(onsuccess, onfail) {
            var params = {};
            params.url = _request.url + _request.rpcAlternateUrl + _request.st + _st;
            params.method = _request.post;
            params.data = {};

            params.data["method"] = _request.profileUpdateMethod;
            params.data["params"] = {};

            if (_email) {
                params.data["params"][_request.userParams.email] = _email;
            } else {
                throw new Error(_request.userParams.email + _exceptions.messages.EC_REQUIRED_FIELD);
            }

            if (_nickname) {
                params.data["params"][_request.userParams.nickname] = _nickname;
            } else {
                throw new Error(_request.userParams.nickname + _exceptions.messages.EC_REQUIRED_FIELD);
            }

            if (_name) {
                params.data["params"][_request.userParams.name] = _name;
            }

            if (_surname) {
                params.data["params"][_request.userParams.surname] = _surname;
            }

            sendRpc(params, onsuccess, onfail);
        }

        /**
         * Registers new user. 
         * Before calling this method email,password and nickname fields of the NetmeraUser should be setted. 
         * Those are the compulsory fields. There are also optional name and surname fields.
         * @param {Function} onsuccess callback function called when register is successful
         * @param {Function} onfail callback function called when register failed
         */
        this.register = function (onsuccess, onfail) {
            var params = {};
            params.url = _request.url + _request.rpcUrl + _request.registerUserMethod + _request.st + _st;
            params.method = _request.post;
            params.data = {};
            if (_email) {
                params.data[_request.userParams.email] = _email;
            } else {
                throw new Error(_request.userParams.email + _exceptions.messages.EC_REQUIRED_FIELD);
            }

            if (_nickname) {
                params.data[_request.userParams.nickname] = _nickname;
            } else {
                throw new Error(_request.userParams.nickname + _exceptions.messages.EC_REQUIRED_FIELD);
            }

            if (_password) {
                params.data[_request.userParams.password] = _password;
            } else {
                throw new Error(_request.userParams.password + _exceptions.messages.EC_REQUIRED_FIELD);
            }

            if (_name) {
                params.data[_request.userParams.name] = _name;
            }

            if (_surname) {
                params.data[_request.userParams.surname] = _surname;
            }

            send(params, function (response) {
                if (response.entry) {
                    setUser(response.entry);
                    if (typeof onsuccess === 'function') {
                        onsuccess();
                    }
                } else {
                    if (typeof onfail === 'function') {
                        onfail();
                    }
                }
            }, onfail);
        };

        /**
         * Updates user info. 
         * Before calling this method email,password and nickname fields of the NetmeraUser should be setted. Those are the compulsory fields.
         * @param {Function} onsuccess callback function called when update is successful
         * @param {Function} onfail callback function called when update failed.
         */
        this.update = function (onsuccess, onfail) {
            if (_nickname) {
                profileUpdate(function (response) {
                    if (response.data) {
                        setUser(response.data);
                        if (_password) {
                            accountUpdate(function (response) {
                                if (!response.data) {
                                    if (typeof onfail === 'function') {
                                        onfail();
                                    }
                                } else {
                                    if (typeof onsuccess === 'function') {
                                        onsuccess();
                                    }
                                }
                            }, onfail);
                        } else {
                            if (typeof onsuccess === 'function') {
                                onsuccess();
                            }
                        }
                    } else {
                        if (typeof onfail === 'function') {
                            onfail();
                        }
                    }
                }, onfail);
            } else if (_password) {
                accountUpdate(function (response) {
                    if (response.data) {
                        setUser(response.data);
                        if (typeof onsuccess === 'function') {
                            onsuccess();
                        }
                    } else {
                        if (typeof onfail === 'function') {
                            onfail();
                        }
                    }
                }, onfail);
            }
        };

        /**
         * Activates the registered User.
         * @param {String} email email address of the user to be activated
         * @param {Function} onsuccess callback function called when activateUser is successful
         * @param {Function} onfail callback function called when activateUser failed
         */
        this.activateUser = function (email, onsuccess, onfail) {
            var params = {};
            params.url = _request.url + _request.rpcAlternateUrl + _request.st + _st;
            params.method = _request.post;
            params.data = {};

            params.data["method"] = _request.activateUserMethod;
            params.data["params"] = {};

            if (email) {
                params.data["params"][_request.userParams.email] = email;
            } else {
                throw new Error(_request.userParams.email + _exceptions.messages.EC_REQUIRED_FIELD);
            }

            sendRpc(params, function (response) {
                if (response.data) {
                    if (typeof onsuccess === 'function') {
                        onsuccess();
                    }
                } else {
                    if (typeof onfail === 'function') {
                        onfail();
                    }
                }
            }, onfail);
        };

        /**
         * Deactivates the registered User.
         * @param {String} email email address of the user to be deactivated
         * @param {Function} onsuccess callback function called when deactivateUser is successful
         * @param {Function} onfail callback function called when deactivateUser failed
         */
        this.deactivateUser = function (email, onsuccess, onfail) {
            var params = {};
            params.url = _request.url + _request.rpcAlternateUrl + _request.st + _st;
            params.method = _request.post;
            params.data = {};

            params.data["method"] = _request.deactivateUserMethod;
            params.data["params"] = {};

            if (email) {
                params.data["params"][_request.userParams.email] = email;
            } else {
                throw new Error(_request.userParams.email + _exceptions.messages.EC_REQUIRED_FIELD);
            }

            sendRpc(params, function (response) {
                if (response.data) {
                    if (typeof onsuccess === 'function') {
                        onsuccess();
                    }
                } else {
                    errorCallback(onfail, ec.EC_IO_EXCEPTION);
                }
            }, onfail);
        };

        /**
         * Returns the email of the user
         * @return {String} the email of the user
         */
        this.getEmail = function () {
            return _email;
        };

        /**
         * Sets the email of the user
         * @param {String} email email of the user
         */
        this.setEmail = function (email) {
            _email = email;
        };

        /**
         * Sets the password of the user
         * @param {String} password password of the user
         */
        this.setPassword = function (password) {
            _password = password;
        };

        /**
         * Returns the nickname of the user
         * @return {String} the nickname of the user
         */
        this.getNickname = function () {
            return _nickname;
        };

        /**
         * Sets the nickname of the user
         * @param {String} nickname the nickname of the user
         */
        this.setNickname = function (nickname) {
            _nickname = nickname;
        };

        /**
         * Returns the name of the user
         * @return {String} the name of the user
         */
        this.getName = function () {
            return _name;
        };

        /**
         * Sets the name of the user
         * @param {String} name the name of the user
         */
        this.setName = function (name) {
            _name = name;
        };

        /**
         * Returns the surname of the user
         * @return {String} the surname of the user
         */
        this.getSurname = function () {
            return _surname;
        };

        /**
         * Sets the surname of the user
         * @param {String} surname the surname of the user
         */
        this.setSurname = function (surname) {
            _surname = surname;
        };
    }

    /**
     * @constructor
     */
    NetmeraClient = function () { };
    /**
     * Authenticates user and application. It is recommended to call this method at the beginning of the program.
     * @param {String} apiKey User and Application specific key
     */
    NetmeraClient.init = function (apiKey) {
        _st = apiKey;
    }

    /**
     * It creates the NetmeraUser service object. It is used to search users.
     * @return {NetmeraService} the NetmeraUser service object to search users
     */
    NetmeraService.getNetmeraUserService = function () {
        return new NetmeraService();
    };

    /**
     * @class Enumeration which is used to set sort order of NetmeraService
     * @name NetmeraService.SortOrder
     * 
     */
    NetmeraService.SortOrder = {
        /**
         * Sort order type used to sort the data in an ascending order
         */
        ascending: "ascending",

        /**
         * Sort order type used to sort the data in a descending order
         */
        descending: "descending"
    };

    /**
     * Returns the current logged user. If no user logged in then it returns null.
     * @return {NetmeraUser} Returns current logged user if a user is logged, otherwise it returns null
     */
    NetmeraUser.getCurrentUser = function () {
        return _currentUser;
    };

    /**
     * Logs a user into the registered application. Email and password fields of user is used for this operation.
     * @param {String} email email of the user
     * @param {String} password password of the user
     * @param {Function} onsuccess callback function called when login is successful
     * @param {Function} onfail callback function called when login failed
     */
    NetmeraUser.login = function (email, password, onsuccess, onfail) {
        var params = {};
        params.url = _request.url + _request.rpcAlternateUrl + _request.st + _st;
        params.method = _request.post;
        params.data = {};
        params.data["method"] = _request.loginUserMethod;
        params.data["params"] = {};

        if (email) {
            params.data["params"][_request.userParams.email] = email;
        } else {
            throw new NetmeraException(ec.EC_REQUIRED_FIELD, _request.userParams.email + _exceptions.messages.EC_REQUIRED_FIELD);
        }

        if (password) {
            params.data["params"][_request.userParams.password] = password;
        } else {
            throw new NetmeraException(ec.EC_REQUIRED_FIELD, _request.userParams.password + _exceptions.messages.EC_REQUIRED_FIELD);
        }

        sendRpc(params, function (response) {
            if (response.data) {
                setCurrentUser(response.data);
                if (typeof onsuccess === 'function') {
                    onsuccess();
                }
            } else {
                errorCallback(onfail, ec.EC_IO_EXCEPTION);
            }
        }, onfail);
    };

    /**
     * User logged out from the application.
     */
    NetmeraUser.logout = function () {
        _currentUserSt = null;
        _currentUser = null;
    };
}());
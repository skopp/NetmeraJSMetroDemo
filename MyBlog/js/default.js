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

// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    WinJS.strictProcessing();

    app.onerror = function (customEventObject) {
        console.log("Exception caught: " + customEventObject.detail.errorMessage);
        return true;
    };

    function clearContent() {
        $("#blogEntries").html("");
    }

    function clearBoxes() {
        $("#blogTitle").val("");
        $("#blogText").val("");
    }

    function addContentToPage(title, text) {
        var title = $("<div class='blogTitle'>" + title + "</div>");
        var text = $("<div class='blogContent'>" + text + "</div>");
        $("<div class='blogEntry' />").append(title).append(text).appendTo("#blogEntries");
    }

    var apiKey = "--- Write Your Api Key Here ---";

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            NetmeraClient.init(apiKey);

            var Controller = {};

            Controller.add = function () {
                var title = $("#blogTitle").val();
                var text = $("#blogText").val();

                if (!title || !text)
                    return;

                var content = new NetmeraContent("BlogEntries");
                content.add("title", title);
                content.add("text", text);

                content.create(function () {
                    clearBoxes();
                    console.log(content.getPath());
                    Controller.reload();
                }, function (error) {
                    console.log(error.getMessage());
                });
            };

            Controller.reload = function () {
                var service = new NetmeraService("BlogEntries");
                service.setSortBy("creationdate");
                service.setSortOrder(NetmeraService.SortOrder.descending);
                service.search(function (contents) {
                    clearContent();
                    $.each(contents, function (key, content) {
                        var title = content.getString("title");
                        var text = content.getString("text");
                        addContentToPage(title, text);
                    });
                }, function (error) {
                    if (error instanceof NetmeraException) {
                        console.log(error.getMessage());
                    }
                });
            };

            $("#submitNewBlog").click(Controller.add);

            Controller.reload();

            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();

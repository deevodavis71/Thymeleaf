/**
 * Websocket interface for client of LogService.
 *
  Message from logserver is a log record in JSON format wrapped with metadata:
 e.g.

"{
  "serviceName": "project-config",
  "line": {
    "timestamp":"2017-07-11T15:17:18.246+01:00",
    "@version":1,
    "message":"Hello project World!",
    "logger_name":"com.airbus.smartdeploy.planning.projectconfiguration.ProjectConfigController",
    "thread_name":"http-nio-4444-exec-1",
    "level":"ERROR",
    "level_value":40000}
 }"

 @author humphr_p
*/
var thisScript = document.getElementById('websocketSupport');
var wsUri = thisScript.getAttribute('data-wsUrl');
var websocket;
var output;

window.addEventListener("load", init, false);
window.addEventListener("beforeunload", closeWebsocket, false);

function init() {
    output = document.getElementById("output");
    openWebSocket();
}

function openWebSocket() {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function (evt) {
        onOpen(evt);
    };
    websocket.onclose = function (evt) {
        onClose(evt);
    };
    websocket.onmessage = function (evt) {
        onMessage(evt);
    };
    websocket.onerror = function (evt) {
        onError(evt);
    };
}

function onOpen(evt) {
    writeToScreen('<span style="color: green;">Connected to LogServer</span>');
}

function onClose(evt) {
    writeToScreen('<span style="color: red;">isconnected from LogServer</span>');
}

function onError(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

/**
 * Add log record to table.
 * Creates a new accordion panel and table if none already exists for this service.
 */
function onMessage(evt) {
    var payload = JSON.parse(evt.data);
    var serviceName = payload.serviceName;
    var logRecord = payload.line;

    var rows = [];
    rows.push({
        timestamp: logRecord.timestamp,
        logger_name: logRecord.logger_name,
        thread_name: logRecord.thread_name,
        message: logRecord.message
    })

    var tableName = serviceName + 'Table';
    if ($.isEmptyObject($.find('#' + tableName))) {
        // Create a new accordion panel containing a data table
        addAccordion(serviceName);
        $('#' + tableName).bootstrapTable({
            data : rows
        });
    } else {
        // Append to existing table
        $('#' + tableName).bootstrapTable('append', rows);
    }
}

function closeWebsocket() {
    websocket.close();
}

function writeToScreen(message) {
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
}

var firstPanel = true;

function addAccordion(serviceName) {
  var collapsePanel = "";
  if (firstPanel) {
      firstPanel = false;
      collapsePanel = " in ";
  }

  var accordionDiv =
    "      <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading panel-heading-custom\">\n" +
    "          <h4 class=\"panel-title\">\n" +
    "            <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse"  +
                                    serviceName + "\">" + serviceName + "</a>\n" +
    "          </h4>\n" +
    "        </div>\n" +
    "        <div id=\"collapse" + serviceName + "\" class=\"panel-collapse collapse " + collapsePanel + "\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <table id=\"" + serviceName + "Table\" class=\"table table-striped\" data-toggle=\"table\" data-height=\"300\">\n" +
    "              <thead>\n" +
    "                <tr>\n" +
    "                  <th data-field=\"timestamp\">Time</th>\n" +
    "                  <th data-field=\"logger_name\">Class</th>\n" +
    "                  <th data-field=\"thread_name\">Thread</th>\n" +
    "                  <th data-field=\"message\">Message</th>\n" +
    "                </tr>\n" +
    "              </thead>\n" +
    "            </table>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>";
  $('#accordion').append(accordionDiv);
}



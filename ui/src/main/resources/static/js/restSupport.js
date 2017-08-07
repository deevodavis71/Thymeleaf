/**
 * REST API support.
 *
 * Parameters:
 *   apiBase: base URL for API
 *   apiEntity: entity type
 *
 */
var thisScript = document.getElementById('restSupport');

var apiBase = thisScript.getAttribute('data-apiBase');
var apiEntity = thisScript.getAttribute('data-apiEntity');

// REST URLs
// Convention:
//   entityName/id:   GET : get entity by id
//                    DELETE: delete entity by id
//                    PUT: update entity
//   entityName +"s": GET : get all
//                    POST: create new
//
// e.g:
// GET http://localhost:3333/order-handling/orders - get all
// DELETE http://localhost:3333/order-handling/order/1 - delete order 1

var objectURI = apiBase + '/' + apiEntity;
var objectsURI = objectURI + "s";
var objectMetadataURI = apiBase + '/metadata/' + apiEntity;

function ajaxRest(uri, method, data, onSuccessCallback) {
    console.log(data);
    var jsonStr = JSON.stringify(data);
    var request = {
        url : uri,
        type : method,
        contentType : "application/json",
        accepts : {
            json : "application/json",
            text : "application/text"
        },
        cache : false,
        dataType : 'json',
        data : jsonStr,
        success : onSuccessCallback,
        error : function(jqXHR) {
            console.log("ajax error " + jqXHR.status + "\n" + jsonStr);
        }
    };
    return $.ajax(request);
}

$('#beginAdd').on('click', function() {
    $('#add').modal('show');
});

window.operateEvents = {
    'click .btnBeginEdit' : function(e, value, row, index) {
        showEdit(row);
    },
    'click .btnDelete' : function(e, value, row, index) {
        ajaxRest(objectURI + '/' + row.id, 'DELETE', row, function() {

            $('#mainTable').bootstrapTable('remove', {
                field : 'id',
                values : [ row.id ]
            });

            $('#mainTable').bootstrapTable('refresh', {
                query : {
                    pageSize : 2
                }
            });
        });
    }
};

function operateFormatter(value) {
    return [ '<button class="btnBeginEdit btn btn-xs btn-success">',
             '  <span class="glyphicon glyphicon-pencil"></span>',
             '</button>',
             '<button class="btnDelete btn btn-xs btn-danger">',
             '  <span class="glyphicon glyphicon-trash"></span>',
            '</button>', ].join('');
}

var addFormWidget;
var objectSchema;

$(document).ready(load());

function load() {
    ajaxRest(objectsURI, 'GET').done(function(mydata) {

// populate main table will *all* results
        $('#mainTable').bootstrapTable({
            data : mydata
        });
    }).done(function() {
        ajaxRest(objectMetadataURI, 'GET').done(function(objectMetadata) {

     // create the "Add" form (metawidget) using JSON schema for the given entity
            objectSchema = objectMetadata;

            addFormWidget = createForm('addMetawidget', objectMetadata);
            addFormWidget.toInspect = {}; // for the add form, source object is empty
            addFormWidget.buildWidgets();
        }).fail(function() {
            console.log('failed to load schema');
        });
    });
}

var editFormWidget;

function showEdit(editObject) {
    // "reset" edit dialog - remove generated metawidget elements from any previous invocation
    $('#editMetawidget').replaceWith('<div id="editMetawidget" class="container" />');

    $('#edit').modal('show');

// Create Edit dialog by combining API entity metadata (JSON schema) with selected object
    editFormWidget = createForm('editMetawidget', objectSchema);
    editFormWidget.toInspect = editObject;
    editFormWidget.buildWidgets();
}


function createForm(elementName) {

    var divLayout = new metawidget.bootstrap.layout.BootstrapDivLayout();
    divLayout.level = 3;
    divLayout.suppressDivAroundLabel = true;

    var widgetLayout = new metawidget.layout.HeadingTagLayoutDecorator(divLayout);

    var formwidget = new metawidget.Metawidget(document.getElementById(elementName), {
        inspectionResultProcessors : [function(inspectionResult, formwidget, toInspect, type, names) {
               var url = objectMetadataURI + '/';

               if (names !== undefined) {
                   url += names.join('/');
//                   widgetLayout.wrapInsideLabels = ['control-group'];
               }
               ajaxRest(url, 'GET', null, function(objectMetadata) {

                   metawidget.util.combineInspectionResults(inspectionResult, objectMetadata);

                   // Resume Metawidget operation
                   formwidget.buildWidgets(inspectionResult);
               });
        }],
        addWidgetProcessors : [ new metawidget.bootstrap.widgetprocessor.BootstrapWidgetProcessor() ],
//        layout : new metawidget.bootstrap.layout.TabLayoutDecorator(
//                new metawidget.bootstrap.layout.BootstrapDivLayout())
        layout : widgetLayout
    });
    return formwidget;
}

function saveAddForm() {
    save(addFormWidget);
}

function saveEditForm() {
    save(editFormWidget);
}

function save(formWidget) {
    formWidget.getWidgetProcessor(function(widgetProcessor) {

        return widgetProcessor instanceof metawidget.widgetprocessor.SimpleBindingProcessor;
    }).save(formWidget);

    var boundObject = formWidget.toInspect;
    console.log(boundObject);
    ajaxRest(objectsURI, 'POST', boundObject);
}

//function cancelEdit() {
//  $('#mainTable').bootstrapTable('refresh', {
//      query : {
//          pageSize : 2
//      }
//  });
//}
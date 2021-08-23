// main
var store = new DevExpress.data.CustomStore({
    key: "id",
    load: function() {
        return sendRequest(apiurl + "/master-tahunajaran");
    },
    insert: function(values) {
        return sendRequest(apiurl + "/master-tahunajaran", "POST", values);
    },
    update: function(key, values) {
        return sendRequest(apiurl + "/master-tahunajaran/"+key, "PUT", values);
    },
    remove: function(key) {
        return sendRequest(apiurl + "/master-tahunajaran/"+key, "DELETE");
    }
});

function moveEditColumnToLeft(dataGrid) {
    dataGrid.columnOption("command:edit", { 
        visibleIndex: -1,
        width: 80 
    });
}

RoleType = [{id:1,roletype:"siswa"}];
// attribute
var dataGrid = $("#grid-tahunajaran").dxDataGrid({    
    dataSource: store,
    allowColumnReordering: true,
    allowColumnResizing: true,
    columnsAutoWidth: true,
    columnMinWidth: 80,
    wordWrapEnabled: true,
    showBorders: true,
    filterRow: { visible: true },
    filterPanel: { visible: true },
    headerFilter: { visible: true },
    selection: {
        mode: "multiple"
    },
    editing: {
        useIcons:true,
        mode: "cell",
        allowAdding: true,
        allowUpdating: true,
        allowDeleting: true,
    },
    scrolling: {
        mode: "virtual"
    },
    columns: [
        {
            caption: '#',
            formItem: { 
                visible: false
            },
            width: 40,
            cellTemplate: function(container, options) {
                container.text(options.rowIndex +1);
            }
        },
        { 
            dataField: "tahun_ajaran",
            validationRules: [
                { type: "required" }
            ]
        },
       
    ],
    export: {
        enabled: true,
        fileName: "data-tahunajaran",
        excelFilterEnabled: true,
        allowExportSelectedData: true
    },
    onContentReady: function(e){
        moveEditColumnToLeft(e.component);
    },
    onToolbarPreparing: function(e) {
        dataGrid = e.component;

        e.toolbarOptions.items.unshift({						
            location: "after",
            widget: "dxButton",
            options: {
                hint: "Refresh Data",
                icon: "refresh",
                onClick: function() {
                    dataGrid.refresh();
                }
            }
        })
    },
}).dxDataGrid("instance");
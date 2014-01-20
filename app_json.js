Ext.onReady(function () {
    Ext.create('Ext.form.Panel', {
        title: 'New receiver',
        width: 300,
        bodyPadding: 10,
        renderTo: "new-receiver-form",
        items: [{
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email',
            allowBlank: false  // requires a non-empty value
        },
        butt]
    });

    var butt= Ext.create('Ext.Button', {
        text: 'Insert receiver',
        renderTo: "new-receiver-form",
        handler: function() {
            Ext.Ajax.request({
                url: 'proxy.php',    // where you wanna post
                success: function(){
                    store.load();
                },   // function called on success
                failure: function(){
                    alert("cannot add receiver");
                },
                params: { email: 'bar' }  // your json data
            });
        }
    });
    //Ext.Msg.alert('Status', 'Changes saved successfully.');
    Ext.define('Bond', {
        extend: 'Ext.data.Model',
        fields: ['id', 'email', 'active', 'activated']
    });

    var store = new Ext.data.Store({
        model: 'Bond',
        autoSync: true,
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'proxy.php',
            reader: {
                type: 'json',
                root: 'items',
                totalProperty: 'totalCount'
            }
        }
    });
    store.load();

    var grid = new Ext.grid.GridPanel({
        viewConfig: { emptyText: 'No data available' },
        store: store,
        columns: [
            { header: 'id', dataIndex: 'id' },
            { header: 'email', dataIndex: 'email', width: 100 },
            { header: 'active', dataIndex: 'active', width: 100 },
            { header: 'activated', dataIndex: 'activated', width: 100 }
        ],
        renderTo: 'group-grid',
        width: 1000,
        height: 300,
        stripeRows: true,
        autoScroll: true,
//        autoHeight: true,
        features: [{ ftype: 'grouping' }],
//        frame: true,
        title: 'Group Receivers'
    }).render();








});

//var task = {
//    run: function() {
//        store.load() // mainquoteStore is a variable... var mainquoteStore=new Ext.data.Store();
//    },
//    interval: 1000 //10 second
//}
//var runner = new Ext.util.TaskRunner();
//runner.start(task);
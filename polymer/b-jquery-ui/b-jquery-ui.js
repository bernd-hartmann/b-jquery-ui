var BJQueryUI = function(){

};
BJQueryUI.prototype.doIt = function(){
alert("do it");
};

BJQueryUI.prototype.createWidget = function(name, options, id){
    //var widgetConfigurationObjectString = '{"label":"Hallo Welt"}';
    //var widgetConfigurationObject = JSON.parse(widgetConfigurationObjectString)// maybe i need this again
    var widgetId = id;
    var widgetConfigurationObject = options;
    var widgetConstructorFunctionName = name;
    var $widget = $("#jqueryUiPlaceholder")[widgetConstructorFunctionName](widgetConfigurationObject);
    $widget.attr("id",widgetId);// give placeholder new id TODO: not performant that way setting id after init
    return $widget;
};
BJQueryUI.prototype.attachEventHandlers = function($widget,attributesNodeMap){
    var attributesStartingWithOnDash = this.getAttributesStartingWithOnDash(attributesNodeMap);
    for (var i=0;i<attributesStartingWithOnDash.length;i++){
        var attribute = attributesStartingWithOnDash[i];
        // e.g.    on-click ---> ["on-","click"] --> [1]
        var eventName = attribute.name.split("on-")[1];
        var eventHandler = attribute.nodeValue;
        bJqueryUI.attachEventHandler($widget,eventName, eventHandler);
    }
};
BJQueryUI.prototype.getAttributesStartingWithOnDash = function (attributesNodeMap){
    // e.g on-click, on-mouseover

    // use jquery map, because attributesNodeMap isn't a real array
    var attributesStartingWithOnDash = $.map(attributesNodeMap,function (attribute) {
        if(attribute.name.indexOf("on-")!==-1){
            return attribute;
        }
    });
    return attributesStartingWithOnDash;
};
BJQueryUI.prototype.attachEventHandler = function($widget,eventName,eventHandlerAsString){
    //eventName = "click"
    //eventHandlerAsString = "function(){alert('servusFromString');}";
    var selfExecutingFunctionString = "("+eventHandlerAsString+")();";
    // execute it TODO: Security Check:-)
    //var eventHandler = function(){alert("jeah");};
    $widget.on(eventName,function(){
        //eventHandler();
        eval(selfExecutingFunctionString);
    });
};
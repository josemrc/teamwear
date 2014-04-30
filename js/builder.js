/**
 * Created by jmrodriguez on 2/3/14.
 */


// init Tooltips
var ToolTipData = {
    shirts: {
        content: {
            title: 'Step 1',
            text: 'Select your shirts style from the left hand menu, then a colour for them.',
            button: true,
            // ready: true
        },
        show: {
            solo: $('.qtips'),
        },
        hide: {
                target: $('#building .selection .shirts:first'),
        },
        // show: {
        //     effect: function() {
        //         $(this).show('slide', 500);
        //     }
        // },
        // hide: {
        //     effect: function() {
        //         $(this).hide('puff', 500);
        //     }
        // },
        position: {
            my: 'top left',
            at: 'top right',
        },
        style: {
            classes: 'qtip-light qtip-bootstrap'
        }
    },
    shorts: {
        content: {
            title: 'Step 2',
            text: 'Select your shorts style from the left hand menu, then a colour for them.',
            button: true,
            ready: true
        },
        show: {
            solo: $('.qtips'),
        },
        hide: {
                target: $('#building .selection .shorts:first'),
        },
        position: {
            my: 'top left',
            at: 'top right',
        },
        style: {
            classes: 'qtip-plain qtip-bootstrap'
        }
    }
};

function uniqId() {
  return Math.round(new Date().getTime() + (Math.random() * 100));
}

function initDesign() {
    console.log('creteBuilding init...');
    globalOrder["id"] = uniqId();

    console.log('creteBuilding init...');
    creteBuilding();
}

function showToolTips(type) {
    var toolTip = $("#building .nav ."+type).qtip(ToolTipData[type]);
    toolTip.qtip('api').show();
    //toolTip.qtip('api').disable();
}

function hideToolTips(type) {
    var toolTip = $("#building .nav ."+type).qtip(ToolTipData[type]);
    toolTip.qtip('api').hide();
    //toolTip.qtip('api').disable();
}

function creteBuilding() {

    // build 
    getStock('stock/shirts.json').done(createShirtsMenu);
    getStock('stock/shorts.json').done(createShortsMenu);
    //getStock('stock/socks.json').done(createSocksMenu)

    //show toottips
    //showToolTips('shirts');
}

function getStock(sURL)
{
    console.log('getStock '+sURL+'...');
    var jqxhr = $.getJSON( sURL )
    .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    })
    .done(function( stock ) {
        console.log( "Request was done");
        return stock;
    });
    return jqxhr;
}

function printClothes(stock)
{
    createShirtList(stock);
}

function createShirtsMenu(stock)
{
    var type = 'shirts';
                        
    // create menu
    var menuList = '<div class="header ui-widget-header ui-corner-tr ui-corner-tl">'+type+'</div>';
    menuList += '<ul id="'+type+'list">';
    $.each( stock, function( i, item ) {
        console.log( "load shirt.name>"+item.name );
        menuList += '<li id="'+item.id+'" ><a href="#"><span class="ui-icon ui-icon-disk"></span>'+item.name+'</a></li>';
    });
    menuList += '</ul>';
    $('#building .nav .'+type).html(menuList);
    $('#'+type+'list').menu();

    // add events
    $('#'+type+'list li').on('click',  { type: type, clothe: stock }, clickMenuList);

    // init with the first shirt
   $('#'+type+'list li:first-child').trigger('click');
}

function createShortsMenu(stock)
{
    var type = 'shorts';
                        
    // create menu
    var menuList = '<div class="header ui-widget-header ui-corner-tr ui-corner-tl">'+type+'</div>';
    menuList += '<ul id="'+type+'list">';
    $.each( stock, function( i, item ) {
        console.log( "load shirt.name>"+item.name );
        menuList += '<li id="'+item.id+'" ><a href="#"><span class="ui-icon ui-icon-disk"></span>'+item.name+'</a></li>';
    });
    menuList += '</ul>';
    $('#building .nav .'+type).html(menuList);
    $('#'+type+'list').menu();

    // add events
    $('#'+type+'list li').on('click',  { type: type, clothe: stock }, clickMenuList);
}

function createSocksMenu(stock)
{
    var type = 'socks';
                        
    // create menu
    var menuList = '<div class="header ui-widget-header ui-corner-tr ui-corner-tl">'+type+'</div>';
    menuList += '<ul id="'+type+'list">';
    $.each( stock, function( i, item ) {
        console.log( "load shirt.name>"+item.name );
        menuList += '<li id="'+item.id+'" ><a href="#"><span class="ui-icon ui-icon-disk"></span>'+item.name+'</a></li>';
    });
    menuList += '</ul>';
    $('#building .nav .'+type).html(menuList);
    $('#'+type+'list').menu();

    // add events
    $('#'+type+'list li').on('click', { type: type, clothe: stock }, clickMenuList);

}

function clickMenuList(event)
{
    var type = event.data.type;
    var clothe = event.data.clothe;
    printKitPanel(this.id, type, clothe);
}

function hoverColors()
{
    var kitImg = $(this).attr('data-kit-builder-image');
    $('#building .kit img').attr('src', kitImg);
}

function clickColors(event)
{
    var type = event.data.type;
    var kitImg = $(this).attr('data-kit-builder-image');
    var kitColor = $(this).attr('data-kit-builder-color');
    $('#building .selection .'+type).html('<img src="'+kitImg+'"></img>');

    var kitId = $('div.kit .header').first().attr('data-kit-builder-id');
    var kitName = $('div.kit .header').first().attr('data-kit-builder-name');
    globalOrder[type] = {
        'id': kitId,
        'name': kitName,
        'color': kitColor,
    };
    console.log(globalOrder);

    //hideToolTips('shirts');
    //showToolTips('shorts');
}

function printKitPanel(sel, type, clothe)
{
    console.log('printKitPanel'+sel+' clothe' +clothe);
    var kitPanel = '';
    $.each( clothe, function( i, item ) {
        if ( item.id == sel ) {
            console.log("item.id "+item.id +" sel>"+sel);
            kitName = item.name;
            var kitImg = '<div class="header ui-widget-header ui-corner-tr ui-corner-tl" '+
                                    'data-kit-builder-id="'+item.id+'" '+
                                    'data-kit-builder-name="'+item.name+'" >'+ item.name +
                        '</div>';
            kitImg += '<img src="'+item.imageUrl+'"></img>';
            var kitColor = '';
            if ( item.colors ) {
                kitColor += '<div class="header ui-widget-header ui-corner-tr ui-corner-tl">Select your colour</div>';
                kitColor += '<div class="colorpanel">';
                $.each( item.colors, function( i, item ) {
                    kitColor += '<div class="colour">'+
                                    '<input id="radio-'+i+'" name="radio-2-set" class="colourpicker regular-radio big-radio" type="radio" '+
                                                    'data-kit-builder-color="'+item.name+'" '+
                                                    'data-kit-builder-image="'+item.imageUrl+'">'+
                                    '</input>'+
                                    '<label for="radio-'+i+'" name="'+item.code+'" class="colourpickerlabel" style="background-color: #'+item.code+' !important" '+
                                                    'data-kit-builder-image="'+item.imageUrl+'">'+
                                    '</label>'+
                                    '<br>'+item.name+
                                '</div>';
                });
                kitColor += '</div>';
            }
            var kitDesc = '<div class="header ui-widget-header ui-corner-tr ui-corner-tl">Description</div>';
            kitDesc += '<p>'+item.description+'</p>';
            kitPanel = kitImg + kitColor + kitDesc;
        }
    });
    
    if ( kitPanel !== '' ) {
        $('#building .kit').html(kitPanel);
    }

    // add events
    $('#building .colorpanel .colour .colourpickerlabel').hover(hoverColors);
    //$('#building .colorpanel .colour .colourpicker').click(clickColors);
    $('#building .colorpanel .colour .colourpicker').on('click', { type: type }, clickColors);
}

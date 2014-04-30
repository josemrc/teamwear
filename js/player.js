/**
 * Created by jmrodriguez on 2/3/14.
 */

var playerCustomRow = '';

function createPlayerCustom() {
	console.log(globalOrder);

	// create custom row from sizes
	getStock('stock/sizes.json').done(createPlayerCustomTable);

}

function createPlayerCustomTable(sizes) {
	var sizeSelects = [];
    $.each( sizes, function( i, item ) {
    	var type = item.type;
    	var sizeOpts = '';
	    $.each( item.sizes, function( i2, item2 ) {
			sizeOpts += '<option value="0" name="'+item2.name+'"">'+item2.description+'</option>';
	    });
		sizeSelects[type] = '<select class="customisedropmenu" name="">'+
        						'<option value="-1">Please Select</option>'+
        						'<option value="0">Not Required</option>'+
        						sizeOpts+
        					'</select>';
    });
	playerCustomRow = '<tr>'+
			'<td class="row-num">1</td>'+
			'<td class="player_kit size_shirts">'+sizeSelects['shirts']+'</td>'+
			'<td class="player_kit name_shirts"><input type="text" name="" value="" maxlength="10"></td>'+
			'<td class="player_kit number_shirts"><input type="text" name="" value="" maxlength="2"></td>'+
			'<td class="player_kit size_shorts">'+sizeSelects['shorts']+'</td>'+
			'<td class="player_kit size_socks">'+sizeSelects['socks']+'</td>'+
		'</tr>';

	var playerCustom = '<table class="player-kit-wrapper" border="1" cellspacing="0">'+
		'<thead>'+
		'<tr>'+
			'<th class="first-header" rowspan="2"># Player</th>'+
			'<th class="first-header" colspan="3">Shirts</th>'+
			'<th class="first-header" colspan="1" rowspan="2">Shorts</th>'+
			'<th class="first-header" colspan="1" rowspan="2">Socks</th>'+
		'</tr>'+
		'<tr>'+
			'<th>Size</th>'+
			'<th>Name<span class="prices"><div class="pricing"><small>Price Per Kit: £5.00</small></div></span></th>'+
			'<th>Number<span class="prices"><div class="pricing"><small>Price Per Character: £2.00</small></div></span></th>'+
		'</tr>'+
		'</thead>'+
		'<tbody>'+
			playerCustomRow+
		'</tbody>'+
		'</table>';

	$("#player-custom").html(playerCustom);

	// add button table
	var buttonTable = '<table class="player-kit-buttons" cellspacing="0">'+
		'<tbody>'+
		'<tr>'+
			'<td class="first-header row-add-1">'+
				'<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false">'+
					'<span class="ui-button-icon-primary ui-icon ui-icon-circle-plus"></span>'+
					'<span class="ui-button-text">Add &nbsp;1&nbsp;</span>'+
				'</button>'+
			'</td>'+
			'<td class="first-header row-remove-1">'+
				'<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false">'+
					'<span class="ui-button-icon-primary ui-icon ui-icon-circle-minus"></span>'+
					'<span class="ui-button-text">Remove &nbsp;1&nbsp;</span>'+
				'</button>'+
			'</td>'+
		'</tr>'+
		'<tr>'+
			'<td class="first-header row-add-5">'+
				'<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false">'+
					'<span class="ui-button-icon-primary ui-icon ui-icon-circle-plus"></span>'+
					'<span class="ui-button-text">Add &nbsp;5&nbsp;</span>'+
				'</button>'+
			'</td>'+
			'<td class="first-header row-remove-5">'+
				'<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false">'+
					'<span class="ui-button-icon-primary ui-icon ui-icon-circle-minus"></span>'+
					'<span class="ui-button-text">Remove &nbsp;5&nbsp;</span>'+
				'</button>'+
			'</td>'+
		'</tr>'+
		'<tr>'+
			'<td class="first-header row-add-10">'+
				'<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false">'+
					'<span class="ui-button-icon-primary ui-icon ui-icon-circle-plus"></span>'+
					'<span class="ui-button-text">Add 10</span>'+
				'</button>'+
			'</td>'+
			'<td class="first-header row-remove-10">'+
				'<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false">'+
					'<span class="ui-button-icon-primary ui-icon ui-icon-circle-minus"></span>'+
					'<span class="ui-button-text">Remove 10</span>'+
				'</button>'+
			'</td>'+
		'</tr>'+
		'</tbody>'+
		'</table>';
	$("#player-custom").append(buttonTable);

	// add click events: remove and add rows
	$('table.player-kit-buttons button').hover(
		function() { $(this).addClass('ui-state-active') }, function() { $(this).removeClass('ui-state-active') }
	);
	$('table.player-kit-buttons button').hover(
		function() { $(this).addClass('ui-state-active') }, function() { $(this).removeClass('ui-state-active') }
	);
	$('table.player-kit-buttons .row-add-1 button').on('click',  { num: 1 }, addRow);
	$('table.player-kit-buttons .row-remove-1 button').on('click',  { num: 1 }, removeRow);
	$('table.player-kit-buttons .row-add-5 button').on('click',  { num: 5 }, addRow);
	$('table.player-kit-buttons .row-remove-5 button').on('click',  { num: 5 }, removeRow);
	$('table.player-kit-buttons .row-add-10 button').on('click',  { num: 10 }, addRow);
	$('table.player-kit-buttons .row-remove-10 button').on('click',  { num: 10 }, removeRow);

}

function addRow(event) {
	var num = event.data.num;
	for (var i=0;i<num;i++) {
		var rowNum = Number($('table.player-kit-wrapper > tbody > tr:last .row-num').text()) + 1;
		if ( rowNum <= 100 ) {
			$('table.player-kit-wrapper > tbody:last').append(playerCustomRow);
			$('table.player-kit-wrapper > tbody > tr:last .row-num').text(rowNum);			
		}
	}
}

function removeRow(event) {
	var num = event.data.num;
	for (var i=0;i<num;i++) {
		$('table.player-kit-wrapper > tbody > tr:last').remove();	
	}
}

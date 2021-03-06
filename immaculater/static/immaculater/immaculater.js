"use strict";
// JavaScript routines common to many servlets.
var HTMLescapeText = document.createTextNode("");
var HTMLescapeNative = document.createElement("span");
HTMLescapeNative.appendChild(HTMLescapeText);
function HTMLescape(html) {
    HTMLescapeText.nodeValue = html;
    return HTMLescapeNative.innerHTML;
}

function createButton(servlet, csrfToken, uid, hiddenValues, buttonText, labelText) {
     return '<form class="form-inline i-pjax-form" action="' + servlet +
'" method="post">' +
csrfToken +
'<input type="hidden" name="uid" value="' + uid + '">' +
hiddenValues +
'<div class="form-group">' +
((labelText === undefined) ? '' : '<label for="x123">' + labelText + '</label>') +
'<input id="x123" type="submit" value="' + buttonText +
'" class="btn btn-primary form-control"></div></form>';
}

function createOption(value, text, currentlySelected) {
    var s = (currentlySelected === value) ? ' selected="selected"' : '';
    return '<option value="' + value + '"' + s + '>' + text + '</option>';
}

function viewFilterHTML(servlet, csrfToken, uid, currentlySelected) {
    return '<form role="form" class="i-pjax-form form-inline" action="' +
servlet + '" method="post">' +
csrfToken +
((uid === undefined) ? '' : '<input type="hidden" name="uid" value="' +
uid + '">') +
'<input type="hidden" name="cmd" value="view">' +
'<div data-toggle="tooltip" data-placement="top" data-html="true" title="<em>All</em> shows all but deleted items. <em>Actionable</em> hides completed items and items from inactive contexts and projects. <em>Needing review</em> hides reviewed projects." class="form-group">' +
'<select name="view_filter" class="form-control i-submits-when-changed">' +
createOption('all', 'All', currentlySelected) +
createOption('actionable', 'Actionable', currentlySelected) +
createOption('needing_review', 'Needing review', currentlySelected) +
createOption('incomplete', 'Incomplete, even if inactive', currentlySelected) +
createOption('inactive_and_incomplete', 'Inactive, incomplete', currentlySelected) +
createOption('all_even_deleted', 'Truly all, even deleted', currentlySelected) +
'<input type="submit" value="Set View Filter" class="btn btn-primary">' +
'</div></form>';
}

function pjaxifyForms() {
    $('.i-pjax-form').submit(function(event) {
        $.pjax.submit(event, '#main', {type: "POST", push: false, cache: false});
    });
    
    $('.i-submits-when-changed').change(function(event) {
        $(this).closest('form').submit();
    });
}

function installTooltips() {
    $('[data-toggle="tooltip"]').tooltip();
    $(document).off('pjax:start');
    $(document).on('pjax:start', function(event) {
	$('[data-toggle="tooltip"]').tooltip('dispose');
    });
}

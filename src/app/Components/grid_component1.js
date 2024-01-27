agGrid.initialiseAgGridWithAngular1(angular);
var app = angular.module("tas.aggrid", ["agGrid"]);

app.controller('AGGridController', function ($scope, $rootScope, $timeout, $compile, uiGridConstants, uiGridTreeBaseService) {

	$scope.valcount = {}
	$scope.valSA = {}

	checkboxIcons = {
		checked: '<i class="fa fa-check-square-o"/>',
		unchecked: '<i class="fa fa-square-o"/>',
		inteterminate: '<i class="fa fa-minus-square-o"/>',
	};
	
	document.onclick = hideMenu; 
	document.oncontextmenu = rightClick;

	// $scope.contextmenu = ''
	function hideMenu() {
		// $scope.contextmenu = contextMenu ? $scope.contextmenu = "annoContextMenu" : $scope.contextmenu = contextMenu
		// document.getElementById($scope.contextmenu).style.display = "none"
		// $scope.contextmenu = false
		document.getElementById("contextMenu").style.display = "none"
		// document.getElementById("annoContextMenu").style.display = "none"
		// document.getElementById("headerContextMenu").style.display = "none"
	}

	function rightClick(e) {
		e.preventDefault();
		var txtsel = window.getSelection().toString()
		console.log('%cgrid_component.js line:30 $scope.contextmenu', 'color: #007acc;', e, e.target, $scope.contextmenu, txtsel.split('\n'));
		
		// if ($scope.contextmenu.length){
		// 	console.log('%cgrid_component.js line:45 $scope.contextmenu', 'color: #007acc;', $scope.contextmenu);
		// 	hideMenu()
		// }
			// if(e.target.attributes.class?.value.includes("header")) {
			// 	$scope.contextmenu = 'headerContextMenu'
			// 	$scope.agconfig.focusedHeader = findAllByKey(event.target, 'parentNode', 'attributes?.["col-id"]?.value')
			// 	console.log('%cgrid_component.js line:38 header', 'color: #007acc;', $scope.agconfig.focusedHeader, e);

			// 	// $scope.gridOptions.api.forEachNodeAfterFilter((node, index) => {
			// 	// 	$scope.agconfig.selectedColumn[index] = node.data ? [node?.data[$scope.agconfig.focusedHeader]] : undefined });
			// }
			// else if(!txtsel) {
			// 	$scope.contextmenuele = {
			// 		colId: findAllByKey(e.target, 'offsetParent', 'attributes["col-id"]?.value'),
			// 		rowId: findAllByKey(e.target, 'offsetParent', 'attributes["row-id"]?.value'),
			// 		rowNode: $scope.gridOptions.api.getRowNode(findAllByKey(e.target, 'offsetParent', 'attributes["row-id"]?.value'))
			// 	}
			// 	console.log('%cgrid_component.js line:37 $scope.contextmenuele', 'color: #007acc;', $scope.contextmenuele);
			// 	$scope.contextmenu = 'contextMenu'
			// }
			// else
				// $scope.contextmenu = 'annoContextMenu'
		
		if (document.getElementById("contextMenu").style.display == "block"){
			console.log('%cgrid_component.js line:45 $scope.contextmenu', 'color: #007acc;', $scope.contextmenu);
			hideMenu()
			rightClick(e)
		} else {
			var menu = document.getElementById("contextMenu")
			menu.style.display = 'block';
			console.log('%cgrid_component.js line:49 $scope.context menu', 'color: #02732c;', menu, menu.style.display,	menu.style, e.pageX, menu.clientWidth, $(window).width(), $scope.contextmenu == 'annoContextMenu');
			menu.style.left = (e.pageX - (menu.clientWidth+e.pageX > $(window).width() ? menu.clientWidth : 0) - ($scope.contextmenu == 'annoContextMenu' ? 60 : 0)) + "px"; 
			menu.style.top = (e.pageY - (menu.clientHeight+e.pageY > $(window).height() ? menu.clientHeight : 0) - ($scope.contextmenu == 'annoContextMenu' ? 30 : 0)) + "px"; 
		}

		// if(txtsel) {
		// 	// console.log('%cgrid_component.js line:38 txtsel', 'color: #007acc;', txtsel);
		// 	if (/* document.getElementById("annoContextMenu").style.display == "block" */$scope.contextmenu) {
		// 		hideMenu();
		// 		rightClick(e)
		// 	} else {
		// 		var menu = document.getElementById("annoContextMenu")
		// 		// menu.style.display = 'block';
		// 		$scope.contextmenu = contextMenu
		// 		menu.style.left = (e.pageX - (menu.clientWidth+e.pageX > $(window).width() ? menu.clientWidth : 0)) + "px"; 
		// 		menu.style.top = e.pageY - (menu.clientHeight+e.pageY > $(window).height() ? menu.clientHeight : 0) + "px"; 
		// 	}			
		// }
		// else {
		// 	console.log('%cgrid_component.js line:41 e.target', 'color: #007acc;', e.target, findAllByKey(e.target, 'offsetParent', 'attributes["col-id"]?.value'));
		// 	$scope.contextmenuele = {
		// 		colId: findAllByKey(e.target, 'offsetParent', 'attributes["col-id"]?.value'),
		// 		rowId: findAllByKey(e.target, 'offsetParent', 'attributes["row-id"]?.value'),
		// 		rowNode: $scope.gridOptions.api.getRowNode(findAllByKey(e.target, 'offsetParent', 'attributes["row-id"]?.value'))
		// 	}
		// 	// console.log('%cgrid_component.js line:33 e, e.target, e.target.offsetParent, e.target.offsetParent.attributes["col-id"].value', 'color: #007acc;', e, e.target, e.target.offsetParent, e.target.offsetParent.attributes["col-id"].value, e.target?.offsetParent?.offsetParent, e.target?.offsetParent?.offsetParent.attributes["row-id"].value, $scope.contextmenuele);

		// 	if (/* document.getElementById("contextMenu").style.display == "block" */$scope.contextmenu){ 
		// 		hideMenu();
		// 		rightClick(e)
		// 	} else{
		// 		var menu = document.getElementById("contextMenu")
		// 		menu.style.display = 'block'; 
		// 		menu.style.left = (e.pageX - (menu.clientWidth+e.pageX > $(window).width() ? menu.clientWidth : 0)) + "px"; 
		// 		menu.style.top = e.pageY - (menu.clientHeight+e.pageY > $(window).height() ? menu.clientHeight : 0) + "px"; 
		// 	}
		// }
	}

	var enableTextFilter = (params) => {
		$(document).ready(function(){
			// console.log('%cgrid_component.js line:1024 $("[ref=eInput][type=text][disabled]")', 'color: #007acc;', $("[ref=eInput][type=text][disabled]"));
			$('[ref=eInput][type=text][disabled]').each((i, elem)=>{
				$(elem).removeAttr('disabled')
				var id = params.columnApi.getAllColumns()[findAllByKey(elem, 'parentNode', 'attributes["aria-colindex"]?.value')-1].colDef.field
				// if($scope.txtfilter.includes(id)) return
				// $scope.txtfilter[id] = ''

				// console.log('1101', i, elem, elem.parentNode.parentNode.parentNode.parentNode.parentNode.attributes['aria-colindex'].value, params.columnApi.getAllColumns()[elem.parentNode.parentNode.parentNode.parentNode.parentNode.attributes['aria-colindex'].value-1].colDef.field, $scope.txtfilter, $scope.txtfilter[params.columnApi.getAllColumns()[elem.parentNode.parentNode.parentNode.parentNode.parentNode.attributes['aria-colindex'].value-1].colDef.field])

				// $(elem).attr('ng-model', 'txtfilter[\''+params.columnApi.getAllColumns()[elem.parentNode.parentNode.parentNode.parentNode.parentNode.attributes['aria-colindex'].value-1].colDef.field+'\']')
				$(elem).attr('onkeyup', 'angular.element($(".ag-theme-alpine")).scope().txtfilterchange(this, "'+id+'")')
				// var innerHTML = $compile(html)($scope)
				// var currente = angular.element(document.getElementById("filterCheckBoxList"));

				// currente.replaceWith(innerHTML);

			})
		});
	}
	// function copy2DToClipboard(array) {
	// 	var csv = '', row, cell;
	// 	for (row = 0; row < array.length; row++) {
	// 	  for (cell = 0; cell < array[row].length; cell++) {
	// 		csv += (array[row][cell]+'').replace(/[\n\t]+/g, ' ');
	// 		if (cell+1 < array[row].length) csv += '\t';
	// 	  }
	// 	  if (row+1 < array.length) csv += '\n';
	// 	}
	// 	copyTextToClipboard(csv);
	//   }
	  
	//   // copied from https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
	//   function fallbackCopyTextToClipboard(text) {
	// 	var textArea = document.createElement("textarea");
	// 	textArea.value = text;
	  
	// 	// Avoid scrolling to bottom
	// 	textArea.style.top = "0";
	// 	textArea.style.left = "0";
	// 	textArea.style.position = "fixed";
	  
	// 	document.body.appendChild(textArea);
	// 	textArea.focus();
	// 	textArea.select();
	  
	// 	try {
	// 	  var successful = document.execCommand('copy');
	// 	  var msg = successful ? 'successful' : 'unsuccessful';
	// 	  // console.log('Fallback: Copying text command was ' + msg);
	// 	} catch (err) {
	// 	  console.error('Fallback: Oops, unable to copy', err);
	// 	}
	  
	// 	document.body.removeChild(textArea);
	//   }
	//   function copyTextToClipboard(text) {
	// 	if (!navigator.clipboard) {
	// 	  fallbackCopyTextToClipboard(text);
	// 	  return;
	// 	}
	// 	navigator.clipboard.writeText(text).then(function() {
	// 	  // console.log('Async: Copying to clipboard was successful!');
	// 	}, function(err) {
	// 	  console.error('Async: Could not copy text: ', err);
	// 	});
	//   }


	$scope.copy2DToClipboard = (array) => {
		console.log('%cgrid_component.js line:9 array', 'color: #007acc;', array);
		var csv = '', row, cell;
		for (row = 0; row < array.length; row++) {
		  for (cell = 0; cell < array[row].length; cell++) {
			csv += (array[row][cell]+'').replace(/[\n\t]+/g, ' ');
			if (cell+1 < array[row].length) csv += '\t';
		  }
		  if (row+1 < array.length) csv += '\n';
		}
		$scope.copyTextToClipboard(csv);
	}

	// copied from https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
	function fallbackCopyTextToClipboard(text) {
		if($('#clipboard').length)
			document.body.removeChild($('#clipboard')[0]);

		var textArea = document.createElement("textarea");
		textArea.value = text;
		
		// Avoid scrolling to bottom
		textArea.style.top = "0";
		textArea.style.left = "0";
		textArea.style.position = "fixed";
		textArea.style.opacity = 0;
		textArea.id = 'clipboard'
		$(textArea.id).val(text)
		
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		// console.log('%cgrid_component.js line:97 textArea.value', 'color: #007acc;', textArea.value, textArea);
		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			console.log('Fallback: Copying text command was ' + msg + ' => ', text.split('\n'));
		} catch (err) {
			console.error('Fallback: Oops, unable to copy', err);
		}
		// document.body.removeChild(textArea);
	}
	function fallbackPasteTextFromClipboard() {
		var textArea = $('#clipboard')
		console.log('%cgrid_component.js line:97 textArea.value', 'color: #007acc;', textArea[0].value, textArea);
		try {
			value = textArea.val()
			console.log('Fallback: Pasting text command was ' + value);
			return value
		} catch (err) {
			console.error('Fallback: Oops, unable to copy', err);
		}
	}
	$scope.copyTextToClipboard = (text) => {
		// console.log('%cgrid_component.js line:104 text', 'color: #007acc;', text, navigator.clipboard);
		$scope.clipboard.text = text
		if (!navigator.clipboard) {
			fallbackCopyTextToClipboard(text);
			return;
		}
		navigator.clipboard.writeText(text).then(function() {
			// console.log('Async: Copying to clipboard was successful!');
		}, function(err) {
			console.error('Async: Could not copy text: ', err);
		});
	}
	$scope.pasteTextFromClipboard = () => {
		// console.log('%cgrid_component.js line:116 navigator', 'color: #007acc;', navigator, navigator.clipboard, window.navigator);
		var text
		if (!navigator.clipboard) {
			text = fallbackPasteTextFromClipboard();
			// return text;
		}
		else {
			navigator.clipboard.readText().then(function(text) {
				text = text
				console.log('Async: Copying to clipboard was successful!', text);
			}, function(err) {
				console.error('Async: Could not copy text: ', err);
			});
		}
		console.log('%cgrid_component.js line:149 text', 'color: #007acc;', text);
		return text
	}
	$scope.copyColumnToExcel = () => {
	}
	$scope.selectionFilter = ''
	$scope.filtercbsearch = ''
	$scope.filtertab = 'filter'
	$scope.txtfilter = {}
	$scope.externalFilterChanged = (item, id) => {
		if(item.val == "(Select All)") $scope.valcount[$scope.filterColId].map(val=>val.checked=item.checked)
		var ch = $scope.valcount[$scope.filterColId].filter(val=>val.checked)
		console.log('%cgrid_component.js line:8 event', 'color: #007acc;', item, id, ch != 0 && ch != item.count, ch, $scope.valcount[$scope.filterColId].length);
		ch.length > 0 && ch.length < $scope.valcount[$scope.filterColId].length ? $('#filterCheckBox0')[0].indeterminate = true : $('#filterCheckBox0')[0].indeterminate = false
		$scope.gridOptions.api.onFilterChanged();
	}
	class headerGroupSelect {
		params;
		filterText;
		gui;
		eFilterText;

		init(params) {
		  this.params = params;
		  this.filterText = null;
		  this.setupGui(params);
		}

		// not called by AG Grid, just for us to help setup
		setupGui(params) {
			// console.log('%cgrid_component.js line:20 params', 'color: #007acc;', params);
			
			// $scope.valcount[$scope.filterColId].sort((a,b) => (a.val > b.val) ? 1 : ((b.val > a.val) ? -1 : 0))
			// $scope.valcount[$scope.filterColId].unshift({
			// 	val: '(Select All)',
			// 	count: $scope.gridOptions.api.getDisplayedRowCount(),
			// 	checked: true,
			// })
			// obj_compare()
			this.gui = document.createElement('div');
			this.gui.innerHTML = 
			`
				<div id="header">
				</div>
			`;
			
			$timeout(()=>{
				var html = 
				`
					<div style="width: 100%; height: 100%;" class="ag-header-group-cell-label" 	ref="agContainer" role="presentation" ng-click="mainSelection('colGroup', $event)">
						<span ref="eLabel" class="ag-header-group-text" role="presentation">${this.params.displayName}</span>
					</div>
				`
				var innerHTML = $compile(html)($scope)
				var currente = angular.element(document.getElementById("header"));
	
				currente.replaceWith(innerHTML);
			}, 100)

			// const listener = (event) => {
			// 	console.log('%cgrid_component.js line:99 params', 'color: #007acc;', params);
			// 	// $scope.gridOptions.api.onFilterChanged()
			// 	// this.filterText = event.target.value;
			// 	params.filterChangedCallback();
			// };

			// this.eFilterText = this.gui.querySelector('#filterText');
			// this.eFilterText.addEventListener('changed', listener);
			// this.eFilterText.addEventListener('paste', listener);
			// this.eFilterText.addEventListener('input', listener);
		}

		afterGuiAttached(params) {
			console.log('%cgrid_component.js line:242 $scope.filterColId', 'color: #007acc;', $scope.filterColId, params, this.params);
			$scope.filterColId = this.params.colDef.field
			this.setupGui(this.params)
		}
		getGui() {
			// console.log('%cgrid_component.js line:227 params', 'color: #007acc;', $scope.filterColId, this.params);

		  	return this.gui;
		}

		doesFilterPass(params) {
		const { api, colDef, column, columnApi, context } = this.params;
		const { node } = params;
		// console.log('%cgrid_component.js line:227 params', 'color: #007acc;', this.params);

	
		// make sure each word passes separately, ie search for firstname, lastname
		let passed = true;
		this.filterText
			?.toLowerCase()
			.split(' ')
			.forEach((filterWord) => {
				const value = this.params.valueGetter({
					api,
					colDef,
					column,
					columnApi,
					context,
					data: node.data,
					getValue: (field) => node.data[field],
					node,
				});

				if (value.toString().toLowerCase().indexOf(filterWord) < 0) {
					passed = false;
				}
			});

		return passed;
		}

		isFilterActive() {
		// console.log('%cgrid_component.js line:227 params', 'color: #007acc;', this.params);

		return this.filterText != null && this.filterText !== '';
		}

		getModel() {
		// console.log('%cgrid_component.js line:227 params', 'color: #007acc;', this.params);

		if (!this.isFilterActive()) {
			return null;
		}

		return { value: this.filterText };
		}

		setModel(model) {
		// console.log('%cgrid_component.js line:227 params', 'color: #007acc;', this.params);

		this.eFilterText.value = model == null ? null : model.value;
		}
	}
	class SetFilter {
		params;
		filterText;
		gui;
		eFilterText;

		init(params) {
		  this.params = params;
		  this.filterText = null;
		  this.setupCount(params)
		  this.setupGui(params);
		}

		obj_compare( a, b ) {
			if ( a.last_nom < b.last_nom ){
			  return -1;
			}
			if ( a.last_nom > b.last_nom ){
			  return 1;
			}
			return 0;
		}

		setupCount(params) {
			$scope.filterColId = params.colDef.field
			$scope.valcount[$scope.filterColId] = [
				{
					val: '',
					count: 0,
					checked: true,
				},
			]
			$scope.valSA[$scope.filterColId] = {
				val: '(Select All)',
				count: $scope.agconfig.rowNo,
				checked: true,
			}
			// var field = 
			console.log('%cgrid_component.js line:35 $scope.agconfig.selectedColId', 'color: #007acc;', $scope.filterColId, $scope.valcount[$scope.filterColId]);
			$scope.gridOptions.api.forEachNode((node, index) => {
				var ele = $scope.valcount[$scope.filterColId].find(val=>{
					// console.log('%cgrid_component.js line:40 val', 'color: #007acc;', val, val.val == node.data[$scope.filterColId], val.val, node.data[$scope.filterColId]);
					return val.val == node.data[$scope.filterColId]?.v
				})
				var ind = ele ? $scope.valcount[$scope.filterColId].indexOf(ele) : -1
				// console.log('%cgrid_component.js line:114 node, index, node.data', 'color: #007acc;', node, index, node.data, node?.data[$scope.filterColId], node.data[$scope.filterColId] == '', $scope.filterColId, ele, ind);
				if(node.data[$scope.filterColId]?.v == '' || !node.data[$scope.filterColId]?.v)
					$scope.valcount[$scope.filterColId][0].count += 1
				else if(ind == -1)
					$scope.valcount[$scope.filterColId].push({
						val: node.data[$scope.filterColId]?.v || '',
						count: 1,
						checked: true
					})
				else
					$scope.valcount[$scope.filterColId][ind].count += 1
			});
		}

		// not called by AG Grid, just for us to help setup
		setupGui(params) {
			// console.log('%cgrid_component.js line:20 params', 'color: #007acc;', params);
			
			// $scope.valcount[$scope.filterColId].sort((a,b) => (a.val > b.val) ? 1 : ((b.val > a.val) ? -1 : 0))
			// $scope.valcount[$scope.filterColId].unshift({
			// 	val: '(Select All)',
			// 	count: $scope.gridOptions.api.getDisplayedRowCount(),
			// 	checked: true,
			// })
			$scope.optionsf = ''
			// obj_compare()
			this.gui = document.createElement('div');
			this.gui.innerHTML = 
			`
				<div style="padding: 4px;justify-content: center; display: flex;flex-direction: column; height: 242px; width: 296px" id="customFilter">
					<div id="filterCheckBoxList">
						
					</div>
				</div>
			`;
			console.log('%cgrid_component.js line:50 $scope.valcount[$scope.filterColId][$scope.filterColId]', 'color: #007acc;', $scope.valcount[$scope.filterColId], $scope.valcount[$scope.filterColId].find(val=>val.checked), $scope.valcount[$scope.filterColId].filter(val=>val.checked).length);
			// $scope.selectCount = $scope.valcount[$scope.filterColId].filter(val=>val.checked).length
			$scope.arr = $scope.valcount[$scope.filterColId].map(val=>[val.val, val.count])
			$timeout(()=>{
				var html = 
				`
					<div ref="eHeader" role="tablist" class="ag-tabs-header ag-menu-header">
						<span role="tab" tabindex="-1" class="ag-tab" aria-label="general" ng-click='filtertab="general"' ng-class="{'ag-tab-selected': filtertab=='general'}">
							<span class="ag-icon ag-icon-menu" role="presentation"></span>
						</span>
						<span role="tab" tabindex="-1" class="ag-tab" aria-label="filter" ng-click='filtertab="filter"' ng-class="{'ag-tab-selected': filtertab=='filter'}">
							<span class="ag-icon ag-icon-filter" role="presentation"></span>
						</span>
						<span role="tab" tabindex="-1" class="ag-tab" aria-label="columns" ng-click='filtertab="columns"' ng-class="{'ag-tab-selected': filtertab=='columns'}">
							<span class="ag-icon ag-icon-columns" role="presentation"></span>
						</span>
					</div>

					<div ng-if="filtertab=='filter'" style="height: 192px; width: 288px;overflow:hidden">
						<div class="ag-mini-filter ag-labeled ag-label-align-left ag-text-field ag-input-field" style="gap: 8px">
							<div class="ag-input-field-label ag-label ag-hidden ag-text-field-label"></div>
							<div class="ag-wrapper ag-input-wrapper ag-text-field-input-wrapper">
								<input class="ag-input-field-input ag-text-field-input" type="text" aria-label="Search filter values" placeholder="Search..." ng-model="filtercbsearch"  id="filterText"/>
							</div>
							<i class="fa fa-regular fa-copy" style="cursor: pointer" ng-click="copy2DToClipboard(arr);"></i>
						</div>
						<div id="" style="height: 144px; overflow: auto">
							<!--<div class="ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper">
								<input id="filterTextSA" class="ag-input-field-input ag-checkbox-input" type="checkbox" ng-click="togglecb(this, 'filtersa');">
								<input style="margin: 4px 0;" type="checkbox" id="filterTextSA" ng-model="item.checked" ng-change="togglecb(event); externalFilterChanged(item)"/>
								<label for="filterText" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 100%;">(Select All)</label>
							</div>-->

							<div>
								<label style="display: flex; " for="filterCheckBoxSA">
									<input style="margin: 0 4px 0 0;" type="checkbox" id="filterCheckBoxSA" ng-model="valSA[filterColId].checked" ng-change="togglecb(this, 'filterSA')"/>
									<span class="geekmark" style="margin: 0px 10px;"></span> 
									(Select All) ({{valSA[filterColId].count}})
								</label>
							</div>
							<div class="onlyp" style="display: flex; gap: 8px" ng-repeat="item in valcount[filterColId] track by $index" ng-hide="!item.val.toLowerCase().includes(filtercbsearch.toLowerCase())">
								<!--div class="ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper ag-checked">
									<input id="filterText" class="ag-input-field-input ag-checkbox-input" type="checkbox" ng-model="item.checked" ng-change="togglecb(this, 'filter');">
								</div-->

								<label style="display: flex; flex-grow: 1;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 100%;" for="{{'filterCheckBox'+$index}}">
									<input style="margin: 4px 0;" type="checkbox" id="{{'filterCheckBox'+$index}}" ng-model="item.checked" ng-change="togglecb(this, 'filter')"/>
									<span class="geekmark" style="margin: 0px 10px;"></span> 
									{{item.val==''?'(Blank)':item.val}} 
								</label>({{item.count}})
								<span class="only" ng-click="togglecb($index, 'only');">Only</span>
							</div>
						</div>
					</div>
					<div ng-if="filtertab=='general'" style="height: 192px; width: 288px;overflow:hidden">
					</div>
					<div ng-if="filtertab=='columns'" style="height: 192px; width: 288px;overflow:hidden">
					</div>
				`
				var innerHTML = $compile(html)($scope)
				var currente = angular.element(document.getElementById("filterCheckBoxList"));
	
				currente.replaceWith(innerHTML);
			}, 100)

			// const listener = (event) => {
			// 	console.log('%cgrid_component.js line:99 params', 'color: #007acc;', params);
			// 	// $scope.gridOptions.api.onFilterChanged()
			// 	// this.filterText = event.target.value;
			// 	params.filterChangedCallback();
			// };

			// this.eFilterText = this.gui.querySelector('#filterText');
			// this.eFilterText.addEventListener('changed', listener);
			// this.eFilterText.addEventListener('paste', listener);
			// this.eFilterText.addEventListener('input', listener);
		}

		afterGuiAttached(params) {
			console.log('%cgrid_component.js line:242 $scope.filterColId', 'color: #007acc;', $scope.filterColId, params, this.params);
			$scope.filterColId = this.params.colDef.field
			// this.setupCount(params)
			this.setupGui(this.params)
		}
		getGui() {
			// console.log('%cgrid_component.js line:227 params', 'color: #007acc;', $scope.filterColId, this.params);

		  	return this.gui;
		}

		doesFilterPass(params) {
		const { api, colDef, column, columnApi, context } = this.params;
		const { node } = params;
		// console.log('%cgrid_component.js line:227 params', 'color: #007acc;', this.params);

	
		// make sure each word passes separately, ie search for firstname, lastname
		let passed = true;
		this.filterText
			?.toLowerCase()
			.split(' ')
			.forEach((filterWord) => {
				const value = this.params.valueGetter({
					api,
					colDef,
					column,
					columnApi,
					context,
					data: node.data,
					getValue: (field) => node.data[field],
					node,
				});

				if (value.toString().toLowerCase().indexOf(filterWord) < 0) {
					passed = false;
				}
			});

		return passed;
		}

		isFilterActive() {
		// console.log('%cgrid_component.js line:227 params', 'color: #007acc;', this.params);

		return this.filterText != null && this.filterText !== '';
		}

		getModel() {
		// console.log('%cgrid_component.js line:227 params', 'color: #007acc;', this.params);

		if (!this.isFilterActive()) {
			return null;
		}

		return { value: this.filterText };
		}

		setModel(model) {
		// console.log('%cgrid_component.js line:227 params', 'color: #007acc;', this.params);

		this.eFilterText.value = model == null ? null : model.value;
		}
	}
	class CheckHeader {
		params;
		filterText;
		gui;
		eFilterText;

		init(params) {
		  this.params = params;
		  this.setupGui(params);
		}

		// not called by AG Grid, just for us to help setup
		setupGui(params) {
			// console.log('%cgrid_component.js line:20 params', 'color: #007acc;', params);
			
			this.gui = document.createElement('div');
			this.gui.innerHTML = 
			`
				<div style="padding: 4px;" id="customFilter">
					<div id="checkheader">
						
					</div>
				</div>
			`;
			// $scope.arr = [["Mike", "Cane", 23],["Jeff", "Meyers", 46],["Thomas", "Bush", 67]]
			$timeout(()=>{
				var html = 
				`
					<label for="headercb" class="" role="columnheader" tabindex="-1" style="display: flex; flex-direction: column; justify-content: center;text-align: center;white-space: initial;" col-id="check">
						Check
						<!--label for="headerslct" style="width: 80px;text-align: center;display: flex">
							<input id="headerslct" style="height: 16px; width: 16px;" type="checkbox" aria-label="Press Space to toggle all rows selection" onchange="angular.element('.ag-theme-alpine').scope().togglecb(this, 'headerslct')">
							<span class="geekmark"></span--> 

							<!--svg ng-if="!$('#headerslct')[0].checked" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1 4.5C1 2.567 2.567 1 4.5 1H12.5C14.433 1 16 2.567 16 4.5V12.5C16 14.433 14.433 16 12.5 16H4.5C2.567 16 1 14.433 1 12.5V4.5Z" fill="white"/>
								<path d="M1 4.5C1 2.567 2.567 1 4.5 1H12.5C14.433 1 16 2.567 16 4.5V12.5C16 14.433 14.433 16 12.5 16H4.5C2.567 16 1 14.433 1 12.5V4.5Z" stroke="#D7D7D7"/>
							</svg>
							<svg ng-if="$('#headerslct')[0].checked" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M0.5 4.5C0.5 2.29086 2.29086 0.5 4.5 0.5H12.5C14.7091 0.5 16.5 2.29086 16.5 4.5V12.5C16.5 14.7091 14.7091 16.5 12.5 16.5H4.5C2.29086 16.5 0.5 14.7091 0.5 12.5V4.5Z" fill="#1890FF"/>
								<path d="M12.5 5.5L7 11L4.5 8.5" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
							</svg--> ({{agconfig.selectedRows.length}})
						<!--/label-->
						
						<!--div class="ag-cell-label-container">
							<div ref="eLabel" class="ag-header-cell-label">
								<span>
									<span ref="eText" class="ag-header-cell-text" role="columnheader" style="cursor: pointer"></span> (${$scope.agconfig.selectedRows?.length})
								</span>
							</div>
						</div-->
						<!--span style="">
							<span ng-click="mainEdit('del', agconfig.selectedRows)">
								<i class="fa fa-solid fa-trash" style="color: red; margin: auto"></i>
							</span>
							<span ng-click="togglecb(this, 'invert')">
								Retain
							</span>
							<span ng-click="togglecb(this, 'hideSelected')">
								<i class="fa fa-eye-slash" aria-hidden="true"></i>
							</span>
							<span ng-click="togglecb(this, 'unhideAll')">
								<i class="fa fa-eye" aria-hidden="true"></i>
							</span>
						</span-->
					</label>
				`
				var innerHTML = $compile(html)($scope)
				var currente = angular.element(document.getElementById("checkheader"));

				currente.replaceWith(innerHTML);
			}, 100)

			// const listener = (event) => {
			// 	console.log('%cgrid_component.js line:99 params', 'color: #007acc;', params);
			// 	// $scope.gridOptions.api.onFilterChanged()
			// 	// this.filterText = event.target.value;
			// 	params.filterChangedCallback();
			// };

			// this.eFilterText = this.gui.querySelector('#filterText');
			// this.eFilterText.addEventListener('changed', listener);
			// this.eFilterText.addEventListener('paste', listener);
			// this.eFilterText.addEventListener('input', listener);
		}

		getGui() {
		  	return this.gui;
		}
	}

	var addObj = (props, val = {}) => {
		// console.log('%cgrid_component.js line:708 props, val', 'color: #007acc;', props, val, props.length, props[0].hasOwnProperty(props[1]), props[0], props[0]?.[props[1]]);
		if(props.length == 1)
			Object.assign(props[0], val)
		else {
			if(!props[0].hasOwnProperty(props[1]))
				props[0][props[1]] = {}
			// console.log('%cgrid_component.js line:714 props, props[0]', 'color: #007acc;', props, props[0]);
			props[0] = props[0][props[1]]
			props.splice(1, 1)
			addObj(props, val)
		}
	}

	console.log('%cgrid_component.js line:6 $scope.agconfig, $scope', 'color: #007acc;', $scope.agconfig, $scope);
	$scope.agconfig['scope'] = $scope
	$scope.agconfig.gridflg = false
	// Make all cells resize to perfectly fit width of screen
	var sizeToFit = () => {
		manual = false;
		$scope.gridOptions.api.sizeColumnsToFit();
	}
	var headerRowspanClass = (row, col, rowspan) => {
		if(!rowspan) return
		var style = document.createElement('style');
		// style.type = 'text/css';
		var classname = `header-row-span-${row}-${col}-${rowspan}`
		style.innerHTML = `.${classname} { position: fixed; top: ${40*row}px; height: ${40*rowspan}px; z-index: 10 }`;
		document.getElementsByTagName('head')[0].appendChild(style);
		return classname
	}
	var getDepth = (array) => {
		return 1 + Math.max(0, ...array.map(({ children = [] }) => getDepth(children)));
	}
	// var colourPalletes = {
	// 	"pblue": {
	// 		'tree_parent': ,
	// 		'child_blue': ,
	// 		'child_grey': ,
	// 		'child': ,
	// 	},
	// 	"pgreen": {
	// 		'tree_parent': ,
	// 		'child_blue': ,
	// 		'child_grey': ,
	// 		'child': ,
	// 	},
	// }
	var innerKeys = (o) => {
		var arr = o[0]
		console.log('%cgrid_component.js line:22 o, arr', 'color: #007acc;', o, arr, arr?.hasOwnProperty('children'));
		if(arr?.hasOwnProperty('children'))
			innerKeys(arr.children)
		else{
			console.log('%cgrid_component.js line:26 o', 'color: #007acc;', o);
			o['cellRenderer'] = (params) => params.data.type == 'parent' ? params.data.folded ? `<span style="width: 32px;display: inline-block;"><i class="fa fa-chevron-up" style="cursor: pointer"></i></span>${params.value}` : `<span style="width: 32px;display: inline-block;"><i class="fa fa-chevron-down" style="cursor: pointer"></i></span>${params.value}` : `<span style="width: 32px;display: inline-block;"></span>${params.value}`
			o['onCellClicked'] = (params) => {
				console.log('%cgrid_component.js line:387 params', 'color: #007acc;', params);
				params.data.folded = !params.data.folded
				$scope.gridOptions.api.onFilterChanged()
				$scope.refreshCells(['Col1']);
				// $scope.gridOptions.api.refreshCells({
				// 	force: true,
				// 	columns: ['Col1'],
				// });
			}
			return o
		}
	}
	// returns css for cells based on condition
	var cellStyle = (params) => {
		// console.log('%cautomation.js line:655 params', 'color: #007acc;', params, $scope.agconfig.selectedColumn, $scope.agconfig.selectedCells?.filter(cell=>cell.rowNode == params.node)[0]?.colId, params.column.colId, $scope.agconfig.selectedCells?.filter(cell=>cell.rowNode == params.node), $scope.agconfig.selectedCells?.filter(cell=>cell.rowNode == params.node).length && params.column.colId == $scope.agconfig.selectedCells?.filter(cell=>cell.rowNode == params.node).colId);
		var style = {/* 'background-color': 'white' */}
		var id = params.column.getId()//.toLowerCase()
		// console.log('%cgrid_component.js line:19 id', 'color: #007acc;', id, $scope.agconfig.selectedColId);
		if($scope.agconfig.cellStyle){
			Object.entries($scope.agconfig.cellStyle).map(s=>{
				if(eval(s[0])){
					// Object.assign(style, $scope.agconfig.cellStyle(id))
					Object.assign(style, s[1])
				}
			})
		}
		if(params.value?.hasOwnProperty('style')) {
			// console.log('%cgrid_component.js line:769 params.data["style"]', 'color: #007acc;', params.data["style"], params.data.style[params.column.colId]);
			// var { bold, italic, strikethrough, size, face } = params.data.style
			// console.log('%cgrid_component.js line:770 bold, italic, strikethrough, size, face', 'color: #007acc;', bold, italic, strikethrough, size, face);
			// style['font-weight'] = bold ? 800 : 400
			// style['font-style'] = italic ? 'italic' : 'normal'
			// style['text-decoration'] = strikethrough ? 'line-through' : 'none'
			// style['font-size'] = size ? size : style['font-size']
			Object.assign(style, params.value.style)
			
			// console.log('%cgrid_component.js line:774 style', 'color: #007acc;', style);
		}
		if(id == 'check') {
			Object.assign(style, {'text-align': 'center', 'justify-content': 'center', 'display': 'flex'/* , 'background-color': 'white' */})
			if(params.data.header)
				Object.assign(style, {'display': 'none'})
			var ele = $('#rowcb'+params.rowIndex)
			if($scope.agconfig.selectedRows.includes(params.data)){
				Object.assign(style, {'color': '#ff9970'})
				// params.node.setData()
				// params.api.applyTransaction({update: [params.data]})
				// $scope.gridOptions.api.refreshCells({
				// 	force: true,
				// 	columns: ['check'],
				// });
			}
			else{
				Object.assign(style, {'color': 'unset'})
				// params.node.setData()
				// params.api.applyTransaction({update: [params.data]})
				// $scope.gridOptions.api.refreshCells({
				// 	force: true,
				// 	columns: ['check'],
				// });
			}
		}
		if(id=='merge') {
			Object.assign(style, {'text-align': 'center', 'justify-content': 'center', 'display': 'flex', /* 'background-color': 'white' */})
		}
		// params.data?.cellMerge?.findIndex(cell=>cell?.colId[0]==params.column.colId && cell?.type == 'hyphen' && cell?.rowId[0]==params.node.id && cell?.colId[0]==params.column.colId)
		if(params.data[params.column.colId]?.cellMerge/* params.data?.cellMerge?.findIndex(cell=>cell?.colId[0]==params.column.colId && cell?.type == 'hyphen' && cell?.rowId[0]==params.node.id && cell?.colId[0]==params.column.colId)>=0 *//* (params.data.rowMerge && params.data.rowMerge[0] == params.node.id && params.column.colId == 'merge') || (params.data?.cellMerge?.type == 'hyphen' && params.data?.cellMerge?.rowId==params.node.id && params.data?.cellMerge?.colId==params.column.colId) || (params.data?.cellMerge?.type == 'hyphen' && params.data?.cellMerge?.colId==params.column.colId) */) {
			Object.assign(style, {'background-color': 'white'})
		}
		if(id == 'addRow' || id == 'addDup')
			Object.assign(style, {'display': 'flex', 'justify-content': 'center', 'align-items': 'center', 'cursor': 'pointer'})
		if(Object.values($scope.agconfig?.selectedColumnGroups).map(group=>group?.data).flat().find(l => l.colId == id)) {
			// console.log('%cgrid_component.js line:652 Object.keys($scope.agconfig?.selectedColumnGroups).map(group=>group.data.find(l=> l.colId == id))', 'color: #007acc;', $scope.agconfig.selectedColumnGroups, Object.values($scope.agconfig?.selectedColumnGroups), Object.values($scope.agconfig?.selectedColumnGroups).map(group=>group.data), Object.values($scope.agconfig?.selectedColumnGroups).map(group=>group.data).flat(), Object.values($scope.agconfig?.selectedColumnGroups).map(group=>group.data).flat().find(l => l.colId == id), id);
			Object.assign(style, {'background-color': '#cfe8fe'})
		}
		if($scope.agconfig?.selectedColumns.includes(id)) {
			// console.log('%cgrid_component.js line:22 id === $scope.agconfig.selectedColId, id, $scope.agconfig.selectedColId', 'color: #007acc;', id === $scope.agconfig.selectedColId, id, $scope.agconfig.selectedColId);
			Object.assign(style, {'background-color': '#bcdffc'})
		}
		
		// if($scope.edited_cells.find(cell=>cell.row==params.node.id&&cell.col==id)) {
		// 	Object.assign(style, {'background-color': '#ffa500'})
		// }
		if(!style['background-color'])
			Object.assign(style, {'background-color': ''})
		if(!style['color'])
			Object.assign(style, {'color': ''})
		if($scope.agconfig.type == 'tree')
			if(params.data.type == 'child' && params.column.colId == 'Col1')
				Object.assign(style, {'padding-left': '32px'})
			else if(params.data.type == 'parent')
				Object.assign(style, {
					'height': '100%',
					'display': 'flex ',
					'align-items': 'center ',
					'cursor': 'pointer'
				})
		if(params.data.colorcode){
			var cid = params.data.colorcode[id]
			console.log('%cgrid_component.js line:677 params.data.colorcode', 'color: #007acc;', params.data.colorcode, cid);
			if(cid?.['background-color'])
				Object.assign(style, {'background-color': cid['background-color'] == 'none' ? '' : cid['background-color']})
			if(cid?.color)
				Object.assign(style, {'color': cid.color == 'none' ? '' : cid.color})
			if(cid?.style)
				Object.assign(style, {'font-style': cid.style})
			if(cid?.alignment)
				Object.assign(style, {'justify-content': cid.alignment, 'display': 'flex'})
			if(cid?.fontsize)
				Object.assign(style, {'font-size': cid.fontsize+'px'})
			console.log('%cgrid_component.js line:685 style', 'color: #007acc;', style);
		}
		if($scope.agconfig.selectedCells.find(cell=>params.column.colId == cell.colId && params.node.id == cell.rowId)&&!$scope.agconfig.rangeSelectedCells.length){
			// console.log('%cgrid_component.js line:509 $scope.agconfig.selectedCells', 'color: #007acc;', $scope.agconfig.selectedCells[0]?.rowNode, params.node, $scope.agconfig.selectedCells[0]?.rowNode == params.node);
			Object.assign(style, {'background-color': '#F4F3FF', 'color': '#6938EF'})
			// {background-color: #EBE9FE !important; color: #5925DC; border: none !important}
		}
		if(params.data.total) {
			Object.assign(style, {
				"color": "#0384FC",
				"border-bottom": "1px solid #096DD9",
				"font-weight": 600
			})
		}
		// if($scope.agconfig.rangeSelectedCells.length){
			// console.log('%cgrid_component.js line:881 $scope.overlay', 'color: #007acc;', $scope.overlay, $scope.overlay.style, $scope.agconfig.selectedCells, $scope.agconfig.selectedCells[0].rowNode.rowTop);
			// var rows = $scope.agconfig.selectedCells.reduce((a, b)=>{if(a.indexOf(b)<0)a.push(b.rowNode);return a}, [])
			// $scope.overlay.style.top = rows[0]?.rowTop + 'px'
			// $scope.overlay.style.height = rows.reduce((a, b) => a + b.rowHeight, 0) + 'px'
			// var cols = $scope.agconfig.rangeSelectedCells[0].columns
			// $scope.overlay.style.left = cols[0]?.left + 'px'
			// $scope.overlay.style.width = cols.reduce((a, b) => a + b.actualWidth, 0) + 'px'
		// }
		
		// console.log('%cgrid_component.js line:31 style, id', 'color: #007acc;', style, params.rowIndex, id);
		return style
	}
	// returns css for cells based on condition
	// var cellClass = (params) => {
	// 	// console.log('%cautomation.js line:1049 params', 'color: #007acc;', params, $scope.agconfig.selectedColumn);
	// 	var classlist = []
	// 	var id = params.colDef.field
	// 	if(id == 'check')
	// 		classlist.push('center')
	// 	if (id === $scope.agconfig.selectedColId) {
	// 		console.log('%cgrid_component.js line:101 id === $scope.agconfig.selectedColId, id, $scope.agconfig.selectedColId', 'color: #007acc;', id === $scope.agconfig.selectedColId, id, $scope.agconfig.selectedColId);
	// 		classlist.push('ag-row-selected')
	// 	} else {
	// 		// Object.assign(style, { 'background-color': 'unset' })
	// 	}
	// 	return classlist
	// }

	// $scope.insertRowFunc = () => {
	// 	var columnDefs = $scope.gridOptions.api.getColumnDefs()
	// 	columnDefs.unshift({
	// 		field: 'slno',
	// 		maxWidth: 60,
	// 		cellRenderer: (params) => params.data.insert ? params.value : params.rowIndex + 1
	// 	})
	// 	$scope.gridOptions.api.setColumnDefs(columnDefs)
	// 	$scope.gridOptions.api.applyTransaction({
	// 		add: [{'insert': true, 'slno': 'slno'}],
	// 		addIndex: 0,
	// 	});
	// }

	$scope.mainSelection = (type, ev) => {
		console.log('%cgrid_component.js line:895 type, ev', 'color: #007acc;', type, ev);
		// $scope.agconfig.selectedCells = []
		// $scope.agconfig.selection = []
		// if(!ev.ctrlKey)
		$rootScope.pss.push(0)
		deselectAll(type)
		$timeout(()=>{
			switch (type) {
				case 'col': case 'colGroup':
						if(type == 'col')
							$scope.selectColumn(ev.target.offsetParent.attributes['col-id'].nodeValue, ev.ctrlKey, ev.shiftKey)
						else
							$scope.selectColumnGroup(ev.target.offsetParent.attributes['col-id'].nodeValue.split('_')[0], ev.ctrlKey, ev.shiftKey)
	
					$scope.gridOptions.api.forEachNodeAfterFilter((node, index) => {
						// console.log('%cgrid_component.js line:397 node, index, node.data', 'color: #007acc;', node, index, node.data, $scope.agconfig.selectedColumns);
						$scope.agconfig.selection[index] = []
						$scope.agconfig.selectedColumns.map(col=>{
							// console.log('%cgrid_component.js line:979 col', 'color: #007acc;', col, node.id);
							$scope.agconfig.selection[index].push(node.data && node?.data[col] ? node?.data[col]?.v : '')
							$scope.agconfig.selectedCells.push({
								colId: col,
								rowId: node.id,
								rowNode: node
							})
						})
					});
					var s = $scope.agconfig.selectedCells[0].rowNode.data[$scope.agconfig.selectedCells[0].colId]?.['style']
					$scope.style['font-size'] = s?.['font-size']?.split('px')[0] || 14
					$scope.style['background-color'] = s?.['background-color'] || '#ffffff'
					$scope.style['color'] = s?.['color'] || '#222222'
					$scope.style['halign'] = s?.['justify-content'] || 'Left'
					break;
				// case 'colGroup':
				// 	$scope.selectColumnGroup(ev.target.offsetParent.attributes['col-id'].nodeValue.split('_')[0], ev.ctrlKey, ev.shiftKey)
				// 	$scope.gridOptions.api.forEachNodeAfterFilter((node, index) => {
				// 		// console.log('%cgrid_component.js line:397 node, index, node.data', 'color: #007acc;', node, index, node.data, node?.data[colId], colId, $scope.agconfig.selectedColumns);
				// 		$scope.agconfig.selection[index] = []
				// 		Object.values($scope.agconfig.selectedColumnGroups).map(colg => colg.data.map(col=>{
				// 				// console.log('%cgrid_component.js line:979 col', 'color: #007acc;', col);
				// 				$scope.agconfig.selection[index].push(node.data && node?.data[col.colId] ? node?.data[col.colId]?.v : '')
				// 				$scope.agconfig.selectedCells.push({
				// 					colId: col,
				// 					rowId: node.id,
				// 					rowNode: node
				// 				})
				// 			}))
				// 		// });
				// 		// $scope.agconfig.selectedColumnGroups.data.map(col=>{
				// 		// 	console.log('%cgrid_component.js line:979 col', 'color: #007acc;', col);
				// 		// 	$scope.agconfig.selection[index].push(node.data && node?.data[col] ? node?.data[col]?.v : '')
							
				// 		// })
				// 	});
				// 	break;
				case 'row':
					$scope.gridOptions.api.getSelectedNodes().map((node, index)=>{
						console.log('%cgrid_component.js line:965 node, index', 'color: #007acc;', node, index);
						$scope.agconfig.selection[index] = []
						Object.keys(node.data).filter(col=>node.data[col].hasOwnProperty('v'))?.map(col=>{
							$scope.agconfig.selection[index].push(node.data[col] ? node.data[col]?.v : '')
							$scope.agconfig.selectedCells.push({
								colId: col,
								rowId: node.id,
								rowNode: node
							})
						})
					})
				// case 'range':
				// 	$scope.gridOptions.api.getSelectedNodes().map((node, index)=>{
				// 		$scope.agconfig.selection[index] = []
				// 		Object.keys(node.data).filter(col=>node.data[col].hasOwnProperty('v'))?.map(col=>{
				// 			$scope.agconfig.selection[index].push(node.data[col] ? node.data[col]?.v : '')
				// 			$scope.agconfig.selectedCells.push({
				// 				colId: col,
				// 				rowId: node.id,
				// 				rowNode: node
				// 			})
				// 		})
				// 	})
				default:
					break;
					
			}
		})
		$timeout(()=>{$scope.refreshCells('all');$rootScope.pss.pop();}, 1)
	}

	$scope.mainEdit = (type, data=$scope.agconfig.selectedCells) => {
		switch (type) {
			case 'del':
				if($scope.agconfig.selectedRows.length)
					process_array($scope.agconfig.selectedRows, (data)=>$scope.delRows(data))
				else if($scope.agconfig.selectedColumns.length)
					process_array($scope.agconfig.selectedColumns, (data)=>$scope.deleteColumn(data), true)
				else
					process_array(data, (data)=>$scope.clipboardOperations('delete'))
				break;
			// case 'fontOperations':
			// 	process_array(data, (data)=>{
			// 		data.map(cell=>{
			// 			addObj([cell.rowNode.data, cell.colId, 'style'], cell.rowNode.data?.[cell.colId]?.['style'])
			// 			var style = cell.rowNode.data[cell.colId]['style']//[cell.colId]
			// 			console.log('%cgrid_component.js line:2629 cell.rowNode.data', 'color: #007acc;', cell.rowNode.style, cell.colId, style);
			// 			switch(prop) {
			// 				case 'toolbar':
			// 					$scope.toolbarTabs = value
			// 					break;
			// 				case 'bold':
			// 					style['font-weight'] = style?.['font-weight'] == 800 ? 400 : 800
			// 					break;
			// 				case 'italic':
			// 					style['font-style'] = style?.['font-style'] == 'italic' ? '' : 'italic'
			// 					break;
			// 				case 'strikethrough':
			// 					style['text-decoration'] = style?.['text-decoration'] == 'line-through' ? 'none' : 'line-through'
			// 					break;
			// 				case 'size':
			// 					style['font-size'] = value + 'px'
			// 					break;
			// 				case 'background-color':
			// 					style['background-color'] = value
			// 					break;
			// 				case 'color':
			// 					style['color'] = value
			// 					break;
			// 				case 'halign':
			// 					style['justify-content'] = value
			// 					style['display'] = 'flex'
			// 					break;
			// 				case 'halign':
			// 					style['justify-content'] = value
			// 					style['display'] = 'flex'
			// 					break;
			// 			}
			// 		})
			// 	})
			case 'InsertRowAbove':
				// console.log('%cgrid_component.js line:1053 nodup(data)', 'color: #007acc;', nodup(data));
				nodupRows(data).map(cell=>{
					console.log('%cgrid_component.js line:1054 cell', 'color: #007acc;', cell);
					$scope.addRow(cell.rowInd, {}, 'add')
				})
				break;
			case 'InsertRowBelow':
				nodupRows(data).map(cell=>{
					console.log('%cgrid_component.js line:1054 cell', 'color: #007acc;', cell);
					$scope.addRow(cell.rowInd+1, {}, 'add')
				})
				break;
			case 'InsertColLeft':
				// console.log('%cgrid_component.js line:1053 nodup(data)', 'color: #007acc;', nodupCols(data));
				// nodupCols(data).map(cell=>{
				// 	console.log('%cgrid_component.js line:1054 cell', 'color: #007acc;', cell);
				// 	// $scope.insertColumn(cell.colId, 'newColumn', 'left')
				// 	$scope.addColumn(cell, 'left')
				// })
					$scope.addColumn(nodupCols(data)[0], 'left')
				break;
			case 'InsertColRight':
				// nodupCols(data).map(cell=>{
				// 	console.log('%cgrid_component.js line:1054 cell', 'color: #007acc;', cell);
				// 	// $scope.insertColumn(cell.colId, 'newColumn')
				// 	$scope.addColumn(cell)
				// })
					$scope.addColumn(nodupCols(data).at(-1))
				break;
			default:
				break;
		}
	}

	$scope.agconfig.selectedColumns = []
	// Store all column vals in and array
	$scope.selectColumn = (colId, ctrl, shift) => {
		// deselectAll()
		// console.log('%cgrid_component.js line:31 ev', 'color: #007acc;', ev)
		// var colId = ev.target.offsetParent.attributes['col-id'].nodeValue
		// var field = 
		$scope.agconfig.selectedColId = colId//.toLowerCase()
		console.log('%cgrid_component.js line:35 $scope.agconfig.selectedColId', 'color: #007acc;', $scope.agconfig.selectedColId, colId, ctrl, shift);

		// Obj of colid and array of values
		$scope.agconfig.selectedColumn = []
		// $scope.gridOptions.api.forEachNodeAfterFilter((node, index) => {
		// 	// console.log('%cgrid_component.js line:397 node, index, node.data', 'color: #007acc;', node, index, node.data,  node?.data[colId], colId);
		// 	$scope.agconfig.selectedColumn[index] = []
		// 	$scope.agconfig.selectedColumns.map(col=>{
		// 		// console.log('%cgrid_component.js line:979 col', 'color: #007acc;', col, node?.data[col], col);
		// 		$scope.agconfig.selectedColumn[index].push(node.data && node?.data[col] ? node?.data[col] : '')})
		// 	});
			// $scope.agconfig.selectedColumn[index] = node.data ? [node?.data[colId]] : '' });

		// console.log('%cgrid_component.js line:40 selectedColumn, selectedRow', 'color: #007acc;', $scope.agconfig.selectedColumn, colId);
		if($scope.agconfig.colSelect == 'multiple' && (shift || ctrl)) {
			console.log('%cgrid_component.js line:78 colId', 'color: #007acc;', colId, $scope.agconfig.selectedColumns.hasOwnProperty(colId));
			/* if(ev.shiftKey)
				$scope.agconfig.selectedColumns[colId] = $scope.agconfig.selectedColumn
			else  */if(ctrl){
				if($scope.agconfig.selectedColumns.includes(colId))
					// delete $scope.agconfig.selectedColumns[colId]
					$scope.agconfig.selectedColumns.splice($scope.agconfig.selectedColumns.indexOf(colId), 1)
				else
					// $scope.agconfig.selectedColumns[colId] = $scope.agconfig.selectedColumn
					$scope.agconfig.selectedColumns.push(colId)
				}
		}
		else
			$scope.agconfig.selectedColumns = [colId]
			// $scope.agconfig.selectedColumns = {[colId]: $scope.agconfig.selectedColumn}
		// $scope.gridOptions.api.forEachNodeAfterFilter((node, index) => {
		// 	// console.log('%cgrid_component.js line:397 node, index, node.data', 'color: #007acc;', node, index, node.data,  node?.data[colId], colId);
		// 	$scope.agconfig.selection[index] = []
		// 	$scope.agconfig.selectedColumns.map(col=>{
		// 		// console.log('%cgrid_component.js line:979 col', 'color: #007acc;', col);
		// 		$scope.agconfig.selection[index].push(node.data && node?.data[col] ? node?.data[col]?.v : '')})
		// });
		console.log('%cgrid_component.js line:755 $scope.agconfig.selectedColumns', 'color: #007acc;', $scope.agconfig.selectedColumns, $scope.gridOptions.columnApi.getAllDisplayedColumns().map(col=>col.colId));
		// $scope.refreshCells('all');
		// $scope.gridOptions.api.refreshCells({
		// 	force: true,
		// 	columns: $scope.gridOptions.columnApi.getAllDisplayedColumns().map(col=>col.colId),
		// });
	};

	function searchTree(element, matchingTitle){
		// console.log('%cgrid_component.js line:744 element', 'color: #007acc;', element, element.groupId, matchingTitle);
		if(element.groupId == matchingTitle){
			 return element;
		}else if (element.children != null){
			 var i;
			 var result = null;
			 for(i=0; result == null && i < element.children.length; i++){
				  result = searchTree(element.children[i], matchingTitle);
			 }
			 return result;
		}
		return null;
   	}

	var getLeaf = (startNode) => {
		var Q = []
		Q.push(startNode)
		var leaves = []
		// console.log('%cgrid_component.js line:837 Q, startNode', 'color: #007acc;', Q, startNode);
		while (Q.length){
			current = Q.shift()
			if(!current.children?.map((node, i)=>{
				// console.log('%cgrid_component.js line:763 node', 'color: #007acc;', node, i);
				Q.push(node)
			})) leaves.push(current)
		}
		// console.log('%cgrid_component.js line:767 Q', 'color: #007acc;', Q, leaves);
		return leaves
	}

	$scope.agconfig.selectedColumnGroups = {}
	$scope.selectColumnGroup = (colId, ctrl, shift) => {
		// deselectAll()
		// var colId = ev.target.offsetParent.attributes['col-id'].nodeValue.split('_')[0]
		var colDefs = $scope.gridOptions.api.getColumnDefs()
		console.log('%cgrid_component.js line:820 colId', 'color: #007acc;', colId, colDefs);

		var node = searchTree({children: colDefs}, colId)
		var leaves = getLeaf(node)
		console.log('%cgrid_component.js line:31 ev', 'color: #007acc;', colId, colDefs, node)
		if($scope.agconfig.colGroupSelect == 'multiple' && (shift || ctrl)) {
			console.log('%cgrid_component.js line:78 colId', 'color: #007acc;', colId, $scope.agconfig.selectedColumnGroups);
		  	if(ctrl){
				if($scope.agconfig.selectedColumnGroups.hasOwnProperty(colId))
					delete $scope.agconfig.selectedColumnGroups[colId]
				else
					$scope.agconfig.selectedColumnGroups[colId] = {node: node, data: leaves}
			}
		}
		else
			$scope.agconfig.selectedColumnGroups = {[colId]: {node: node, data: leaves}}
		
		// $scope.gridOptions.api.forEachNodeAfterFilter((node, index) => {
		// 	// console.log('%cgrid_component.js line:397 node, index, node.data', 'color: #007acc;', node, index, node.data,  node?.data[colId], colId);
		// 	$scope.agconfig.selectedColumn[index] = []
		// 	$scope.agconfig.selectedColumnGroups[colId].data.map(col=>{
		// 		// console.log('%cgrid_component.js line:979 col', 'color: #007acc;', col);
		// 		$scope.agconfig.selectedColumn[index].push(node.data && node?.data[col.colId] ? node?.data[col.colId] : '')})
		// });
		console.log('%cgrid_component.js line:995 $scope.agconfig.selectedColumnGroups', 'color: #007acc;', $scope.agconfig.selectedColumnGroups);
		// $scope.gridOptions.api.forEachNodeAfterFilter((node, index) => {
		// 	// console.log('%cgrid_component.js line:397 node, index, node.data', 'color: #007acc;', node, index, node.data,  node?.data[colId], colId);
		$scope.agconfig.selectedColumns = []
		// 	$scope.agconfig.selection[index] = []
			Object.values($scope.agconfig.selectedColumnGroups).map(colg => colg.data.map(col=>{
				// console.log('%cgrid_component.js line:979 col', 'color: #007acc;', col);
				if(!$scope.agconfig.selectedColumns.includes(col.colId))
				$scope.agconfig.selectedColumns.push(col.colId)
				// $scope.agconfig.selection[index].push(node.data && node?.data[col.colId] ? node?.data[col.colId]?.v : '')
			}))
		// });
		// $scope.agconfig.selectedColumnGroups['leaves'] = leaves
		// leaves.map(l=>$scope.agconfig.selectedColumns.push(l.colId))
		console.log('%cgrid_component.js line:814 $scope.agconfig.selectedColumnGroups', 'color: #007acc;', $scope.agconfig.selectedColumnGroups, Object.values($scope.agconfig?.selectedColumnGroups), Object.values($scope.agconfig?.selectedColumnGroups).map(group=>group.data).flat(), Object.values($scope.agconfig?.selectedColumnGroups).map(group=>group?.data).flat().find(l=> l.colId == 'Col1'), $scope.headerList.map(h=>h.colId));

		// $scope.refreshCells($scope.headerList.map(h=>h.colId));
		// $scope.gridOptions.api.refreshCells({
		// 	force: true,
		// 	columns: $scope.gridOptions.columnApi.getAllDisplayedColumns(),
		// });
	};

	createPinnedCellPlaceholder = (colDefs) => colDefs.forEach((c)=>console.log('%cgrid_component.js line:29 c', 'color: #007acc;', c))

	$scope.addRow = (ind, data, type) => {
		var cols = $scope.gridOptions.columnApi.getAllColumns()
		// Object.data
		if(!data){
			var data = {}
			$scope.gridOptions.columnApi.getAllColumns().map(col=>Object.keys(data).includes(col.colId)?data[col.colId]='':0)
		}
		data['newrow'] = true
		console.log('%cgrid_component.js line:429 ind, data', 'color: #007acc;', ind, data);
		$scope.gridOptions.api.applyTransaction({
			add: [data],
			addIndex: ind,
		});
		console.log('%cgrid_component.js line:109 $scope.lastNodeId', 'color: #007acc;', $scope.gridOptions, $scope.lastNodeId);
		
		if(type=='add'){
			var columnDefs = $scope.gridOptions.api.getColumnDefs()
			console.log('%cgrid_component.js line:609 columnDefs.find(col=>col.colId=="addRow")', 'color: #007acc;', columnDefs.find(col=>col.colId=="addRow"));
			columnDefs.find(col=>col.colId=='addRow')['cellRenderer'] = (params) => params.data?.type !== 'parent' && !params.data.header ? `<i class="feather icon-plus" style="cursor: pointer"></i>` : ''
			$scope.gridOptions.api.setColumnDefs(columnDefs)
		}
		console.log('%cgrid_component.js line:1111 $scope.lastNodeId', 'color: #007acc;', $scope.lastNodeId);
		$scope.gridOptions.api.redrawRows()
	}
	
	function process_array(array, cb, loop, batch_size = array.length*0 > 1000 ? Math.ceil(array.length/10) : 1000) {
		$rootScope.pss.push(0);
		var da_len = array.length;
		var idx = 0;
	 	console.log('%cgrid_component.js line:1183 array, batch_size, cb', 'color: #007acc;', array, batch_size, cb, da_len, idx, 10*(array.length%100));
	 
		function process_batch() {
	 
		   	var idx_end = Math.min(da_len, idx + batch_size);
		   	var seg = array.slice(idx, idx_end)
			console.log('%cgrid_component.js line:1188 idx, idx_end', 'color: #007acc;', idx, idx_end, da_len, seg);
			if(loop)
				seg.map(ele=>{
					console.log('%cgrid_component.js line:1245 ele', 'color: #007acc;', ele);
					cb(ele)
				})
			else
				cb(seg)
			idx = idx_end
			// while (idx < idx_end) {
				
			// }
			if (idx >= da_len || !array.length) {
				console.log('%cgrid_component.js line:1200 idx, idx_end', 'color: #007acc;', idx, da_len);
		
				clearInterval(interval)
				// Show some progress (no luck) ...
				// show_progress(idx);
				
			}
			$rootScope.pss.pop();
		}
		// process_batch()
		var interval = setInterval(process_batch, 100);

	}
	$scope.delRows = (data) => {
		console.log('%cgrid_component.js line:1213 data', 'color: #007acc;', data);
		$scope.gridOptions.api.applyTransaction({
			remove: data,
		})
	}
	var nodeid
	var nodeind
	// insertobj()
	function inorder(node, ind) 
	{ 
		if (node == null && node || !node.children)
			return;
		// Total children count
		console.log('%cgrid_component.js line:657 node, node?.children', 'color: #007acc;', node, node?.children);
		// var total = node?.children.length;
		// All the children except the last
		node?.children.map((child, i)=>{
			console.log('%cgrid_component.js line:660 child', 'color: #007acc;', child.colId, ind, child.colId==ind, child);
			if(child.colId == ind){
				// nodeid = child
				node.children = [...node.children.slice(0, i), {
					field: 'new',
					// headerCellRenderer: () => `	<form class="ag-cell-label-container" role="presentation" style="width: 100%" ng-submit="insertColumn(event, ${ind})">
					// 									<button type="submit" style="width: 25%">Add</button>
					// 									<input style="width: 75%"></input>
					// 								</form>`,
					headerComponentParams: {
						// template: '<span style="width: 20%">template</span>',
						template:
							`<form class="ag-cell-label-container" role="presentation" style="width: 100%" onsubmit="angular.element('.ag-theme-alpine').scope().insertColumn(this, '${ind}')">
								<button type="submit" style="width: 25%">Add</button>
								<input id=addCol type="text" style="width: 75%"></input>
							</form>`,
						// displayName: 'displayName',
						// enableSorting: true,
						// enableMenu: true,
					}
					// cellRenderer: () => '+',
				}, ...node.children.slice(i)]
				console.log('%cgrid_component.js line:621 = ind, child', 'color: #007acc;', nodeid, child);
				// inorder(child, id, child)
			}
			// else {
			// 	console.log('%cgrid_component.js line:621 ! ind, child', 'color: #007acc;', ind, child);
				inorder(child, ind)
			// }
			// yield * inorder(node?.children)
		})
		// for (var i = 0; i < total - 1; i++)
		// 	inorder(node.children[i]);
		// Print the current node's data
		console.log('%cgrid_component.js line:663 node.data', 'color: #007acc;', node);
		// document.write("" + node.data + " ");
		// Last child
		// inorder(node?.children[total - 1]);
	}
	var treeOperations = (arr, id, leafOper, nodeOper, obj) => {
		arr.map((a, i)=>{
			// console.log('%cgrid_component.js line:668 a, i', 'color: #007acc;', a, i, id, a?.colId, id, a?.colId == id);
			if (a?.colId == id) {
				if(leafOper && !a.hasOwnProperty('children'))
				eval(leafOper)
				console.log('%cHello grid_component.js line:671 ', 'background: blue; color: white; display: block;', arr, id, leafOper, nodeOper, obj);
				return true;
			}
			if (a.children) {
				// console.log('%cHello grid_component.js line:676 ', 'background: yellow; color: black; display: block;');
				if(nodeOper)
				eval(nodeOper)
				const found = treeOperations(a.children, id, leafOper, nodeOper, obj);
				if (found) return true;
			}
		})
	};
	var insertCol = (arr, obj, id, ind) => {
		arr.map((a, i)=>{
			// console.log('%cgrid_component.js line:668 a, i', 'color: #007acc;', a, i, id, a?.colId, id, a?.colId == id);
			if (a?.colId == id) {
				arr.splice(i + 1, 0, obj);
				// console.log('%cHello grid_component.js line:671 ', 'background: blue; color: white; display: block;');
				return true;
			}
			if (a.children) {
				// console.log('%cHello grid_component.js line:676 ', 'background: yellow; color: black; display: block;');
				const found = insertCol(a.children, obj, id);
				if (found) return true;
			}
		})
	};
	var deleteCol = (arr, id) => {
		// filterArray(arr)
		arr.map((a, i)=>{
			// console.log('%cgrid_component.js line:698 a, i', 'color: #007acc;', i, id, a?.colId, id, a?.colId == id);
			if (a?.colId == id) {
				arr.splice(i, 1);
				// arr = arr.filter(a=>a?.colId !== id)
				// console.log('%cHello grid_component.js line:671 ', 'background: blue; color: white; display: block;', a, arr, i);
				return true;
			}
			if (a.children) {
				// console.log('%cHello grid_component.js line:676 ', 'background: yellow; color: black; display: block;');
				const found = deleteCol(a.children, id);
				if (found) return true;
			}
		})
	};
	var editCol = (arr, id, obj) => {
		// filterArray(arr)
		arr.map((a, i)=>{
			console.log('%cgrid_component.js line:698 a, i', 'color: #007acc;', i, id, a?.colId, id, a?.colId == id);
			if (a?.colId == id) {
				Object.assign(a, obj)
				// arr = arr.filter(a=>a?.colId !== id)
				console.log('%cHello grid_component.js line:671 ', 'background: blue; color: white; display: block;', a, arr, i, obj);
				return true;
			}
			if (a.children) {
				// console.log('%cHello grid_component.js line:676 ', 'background: yellow; color: black; display: block;');
				const found = editCol(a.children, id, obj);
				if (found) return true;
			}
		})
	};
	$scope.hideColumn = (ev, visible) => {
		// ev.preventDefault()
		// var columnDefs = $scope.gridOptions.api.getColumnDefs()
		var allCols = $scope.headerList //$scope.gridOptions.columnApi.getAllColumns()
		// var ind = columnDefs.indexOf(columnDefs.find((f)=>f.field=='addCol'))
		console.log('%cgrid_component.js line:1042 ev, visible', 'color: #007acc;', allCols, ev, visible);
		if(ev == 'viewAll')
			allCols.map((cd, i)=>{
				$scope.gridOptions.columnApi.setColumnVisible(cd.colId, visible)
				// $scope.colvis[i] = $scope.viewAllCols
			})
		else {
				var ids = ev.length ? ev : [findAllByKey(ev, 'parentNode', 'attributes?.["col-id"]?.value')]
				// var id = ev
				console.log('%cgrid_component.js line:1196 id', 'color: #007acc;', ids, visible, $scope.gridOptions.columnApi.setColumnVisible);
				ids.map(id=>{
					console.log('%cgrid_component.js line:1431 id', 'color: #007acc;', id);
					// $scope.gridOptions.columnApi.setColumnVisible('Col1', visible)
					$scope.gridOptions.columnApi.setColumnVisible(id, visible)
				})
				$scope.viewAllCols = $scope.gridOptions.columnApi.getAllColumns().filter(col=>!col.isVisible()).length ? false : true
		}
		// if(!visible) {
		// 	var id = ev.length ? ev : ev.parentNode.parentNode.attributes['col-id'].value
		// 	// console.log('%cgrid_component.js line:736 hide, id', 'color: #007acc;', visible, id);
		// 	// 	editCol(columnDefs, id, {hide: true})
		// 	$scope.gridOptions.columnApi.setColumnVisible(id, visible)
		// }
		// else{
		// 	$scope.gridOptions.columnApi.getAllColumns().map(cd=>{
		// 		// console.log('%cgrid_component.js line:742 cd.colId', 'color: #007acc;', cd.colId, columnDefs[5].children[0].children[0].hide);
		// 		$scope.gridOptions.columnApi.setColumnVisible(cd.colId, visible)
		// 		// columnDefs = columnDefs
		// 		// editCol(columnDefs, cd.colId, {hide: false})
		// 	})
			enableTextFilter($scope.gridOptions)
		// }

		// $timeout(()=>{
			// console.log('%cgrid_component.js line:735 ev, hide', 'color: #007acc;', ev, hide, columnDefs);

			// $scope.gridOptions.api.setColumnDefs(columnDefs)
		// }, 10000)
	}
	$scope.addColumn = (ev, pos='right') => {
		// ev.preventDefault()
		var columnDefs = $scope.gridOptions.api.getColumnDefs()

		// var ind = columnDefs.indexOf(columnDefs.find((f)=>f.field=='addCol'))
		var id = ev.length ? ev : findAllByKey(ev, 'parentNode', "attributes?.['col-id']?.value")
		var ind = columnDefs.indexOf(columnDefs.find((f)=>f.field==id))
		// console.log('%cHello grid_component.js line:50 ', 'background: green; color: white; display: block;', ind, id, ev, ev.parentNode, ev.parentNode.parentNode, columnDefs.indexOf(columnDefs.find((f)=>f.field==ind))/* , inorder({children: columnDefs}, id, columnDefs, nodeid) */);
		// inorder({children: columnDefs}, id, columnDefs, nodeid)
		// inorder({children: columnDefs}, id)
		obj = {
			field: 'new',
			// headerCellRenderer: () => `	<form class="ag-cell-label-container" role="presentation" style="width: 100%" ng-submit="insertColumn(event, ${ind})">
			// 									<button type="submit" style="width: 25%">Add</button>
			// 									<input style="width: 75%"></input>
			// 								</form>`,
			headerComponentParams: {
				// template: '<span style="width: 20%">template</span>',
				template:
					`<form class="ag-cell-label-container" role="presentation" style="width: 100%" onsubmit="angular.element('.ag-theme-alpine').scope().insertColumn(this, '${id}', '${pos}'); ${treeOperations(columnDefs, 'new', `arr.splice(i, 1);`)}">
						<button type="submit" style="width: 25%">Add</button>
						<input id=addCol type="text" style="width: 75%"></input>
					</form>`,
				// displayName: 'displayName',
				// enableSorting: true,
				// enableMenu: true,
			}
			// cellRenderer: () => '+',
		}
		treeOperations(columnDefs, id, `arr.splice(i + ${pos=='right'?1:0}, 0, ${JSON.stringify(obj)})`)
		$timeout(()=>$('#addCol').focus(), 100)
		// insertCol(columnDefs, obj, id, ind)

		// $timeout(()=>{
		// 	console.log('%cgrid_component.js line:648 nodeid', 'color: #007acc;', nodeid)
		// 	// for (let i of inorder({children: columnDefs})) {
		// 	// 	console.log('%cgrid_component.js line:641 i', 'color: #007acc;', i);
		// 	// }
		// 	columnDefs = [...columnDefs.slice(0, ind), {
		// 		field: 'new',
		// 		// headerCellRenderer: () => `	<form class="ag-cell-label-container" role="presentation" style="width: 100%" ng-submit="insertColumn(event, ${ind})">
		// 		// 									<button type="submit" style="width: 25%">Add</button>
		// 		// 									<input style="width: 75%"></input>
		// 		// 								</form>`,
		// 		headerComponentParams: {
		// 			// template: '<span style="width: 20%">template</span>',
		// 			template:
		// 				`<form class="ag-cell-label-container" role="presentation" style="width: 100%" onsubmit="angular.element('.ag-theme-alpine').scope().insertColumn(this, ${ind})">
		// 					<button type="submit" style="width: 25%">Add</button>
		// 					<input style="width: 75%"></input>
		// 				</form>`,
		// 			// displayName: 'displayName',
		// 			// enableSorting: true,
		// 			// enableMenu: true,
		// 		}
		// 		// cellRenderer: () => '+',
		// 	}, ...columnDefs.slice(ind)]
		// })
		$scope.gridOptions.api.setColumnDefs(columnDefs)
	}
	$scope.insertColumn = (ev, id, pos='right') => {
		// ev.preventDefault()
		var colname = typeof ev == 'object' ? ev[1].value : ev
		var columnDefs = $scope.gridOptions.api.getColumnDefs()
		console.log('%cgrid_component.js line:89 ev', 'color: #007acc;', ev, colname, typeof ev/* , ev.parentNode, ev.parentNode */);
		// inorder({children: columnDefs})
		var obj = {
			field: colname,
			...defaultColDef,
			// headerComponentParams: defaultColDef.headerComponentParams
			// valueSetter: params => {
			// 	console.log('%cgrid_component.js line:1168 params', 'color: #007acc;', params);
			// 	params.data[colname] = '';
			// 	return true;
			// },
			headerComponentParams: {
				template: 
				`
					<div ref="eLabel" class="ag-header-cell-label" style="display: flex" onclick="angular.element('.ag-theme-alpine').scope().mainSelection('col', event)">
						<span ref="eText" class="ag-header-cell-text" style="flex-grow: 1"></span>
						<i class="feather icon-plus" style="cursor: pointer;float: right" onclick="angular.element('.ag-theme-alpine').scope().addColumn(this); event.stopPropagation()"></i>
						<i class="fa fa-eye-slash" aria-hidden="true" onclick="angular.element('.ag-theme-alpine').scope().hideColumn(this, false); event.stopPropagation()"></i>
						<i class="fa fa-trash" aria-hidden="true" onclick="angular.element('.ag-theme-alpine').scope().deleteColumn(this, this); event.stopPropagation()"></i>
					</div>
				`
			},
		}
		// var rangehex = [#2196f396, #2196f37d, #2196f35c, #2196f333]
		console.log('%cgrid_component.js line:1185 obj', 'color: #007acc;', obj);
		treeOperations(columnDefs, id, `arr.splice(i + ${pos=='right'?1:0}, 0, obj)`, 0, obj)
		treeOperations(columnDefs, 'new', `arr.splice(i, 1);`)

		// insertCol(columnDefs, obj, ind, ind)
		// deleteCol(columnDefs, 'new')

		console.log('%cgrid_component.js line:741 columnDefs', 'color: #007acc;', columnDefs, id, obj);
		// columnDefs[ind] = {
		// 	field: colname,
		// }
		$timeout(()=>enableTextFilter($scope.gridOptions))
		$scope.gridOptions.api.setColumnDefs(columnDefs)
		$scope.headerList.push($scope.gridOptions.columnApi.getColumn([colname]))
	}
	$scope.deleteColumn = (ev, id) => {
		// ev.preventDefault()
		console.log('%cgrid_component.js line:1069 ev', 'color: #007acc;', ev);
		var colname = ev.length ? ev : findAllByKey(ev, 'parentNode', "attributes?.['col-id']?.value")
		var columnDefs = $scope.gridOptions.api.getColumnDefs()
		console.log('%cgrid_component.js line:89 ev', 'color: #007acc;', ev, colname, typeof ev/* , ev.parentNode, ev.parentNode */, $scope.headerList.indexOf(colname));
		deleteCol(columnDefs, colname)
		$scope.headerList.splice($scope.headerList.findIndex(c=>c.colId==colname), 1)

		$timeout(()=>enableTextFilter($scope.gridOptions))
		$scope.gridOptions.api.setColumnDefs(columnDefs)
	}
	function findAllByKey(obj, repeatKey, finalKeyToFind) {
		var prop = eval('obj.'+finalKeyToFind)
		// console.log('%cgrid_component.js line:1202 obj, keyToFind', 'color: #007acc;', obj, repeatKey, finalKeyToFind, obj[repeatKey], prop);
		// if(!obj) return
		if(prop){
			return prop
		}
		else if(obj[repeatKey])
			return findAllByKey(obj[repeatKey], repeatKey, finalKeyToFind)
		// return Object.entries(obj)
		//   .reduce((acc, [key, value]) => (key === keyToFind)
		// 	? acc.concat(value)
		// 	: (typeof value === 'object')
		// 	? acc.concat(findAllByKey(value, keyToFind))
		// 	: acc
		//   , [])
	}

	$scope.clipboard = {
		text: '',
	}

	$scope.clipboardOperations = (type, col) => {
		console.log('%cgrid_component.js line:1158 cell, col, val', 'color: #007acc;', type, col, $scope.agconfig.selectedCells);
		switch (type) {
			case 'cut':
				$scope.clipboard.cut = true
				$scope.clipboard.cells = $scope.agconfig.selectedCells
				// $scope.agconfig.selectedCells[0].setDataValue(col, $scope.pasteTextFromClipboard())
				$scope.copy2DToClipboard($scope.agconfig.selection)
				break;
			case 'copy':
				$scope.clipboard.cut = false
				$scope.clipboard.cells = $scope.agconfig.selectedCells
				// cell.setDataValue(col, $scope.pasteTextFromClipboard())
				$scope.copy2DToClipboard($scope.agconfig.selection)
				break;
			case 'paste': case 'format': case 'onlyformat':
				// console.log('%cgrid_component.js line:1362 				$scope.agconfig.selectedCells[0].rowNode.data[$scope.agconfig.selectedCells[0].colId]?.v, $("#clipboard")[0].value', 'color: #007acc;', 				$scope.agconfig.selectedCells[0].rowNode.data[$scope.agconfig.selectedCells[0].colId]?.v, $scope.agconfig.selectedCells[0].rowNode.data, $scope.agconfig.selectedCells[0].colId, $("#clipboard")[0]?.value);
				var cbtxt = $scope.clipboard.text.split('\n').map(row=>row.split('\t'))

				if($scope.agconfig.rangeSelectedCells.length&&cbtxt.length==1&&cbtxt[0].length==1) {
					console.log('%cgrid_component.js line:1450 cbtxt', 'color: #007acc;', cbtxt);
					$scope.agconfig.selectedCells.map(cell=>addObj([cell.rowNode.data, cell.colId], {v: cbtxt[0][0]})/* cell.rowNode.data[cell.colId] ?  cell.rowNode.data[cell.colId].v = $scope.clipboard.text : cell.rowNode.data[cell.colId] = {v: $scope.clipboard.text} */)
				}
				else {
				// if($('#clipboard')[0].value.includes('\n')||$('#clipboard')[0].value.includes('\t'))
					// console.log('%cgrid_component.js line:1369 $("#clipboard")[0].value', 'color: #007acc;', cbtxt);
					$scope.agconfig.rangeSelectedCells = [{
						startRow: {rowId: parseInt($scope.agconfig.selectedCells[0].rowId), rowInd: parseInt($scope.agconfig.selectedCells[0].rowInd)},
						endRow: {rowId: parseInt($scope.gridOptions.api.getDisplayedRowAtIndex($scope.gridOptions.api.getRowNode($scope.agconfig.selectedCells[0].rowId).rowIndex + cbtxt.length-1).id), rowInd: $scope.gridOptions.api.getRowNode($scope.agconfig.selectedCells[0].rowId).rowIndex + cbtxt.length-1},
						startColumn: $scope.gridOptions.columnApi.getAllDisplayedColumns().find(c=>$scope.agconfig.selectedCells[0].colId==c.colId),
						columns: [...$scope.gridOptions.columnApi.getAllDisplayedColumns()].splice($scope.gridOptions.columnApi.getAllDisplayedColumns().findIndex(c=>$scope.agconfig.selectedCells[0].colId==c.colId), cbtxt[0].length)
					}]
					$scope.agconfig.selectedCells = []
					$scope.agconfig.rangeSelectedCells.map(cell=>{
						console.log('%cgrid_component.js line:2119 cell', 'color: #007acc;', cell);
						Array.from({length: (cell.endRow.rowInd - cell.startRow.rowInd + 1)}, (value, index)=>cell.startRow.rowInd+index).map((rid, ind)=>{
							cell.columns.map((col, j)=>{
								// console.log('%cgrid_component.js line:2121 col', 'color: #007acc;', col);
									// for(var i = cell.startRow.rowId; i <= cell.endRow.rowId; i++){
										// console.log('%cgrid_component.js line:2123 i', 'color: #007acc;', i);
										var rowNode = $scope.gridOptions.api.getDisplayedRowAtIndex(rid)
										var newcell = {
											colId: col.colId,
											rowId: rowNode.id,
											rowInd: rid,
											rowNode: rowNode
										}
										console.log('%cgrid_component.js line:2126 newcell', 'color: #007acc;', /* Array.from({length: (cell.endRow.rowId - cell.startRow.rowId)+1}, (value, index)=>cell.startRow.rowId+index), */ newcell, /* newcell?.rowNode?.data, */ cbtxt, /* newcell.rowNode?.data[newcell.colId]?.v, */ cbtxt[ind]?.[j], j, ind, /* $scope.clipboard.cells.filter(cell=>cell.colId==col.colId).filter(c=>c.rowId == rid)[0]?.rowNode?.data[col.colId] */);
										// if(!newcell.rowNode.data.hasOwnProperty(newcell.colId))
										// 	newcell.rowNode.data[newcell.colId] = {}
										if(type == 'paste')
											addObj([newcell.rowNode.data, newcell.colId], {'v': cbtxt[ind][j]})
										if(type == 'format'){
											// newcell.rowNode.data[newcell.colId] = $scope.clipboard.cells.filter(cell=>cell.colId==col.colId)?.filter(c=>c.rowId == rid)[0]?.rowNode.data[col.colId]
											var node = $scope.clipboard.cells[$scope.clipboard.cells.length/$scope.agconfig.rangeSelectedCells[0].columns.length*j+ind]

											// console.log('%cgrid_component.js line:1412 $scope.clipboard.cells.length/$scope.agconfig.rangeSelectedCells[0].columns.length*ind+j', 'color: #007acc;', $scope.clipboard.cells.length, $scope.agconfig.rangeSelectedCells[0].columns.length, ind, j, $scope.clipboard.cells.length/$scope.agconfig.rangeSelectedCells[0].columns.length*ind+j, node, cbtxt[ind][j], node.colId, node?.rowNode.data[node.colId]);

											// console.log('%cgrid_component.js line:1410 ind, j', 'color: #007acc;', ind, j, $scope.clipboard.cells.length/$scope.agconfig.rangeSelectedCells[0].columns.length*ind+j, $scope.clipboard.cells[$scope.clipboard.cells.length/$scope.agconfig.rangeSelectedCells.length*j+ind], $scope.clipboard.cells, node, $scope.clipboard.cells.length, $scope.agconfig.rangeSelectedCells[0].columns.length);

											newcell.rowNode.data[newcell.colId].v = cbtxt[ind][j]
											newcell.rowNode.data[newcell.colId].style = node?.rowNode.data[node.colId].style

											// newcell.rowNode.data[newcell.colId] = node?.rowNode.data[node.colId] || newcell.rowNode.data[newcell.colId]
										}
										// if(type == 'onlyformat'){
										// 	var node = $scope.clipboard.cells[$scope.clipboard.cells.length/$scope.agconfig.rangeSelectedCells[0].columns.length*ind+j]
										// 	console.log('%cgrid_component.js line:1410 ind, j', 'color: #007acc;', ind, j, $scope.clipboard.cells.length/$scope.agconfig.rangeSelectedCells[0].columns.length*ind+j, $scope.clipboard.cells[$scope.clipboard.cells.length/$scope.agconfig.rangeSelectedCells.length*ind+j], $scope.clipboard.cells, node, $scope.clipboard.cells.length, $scope.agconfig.rangeSelectedCells[0].columns.length);
										// 	newcell.rowNode.data[newcell.colId].style = node.rowNode.data[node.colId].style
										// }
										$scope.agconfig.selectedCells.push(newcell)
									// }
								})
							})
					})

					// var r = $scope.agconfig.selectedCells[0].rowId
					// var c = Object.keys($scope.agconfig.selectedCells[0].rowNode.data).indexOf($scope.agconfig.selectedCells[0].colId)
					// cbtxt.map((rowt, rid)=>{
					// 	var row = $scope.gridOptions.api.getRowNode(r+rid)
					// 	rowt.map((txt, cid)=>{
					// 		console.log('%cgrid_component.js line:1375 txt', 'color: #007acc;', txt, row[$scope.agconfig.selectedCells[0].rowNode.data[Object.keys($scope.agconfig.selectedCells[0].rowNode.da	ta[c+cid])]]);
					// 		row[$scope.agconfig.selectedCells[0].rowNode.data[Object.keys($scope.agconfig.selectedCells[0].rowNode.data[c+cid])]]
					// 	})
					// })
				}
				
					// $scope.agconfig.selectedCells[0].rowNode.data[$scope.agconfig.selectedCells[0].colId].v = $('#clipboard')[0].value
				if($scope.clipboard.cut) {
					$scope.clipboard.cells.map(cell=>{
						console.log('%cgrid_component.js line:1525 cell, cell.rowNode. cell.rowNode.data, cell.rowNode.data[cell.colId], cell.colId', 'color: #007acc;', cell, cell.rowNode, cell.rowNode.data, cell.rowNode.data[cell.colId], cell.colId);
						if(!cell.rowNode.data.hasOwnProperty(cell.colId))
							cell.rowNode.data[cell.colId] = {}
						cell.rowNode.data[cell.colId].v = ''
					})
					$scope.clipboard.cut = false
				}
				// $scope.agconfig.selectedCells?.[0].rowNode.setDataValue($scope.agconfig.selectedCells[0].colId, "$('#clipboard')[0].value")
				break;
			case 'pasteArr':
				$scope.agconfig.selectedCells.map(c=>$scope.clipboardOperations(c.rowNode, 'paste', c.colId))
				break;
			case 'delete':
				$scope.agconfig.selectedCells.map(cell=>cell.rowNode.setDataValue(cell.colId, {v: ''}))
				break;
			case 'deleteArr':
				$scope.agconfig.selectedCells.map(c=>$scope.clipboardOperations(c.rowNode, 'delete', c.colId))
				break;
			default:
				break;
		}
		$scope.refreshCells('all')
	}

	$scope.mergeRows = () => {
		var selected = $scope.gridOptions.api.getSelectedNodes()
		console.log('%cgrid_component.js line:607 $scope.gridOptions.api.getSelectedNodes()', 'color: #007acc;', selected);
		// var rowMerge = selected.map(s=>s.rowIndex)
		// var rowMerge = selected.map(s=>parseInt(s.id))
		selected.map(s=>{s.data['rowMerge'] = selected;s.data['mergeSelected']= true})
		$scope.gridOptions.api.redrawRows()
		// $scope.gridOptions.api.refreshCells({
		// 	force: true,
		// 	columns: ['check'],
		// });
	}
	$scope.mergeSelect = (ev, id) => {
		var rowMerge = $scope.gridOptions.api.getRowNode(id).data.rowMerge
		console.log('%cgrid_component.js line:686 rowMerge', 'color: #007acc;', ev, id,rowMerge);
		rowMerge.map((node, i)=>{
			// var node = $scope.gridOptions.api.getRowNode(id)
			// console.log('%cgrid_component.js line:688 node, id', 'color: #007acc;', node, id);
			if(node)
				node.setSelected(ev.checked)
			// else
			// 	rowMerge.map((id, i)=>{
			// 		$scope.gridOptions.api.getRowNode(id).data.rowMerge.splice(1, i)
			// 		// console.log('%cgrid_component.js line:688 node, id', 'color: #007acc;', node, id);
			// 		// if(node)
			// 		// 	node.setSelected(ev.checked)rowMerge.data.rowMerge
			// 	})
		})
	}
	$scope.mergeCells = (type) => {
		switch (type) {
			case 'hyphen':

				console.log('%cgrid_component.js line:1615 $scope.agconfig.rangeSelectedCells[0].startRow.rowInd, $scope.agconfig.rangeSelectedCells[0].endRow.rowInd', 'color: #007acc;', $scope.agconfig.rangeSelectedCells[0].startRow.rowInd, $scope.agconfig.rangeSelectedCells[0].endRow.rowInd, Array.from({length: $scope.agconfig.rangeSelectedCells[0].endRow.rowInd - $scope.agconfig.rangeSelectedCells[0].startRow.rowInd + 1}, (v, i)=>{console.log('%cgrid_component.js line:1617 v, i, $scope.agconfig.rangeSelectedCells[0].startRow.rowInd', 'color: #007acc;', v, i, $scope.agconfig.rangeSelectedCells[0].startRow.rowInd); return $scope.agconfig.rangeSelectedCells[0].startRow.rowInd+i}));
				var cellMerge = {
					type: 'hyphen',
					colId: $scope.agconfig.rangeSelectedCells[0].columns.map(col=>col.colId),
					rowInd: Array.from({length: $scope.agconfig.rangeSelectedCells[0].endRow.rowInd - $scope.agconfig.rangeSelectedCells[0].startRow.rowInd + 1}, (v, i)=>{console.log('%cgrid_component.js line:1617 v, i, $scope.agconfig.rangeSelectedCells[0].startRow.rowInd', 'color: #007acc;', v, i, $scope.agconfig.rangeSelectedCells[0].startRow.rowInd); return $scope.agconfig.rangeSelectedCells[0].startRow.rowInd+i}),
					rowId: [],
					data: []
				}

				// cellMerge.rowInd.map(ind=>{
				// })
				
				cellMerge.rowInd.map(rind=>{
					console.log('%cgrid_component.js line:1410 rid', 'color: #007acc;', rind);
					cellMerge['rowId'].push($scope.gridOptions.api.getDisplayedRowAtIndex(rind).id)
					cellMerge.data.push([...$scope.agconfig.selectedCells].filter(a => a.rowInd==rind).map(cell=>cell.rowNode.data[cell.colId]?.v || ''))
				})
				console.log('%cgrid_component.js line:1412 cellMerge.data', 'color: #007acc;', cellMerge, cellMerge.data, $scope.agconfig.rangeSelectedCells[0]);
				// for(var i = arr[0].rowId; i <= arr.at(-1).rowId; i++) {
				// 	console.log('%cgrid_component.js line:1259 i, arr', 'color: #007acc;', i, arr.filter(a => a.rowId==i));
				// 	cellMerge.data.push(arr.filter(a => a.rowId==i).map(cell=>cell.rowNode.data[cell.colId]))
				// 	// cellMerge.data[i].push(cell.rowNode.data[cell.colId])
				// }
				// $scope.agconfig.selectedCells.map(cell=>{
				// 	console.log('%cgrid_component.js line:1252 cell.rowNode.data["cellMerge"]', 'color: #007acc;', cell, cell.rowId, cell.rowNode.data["cellMerge"], cellMerge);
				// 	cellMerge.data[cell.rowId].push(cell.rowNode.data[cell.colId])
				// 	// $scope.agconfig.selectedCells.map(cell2=>{
				// 	// 	var col = $scope.agconfig.rangeSelectedCells[0].columns.find(h=>h.colId==cell2.colId)
				// 	// 	console.log('%cgrid_component.js line:1254 col', 'color: #007acc;', col);
				// 	// })
				// })
				var newtext = ''
				cellMerge.data.map(d=>d.map(i=>newtext += ' - ' + (i ? i : '')))
				newtext = newtext.slice(2)
				console.log('%cgrid_component.js line:1256', 'color: #007acc;', cellMerge, $scope.agconfig.rangeSelectedCells[0].columns.length, newtext, cellMerge.data);
				$scope.agconfig.selectedCells.map(cell=>{
					// console.log('%cgrid_component.js line:1599 cell', 'color: #007acc;', cell, cell.rowNode.data, cell.colId, cell.rowNode.data[cell.colId]);
					// cell.rowNode.data[cell.colId].hasOwnProperty('cellMerge') ? cell.rowNode.data[cell.colId]['cellMerge'] = (cellMerge) : cell.rowNode.data[cell.colId]['cellMerge'] = cellMerge
					addObj([cell.rowNode.data, cell.colId, 'cellMerge'], cellMerge)
					// cell.rowNode.data[cell.colId]['cellMerge'] = cellMerge
					cell.rowNode.data[cell.colId].v = newtext
					// if(!cell.rowNode.data[cell.colId]?.['style']?.hasOwnProperty('background-color'))cell.rowNode.data[cell.colId]['style']['background-color'] =  'white'
				// 	// $scope.agconfig.selectedCells.map(cell2=>{
				// 	// 	var col = $scope.agconfig.rangeSelectedCells[0].columns.find(h=>h.colId==cell2.colId)
				// 	// 	console.log('%cgrid_component.js line:1254 col', 'color: #007acc;', col);
				// 	// })
				// 	console.log('%cgrid_component.js line:1252 cell.rowNode.data["cellMerge"]', 'color: #007acc;', cell.rowNode.data["cellMerge"], cellMerge);
				})
				// $scope.agconfig.selectedCells[0].rowNode.data[$scope.agconfig.selectedCells[0].colId]['cellMerge']['start'] = true
				console.log('%cgrid_component.js line:1250 $scope.agconfig.selectedCells', 'color: #007acc;', $scope.agconfig.selectedCells, $scope.agconfig.selectedCells?.[0].rowNode.data[$scope.agconfig.selectedCells[0].colId].cellMerge, newtext, cellMerge, cellMerge.data);
				// $scope.refreshCells('all')
				$scope.agconfig.selectedCells = [$scope.agconfig.selectedCells[0]]
				$scope.agconfig.selectedCells[0].rowNode.data[cellMerge.colId[0]].rowspan = cellMerge.data.length
				$scope.agconfig.selectedCells[0].rowNode.data[cellMerge.colId[0]].colspan = cellMerge.data[0].length
				$scope.agconfig.rangeSelectedCells[0].columns = [$scope.agconfig.rangeSelectedCells[0].columns[0]]
				$scope.agconfig.rangeSelectedCells[0].endRow = $scope.agconfig.rangeSelectedCells[0].startRow
				$scope.gridOptions.api.redrawRows()
				// $scope.agconfig.selectedCells = [$scope.agconfig.selectedCells[0]]
				break;
			default:
				break;
		}
	}
	$scope.splitCells = (type) => {
		switch (type) {
			case 'hyphen':
				var cellMerge = $scope.agconfig.selectedCells[0].rowNode.data[$scope.agconfig.selectedCells[0].colId].cellMerge//.find(c=>c.colId[0] == $scope.agconfig.selectedCells[0].colId)
				// var cols = [...$scope.headerList].splice($scope.headerList.findIndex(h=>h.colId == cellMerge.colId), cellMerge.data[0].length)
				// var arr = [...$scope.agconfig.selectedCells]
				// while(arr.length) cellMerge.data.push(arr.splice(0, $scope.agconfig.rangeSelectedCells[0].columns.length).map(cell=>cell.rowNode.data[cell.colId]))
				// $scope.agconfig.selectedCells.map(cell=>{
				// 	console.log('%cgrid_component.js line:1252 cell.rowNode.data["cellMerge"]', 'color: #007acc;', cell, cell.rowId, cell.rowNode.data["cellMerge"], cellMerge);
				// 	cellMerge.data[cell.rowId].push(cell.rowNode.data[cell.colId])
				// 	// $scope.agconfig.selectedCells.map(cell2=>{
				// 	// 	var col = $scope.agconfig.rangeSelectedCells[0].columns.find(h=>h.colId==cell2.colId)
				// 	// 	console.log('%cgrid_component.js line:1254 col', 'color: #007acc;', col);
				// 	// })
				// })
				// $scope.agconfig.selectedCells.map(cell=>{
				// 	console.log('%cgrid_component.js line:1431 cell', 'color: #007acc;', cell, cell.rowNode.data, cell.colId, cell.rowNode.data[cell.colId]);
				// 	if(cell.rowNode.data[cell.colId].hasOwnProperty('cellMerge'))
				// 	cell.rowNode.data[cell.colId]['cellMerge'].data.map((row, rid)=>{
				// 		row.map((val, cid)=>{

				// 		})
				// 	})
				// 	cell.rowNode.data[cell.colId]['cellMerge'] = (cellMerge) : cell.rowNode.data[cell.colId]['cellMerge'] = cellMerge
				// 	cell.rowNode.data[cell.colId].v = newtext
				// })

				// var row = $scope.gridOptions.api.getRowNode(cellMerge.rowId[0])
				// row.data[cellMerge.colId[0]] = cellMerge.data[0][0]
				// delete row.data.cellMerge
				console.log('%cgrid_component.js line:1485 cellMerge', 'color: #007acc;', cellMerge);
				cellMerge.rowId.map((rid, i)=>{
					var row = $scope.gridOptions.api.getRowNode(rid)
					cellMerge.colId.map((cid, j)=>{
						console.log('%cgrid_component.js line:1315 cellMerge.data[cid][rid], cellMerge.data, cid, rid', 'color: #007acc;', cellMerge.data, i, j, cid, rid, row);
						row.data[cid].v = cellMerge.data[i][j]
						delete row.data[cid].cellMerge
						delete row.data[cid].rowspan
						delete row.data[cid].colspan
					})
				})
				
				// console.log('%cgrid_component.js line:1291 cellMerge', 'color: #007acc;', cellMerge, cols, cellMerge.data, cellMerge.data[0].length, row);

				// $scope.agconfig.selectedCells.map(cell=>{
					// $scope.agconfig.selectedCells[0].rowNode.data.hasOwnProperty('cellMerge') ? $scope.agconfig.selectedCells[0].rowNode.data['cellMerge'].push(cellMerge) : $scope.agconfig.selectedCells[0].rowNode.data['cellMerge'] = [cellMerge]
					// $scope.agconfig.selectedCells[0].rowNode.data[cellMerge.colId] = newtext
				// 	// $scope.agconfig.selectedCells.map(cell2=>{
				// 	// 	var col = $scope.agconfig.rangeSelectedCells[0].columns.find(h=>h.colId==cell2.colId)
				// 	// 	console.log('%cgrid_component.js line:1254 col', 'color: #007acc;', col);
				// 	// })
				// 	console.log('%cgrid_component.js line:1252 cell.rowNode.data["cellMerge"]', 'color: #007acc;', cell.rowNode.data["cellMerge"], cellMerge);
				// })
				console.log('%cgrid_component.js line:1250 $scope.agconfig.selectedCells', 'color: #007acc;', $scope.agconfig.selectedCells, $scope.agconfig.selectedCells?.[0].rowNode.data.cellMerge);
				// $scope.refreshCells('all')
				$scope.gridOptions.api.redrawRows()

				break;

			default:
				break;
		}
	}
	$scope.togglecb = (ele, type) => {
		console.log('%cgrid_component.js line:208 ele, ele.checked togglecb', 'color: #007acc;', ele, ele.checked);
		switch(type) {
			case 'headerslct': {
				// console.log('%cgrid_component.js line:496 !$("#headerslct").checked', 'color: #007acc;', !$("#headerslct").checked, $scope.gridOptions.api.getDisplayedRowAtIndex(1).data.header, $scope.gridOptions.api.getDisplayedRowAtIndex(1).data.hidden);
				$scope.gridOptions.api.forEachNode(node=> node.data.header ? 0 : node.data.hidden && node.isSelected() ? node.setSelected(false) : '')
				
				// $('#headerslct')[0].checked ? $scope.gridOptions.api.forEachNodeAfterFilter(node=> node.data.header ? 0 : node.setSelected(true)) : $scope.gridOptions.api.forEachNodeAfterFilter(node=> node.data.header ? 0 : node.setSelected(false))
				// if(ele.checked) $('input:checkbox').prop('checked', true);
				// else $('input:checkbox').removeAttr('checked', false);
				break;
			}
			case 'dataslct': {
				var node = $scope.gridOptions.api.getRowNode(parseInt(ele.rowNode.id))
				console.log('%cgrid_component.js line:502 node', 'color: #007acc;', node);
				!node.selected ? node.setSelected(true) : node.setSelected(false)
				ele.checked && $scope.agconfig.selectedRows.includes($scope.gridOptions.api.getRowNode(parseInt(ele.id.substr(5)))).data
				break;
			}
			case 'invert': {
				var unselected = []
				$scope.gridOptions.api.forEachNodeAfterFilter(node => node.data.header ? 0 : !$scope.agconfig.selectedRows.includes(node.data) ? unselected.push(node.data) : 0)
				$timeout(()=>$scope.delRows(unselected))
				break;
			}
			case 'hideSelected': {
				console.log('%cgrid_component.js line:891 $scope.gridOptions', 'color: #007acc;', $scope.gridOptions);
				// process_array($scope.agconfig.selectedRows, node => {
				// 	console.log('%cgrid_component.js line:1909 node', 'color: #007acc;', node);
				// 	node['hidden'] = true
				// 	$scope.gridOptions.api.onFilterChanged();
				// }, true, 100)
				$scope.gridOptions.api.getSelectedNodes()/* .filter(node=>!!node) */.map(node => {
					node.data['hidden'] = true
				});
				$scope.gridOptions.api.onFilterChanged();
				// $scope.togglecb(ele, 'headerslct')
				break;
			}
			case 'unhideAll': {
				console.log('%cgrid_component.js line:891 $scope.gridOptions', 'color: #007acc;', $scope.gridOptions);
				$scope.gridOptions.api.forEachNode(node => {
					delete node.data['hidden']
				});
				$scope.gridOptions.api.onFilterChanged();
				break;
			}
			case 'filter': {
				console.log('%cgrid_component.js line:616 ele', 'color: #007acc;', ele);
				var ch = $scope.valcount[$scope.filterColId].filter(val=>val.checked)
				$('#filterCheckBoxSA')[0].indeterminate = ch.length > 0 && ch.length < $scope.valcount[$scope.filterColId].length
				$scope.gridOptions.api.onFilterChanged();
				break;
			}
			case 'filterSA': {
				var item = $('#filterCheckBoxSA')[0]
				$scope.valSA[$scope.filterColId].checked = item.checked
				$scope.valcount[$scope.filterColId].map(val=>val.checked=item.checked)
				$scope.gridOptions.api.onFilterChanged();
				break;
			}
			case 'only': {
				$('input:checkbox').prop('checked', false)
				$scope.valcount[$scope.filterColId].map(val=>val.checked = false)
				$('input:checkbox#filterCheckBox'+ele).prop('checked', true)
				$scope.valcount[$scope.filterColId][ele].checked = true
				$scope.valSA[$scope.filterColId].checked = 'indeterminate'
				$('#filterCheckBoxSA')[0].indeterminate = true
				$scope.gridOptions.api.onFilterChanged();
				break;
			}
		}
		// $scope.gridOptions.api.refreshCells({
		// 	force: true,
		// 	columns: ['check'],
		// });
		console.log('%cgrid_component.js line:227 $scope.agconfig.selectedRows togglecb', 'color: #007acc;', $scope.agconfig.selectedRows);
	}

	// var filterParams = {
	// 	comparator: (a, b) => {
	// 	  var valA = a == null ? 0 : parseInt(a);
	// 	  var valB = b == null ? 0 : parseInt(b);
	// 	  if (valA === valB) return 0;
	// 	  return valA > valB ? 1 : -1;
	// 	},
	//   };
	$scope.clearText = {

	}

    var manual = false;
    var selectedColumn;
	var selectedRow;
	$scope.data;
	$scope.edited_cells = []
	$scope.al = (val) => alert(val)
	var defaultColDef = {
		resizable: true,
		flex: 1,
		minWidth: 150,
		getQuickFilterText: params => {
			return params.value?.v;
		},
		// filter: setupGui,
		// menuTabs: ["filterMenuTab", "generalMenuTab", "columnsMenuTab"],
		
		filter: SetFilter,
		// filter: 'agTextColumnFilter',
		// filterParams: filterParams,
		// wrapText: true,
		// autoHeight: true,
		suppressMenu: true,
		// menuTabs: [],
		// suppressMenuHide: false,
		suppressMovable: true,
		// enableBrowserTooltips: true,
		// tooltipField : 'Col1',
		// tooltipComponentParams: (params) => console.log('%cgrid_component.js line:1625 params', 'color: #007acc;', params),
		rowSpan: (params) => {
			// console.log('%cgrid_component.js line:693 params.data, params.node.rowIndex, params', 'color: #007acc;', params.data, params.data.rowMerge, params.node.id, params.node.rowIndex, params, params.data?.[params.column.colId]?.cellMerge);
			if(params.data[params.column.colId]?.rowspan)return params.data[params.column.colId]?.rowspan
			if(params.data.rowMerge && params.data.rowMerge[0].id == params.node.id && params.column.colId == 'merge')
				return params.data.rowMerge.length

			// var mergeObj = params.data?.[params.column.colId]?.cellMerge//?.findIndex(cell=>cell.rowId[0]==params.node.id && cell?.colId[0]==params.column.colId)
			// var a = params.data?.[params.column.colId]?.cellMerge?.filter(cell=>cell.rowId==params.node.id && cell?.colId==params.column.colId)
			// console.log('%cgrid_component.js line:1399 mergeObj', 'color: #007acc;', mergeObj, params.node.id, params.column.colId, params.data?.cellMerge?.[mergeObj]?.data, mergeObj?.rowId.length);
			// if(mergeObj?.colId[0] == params.column.colId && mergeObj?.rowId[0] == params.node.id && mergeObj?.type == 'hyphen')
			// 	return mergeObj?.rowInd.length
			else return 1
		},
		colSpan: (params) => {
			// var mergeObj = params.data?.[params.column.colId]?.cellMerge//?.findIndex(cell=>cell.rowId[0]==params.node.id && cell?.colId[0]==params.column.colId)
			// console.log('%cgrid_component.js line:1622 params.data, params.node.rowIndex, params', 'color: #007acc;', params.data, params.node.rowIndex, params, params.data?.cellMerge?.type, params.data?.cellMerge?.data, mergeObj, mergeObj?.colId.length, params.data?.[params.column.colId]?.cellMerge, mergeObj?.colId[0], params.column.colId, mergeObj?.rowId[0], params.node.id, params.data?.cellMerge?.type == 'hyphen');
			if(params.data[params.column.colId]?.colspan)return params.data[params.column.colId]?.colspan
			// if(mergeObj?.colId[0] == params.column.colId && mergeObj?.rowId[0] == params.node.id && mergeObj?.type == 'hyphen')
			// 	return mergeObj?.colId.length
			else return 1
		},
		cellStyle: cellStyle,
		cellClassRules: {
			'cellevent': (params)=>!params.data.header,
			'multicell': (params)=>$scope.agconfig.selectedCells?.find((cell)=>cell[0] == params.node.id && cell[1] == params.colDef.field),
			'cell-range': (params)=>{
				var style = false
				$scope.agconfig.rangeSelectedCells.map((range, i)=>{
					var { startRow, endRow, columns } = range
					var style_row = !!(((startRow.rowInd <= params.rowIndex && endRow.rowInd >= params.rowIndex && startRow.rowInd <= endRow.rowInd) || (startRow.rowInd >= params.rowIndex && endRow.rowInd <= params.rowIndex && startRow.rowInd >= endRow.rowInd)) && (columns.find(col=>col.colId == params.colDef.field)))
					style = style || style_row
					// if(Math.abs(startRow.rowInd - endRow.rowInd) == 4 && columns.length == 4)
					// console.log('%cgrid_component.js line:1220 style', 'color: #007acc;', i, params, style_row, style, startRow, endRow, columns, params.rowIndex, params.colDef.field, (startRow.rowInd - endRow.rowInd), columns.length);
					// return style
				})
				// console.log('%cgrid_component.js line:826 ((startRow.rowInd <= params.rowIndex && endRow.rowInd >= params.rowIndex && startRow.rowInd <= endRow.rowInd) || (startRow.rowInd >= params.rowIndex && endRow.rowInd <= params.rowIndex && startRow.rowInd >= endRow.rowInd)) && (columns.find(col=>col.colId == params.colDef.field)), startRow, endRow, columns, params.rowIndex', 'color: #007acc;', ((startRow.rowInd <= params.rowIndex && endRow.rowInd >= params.rowIndex && startRow.rowInd <= endRow.rowInd) || (startRow.rowInd >= params.rowIndex && endRow.rowInd <= params.rowIndex && startRow.rowInd >= endRow.rowInd)) && (!!columns.find(col=>col.colId == params.colDef.field)), (startRow.rowInd <= params.rowIndex || endRow.rowInd >= params.rowIndex), (columns.find(col=>col.colId == params.colDef.field)), startRow, endRow, columns, params.rowIndex, params, ((startRow.rowInd <= params.rowIndex && endRow.rowInd >= params.rowIndex && startRow.rowInd <= endRow.rowInd) || (startRow.rowInd >= params.rowIndex && endRow.rowInd <= params.rowIndex && startRow.rowInd >= endRow.rowInd)) && (columns.find(col=>col.colId == params.colDef.field)));
				return style
			},
			'cell-range-top': (params)=>{
				var style = false
				$scope.agconfig.rangeSelectedCells.map((range, i)=>{
					var { startRow, endRow, columns } = range
					var style_row = !!(((startRow.rowInd == params.rowIndex && startRow.rowInd <= endRow.rowInd) || (endRow.rowInd == params.rowIndex && startRow.rowInd >= endRow.rowInd)) && (columns.find(col=>col.colId == params.colDef.field)))
					// console.log('%cgrid_component.js line:1245 ((startRow.rowInd == params.rowIndex && startRow.rowInd <= endRow.rowInd) || (endRow.rowInd == params.rowIndex && startRow.rowInd >= endRow.rowInd)) && (columns.find(col=>col.colId == params.colDef.field))', 'color: #007acc;', !!(((startRow.rowInd == params.rowIndex && startRow.rowInd <= endRow.rowInd) || (endRow.rowInd == params.rowIndex && startRow.rowInd >= endRow.rowInd)) && (columns.find(col=>col.colId == params.colDef.field))));
					style = style || style_row
					// return style || style_row
				})
				// var { startRow, endRow, columns } = $scope.agconfig.rangeSelectedCells
				// console.log('%cgrid_component.js line:826 ((startRow.rowInd <= params.rowIndex && endRow.rowInd >= params.rowIndex && startRow.rowInd <= endRow.rowInd) || (startRow.rowInd >= params.rowIndex && endRow.rowInd <= params.rowIndex && startRow.rowInd >= endRow.rowInd)) && (columns.find(col=>col.colId == params.colDef.field)), startRow, endRow, columns, params.rowIndex', 'color: #007acc;', startRow.rowInd == params.rowIndex, startRow, endRow, columns, params.rowIndex);
				// return ((startRow.rowInd == params.rowIndex && startRow.rowInd <= endRow.rowInd) || (endRow.rowInd == params.rowIndex && startRow.rowInd >= endRow.rowInd)) && (columns.find(col=>col.colId == params.colDef.field))
				return style
			},
			'cell-range-bottom': (params)=>{
				var style = false
				$scope.agconfig.rangeSelectedCells.map((range, i)=>{
					var { startRow, endRow, columns } = range
					// console.log('%cgrid_component.js line:1439 (params.node.data.cellMerge?.rowId == (startRow.rowInd < endRow.rowInd ? startRow.rowInd : endRow.rowInd) && (params.node.data.cellMerge?.colId == columns[0].colId))', 'color: #007acc;', i, params, columns, params.node.data.cellMerge?.rowId, (startRow.rowInd < endRow.rowInd ? startRow.rowInd : endRow.rowInd), (params.node.data.cellMerge?.rowId == (startRow.rowInd < endRow.rowInd ? startRow.rowInd : endRow.rowInd)&&(params.colDef.field == columns[0].colId)), (startRow.rowInd == params.rowIndex && startRow.rowInd >= endRow.rowInd) || (endRow.rowInd == params.rowIndex && startRow.rowInd <= endRow.rowInd), params.node.data.cellMerge?.colId, columns?.[0]?.colId, (params.node.data.cellMerge?.rowId == (startRow.rowInd < endRow.rowInd ? startRow.rowInd : endRow.rowInd) && (params.node.data.cellMerge?.colId == columns?.[0]?.colId)));
					// console.log('%cgrid_component.js line:1444 (startRow.rowInd == params.rowIndex && startRow.rowInd >= endRow.rowInd) || (endRow.rowInd == params.rowIndex && startRow.rowInd <= endRow.rowInd)', 'color: #007acc;', startRow.rowInd, endRow.rowInd, params.rowIndex, startRow.rowInd >= endRow.rowInd, startRow.rowInd <= endRow.rowInd, (startRow.rowInd == params.rowIndex && startRow.rowInd >= endRow.rowInd) || (endRow.rowInd == params.rowIndex && startRow.rowInd <= endRow.rowInd));
					var style_row = !!((((startRow.rowInd == params.rowIndex && startRow.rowInd >= endRow.rowInd) || (endRow.rowInd == params.rowIndex && startRow.rowInd <= endRow.rowInd))&&(columns.find(col=>col.colId == params.colDef.field)))||(params.node.data.cellMerge?.find(cell=>cell.rowId[0] == (startRow.rowInd < endRow.rowInd ? startRow.rowInd : endRow.rowInd)&&cell.rowId[0] == params.rowIndex&&params.colDef.field == cell.colId[0]&&columns[0]?.colId == cell.colId[0]/*  && params.node.data.cellMerge[0]?.data.length */)
					))
					style = style || style_row
				})
				return style
			},
			'cell-range-left': (params)=>{
				var style = false
				$scope.agconfig.rangeSelectedCells.map((range, i)=>{
					var { startRow, endRow, columns } = range
					var style_row = !!(columns.length && columns?.[0]?.colId == params.colDef.field && ((startRow.rowInd <= params.rowIndex && endRow.rowInd >= params.rowIndex && startRow.rowInd <= endRow.rowInd) || (startRow.rowInd >= params.rowIndex && endRow.rowInd <= params.rowIndex && startRow.rowInd >= endRow.rowInd)))
					style = style || style_row
				})
				return style
			},
			'cell-range-right': (params)=>{
				var style = false
				$scope.agconfig.rangeSelectedCells.map((range, i)=>{
					var { startRow, endRow, columns } = range
					// console.log('%cgrid_component.js line:1465 params.node.data.cellMerge?.find(cell=>cell.rowId == (startRow.rowInd < endRow.rowInd ? startRow.rowInd : endRow.rowInd)&&cell.rowId == params.rowIndex&&params.colDef.field == cell.colId/*  && params.node.data.cellMerge[0]?.data.length */)', 'color: #007acc;', params.node.data.cellMerge?.find(cell=>cell.rowId == (startRow.rowInd < endRow.rowInd ? startRow.rowInd : endRow.rowInd)&&cell.rowId == params.rowIndex&&params.colDef.field == cell.colId/*  && params.node.data.cellMerge[0]?.data.length */), (startRow.rowInd < endRow.rowInd ? startRow.rowInd : endRow.rowInd), params.rowIndex, columns[0]?.colId, params.colDef.field);
					var style_row = !!(
						(columns.length && columns.at(-1)?.colId == params.colDef.field) 
						&&
						(
							(startRow.rowInd <= params.rowIndex && endRow.rowInd >= params.rowIndex && startRow.rowInd <= endRow.rowInd)
							||
							(startRow.rowInd >= params.rowIndex && endRow.rowInd <= params.rowIndex && startRow.rowInd >= endRow.rowInd)
						)
						||
						(params.node.data.cellMerge?.find(cell=>cell.rowId[0] == (startRow.rowInd < endRow.rowInd ? startRow.rowInd : endRow.rowInd)&&cell.rowId[0] == params.rowIndex&&params.colDef.field == cell.colId[0]&&columns[0]?.colId == cell.colId[0]/*  && params.node.data.cellMerge[0]?.data.length */)
						)
					)
					style = style || style_row
				})
				return style
			},
		},
		getMainMenuItems: () => {
			return ['generalMenuTab', 'columnsMenuTab']
		},
		// cellClass: ['cellevent'],
		// editable: false,
		suppressSizeToFit: true,
		cellRenderer: function (params) {
			// console.log('%cgrid_component.js line:60 params', 'color: #007acc;', params, params.value, params.column.colId, $scope.headerList, params.column.instanceId);	
			if(params.value?.v==undefined) return ''
			else if(params.value?.ct)
				return params.value?.ct
			// else if($scope.agconfig.type=='tree')
			// 	return `
			// 		<div style="width: 100%">
			// 			<span>
			// 				${params.column.instanceId == 0 && params.data.path ? params.data.folded ? `<i class="fa fa-chevron-up"></i>` : `<i class="fa fa-chevron-down"></i>` : ''}
			// 			</span>
			// 			${params.value?.v}
			// 			<span style="float: right">
			// 				<!--i class="fa fa-copy" aria-hidden="true" ng-click="copyTextToClipboard('params.value')"></i>
			// 				<i class="fa fa-paste" aria-hidden="true" ng-click="pasteTextFromClipboard()"></i>
			// 				<i class="fa fa-solid fa-eraser" ng-click="${params.value=''}"></i-->
			// 			</span>
			// 		</div>`
			return `
				<div style="width: 100%">
					${params.value?.v}
					<span style="float: right">
						<!--i class="fa fa-copy" aria-hidden="true" ng-click="copyTextToClipboard('params.value')"></i>
						<i class="fa fa-paste" aria-hidden="true" ng-click="pasteTextFromClipboard()"></i>
						<i class="fa fa-solid fa-eraser" ng-click="${params.value=''}"></i-->
					</span>
				</div>`
		},
		onCellValueChanged: (params) => {
			console.log('%cgrid_component.js line:118 params', 'color: #007acc;', params, params.oldValue, params.newValue, params.oldValue !== params.newValue, params.column);
			if (params.oldValue !== params.newValue) {
				// var column = params.column.colDef.field;
				// params.column.colDef.cellStyle = (p) => cellStyle(p, params)
				// params.column.colDef.cellClass = (p) => {
				// 	console.log('%cgrid_component.js line:122 p, params', 'color: #007acc;', p, params);
				// 	// return p.node.id === params.node.id ? {'background-color': '#ffa500'} : {'background-color': 'unset'}
				// 	return p.node.id === params.node.id ? 'edited-cell' : ''
				// };
				$scope.edited_cells.push({row: params.node.id, col: params.column.getId()})
				params.api.refreshCells({
					force: true,
					columns: [params.column.getId()],
					rowNodes: [params.node]
				})
			}
		},
		// onCellClicked: {

		// },
		headerComponentParams: {
			template: 
			`
				<div ref="eLabel" class="ag-header-cell-label" style="display: flex" onclick="angular.element('.ag-theme-alpine').scope().mainSelection('col', event)">
					<span ref="eText" class="ag-header-cell-text" style="flex-grow: 1"></span>
					<i class="feather icon-plus" style="cursor: pointer;float: right" onclick="angular.element('.ag-theme-alpine').scope().addColumn(this); event.stopPropagation()"></i>
					<i class="fa fa-eye-slash" aria-hidden="true" onclick="angular.element('.ag-theme-alpine').scope().hideColumn(this, false); event.stopPropagation()"></i>
					<i class="fa fa-trash" aria-hidden="true" onclick="angular.element('.ag-theme-alpine').scope().deleteColumn(this, 1); event.stopPropagation()"></i>
				</div>
			`
		},
		// headerClass: function(params) {
			// logic to return the correct class
			// if(params.colDef.field=='age')
			// 	return 'blue';
			// else return 'red'
			// return 'header'
		// },
		type: 'editableColumn',
		// onCellClicked: (params)=>$scope.agconfig.onCellClicked,
	}
    $scope.gridOptions = {
		// ...$scope.agconfig.gridOptions,
		columnDefs: $scope.agconfig.columnDefs,
		headerHeight: $scope.agconfig.headerHeight,
		enableSorting: $scope.agconfig.enableSorting,	
		rowSelection: $scope.agconfig.rowSelection,

		defaultColDef: defaultColDef,
		suppressRowTransform: true,
		suppressMenuHide: true,
		undoRedoCellEditing: true,
		undoRedoCellEditingLimit: 20,
		suppressRowClickSelection: true,
		// suppressHorizontalScroll: true,
		// columnHoverHighlight: true,
		enableCellTextSelection: true,
		angularCompileRows: true,
		angularCompileHeaders: true,
		// filter: true,
		floatingFilter: true,
		floatingFilterComponentParams: { suppressFilterButton: true },
		getMainMenuItems: () => {
			return ['generalMenuTab', 'columnsMenuTab']
		},	
		// icons: {
		// 		checkboxChecked: '<i class="fa fa-chevron-up"></i>',
		// 		checkboxUnchecked: '<i class="fa fa-chevron-up"></i>',
		// 		checkboxIndeterminate: '<i class="fa fa-chevron-up"></i>',
		// 	   },
		getMainMenuItems: () => {
			return ['generalMenuTab', 'columnsMenuTab']
		},
		isExternalFilterPresent: function() { 
			return true; 
		},
		doesExternalFilterPass: function(rowNode) {
			// console.log('%cgrid_component.js line:233 rowNode', 'color: #007acc;', rowNode, rowNode.parent.allLeafChildren.find(ch=>ch.data.name==rowNode.data.parent).data.folded, rowNode.data.parent, $scope?.valcount[$scope.filterColId], rowNode.data[$scope.filterColId]);

			var flg = true
			// console.log('%cgrid_component.js line:1632 $scope.valcount[$scope.filterColId]', 'color: #007acc;', $scope.valcount[$scope.filterColId], $scope.txtfilter, $scope.filterColId, $scope.selectionFilter);
			if(Object.keys($scope.valcount).length) {
				Object.keys($scope.valcount).map(val=>{
					var ele = $scope.valcount[val]?.find(v=>v.val == rowNode.data[val]?.v)
					flg = ele ? flg && ele.checked : false
				})
			}
			if(Object.keys($scope.txtfilter).length)
				Object.keys($scope.txtfilter).map(f=>{
					// console.log('%cgrid_component.js line:613 rowNode.data[f], f', 'color: #007acc;', rowNode.data[f], rowNode.data, f);
					flg = flg && (rowNode.data[f]?.v?.toLowerCase().includes($scope.txtfilter[f]?.toLowerCase())||''==$scope.txtfilter[f]?.toLowerCase())
				})
			if($scope.selectionFilter?.length) {
				// console.log('%cgrid_component.js line:1466 $scope.selectionFilter', 'color: #007acc;', Object.values(rowNode.data), $scope.selectionFilter?.toLowerCase(), $scope.headerList.find(h=>rowNode.data[h.colId]?.toLowerCase().includes($scope.selectionFilter?.toLowerCase())), rowNode, $scope.agconfig.selectedCells.find(c=>c.rowNode==rowNode));
				// console.log('%cgrid_component.js line:1467 $scope.agconfig.selectedCells.find(cell=>cell.rowNode.data[cell.colId]?.toLowerCase().includes($scope.selectionFilter?.toLowerCase()))', 'color: #007acc;', $scope.agconfig.selectedCells.find(cell=>rowNode == cell.rowNode && rowNode.data[cell.colId]?.toLowerCase().includes($scope.selectionFilter?.toLowerCase())));
				flg = flg && $scope.agconfig.selectedCells.find(cell=>rowNode == cell.rowNode && rowNode.data[cell.colId]?.v?.toLowerCase().includes($scope.selectionFilter?.toLowerCase()))
				// flg = $scope.headerList.find(h=>rowNode.data[h.colId]?.toLowerCase().includes($scope.selectionFilter?.toLowerCase())) && $scope.agconfig.selectedCells.find(c=>c.rowNode==rowNode) && flg
			}
			// console.log('%cgrid_component.js line:1104 rowNode.data.hidden', 'color: #007acc;', rowNode.data.hidden);
			flg = flg && !rowNode.data.hidden
			if($scope.agconfig.type == 'tree'){
				// console.log('%cgrid_component.js line:2214 rowNode', 'color: #007acc;', rowNode);
				// flg = flg && !rowNode.data.folded
				flg = flg && !rowNode.parent.allLeafChildren.find(ch=>ch.data?.name==rowNode.data?.parent).data?.folded /* || rowNode.data?.type == 'parent' || rowNode.parent.allLeafChildren[0].data?.type !== 'parent' */
			}
			return flg
			// else return true
		},
        onSelectionChanged: (param) => {
			$scope.agconfig.selectedRows = param.api.getSelectedRows();
			// $scope.agconfig.selectedRows = param
			// $scope.agconfig.selection = $scope.agconfig.selectedRows.map(row=>$scope.headerList.map(head=>row[head.colId]?.v || ''))
			console.log('%cgrid_component.js line:854 selectedRows', 'color: #007acc;', param, $scope.agconfig.selectedRows, $scope.agconfig.selectedRows.length, $scope.agconfig.gridOptions, $scope.agconfig.selectedRows[0]?.check == 'Add Row');
			$scope.mainSelection('row')
			$scope.refreshCells('all')
			// deselectAll()
			// $scope.refreshCells(['check'])
			// $scope.gridOptions.api.refreshCells({
			// 	force: true,
			// 	columns: ['check'],
			// });
			// var columnDefs = $scope.gridOptions.api.getColumnDefs()
			// columnDefs[columnDefs.indexOf(columnDefs.find((c)=>c.field=='check'))].headerName = `Check  (${$scope.agconfig.selectedRows?.length})`
			// $scope.gridOptions.api.setColumnDefs(columnDefs)

			// if($scope.agconfig.selectedRows.at(-1).newrow) param.getRowStyle = ''
			// if($scope.agconfig.selectedRows[0].check == 'Add Row')
			// param.api.refreshHeader();
			// 	$scope.agconfig.gridOptions.editType = 'fullRow'
		},
		getRowStyle: (params) => {
			// console.log('%cgrid_component.js line:190 params.data.newrow, !$scope.agconfig.selectedRows.includes(params.data), params.data.newrow && !$scope.agconfig.selectedRows.includes(params.data)', 'color: #007acc;', params, params.data.newrow, !$scope.agconfig.selectedRows.includes(params.data), params.data.newrow && !$scope.agconfig.selectedRows.includes(params.data), parseInt(params.node.id), params.node.id, $scope.lastNodeId, params.api.getDisplayedRowCount()-1);
			// console.log('%cgrid_component.js line:290 ', 'color: #007acc;', params.node.id==$scope.lastNodeId, params.node.id, $scope.lastNodeId, (params.data.newrow))
			// if($scope.agconfig.type == 'tree') {
			// 	if(params.data?.type == 'parent')
			// 		return {'background-color': '#EFF8FF', 'color': '#096DD9', 'border-bottom': '1px solid #096DD9', 'font-family': 'Inter','font-size': '14px','font-weight': '600','line-height': '21px','letter-spacing': '0em','text-align': 'left'}
			// 	else if(params.data?.type == 'child_blue')
			// 		return {'color': '#0384FC', 'border-bottom': '1px solid #096DD9'}
			// 	else if(params.data?.type == 'child_grey')
			// 		return {'background-color': '#F2F4F7', 'color': '#262626', 'border-bottom': '1px solid #98A2B3'}
			// 	// else
			// 	// 	return {'padding-left': '12px', 'margin-left': '12px'}
			// }
			var rowStyle = params.data.rowStyle || {}
			if (params.data.newrow/*  && !$scope.agconfig.selectedRows.includes(params.data) */)  
				addObj([rowStyle/* params.data */, 'rowStyle'], {'background-color': '#d6d6f3'})
			if (params.node.id==$scope.lastNodeId) 
				addObj([rowStyle/* params.data */, 'rowStyle'], {'background-color': '#e1e8f9'})
			// if (params.data.hasOwnProperty('rowStyle')) return 
		
			// if($scope.agconfig.type == 'tree')
			// 	if(params.data.path?.length==1)
			// 		Object.assign(rowStyle, {
			// 			'border-top': '10px solid #f2f4f6',
			// 			'border-right': '10px solid #f2f4f6',
			// 			'border-left': '10px solid #f2f4f6'
			// 		})
			// 	if(params.data.path?.length==2)
			// 		Object.assign(rowStyle, {
			// 			'border-right': '10px solid #f2f4f6',
			// 			'border-left': '10px solid #f2f4f6'
			// 		})
			// var numSickDays = params.data.newrow;
			// if (numSickDays > props.minDays && numSickDays <= props.maxDays) {
			//   return 'sick-days-warning';
			// };
			console.log('%cgrid_component.js line:2287 rowStyle', 'color: #007acc;', rowStyle);
			return rowStyle;
		},
		// rowClassRules: {
		// 	'tree_parent': params => params.data?.type == 'parent',
		// 	'child_blue': params => params.data?.type == 'child_blue',
		// 	'child_grey': params => params.data?.type == 'child_grey',
		// 	// 'tree-margin': params => $scope.agconfig.type == 'tree',
		// },
		
		getRowClass: params => {
			// console.log('%cgrid_component.js line:249 params', 'color: #007acc;', params, $scope.agconfig.type, params.data?.type);
			// if($scope.agconfig.type == 'tree') {
				if(params.data?.type == 'parent')
					return 'tree_parent ' + $scope.agconfig.colourPallete
				else if(params.data?.type == 'child_blue')
					return 'child_blue ' + $scope.agconfig.colourPallete
				else if(params.data?.type == 'child_grey')
					return 'child_grey ' + $scope.agconfig.colourPallete
				else if(params.data?.type == 'child')
					return 'child ' + $scope.agconfig.colourPallete
			// }
		},
		getRowHeight: params => {
			// console.log('%cgrid_component.js line:249 params', 'color: #007acc;', params, $scope.agconfig.type, params.data?.type, Array.from(Object.values(params.data), x=>x?.style?.['font-size']?.split('px')[0]).filter(v=>v!=undefined), LargestElement(Array.from(Object.values(params.data), x=>x?.style?.['font-size']?.split('px')[0]).filter(v=>v!=undefined)));
			// if($scope.agconfig.type == 'tree') {
			// 	if(params.data?.type == 'parent')
			// 		return 50
			// 	else
			// 	return 42
			// else if(params.data?.type == 'child')
			// 	return 'child'
			// }
			// else if(params.data?.rh)
				return params.data?.rh
			
			var l = LargestElement(Array.from(Object.values(params.data), x=>x?.style?.['font-size']?.split('px')[0]).filter(v=>v!=undefined))
			console.log('%cgrid_component.js line:1929 l', 'color: #007acc;', l);
			return parseInt(l) + 28
		},
        onColumnResized: function(params) {
			if(params.finished && manual) {
				console.log('Post Resize Functionality');
				manual = false;
			}
			console.log(params)
        },
        onGridReady: function(params) {
        	sizeToFit()
			$scope.gridOptions.api.setRowData($scope.agconfig.rowData);
			var { slno, checkSelect, addRow, addDup, addCol, delRow, merge, colSelect, colGroupSelect, type, headerRowNo, gridOptions } = $scope.agconfig
			$scope.columns = params.columnApi.columnModel.displayedColumns.map(p=>p.colId)
			var columnDefs = $scope.gridOptions.api.getColumnDefs()
			$scope.agconfig.rowNo = $scope.gridOptions.api.getDisplayedRowCount()
			console.log('%cgrid_component.js line:79 checkSelect, addRow, addCol, delRow', 'color: #007acc;', checkSelect, addRow, addCol, delRow, params, $scope.columns, columnDefs, params);
			$scope.headerList = $scope.gridOptions.columnApi.getAllDisplayedColumns()
			$scope.viewAllCols = true
			// $scope.colvis = Array.from({length: $scope.headerList.length}, val=>true)
			if(type == 'tree') {
				columnDefs.unshift({
					field: 'treearrow',
					maxWidth: 50,
					suppressMenu: true,
					filter: '',
					cellRenderer: (params) => {
						// console.log('%cgrid_component.js line:383 params', 'color: #007acc;', params);
						if(params.data?.type == 'parent'/*  && params.column.colId == 'treearrow' */) return params.data.folded ? `<i class="fa fa-chevron-up"></i>` : `<i class="fa fa-chevron-down"></i>`
						// if(params.data?.path.length/*  && params.column.colId == 'treearrow' */) return params.data.folded ? `<i class="fa fa-chevron-up"></i>` : `<i class="fa fa-chevron-down"></i>`
					},
					onCellClicked: (params)=>{
						console.log('%cgrid_component.js line:387 params', 'color: #007acc;', params);
						
						params.data.folded = !params.data.folded
						$scope.gridOptions.api.onFilterChanged()
						$scope.refreshCells(['treearrow'])
						// $scope.gridOptions.api.refreshCells({
						// 	force: true,
						// 	columns: ['treearrow'],
						// });

						// console.log('%cautomation.js line:789 params.value', 'color: #007acc;', params)
						// if(params.rowIndex)
						// 	$scope.gridOptions.api.applyTransaction({
						// 		remove: [params.data],
						// 	});
						// else{
						// 	console.log('%cgrid_component.js line:155 params', 'color: #007acc;', params);
						// 	if(params.data&&params.data.slno)
						// 		$scope.gridOptions.api.applyTransaction({
						// 			add: [params.data],
						// 			addIndex: parseInt(params.data.slno),
						// 		});
						// }
					},
					headerComponentParams: {
						template: `<span></span>`,
					},
					headerClass: headerRowspanClass(0, 0, headerRowNo),
					// editable: false,
				})
				
				// console.log('%cgrid_component.js line:424 columnDefs[0].children[0].children[0]', 'color: #007acc;', columnDefs[0]?.children[0]?.children[0], );
				// var ele = innerKeys([columnDefs.find(col=>col.field == $scope.agconfig.col1)])
				// console.log('%cgrid_component.js line:518 innerKeys(columnDefs)', 'color: #007acc;', columnDefs, $scope.agconfig.col1, ele);
				// innerKeys(columnDefs)
				// columnDefs[2].children[0].children[0]['cellRenderer'] = (params) => params.data.type == 'parent' ? params.data.folded ? `<span style="width: 32px;display: inline-block;"><i class="fa fa-chevron-up" style="cursor: pointer"></i></span>${params.value}` : `<span style="width: 32px;display: inline-block;"><i class="fa fa-chevron-down" style="cursor: pointer"></i></span>${params.value}` : `<span style="width: 32px;display: inline-block;"></span>${params.value}`
				// columnDefs[2].children[0].children[0]['onCellClicked'] = (params) => {
				// 	console.log('%cgrid_component.js line:387 params', 'color: #007acc;', params);
				// 	params.data.folded = !params.data.folded
				// 	$scope.gridOptions.api.onFilterChanged()
				// 	$scope.gridOptions.api.refreshCells({
				// 		force: true,
				// 		columns: ['Col1'],
				// 	});
				// }
			}
			if(slno) {
				columnDefs.unshift({
					field: 'slno',
					headerName: "Sl No",
					maxWidth: 80,
					suppressMenu: true,
					filter: '',
					headerClass: headerRowspanClass(0, 0, headerRowNo) + ' jcenter',
					cellRenderer: (params)=> params.rowIndex + 1,
					cellStyle: (params)=> {
						console.log('%cgrid_component.js line:2412 params', 'color: #007acc;', params);
						if(!((params.rowIndex+1)%4))
							return {'background-color': '#aaaaaa'}
						else
							return {'background-color': '#cccccc'}
					}
				})
			}
			// Adds column on clicking + icon in header
			if(addCol) {
				console.log('%cgrid_component.js line:181 addCol', 'color: #007acc;', addCol);
				columnDefs.unshift({
					field: 'addCol',
					headerName: 'Add Column',
					maxWidth: 50,
					filter: false,
					headerClass: headerRowspanClass(0, 0, headerRowNo),
					// suppressMovable: true,
					// lockPosition: 'right',
					// pinned: 'right',
					cellRenderer: (params) => ``,
					// onCellClicked: (params)=>{
					// 	console.log('%cautomation.js line:789 params.value', 'color: #007acc;', params)
					// 	if(params.rowIndex)
					// 		$scope.gridOptions.api.applyTransaction({
					// 			remove: [params.data],
					// 		});
					// 	else{
					// 		console.log('%cgrid_component.js line:929 params', 'color: #007acc;', params);
					// 		if(params.data&&params.data.slno)
					// 			$scope.gridOptions.api.applyTransaction({
					// 				add: [params.data],
					// 				addIndex: parseInt(params.data.slno),
					// 			});
					// 	}
					// },
					headerComponentParams: {
						template:
							`
							<div ref="eLabel" class="ag-header-cell-label" style="display: flex">
								<i class="feather icon-plus" style="cursor: pointer;float: right" onclick="angular.element('.ag-theme-alpine').scope().addColumn(this)"></i>
								<!--div class="ag-cell-label-container" style="cursor: pointer" role="presentation">
									<i class="feather icon-plus" onclick="angular.element('.ag-theme-alpine').scope().addColumn(this)"></i>
								</div-->
							</div>
							`,
					},
					// editable: false,
				})
			}
			// if(params.data?.header) {
				// Checkbox for row select
				
				if(checkSelect) {
					console.log('%cgrid_component.js line:45 $scope.gridOptions', 'color: #007acc;', $scope.gridOptions, columnDefs);
					var col = 'blue'
					columnDefs.unshift({
						field: 'check',
						headerName: `Check`,
						headerCheckboxSelection: true,
						checkboxSelection: true,
						maxWidth: 200,
						// showDisabledCheckboxes: false,
						// editable: false,
						cellClassRules: {'cellevent': (params)=>false},
						// pinned: 'left',
						filter: '',
						headerComponent: CheckHeader,
						// headerGroupComponent: CheckHeader,
						// icons: {
						// 	checkboxChecked: '<i class="fa fa-chevron-up"></i>',
						// 	checkboxUnchecked: '<i class="fa fa-chevron-up"></i>',
						// 	checkboxIndeterminate: '<i class="fa fa-chevron-up"></i>',
						// },
						// headerRenderer: 
						// ng-checked="!(${$("#rowcb"+params.rowIndex)[0].checked}) && ${agconfig.selectedRows.includes(params.api.getRowNode(parseInt(ele.id.substr(5)))).data}"
						headerClass: headerRowspanClass(0, 0, headerRowNo) + ' jcenter',
					})
					console.log('%cgrid_component.js line:59 columnDefs', 'color: #007acc;', columnDefs);
				}
				if(merge) {
					console.log('%cgrid_component.js line:45 $scope.gridOptions', 'color: #007acc;', $scope.gridOptions, columnDefs, params);
					var col = 'blue'
					columnDefs.unshift({
						field: 'merge',
						headerName: `Merge`,
						// headerCheckboxSelection: true,
						// checkboxSelection: true,
						// showDisabledCheckboxes: false,
						// editable: false,
						cellClassRules: {'cellevent': (params)=>false},
						// pinned: 'left',
						filter: '',
						// headerComponent: CheckHeader,
						headerClass: headerRowspanClass(0, 0, headerRowNo) + ' jcenter',
						cellRenderer: (params) => {
							// console.log('%cgrid_component.js line:1158 params.data?.header, params.data?.rowMerge, params.rowIndex', 'color: #007acc;', params, params.data?.header, params.data?.rowMerge, params.node.id, !params.data.header && (params.data?.rowMerge ? params.data?.rowMerge[0] == params.node.id : false));
						if(!params.data.header && (params.data?.rowMerge ? params.data?.rowMerge[0].id == params.node.id : false)) {
							params.data.rowMerge.filter(m=>m.rowIndex!=null)
							return `
								<label style="display: flex">
									<input class="merge" type="checkbox" aria-label="Press Space to toggle row selection" checked onchange="angular.element('.ag-theme-alpine').scope().mergeSelect(this, ${params.data?.rowMerge[0].id})">
									<span class="geekmark"></span>
								</label> 
								</span>
							`
							}
						}
					})
					console.log('%cgrid_component.js line:59 columnDefs', 'color: #007acc;', columnDefs, );
				}
				// Adds new row below on clicking + icon
				if(addRow) {
					columnDefs.unshift({
						field: 'addRow',
						headerName: 'Add',
						headerClass: headerRowspanClass(0, 0, headerRowNo),
						filter: '',
						// suppressMovable: true,
						// lockPosition: 'left',
						// editable: false,
						onCellClicked: (params)=>{
							console.log('%cgrid_component.js line:378 params', 'color: #007acc;', params);
							params.colDef['cellRenderer'] = (params) => `
								<div style="display: flex; flex-direction: column; background-color: #fff">
									<i class="fa fa-chevron-up" style="cursor: pointer; border: solid 1px" ng-click="addRow(${params.rowIndex}, 'add')"></i>
									<i class="fa fa-chevron-down" style="cursor: pointer; border: solid 1px" ng-click="addRow(${params.rowIndex+1}, 'add')"></i>
								<div>
							`
							console.log('%cgrid_component.js line:863 params.api.getRenderedNodes()', 'color: #007acc;', params.api.getRenderedNodes());
							params.api.refreshCells({
								force: true,
								rowNodes: [params.api.getDisplayedRowAtIndex(params.rowIndex)]
							});
							console.log('%cautomation.js line:789 params.value', 'color: #007acc;', params)
						},
						maxWidth: 80,
						cellRenderer: (params) => params.data?.type !== 'parent' && !params.data.header ? `<i class="feather icon-plus" style="cursor: pointer;"></i>` : '',
					})
				}
				if(addDup) {
					columnDefs.unshift({
						field: 'addDup',
						headerName: 'Add',
						headerClass: headerRowspanClass(0, 0, headerRowNo),
						cellClassRules: {'cellevent': (params)=>false},
						// suppressMovable: true,
						// lockPosition: 'left',
						filter: '',
						// pinned: 'left',
						// editable: false,
						onCellClicked: (params)=>{
							console.log('%cgrid_component.js line:483 params', 'color: #007acc;', params, params.rowIndex, params.node.id, params.api.getRowNode(params.node.id), params.api.getRowNode(params.node.id)?.data.parent);
							if(!params.data.header)$scope.addRow(params.rowIndex+1, params.api.getRowNode(params.node.id)?.data)
							// if(!params.data.header)$scope.addRow(params.rowIndex+1, {type: 'child', parent: params.api.getRowNode(params.rowIndex).data.parent})
							// // if(params.data.type == 'parent') return
							// $scope.gridOptions.api.applyTransaction({
							// 	add: $scope.gridOptions.type == 'tree' ? [{newrow: true}] : [{newrow: true, type: 'child', parent: $scope.gridOptions.api.getRowNode(params.rowIndex).data.parent}],
							// 	addIndex: params.rowIndex+1,
							// });
							// console.log('%cgrid_component.js line:489 $scope.lastNodeId', 'color: #007acc;', $scope.gridOptions, $scope.lastNodeId);
							// // var columnDefs = $scope.gridOptions.api.getColumnDefs()
							// // columnDefs.find(col=>col.colId=='addDup').cellRenderer = (params) => `<i class="feather icon-plus" style="cursor: pointer"></i>`
							// // $scope.gridOptions.api.setColumnDefs(columnDefs)
							
							// $scope.lastNodeId = -1
							// $scope.gridOptions.api.forEachNodeAfterFilter((node) => {
							// 	if($scope.lastNodeId < node.id){
							// 		console.log('%cgrid_component.js line:222 $scope.lastNodeId, node.id', 'color: #007acc;', $scope.lastNodeId, node.id, parseInt(node.id));
							// 		$scope.lastNodeId = parseInt(node.id)
							// 	}
							// });
							// console.log('%cgrid_component.js line:2222 $scope.lastNodeId', 'color: #007acc;', $scope.lastNodeId);
							// $scope.gridOptions.api.redrawRows()
						},
						maxWidth: 80,
						cellRenderer: (params) => 
						params.data?.type !== 'parent' /* &&
						params.data.header */ ? '<i class="feather icon-plus"></i>' : ``
						// : '',
					})
				}
				// Deletes row on clicking trash icon
				if(delRow) {
					console.log('%cgrid_component.js line:82 columnDefs', 'color: #007acc;', columnDefs);
					columnDefs.push({
						field: 'delRow',
						headerName: 'Delete',
						cellClass: '',
						filter: false,
						// editable: false,
						// suppressMovable: true,
						// lockPosition: 'right',
						// pinned: 'right',
						// maxWidth: 120,
						cellRenderer: (params) => {
							return `<span style="display: flex; height: 100%">${!params.data.insert?'<i class="fa fa-solid fa-trash" style="color: red; margin: auto"></i>':'Insert'}</span>`
						},
						onCellClicked: (params)=>{
							console.log('%cautomation.js line:789 params.value', 'color: #007acc;', params)
							$scope.delRows([params.data])
						},
						// editable: false,
					})
				}
			// }
			
			// Adds click functionality to header and calls function to provide column data
			if(colSelect) {
				console.log('%cgrid_component.js line:181 addCol', 'color: #007acc;', addCol, colSelect);
				// $scope.gridOptions.defaultColDef['headerCellTemplate'] = () => `<div class="ag-cell-label-container" role="presentation" onclick="angular.element('.ag-theme-alpine').scope().selectColumn(event)">
				// <!--<div class="ag-cell-label-container" role="presentation" ng-click="selectColumn($event)">-->
				// 	<span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>
				// 	<div ref="eLabel" class="ag-header-cell-label" role="presentation">
				// 		<span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>
				// 		<span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>
				// 		<span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>
				// 		<span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>
				// 		<span ref="eText" class="ag-header-cell-text" role="columnheader" style="cursor: pointer"></span>
				// 		<span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>
				// 	</div>
				// </div>`
				$scope.gridOptions.defaultColDef['headerComponentParams'] = {
					template:`
						<div class="ag-cell-label-container" role="presentation" onclick="angular.element('.ag-theme-alpine').scope().selectColumn(event)">
						<!--<div class="ag-cell-label-container" role="presentation" ng-click="selectColumn($event)">-->
							<!--<span onclick="angular.element('.ag-theme-alpine').scope().addColumn(this)"><i class="feather icon-plus" style="cursor: pointer"></i></span>-->
							<span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>
							<div ref="eLabel" class="ag-header-cell-label" role="presentation">
								<span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>
								<span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>
								<span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>
								<span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>
								<span ref="eText" class="ag-header-cell-text" role="columnheader" style="cursor: pointer"></span>
								<span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>
							</div>
						</div>
					`,
				}
			}
			if(colGroupSelect) {
				console.log('%cgrid_component.js line:1831 addCol', 'color: #007acc;', addCol, columnDefs[5]);
				treeOperations(columnDefs, '-', undefined, "a['headerGroupComponent'] = headerGroupSelect")
				// columnDefs[5]['headerGroupComponent'] = headerGroupSelect
				// columnDefs[5]['frameworkComponents'] = {customHeaderGroupComponent:headerGroupSelect}
			}
			// $(document).on('click', '[ref=eButtonShowMainFilter]' , function(ele) {
			// 	//code here ....
			// 	console.log('%cgrid_component.js line:1232 ele', 'color: #007acc;', ele, params.columnApi.getAllColumns()[ele.target.parentNode.parentNode.parentNode.attributes['aria-colindex'].value-1], $scope.filterColId);
			// 	$scope.filterColId = params.columnApi.getAllColumns()[ele.target.parentNode.parentNode.parentNode.attributes['aria-colindex'].value-1].colId
			// });
			// Row drag
			console.log('%cgrid_component.js line:2639 ', 'color: white; background-color: #007acc;', new Date());
			if($scope.agconfig.rowDragManaged){
				columnDefs.unshift({
					field: 'rowDrag',
					// editable: false,
					// suppressMovable: true,
					// lockPosition: 'left',
					maxWidth: 40,
					rowDrag: true,
					cellStyle: () => {return {padding: '10px'}},
					headerComponentParams: {
						template:`<span></span>`,
					}
				})
			}
			$scope.gridOptions.api.setColumnDefs(columnDefs)
			$timeout(()=>{
				$(".ag-center-cols-viewport").on("scroll", function (e) {
					horizontal = e.currentTarget.scrollLeft;
					vertical = e.currentTarget.scrollTop;
					// console.log('%cgrid_component.js line:15 horizontal, vertical', 'color: #007acc;', horizontal, vertical, e.currentTarget);
					enableTextFilter(params)
				});
				enableTextFilter(params)
			}, 200)
			// console.log('%c REady', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113); margin-bottom: 12px; padding: 5%;');
		},
		onCellFocused: (params) => {
			var keyboard = new KeyboardEvent('key')
			var cell = [$scope.gridOptions.api.getDisplayedRowAtIndex(params.rowIndex).id, params.column.colId]
			// console.log('onCellFocused', params, params.api.getColumnDefs(), $scope.agconfig.selectedRows[0], $scope.agconfig.selectedColId, params?.column?.instanceId, params?.column?.colId, $scope.agconfig.selectedCells, keyboard.key, cell, $scope.agconfig.rangeSelectedCells, $scope.agconfig.rangeSelectedCells.length)
			// if(!$scope.agconfig.rangeSelectedCells.length)
			// 	$scope.agconfig.selectedCells = [{
			// 		colId: params?.column?.colId,
			// 		rowId: parseInt($scope.gridOptions.api.getDisplayedRowAtIndex(params.rowIndex).id),
			// 		rowNode: $scope.gridOptions.api.getDisplayedRowAtIndex(params.rowIndex)
			// 	}]
			// $scope.gridOptions.api.refreshCells({
			// 	force: true,
			// 	columns: [params.column.colId]
			// });
		},
    };
	var LargestElement = (arr) => arr.length ? arr.reduce((a, b) => (a > b) ? a : b) : false

	var arr_search = (a, b) => {
		a = JSON.stringify(a);
		b = JSON.stringify(b);
		return a.includes(b)
	}
	$scope.txtfilterchange = (ev, id) => {
		console.log('%cgrid_component.js line:1025 $scope.txtfilter', 'color: #007acc;', $scope.txtfilter, ev);
		$scope.txtfilter[id] = ev.value
		$scope.gridOptions.api.onFilterChanged();
	}
	$scope.refreshCells = (cid, rid) => {
		// console.log('%cgrid_component.js line:2484 cid, rid', 'color: #007acc;', cid, rid);
		var params = {
			force: true,
		}
		if(cid.length)
			if(cid == 'all')
				params['columns'] = $scope.gridOptions.columnApi.getAllDisplayedColumns().map(col => col.colId)
			else
				params['columns'] =  cid
		else
			params['rowNode'] =  rid
		// console.log('%cgrid_component.js line:1925 cid, rid', 'color: #007acc;', cid, rid, params);
		// console.error('-')
		$scope.gridOptions.api.refreshCells(params);
	}
	var deselectAll = (type) => {
		$scope.agconfig.selectedCells = []
		$scope.agconfig.selection = []
		$scope.overlay.style.display = 'none'
		switch (type) {
			case 'range':
				$scope.agconfig.selectedColumnGroups = {}
				$scope.agconfig.selectedColumn = []
				$scope.agconfig.selectedColumns = []
				break;
			case 'col':
				$scope.agconfig.rangeSelectedCells = []
				$scope.agconfig.selectedColumnGroups = {}
				break;
			case 'colGroup':
				$scope.agconfig.selectedColumn = []
				$scope.agconfig.selectedColumns = []
				$scope.agconfig.rangeSelectedCells = []
				break;
			// case range:
			// 	$scope.agconfig.rangeSelectedCells = []
			// 	break;
			default:
				$scope.agconfig.rangeSelectedCells = []
				$scope.agconfig.selectedColumn = []
				$scope.agconfig.selectedColumnGroups = {}
				$scope.agconfig.selectedColumns = []
				break;
		}
		// $scope.agconfig.selectedRows = []
		// $scope.gridOptions.api.deselectAll();
		$scope.refreshCells('all')
	}
	$scope.initGrid = (config) => {
		// $scope.agconfig.gridflg = false
		$timeout(()=>{
			$scope.agconfig.gridflg = true
			console.log('%cgrid_component.js line:718 config, $scope.agconfig', 'color: #007acc;', config, $scope.agconfig, $scope.agconfig.gridflg);
		}, 1000)
		var isDragging = false;
		$timeout(()=>{
			var focusedCell = $scope.gridOptions.api.getFocusedCell()
			window.addEventListener('keydown',function(e) {
				// console.log('%cgrid_component.js line:9 e', 'color: #007acc;', e, e.key, e.ctrlKey, e.shiftKey, e.target, $(e.target).is('input'));
				if (/* e.repeat */$(e.target).is('input')) return
				if (e.ctrlKey) {
					if($('.ag-body-viewport').hasClass('ag-selectable'))
						$('.ag-body-viewport').removeClass('ag-selectable')
					if(e.key == 'c')
						$scope.clipboardOperations('copy')
					if(e.key == 'x')
						$scope.clipboardOperations('cut')
					if(e.key == 'V' && e.shiftKey)
						$scope.clipboardOperations('format')
					else if(e.key == 'v')
						$scope.clipboardOperations('paste')
				}
				if (e.shiftKey) {
					if($('.ag-body-viewport').hasClass('ag-selectable'))
						$('.ag-body-viewport').removeClass('ag-selectable')
				}
				if(e.key == 'Delete') {	
					// $scope.delRows($scope.agconfig.selectedRows)
					$scope.clipboardOperations('delete')
				}
				if(e.key == 'Escape') {
					deselectAll('all')
				}
				if(e.key == 'm') {
					$scope.mergeCells('hyphen')
				}
				if(e.key == 's') {
					$scope.splitCells('hyphen')
				}
			});

			$scope.overlay = document.createElement('div')
			$scope.overlay.id = 'canvas'
			$scope.overlay.style.display = 'none'
			document.querySelector('.ag-body-viewport').appendChild($scope.overlay)

			var mouseStart = {x: 0, y: 0}
			var mouseEnd = {x: 0, y: 0}

			$(".ag-body-viewport")
			.mousedown(function(event) {
				isDragging = false;
				focusedCell = $scope.gridOptions.api.getFocusedCell()
				if(!$scope.headerList.filter(h=>h.colId == focusedCell.column.colId).length) {
					// console.log('%cgrid_component.js line:1994 $scope.headerList.filter(h=>h.colId == c)', 'color: #007acc;', $scope.headerList.filter(h=>h.colId == focusedCell.column.colId));
					$(".ag-theme-alpine").off("mousemove");
					$(".ag-theme-alpine").off("mouseup");
					// $scope.gridOptions.enableCellTextSelection = true
					return
				}
				// if(!event.ctrlKey&&event.button!=2){
					// console.log('%cgrid_component.js line:', 'color: #007acc;', $scope.agconfig.selectedCells,$scope.agconfig.rangeSelectedCells);
					// if($scope.agconfig.rangeSelectedCells.length)
					// 	$scope.agconfig.selectedCells = []
					// $scope.agconfig.rangeSelectedCells = []
					// $scope.refreshCells('all')
				// }
				var range = {
					startColumn: {},
					startRow: {},
					endRow: {},
					columns: [],
					// data: []
				}
				// len = $scope.agconfig.rangeSelectedCells.length
				// console.log('%cgrid_component.js line:1433 isDragging', 'color: #007acc;', isDragging, event, focusedCell, range.startRow, range.startColumn, range.endRow, range.columns, len, $scope.headerList.filter(h=>h.colId == focusedCell.column.colId), $scope.gridOptions.api.getDisplayedRowAtIndex(focusedCell.rowIndex));
				range.startRow = {
					rowId: parseInt($scope.gridOptions.api.getDisplayedRowAtIndex(focusedCell.rowIndex).id),
					rowInd: focusedCell.rowIndex,
					rowPinned: focusedCell.rowPinned,
				}
				range.startColumn = focusedCell.column
				range.endRow = range.startRow
				
				mouseStart={x: event.clientX, y: event.clientY}

				$(".ag-theme-alpine")
				.mousemove(function(event) {
					if(!event.ctrlKey){
						// $scope.agconfig.rangeSelectedCells.push(range)
						return
					}
					// else
					// $scope.gridOptions.enableCellTextSelection = false
					isDragging = true;

					// var t = event.target
					// var r1 = t.parentNode.attributes["row-id"]?.value
					// var c1 = t.attributes["aria-colindex"]?.value
					// var r2 = t.parentNode.parentNode.attributes["row-id"]?.value
					// var c2 = t.parentNode.attributes["aria-colindex"]?.value
					// var r3 = t.parentNode.parentNode.parentNode.attributes["row-id"]?.value
					// var c3 = t.parentNode.parentNode.attributes["aria-colindex"]?.value
					// var r4 = t.parentNode.parentNode.parentNode.parentNode.attributes["row-id"]?.value
					// var c4 = t.parentNode.parentNode.parentNode.attributes["aria-colindex"]?.value
					// var r5 = t.parentNode.parentNode.parentNode.parentNode.parentNode.attributes["row-id"]?.value
					// var c5 = t.parentNode.parentNode.parentNode.parentNode.attributes["aria-colindex"]?.value

					// var cell = r1 && c1 ? [r1, c1] : r2 && c2 ? [r2, c2] : r3 && c3 ? [r3, c3] : r4 && c4 ? [r4, c4] : [r5, c5]

					// var r  = cell[0]
					// var c  = cell[1]
					// var r  = r1 ? r1 : r3 //cell[0]
					// var c  = c1 ? c1 : c3 //cell[1]

					var r = findAllByKey(event.target, 'parentNode', 'attributes?.["row-id"]?.value')
					var c = findAllByKey(event.target, 'parentNode', 'attributes?.["aria-colindex"]?.value')

					var body = $(".ag-body-viewport");

					var h = body.height()
					var w = body.width()
					// console.log('%cgrid_component.js line:2299 r1, c1, r2, c2, r3, c3, r4, c4, r5, c5', 'color: #007acc;', r1, c1, r2, c2, r3, c3, r4, c4, r5, c5);
					// console.log('%cgrid_component.js line:2300 r, c, t', 'color: #007acc;', r, c, '|', r1, c1, r2, c2, r3, c3, r4, c4, r5, c5, t);
					// console.log('%cgrid_component.js line:1460 r, c, cell', 'color: #007acc;', r, c, cell, $scope.gridOptions.api.getRowNode(r), event, t, event.pageX, event.screenX, event.pageY, event.screenY, h, w);
					// if(Math.abs(event.screenX - event.pageX) < 100)
					body.mousemove(function(event) { 
						var rect = body[0].getBoundingClientRect(); 
						var x = event.clientX - rect.left; 
						var y = event.clientY - rect.top; 
						// console.log('%cgrid_component.js line:2138 h, event.pageY', 'color: #007acc;', h, y, w, x);
						
						// console.log('Cursor position: ' + x + ',' + y); 
						if(h - y < 40){
							body[0].scrollBy({
								top: 100,
								behavior: "smooth",
							})
						}
						else if(y < 40) {
							body[0].scrollBy({
								top: -100,
								behavior: "smooth",
							})
						}
						if(w - x < 80){
							$(".ag-body-horizontal-scroll-viewport")[0].scrollBy({
								left: 100,
								behavior: "smooth",
							})
						}
						else if(x < 80) {
							$(".ag-body-horizontal-scroll-viewport")[0].scrollBy({
								left: -100,
								behavior: "smooth",
							})
						}
						body.off("mousemove");
					});

					range.endRow = {
						rowId: parseInt(r),
						rowInd: parseInt(findAllByKey(event.target, 'parentNode', 'attributes?.["row-index"]?.value')),
						rowPinned: $scope.gridOptions.api.getRowNode(r)?.rowPinned,
					}

					var columns = $scope.gridOptions.columnApi.getAllColumns()
					var ind = columns.indexOf(range.startColumn)
					// console.log('%cgrid_component.js line:1467 columns', 'color: #007acc;', columns, cell, ind, c, Math.abs(ind - c), columns.indexOf(range.startColumn), range.startColumn, t);

					range.columns = []
					for(var i = 0, j = c > ind ? ind : c - 1; c > ind ? j < c : j <= ind && ind != -1; i++, j++) {
						// console.log('%cgrid_component.js line:1469 i', 'color: #007acc;', i, c, ind, i-c, Math.abs(i - c), Math.abs(ind - c), $scope.headerList, columns[j], columns);
						if($scope.gridOptions.columnApi.getAllDisplayedColumns().includes(columns[j]))
						range.columns[i] = columns[j]
						else i -= 1
					}
					var start = range.startRow.rowId
					var end = range.endRow.rowId

					var s = new Date()

					$scope.agconfig.rangeSelectedCells = [range]
					// console.log('%cgrid_component.js line:2117 $scope.agconfig.rangeSelectedCells, range', 'color: #007acc;', $scope.agconfig.rangeSelectedCells, range, $scope.agconfig.selectedCells);
					$scope.agconfig.selectedCells = []
					$scope.agconfig.rangeSelectedCells.map(cell=>{
						// console.log('%cgrid_component.js line:2119 cell', 'color: #007acc;', cell);
						cell.columns.map(col=>{
							// console.log('%cgrid_component.js line:2121 col', 'color: #007acc;', col);
							for(var i = cell.startRow.rowInd < cell.endRow.rowInd ? cell.startRow.rowInd : cell.endRow.rowInd; i <= cell.startRow.rowInd && (cell.startRow.rowInd > cell.endRow.rowInd) + 1 || i <= cell.endRow.rowInd && (cell.startRow.rowInd < cell.endRow.rowInd) + 1; i++){
								// console.log('%cgrid_component.js line:2123 i', 'color: #007acc;', i, $scope.gridOptions.api.getDisplayedRowAtIndex(i));
								var rowNode = $scope.gridOptions.api.getDisplayedRowAtIndex(i)
								// console.log('%cgrid_component.js line:2763 rowNode', 'color: #007acc;', rowNode, col.colId, rowNode.data[col.colId]);
								if(!rowNode.data[col.colId]?.hasOwnProperty('cellMerge') || rowNode.data[col.colId]?.hasOwnProperty('rowspan') || rowNode.data[col.colId]?.hasOwnProperty('colspan')) {
									var newcell = {
										colId: col.colId,
										rowId: parseInt($scope.gridOptions.api.getDisplayedRowAtIndex(i).id),
										rowInd: i,
										rowNode: rowNode
									}
									// console.log('%cgrid_component.js line:2126 newcell', 'color: #007acc;', newcell);
									$scope.agconfig.selectedCells.push(newcell)
								}
							}
						})
					})
					// $timeout(()=>{
						// $scope.overlay.style.display = 'block'
						// var rows = [...$scope.agconfig.selectedCells].reduce((a, b)=>{if(!a.find(f=>{console.log(a, f, b, f.rowIndex == b.rowInd);return f.rowIndex == b.rowInd}))a.push(b.rowNode);console.log(a, b);return a}, [])?
						// $scope.overlay.style.top = rows[0]?.rowTop + 'px'
						// $scope.overlay.style.height = rows.reduce((a, b) => a + b.rowHeight, 0) + 'px'
						// var cols = [...$scope.agconfig.rangeSelectedCells][0].columns
						// $scope.overlay.style.left = cols[0]?.left + 'px'
						// $scope.overlay.style.width = cols.reduce((a, b) => a + b.actualWidth, 0) + 'px'
					// })

					var e = new Date()

					// console.log('%cgrid_component.js line:2803 s, e, e-s', 'color: #007acc;', s, e, e-s);
					// console.log('%cgrid_component.js line:1882 , Array.from({length: range.startRow.rowIndex - range.endRow.rowIndex}, x=>x+1).map(id=>$scope.gridOptions.api.getRowNode(id))', 'color: #007acc;', Array.from({length: Math.abs(start - end)}, (value, index) => (start < end ? start : end) + index), Array.from({length: Math.abs(start - end)}, (value, index) => (start < end ? start : end) + index).map(id=>$scope.gridOptions.api.getRowNode(id)), range, $scope.agconfig.rangeSelectedCells, len);
					// if(start==end&&range.columns.length<=1 && event.button!=2){
						// t.classList.add('noselect')
						// $scope.agconfig.rangeSelectedCells.map(r=>console.log('%cgrid_component.js line:1945 r', 'color: #007acc;', r.startRow, r.endRow, $scope.agconfig.rangeSelectedCells.length-1))
						// $scope.agconfig.rangeSelectedCells[$scope.agconfig.rangeSelectedCells.length-1] = range
						// if($scope.refresh)
						$scope.refreshCells('all')
					// }
					
					// $scope.gridOptions.api.refreshCells({
					// 	force: true,
					// 	columns: $scope.gridOptions.columnApi.getAllDisplayedColumns().map(col=>col.colId)//[params.column.colId, ...range.columns.map(col=>col.colId)],
					// 	// rowNode: Array.from({length: Math.abs(start - end)}, (value, index) => (start < end ? start : end) + index).map(id=>$scope.gridOptions.api.getRowNode(id))
					// });

					// MOUSE DOWN ADD START CELL
					// MOUSE MOVE OVER CURRENT CELL
					// MOUSE DOWN ADD END CELL
		
					// if(r1 && c1)
					// console.log('%cgrid_component.js line:1454 [r1, c1]		1111', 'color: #007acc;', [r1, c1], cell);
					// if(r2 && c2)
					// console.log('%cgrid_component.js line:1456 [r2, c2]		2222', 'color: #007acc;', [r2, c2], cell);
					// if(r3 && c3)
					// console.log('%cgrid_component.js line:1458 [r3, c3]		3333', 'color: #007acc;', [r3, c3], cell);
					// if(r4, c4)
					// console.log('%cgrid_component.js line:1460 [r4, c4]		4444', 'color: #007acc;', [r4, c4], cell, t);
					
					// if(cell[0]<range?.rs)
					// 	range['rs'] = cell[0]
					// else if(cell[0]>range?.re)
					// 	range['re'] = cell[0]
					// if(cell[1]<range?.cs)
					// 	range['cs'] = cell[1]
					// else if(cell[1]>range?.ce)
					// 	range['ce'] = cell[1]

					// console.log('%cgrid_component.js line:1471 range', 'color: #007acc;', cell[0], cell[1], range?.rs, range?.cs, range?.re, range?.ce, range, cell, cell[0]<range?.rs, cell[1]<range?.cs, cell[0]>range?.re, cell[1]>range?.ce);
					// if(!(r1 || r2)) console.log('%cgrid_component.js line:1445 t', 'color: #007acc;', t, cell);
					// console.log('%cgrid_component.js line:1441 t.parentNode.attributes["row-id"]?.value, t.attributes["aria-colindex"]?.value, t.parentNode.parentNode.attributes["row-id"]?.value, t.parentNode.attributes["aria-colindex"]?.value', 'color: #007acc;', t.parentNode.attributes["row-id"]?.value, t.attributes["aria-colindex"]?.value, t.parentNode.parentNode.attributes["row-id"]?.value, t.parentNode.attributes["aria-colindex"]?.value, r3, c3, !!(r1 || r2));
					// console.log('%cgrid_component.js line:1437 isDragging', 'color: #007acc;', isDragging, event, t, t.parentNode.attributes['row-id']?.value, t.attributes['aria-colindex']?.value, t.parentNode.parentNode.attributes['row-id']?.value, t.parentNode.attributes['aria-colindex']?.value);
				})
				.mouseup(function(event) {
					var wasDragging = isDragging;

					// console.log('%cgrid_component.js line:2374 event', 'color: #007acc;', event);

					if(!event.button && window.getSelection().toString().length) {
						// console.log('%cgrid_component.js line:2382 event.button', 'color: #007acc;', event.target, event.button);
							// if (event.button == 2) {
								// $(".ag-cell .ag-cell-not-inline-editing").trigger("contextmenu");
							// }
						// rightClick(event)
					}
					mouseEnd={x: event.clientX, y: event.clientY}

					/* var txtsel = window.getSelection().toString()
					if(txtsel) {
						console.log('%cgrid_component.js line:38 txtsel', 'color: #007acc;', txtsel, document.getElementById("annoContextMenu").style.display);
						if (document.getElementById("annoContextMenu").style.display == "block"){ 
							hideMenu();
							rightClick(event)
						} else {
							var menu = document.getElementById("annoContextMenu")
							document.getElementById("annoContextMenu").style.display = 'block'; 
							// menu.style.display = 'block'; 
							// menu.style.left = (event.pageX - (menu.clientWidth+event.pageX > $(window).width() ? menu.clientWidth : 0)) + "px"; 
							// menu.style.top = event.pageY + "px";
							console.log('%cgrid_component.js line:2359 menu', 'color: #007acc;', menu, menu.style, event.pageX, menu.clientWidth);
						}
					} */
					// $scope.agconfig.rangeSelectedCells.push(range)
					// console.log('%cgrid_component.js line:1442 wasDragging, isDragging', 'color: #007acc;', wasDragging, isDragging, event, range, $scope.agconfig.rangeSelectedCells, $scope.agconfig.selectedCells, $scope.gridOptions.api.getDisplayedRowAtIndex(range.startRow.rowId), event.target, event.button);
					isDragging = false;
					// $(".ag-theme-alpine").unbind();

					if(event.shiftKey) {
						range.startRow = {
							rowId: $scope.agconfig.selectedCells[0].rowId,
							rowInd: $scope.agconfig.selectedCells[0].rowInd,
						}
						range.endRow = {
							rowId: parseInt(findAllByKey(event.target, 'parentNode', 'attributes?.["row-id"]?.value')),
							rowInd: parseInt(findAllByKey(event.target, 'parentNode', 'attributes?.["row-index"]?.value')),
							rowPinned: $scope.gridOptions.api.getRowNode(findAllByKey(event.target, 'parentNode', 'attributes?.["row-id"]?.value'))?.rowPinned,
						}
						range.columns = $scope.headerList.slice($scope.headerList.findIndex(h=>$scope.agconfig.selectedCells[0].colId==h.colId), $scope.headerList.findIndex(h=>findAllByKey(event.target, 'parentNode', 'attributes?.["col-id"]?.value')==h.colId)+1)
						$scope.agconfig.rangeSelectedCells[0] = range
						// console.log('%cgrid_component.js line:2892 range', 'color: #007acc;', range, $scope.headerList.indexOf($scope.gridOptions.api.getFocusedCell().column), $scope.headerList.findIndex(h=>findAllByKey(event.target, 'parentNode', 'attributes?.["col-id"]?.value')==h.colId));
						$scope.refreshCells('all')
					}

					if(range.startRow.rowInd > range.endRow.rowInd) {
						// console.log('%cgrid_component.js line:2342 range', 'color: #007acc;', range, range.startRow, range.endRow, range.startRow.rowId > range.endRow.rowId);
						var t = range.startRow
						range.startRow = range.endRow
						range.endRow = t
					}
					if(range.startRow.rowId==range.endRow.rowId&&range.columns.length<=1 && event.button!=2 && event.ctrlKey) {
						$scope.agconfig.rangeSelectedCells = []
						var newcell = {
							colId: range.startColumn.colId,
							rowInd: $scope.gridOptions.api.getRowNode(range.startRow.rowId)?.rowIndex,
							rowId: range.startRow.rowId,
							rowNode: $scope.gridOptions.api.getRowNode(range.startRow.rowId)
						}
						var newindex = $scope.agconfig.selectedCells.findIndex(c=>c.colId == newcell.colId && c.rowId == newcell.rowId)
						// console.log('%cgrid_component.js line:2174 $scope.agconfig.selectedCells, newcell', 'color: #007acc;', $scope.agconfig.selectedCells, newcell, newindex);
						if(event.ctrlKey)
							if(newindex!=-1)
								$scope.agconfig.selectedCells.splice(newindex, 1)
							else
								$scope.agconfig.selectedCells.push(newcell)
						else
							$scope.agconfig.selectedCells = [newcell]
						// if($scope.refresh)
						$scope.refreshCells('all')
					}
					// console.log('%cgrid_component.js line:2832 $scope.agconfig.rangeSelectedCells.length', 'color: #007acc;', $scope.agconfig.rangeSelectedCells.length, Array.from({length: Math.abs($scope.agconfig.rangeSelectedCells[0].endRow.rowInd - $scope.agconfig.rangeSelectedCells[0].startRow.rowInd)+1}, (a, i)=>$scope.agconfig.rangeSelectedCells[0].startRow.rowInd+i));
					if($scope.agconfig.rangeSelectedCells.length)
					$scope.agconfig.selection = Array.from({length: Math.abs($scope.agconfig.rangeSelectedCells[0].endRow.rowInd - $scope.agconfig.rangeSelectedCells[0].startRow.rowInd)+1}, (a, i)=>$scope.agconfig.rangeSelectedCells[0].startRow.rowInd+i).map(row=>{
						// console.log('%cgrid_component.js line:2835 row', 'color: #007acc;', row);
						return $scope.agconfig.rangeSelectedCells[0].columns.map(col=>{
						// for(i = $scope.agconfig.rangeSelectedCells[0].startRow.rowId; i < $scope.agconfig.rangeSelectedCells[0].endRow.rowId; i++)
							// console.log('%cgrid_component.js line:2523 row', 'color: #007acc;', row, /* Array.from({length: $scope.agconfig.rangeSelectedCells[0].endRow.rowId - $scope.agconfig.rangeSelectedCells[0].startRow.rowId}, (a, i)=>$scope.agconfig.rangeSelectedCells[0].startRow.rowId+i) */$scope.gridOptions.api.getDisplayedRowAtIndex(row).data, col.colId);
							return $scope.gridOptions.api.getDisplayedRowAtIndex(row).data[col.colId]?.v || ''
						})
						// console.log('%cgrid_component.js line:2522 i', 'color: #007acc;', i, $scope.gridOptions.api.getRowNode(i));
					})
					// console.log('%cHello grid_component.js line:2446 ', 'background: green; color: white; display: block;');
					// if(!event.ctrlKey)
						$('.ag-body-viewport').addClass('ag-selectable')
					// $scope.gridOptions.enableCellTextSelection = true
					// $(".ag-theme-alpine").off("mousedown");
					// params.api.refreshCells({
					// 	force: true,
					// 	columns: $scope.gridOptions.columnApi.getAllDisplayedColumns().map(col=>col.colId)//[params.column.colId, ...range.columns.map(col=>col.colId)],
					// });
					if(!event.ctrlKey && !event.shiftKey && event.button == 0) {
						// $scope.agconfig.selectedCells = []
						// $scope.agconfig.rangeSelectedCells = []
						if(mouseEnd.x==mouseStart.x&&mouseEnd.y==mouseStart.y) {
							deselectAll('all')
							var newcell = {
								colId: focusedCell.column.colId,
								rowId: $scope.gridOptions.api.getDisplayedRowAtIndex(focusedCell.rowIndex)?.id,
								rowInd: focusedCell.rowIndex,
								rowNode: $scope.gridOptions.api.getDisplayedRowAtIndex(focusedCell.rowIndex)
							}
							// console.log('%cgrid_component.js line:2795 newcell', 'color: #007acc;', newcell, mouseStart, mouseEnd);
							$scope.agconfig.selectedCells = [newcell]
							$scope.agconfig.selection = [[newcell.rowNode.data[newcell.colId]?.v || '']]
						}
					}
					// console.log('%cgrid_component.js line:2627 $scope.gridOptions.api.getRowNode(focusedCell.rowIndex).data[focusedCell.colId]?.["style"]', 'color: #007acc;', /* $scope.gridOptions.api.getRowNode(focusedCell.rowIndex).data[focusedCell.column.colId]?.["style"],  */focusedCell, $scope.style);

					$scope.style['font-size'] = Number($scope.gridOptions.api.getDisplayedRowAtIndex(focusedCell.rowIndex).data[focusedCell.column.colId]?.['style']?.['font-size']?.split('px')[0]) || 14
					$scope.style['background-color'] = $scope.gridOptions.api.getDisplayedRowAtIndex(focusedCell.rowIndex).data[focusedCell.column.colId]?.['style']?.['background-color'] || '#ffffff'
					$scope.style['color'] = $scope.gridOptions.api.getDisplayedRowAtIndex(focusedCell.rowIndex).data[focusedCell.column.colId]?.['style']?.['color'] || '#222222'
					$scope.style['halign'] = $scope.gridOptions.api.getDisplayedRowAtIndex(focusedCell.rowIndex).data[focusedCell.column.colId]?.['style']?.['justify-content'] || 'Left'

					$(".ag-theme-alpine").off("mousemove");
					$(".ag-theme-alpine").off("mouseup");
				});
				// console.log('%cgrid_component.js line:2367 document.getElementById("annoContextMenu")', 'color: #007acc;',  document.getElementById("annoContextMenu"));
			})
		}, 1000)
	}
	// $scope.initGrid = () => {
	// 	var start
	// 	var end
	// 	var arr = Array.from({length: 100000}, (a, b)=>b)
	// 	start = new Date()
	// 	console.log('%cHello grid_component.js line:3104', 'background: green; color: white; display: block;', start);
	// 	for(var i = 0; i < arr.length; i++){
	// 		console.log('%cgrid_component.js line:3109 for', 'color: white; background-color: #007acc;', );
	// 	}
	// 	end = new Date()
	// 	console.log('%cHello grid_component.js line:3112', 'background: green; color: white; display: block;', end, end-start);

	// 	start = new Date()
	// 	console.log('%cHello grid_component.js line:3104', 'background: green; color: white; display: block;', start);
	// 	arr.map(a=>{
	// 		console.log('%cgrid_component.js line:3109 map', 'color: white; background-color: #007acc;', );
	// 	})
	// 	end = new Date()
	// 	console.log('%cHello grid_component.js line:3112', 'background: green; color: white; display: block;', end, end-start);

	// 	start = new Date()
	// 	console.log('%cHello grid_component.js line:3104', 'background: green; color: white; display: block;', start);
	// 	var i = 0;
	// 	while(i < arr.length){
	// 		console.log('%cgrid_component.js line:3109 while', 'color: white; background-color: #007acc;');
	// 		i++
	// 	}
	// 	end = new Date()
	// 	console.log('%cHello grid_component.js line:3112', 'background: green; color: white; display: block;', end, end-start);

		
	// }
	var nodupRows = (data) => {
		if($scope.agconfig.selectedRows?.length)
			arr = $scope.gridOptions.api.getSelectedNodes()
		else
			var arr = data.reduce((arr, key)=>{
				console.log('%cgrid_component.js line:3082 arr, key', 'color: #007acc;', data, arr, key);
				if(!arr.find(cell=>cell.rowId==key.rowId))
					arr.push(key);
				console.log(key, arr);
				return arr
			}, [])
		console.log('%cgrid_component.js line:3083 arr', 'color: #007acc;', arr);
		return arr
	}
	var nodupCols = (data) => {
		if($scope.agconfig.selectedColumns?.length)
			arr = $scope.agconfig.selectedColumns
		else
			var arr = data.reduce((arr, key)=>{
				console.log('%cgrid_component.js line:3082 arr, key', 'color: #007acc;', data, arr, key);
				if(!arr.find(cell=>cell.colId==key.colId))
					arr.push(key.colId);
				console.log(key, arr);
				return arr
			}, [])
		console.log('%cgrid_component.js line:3083 arr', 'color: #007acc;', arr);
		return arr
	}
	$scope.colorcode = {
		'background-color': ['none', 'red', 'green', 'yellow', 'blue'],
		color: ['none', 'red', 'green', 'yellow', 'blue'],
		// style: ['bold', 'italics', 'underline', 'strikethrough'],
		alignment: ['left', 'center', 'right'],
		fontsize: [12, 14, 16, 18],
	}
	$scope.changeColorCode = (colorcode, col) => {
		console.log('%cgrid_component.js line:2023 $scope.selectedCells', 'color: #007acc;', $scope.agconfig.selectedCells, col, $scope.gridOptions.api.getRowNode($scope.agconfig.selectedCells[0][0]));
		$scope.agconfig.selectedCells.map(cell=>{
			$scope.gridOptions.api.getRowNode(cell[0]).data['colorcode'] = {[cell[1]]: {[colorcode]: col}}
			$scope.refreshCells([cell[1]])
			// $scope.gridOptions.api.refreshCells({
			// 	force: true,
			// 	columns: [cell[1]]
			// });
		})
		// $scope.agconfig.selectedCells = []
	}
	// $scope.zoomchange = () => {
	// 	return {
	// 		'-webkit-transform': 'scale('+$scope.zoom/100+')',
	// 		'-webkit-transform-origin': '0 0',
	// 		'width': 100/$scope.zoom + '%',
	// 		'height': 100/$scope.zoom + '%',	
	// 	}
	// }
	
	$scope.style = {
		zoom: 100,
		zoomOptions: [50, 75, 90, 100, 125, 150, 200],
		'font-size': 14,
		fontSizeOptions: [6, 7, 8, 9, 10, 11, 12, 14, 18, 24, 36],
		'background-color': '#ffffff',
		color: '#222222',
		halign: 'Left',
		halignOptions: ['Left', 'Center', 'Right'],
		valign: 'Center',
		valignOptions: ['Top', 'Center', 'Bottom'],
	}

	$scope.toolbarList = [
		'Edit', 
		'View', 
		'Insert', 
		'Font Operations', 
		'Filter', 
		'Grid Operations'
	]

	if(!sessionStorage['toolbar']) sessionStorage['toolbar'] = $scope.toolbarList[$scope.agconfig.toolbarTabs]
	$scope.agconfig.toolbarTabs = sessionStorage['toolbar']

	$scope.stt = () => sessionStorage['toolbar'] = $scope.agconfig.toolbarTabs//$scope.agconfig.toolbarTabs

	$scope.fontOperations = (prop, value) => {
		console.log('%cgrid_component.js line:2626 prop, value', 'color: #007acc;', prop, value, $scope.agconfig.selectedCells, $scope.toolbarTabs);
		// $scope.agconfig.selectedCells.map(cell=>{
		// 	console.log('%cgrid_component.js line:2869 cell', 'color: #007acc;', cell);
			// if(!cell.rowNode.data.hasOwnProperty(cell.colId)) cell.rowNode.data[cell.colId] = {}
			// if(!cell.rowNode.data[cell.colId].hasOwnProperty('style')) cell.rowNode.data[cell.colId]['style'] = {}
			// if(!cell.rowNode.data['style'].hasOwnProperty(cell.colId))cell.rowNode.style = {}
			process_array($scope.agconfig.selectedCells, cell => {
				console.log('%cgrid_component.js line:3131 cell', 'color: #007acc;', cell);
				addObj([cell.rowNode.data, cell.colId, 'style'], cell.rowNode.data?.[cell.colId]?.['style'])
				var style = cell.rowNode.data[cell.colId]['style']//[cell.colId]
				console.log('%cgrid_component.js line:2629 cell.rowNode.data', 'color: #007acc;', cell.rowNode.style, cell.colId, style);
				switch(prop) {
					case 'toolbar':
						$scope.toolbarTabs = value
						break;
					case 'bold':
						style['font-weight'] = style?.['font-weight'] == 800 ? 400 : 800
						break;
					case 'italic':
						style['font-style'] = style?.['font-style'] == 'italic' ? '' : 'italic'
						break;
					case 'strikethrough':
						style['text-decoration'] = style?.['text-decoration'] == 'line-through' ? 'none' : 'line-through'
						break;
					case 'underline':
						style['text-decoration'] = style?.['text-decoration'] == 'underline' ? 'none' : 'underline'
						break;
					case 'size':
						// if(!value) value = 12
						// console.log('%cgrid_component.js line:2649 value', 'color: #007acc;', value);

						// if(value == '-') $scope.fontSize = $scope.style.fontSizeOptions[$scope.style.fontSizeOptions.indexOf($scope.fontSize)-1]
						// if(value == '+') $scope.fontSize = $scope.style.fontSizeOptions[$scope.style.fontSizeOptions.indexOf($scope.fontSize)+1]
						// console.log('%cgrid_component.js line:2649 value', 'color: #007acc;', value, $scope.fontSize, $scope.style.fontSizeOptions, $scope.style.fontSizeOptions.indexOf($scope.fontSize), $scope.style.fontSizeOptions[$scope.style.fontSizeOptions.indexOf($scope.fontSize)-1], $scope.style.fontSizeOptions[$scope.style.fontSizeOptions.indexOf($scope.fontSize)+1]);
						style['font-size'] = value + 'px'
						break;
					case 'background-color':
						style['background-color'] = value
						break;
					case 'color':
						style['color'] = value
						break;
					case 'halign':
						style['justify-content'] = value
						style['display'] = 'flex'
						break;
					case 'halign':
						style['justify-content'] = value
						style['display'] = 'flex'
						break;
				}
				console.log('%cgrid_component.js line:2647 style', 'color: #007acc;', style);
				// cell.rowNode.style = style
				$scope.refreshCells('all')
			}, true, 20)
		// })
		$scope.gridOptions.api.resetRowHeights()
	}
});
app.directive('agGridData', function () {
	return {
		restrict: 'AE',
		template: `
		<div class="toolbar">
			<label class="btn btn_trpnt" ng-class="{'mainprimary': agconfig.toolbarTabs==o}" ng-repeat="o in toolbarList" for="{{o}}">
				<input type="radio" name="toolbarTabs" id="{{o}}" ng-value="o" ng-model="agconfig.toolbarTabs" ng-change=stt()>
					<span>{{o}}</span>
				</input>
			</label>
			<!--button class="btn btn_trpnt" ng-repeat="o in toolbarList" ng-class="{'mainprimary': toolbarTabs==o}" ng-click="toolbarTabs=o">Font Operations {{toolbarTabs}} {{o}}</button>
			<button class="btn btn_trpnt" ng-class="{'mainprimary': toolbarTabs=='fontOper'}" ng-click="toolbarTabs='fontOper'">Font Operations </button>
			<button class="btn btn_trpnt" ng-class="{'mainprimary': toolbarTabs=='filter'}" ng-click="toolbarTabs='filter'"> Filter <i class="fa fa-solid fa-filter"></i> </button-->
		</div>
		<div class="toolbar">
			<div ng-show="agconfig.toolbarTabs=='Font Operations'">
				<select ng-model="style.zoom">
					<option ng-value="lvl" ng-repeat="lvl in style.zoomOptions">{{lvl}}%</option>
				<select>
				<button class="btn btn_trpnt" ng-click="fontOperations('bold', 't')"><i class="fa fa-solid fa-bold" ng-class="{'mainprimary': agconfig.toolbarTabs==o}"></i></button>
				<button class="btn btn_trpnt" ng-click="fontOperations('italic', 't')"><i class="fa fa-solid fa-italic" ng-class="{'mainprimary': agconfig.toolbarTabs==o}"></i></button>
				<button class="btn btn_trpnt" ng-click="fontOperations('underline', 't')" ng-class="{'mainprimary': agconfig.selectedCells[0].rowNode.dataa[agconfig.selectedCells[0].colId].style['text-decoration'] == 'underline'}"><i class="fa fa-solid fa-underline"></i></button>
				<button class="btn btn_trpnt" ng-click="fontOperations('strikethrough', 't')"><i class="fa fa-solid fa-strikethrough" ng-class="{'mainprimary': agconfig.toolbarTabs==o}"></i></button>
				<button class="btn btn_trpnt" ng-click="style['font-size'] = style.fontSizeOptions[style.fontSizeOptions.indexOf(style['font-size'])-1]||6; fontOperations('size', style['font-size'])"><i class="fa fa-solid fa-minus"></i></button>
				<input type="search" list="style['font-size']" ng-model="style['font-size']"  ng-change="fontOperations('size', style['font-size'])" class="input_dropdown" onclick="this.select()">
				<datalist id=style['font-size']>
					<option ng-value="lvl" ng-repeat="lvl in style.fontSizeOptions">{{lvl}}</option>
				</datalist>
				<button class="btn btn_trpnt" ng-click="style['font-size'] = style.fontSizeOptions[style.fontSizeOptions.indexOf(style['font-size'])+1]||36; fontOperations('size', style['font-size'])"><i class="fa fa-solid fa-plus" ></i></button>
				<label style="display: flex;flex-direction: column;width: 32px;padding: 0; justify-content: center; border: none" for="background-color" class="btn btn_trpnt">
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6H386.7l42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z"/></svg>
					<input id="background-color" type="color" ng-model="style['background-color']" ng-change="fontOperations('background-color', style['background-color'])" style="height: 6px; width: 100%; border: none"></input>
				</label>
				<label style="display: flex;flex-direction: column;width: 32px;padding: 0; justify-content: center; border: none" for="color" class="btn btn_trpnt">
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M221.5 51.7C216.6 39.8 204.9 32 192 32s-24.6 7.8-29.5 19.7l-120 288-40 96c-6.8 16.3 .9 35 17.2 41.8s35-.9 41.8-17.2L93.3 384H290.7l31.8 76.3c6.8 16.3 25.5 24 41.8 17.2s24-25.5 17.2-41.8l-40-96-120-288zM264 320H120l72-172.8L264 320z"/></svg>
					<input id="color" type="color" ng-model="style.color" ng-change="fontOperations('color', style.color)" style="height: 6px; width: 100%; border: none"></input>
				</label>
				<select ng-model="style.halign" ng-change="fontOperations('halign', style.halign)" title="Horizontal Align">
					<option ng-value="a" ng-repeat="a in style.halignOptions">{{a}}</option>
				<select>
				<!--select ng-model="style.align" ng-change="fontOperations('valign', style.valign)" title="Horizontal Align">
					<option ng-value="a" ng-repeat="a in style.valignOptions">{{a}}</option>
				<select-->
			</div>

			<div ng-show="agconfig.toolbarTabs=='Filter'">
				<!--button class="btn btn_trpnt" ng-show="agconfig.merge"><i class="fa fa-solid fa-filter"></i></button-->
				<label>Grid Search: </label>
				<input class="input" ng-keyup="gridOptions.api.setQuickFilter($event.target.value)"></input>
				<label>Selected Cell Search: </label>
				<input class="input" ng-model="selectionFilter" ng-keyup="gridOptions.api.onFilterChanged()"></input>
			</div>

			<div ng-show="agconfig.toolbarTabs=='View'">
				<button class="btn btn_trpnt mainprimary" ng-click="hideColumn('viewAll', true)" >Unhide All Columns</button>
				<!--ul class="nested_dropdown">
					<li>
						<span>Column Visibility
							<i class="fa fa-chevron-down" style="cursor: pointer"></i>
						</span>
						<ul>
							<li>
								<label style="display: flex;" for="viewAll">
									<input style="margin: 0 4px 0 0;" type="checkbox" id="viewAll" ng-model="viewAllCols" ng-change="hideColumn('viewAll', viewAllCols)" checked/>
									<span class="geekmark" style="margin: 0px 10px;"></span> 
									(View All)
								</label>
							</li>
							<li ng-repeat="header in headerList track by $index">
								<label style="display: flex; flex-grow: 1;" for="{{header.colId}}" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 100%;">
									<input style="margin: 4px 0;" type="checkbox" id="{{header.colId}}" ng-model="header.visible" ng-change="hideColumn([header.colId], header.visible)" checked/>
									<span class="geekmark" style="margin: 0px 10px;"></span>
									{{header.colDef.headerName}}
								</label>
							</li>
						</ul>
					</li>
				</ul-->
				<button class="btn btn_trpnt mainprimary" ng-click="hideColumn(agconfig.selectedColumns, false)">Hide Selected Columns</button>
				<button class="btn btn_trpnt mainprimary" ng-click="togglecb(this, 'hideSelected')" >Hide Selected Rows</button>
				<button class="btn btn_trpnt mainprimary" ng-click="togglecb(this, 'unhideAll')">Unhide All Rows</button>
			</div>

			<div ng-show="agconfig.toolbarTabs=='Insert'">
				Insert Row
				<button class="btn btn_trpnt" ng-click="mainEdit('InsertRowAbove')">Above</button>
				<button class="btn btn_trpnt" ng-click="mainEdit('InsertRowBelow')">Below</button>
				Insert Col
				<button class="btn btn_trpnt" ng-click="mainEdit('InsertColLeft')">Left</button>
				<button class="btn btn_trpnt" ng-click="mainEdit('InsertColRight')">Right</button>
			</div>

			<div ng-show="agconfig.toolbarTabs=='Edit'">
				<button class="btn btn_trpnt" ng-click="clipboardOperations('copy')"><i class="fa fa-solid fa-copy"></i></button>{{selectedCells}}
				<button class="btn btn_trpnt" ng-click="clipboardOperations('cut')"><i class="fa fa-solid fa-cut"></i></button>{{selectedCells}}
				<button class="btn btn_trpnt" ng-click="clipboardOperations('paste')"><i class="fa fa-solid fa-paste"></i></button>
				<!--button class="btn btn_trpnt" ng-click="clipboardOperations('format')"><i class="fa fa-solid fa-paste"></i>With Format</button-->
				<!--button class="btn btn_trpnt" ng-click="clipboardOperations('onlyformat')"><i class="fa fa-solid fa-paste"></i>Only Format</button-->
				<!--button class="btn btn_trpnt" class="trash" ng-click="delRows(agconfig.selectedRows)"><i class="fa fa-trash" aria-hidden="true"></i> </button-->
				<button class="btn btn_trpnt" class="trash" ng-click="mainEdit('del')"><i class="fa fa-trash" aria-hidden="true"></i> </button>
				<button class="btn btn_trpnt" ng-click="togglecb(this, 'invert')">Retain</button>
			</div>

			<div ng-show="agconfig.toolbarTabs=='Grid Operations'">
				<button class="btn btn_trpnt mainprimary" ng-click="mergeRows()" ng-show="agconfig.merge">Merge Rows</button>
				<button class="btn btn_trpnt mainprimary" ng-click="" ng-show="agconfig.colInsertable">Insert Column</button>
				<button class="btn btn_trpnt mainprimary" ng-click="mergeCells('hyphen')"><i class="fa fa-solid fa-code-merge"></i> Merge Cells </button>
				<button class="btn btn_trpnt mainprimary" ng-click="splitCells('hyphen')"><i class="fa fa-solid fa-code-merge"></i> Split Cells </button>
			</div>

			<div ng-show="toolbarTabs=='misc'">
				<button class="btn btn_trpnt mainprimary" ng-click="mergeRows()" ng-show="agconfig.merge">Merge Rows</button>
				<button class="btn btn_trpnt mainprimary" ng-click="" ng-if="agconfig.colInsertable">Insert Column</button>

				
								
								
				<button class="btn btn_trpnt mainprimary" ng-click="hideColumn('viewAll', true)" >Unhide All Columns</button>
				<!--button class="btn btn_trpnt mainprimary" ng-click="agconfig.selectedCells = []; refreshCells('all')">Deselect Cells</button-->
				<button class="btn btn_trpnt mainprimary" ng-click="clipboardOperations(agconfig.selectedCells, 'deleteArr')">Delete Cell Contents</button>

				<ul class="nested_dropdown">
					<li>
						<span>Colour Code
							<i class="fa fa-chevron-down" style="cursor: pointer"></i>
						</span>
						
						<ul>
							<li ng-repeat="(colcod, color) in colorcode">
								<span>{{colcod}}<i class="fa fa-chevron-right" style="cursor: pointer; font-size: 12px"></i></span>
								<ul>
							
							<li ng-repeat="col in color"><span ng-click="changeColorCode(colcod, col)">{{col}}</span></li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
				<!--button class="btn btn_trpnt mainprimary" ng-click="gridOptions.enableCellTextSelection = !gridOptions.enableCellTextSelection; initGrid(agconfig)">toggle enableCellTextSelection</button>
				<button class="btn btn_trpnt mainprimary" ng-init="refresh = true" ng-click="refresh = !refresh">toggle refresh</button-->
				
				<button class="" ng-click="mergeCells('hyphen')"><i class="fa fa-solid fa-code-merge"></i> m </button>
				<button class="" ng-click="splitCells('hyphen')"><i class="fa fa-solid fa-code-merge"></i> s Split</button>
			</div>
		</div>
		<!--{{contextmenu}}-->
		<!--div ng-show="contextmenu != ''"-->
			<!--div id="headerContextMenu" class="context-menu" ng-show="contextmenu == 'headerContextMenu' || 1" style="display: none">
				<ul class="menu"> 
					<li class="copy" ng-click="copy2DToClipboard(agconfig.selectedColumn)"><i class="fa fa-copy" aria-hidden="true"></i> Copy Column to Excel </li>
					<li class="copy" ng-click="copy2DToClipboard(agconfig.selectedColumn)"><i class="fa fa-copy" aria-hidden="true"></i> Copy Selected Columns to Excel </li>
					<li class="copy" ng-click="copyTextToClipboard(contextmenuele.rowNode.data[contextmenuele.colId])"><i class="fa fa-copy" aria-hidden="true"></i> Copy to New Column </li>
					<li class="paste" ng-click="clipboardOperations(contextmenuele.rowNode, 'paste', contextmenuele.colId)"><i class="fa fa-paste" aria-hidden="true"></i> Paste</li>
					<li class="paste" ng-click="clipboardOperations(agconfig.selectedCells, 'pasteArr', contextmenuele.colId)"><i class="fa fa-paste" aria-hidden="true"></i> Paste to Selected</li>
				</ul> 
			</div-->

			<div id="contextMenu" class="context-menu" ng-show="contextmenu == 'contextMenu' || 1" style="display: none">
				<ul class="menu"> 
					<!--li class="share"><i class="fa fa-share" aria-hidden="true"></i> Share</li-->
					<!--li class="rename"><i class="fa fa-pencil" aria-hidden="true"></i> Rename</li-->
					<!--li class="link"><i class="fa fa-link" aria-hidden="true"></i> Copy Link Address</li-->
					<!--li class="copy" ng-click="copyTextToClipboard(contextmenuele.rowNode.data[contextmenuele.colId])"><i class="fa fa-copy" aria-hidden="true"></i> Copy </li-->

					<li class="copy" ng-click="clipboardOperations('copy')"><i class="fa fa-copy" aria-hidden="true"></i> Copy </li>

					<li class="cut" ng-click="clipboardOperations('cut')"><i class="fa fa-solid fa-scissors"></i> Cut </li>
					<!--li class="paste" ng-click="clipboardOperations(contextmenuele.rowNode, 'paste', contextmenuele.colId)"><i class="fa fa-paste" aria-hidden="true"></i> Paste</li-->
					<li class="paste" ng-click="clipboardOperations('paste')"><i class="fa fa-paste" aria-hidden="true"></i> Paste </li>
					<!--li class="download"><i class="fa fa-download" aria-hidden="true"></i> Download</li-->
					<!--li class="trash" ng-click="clipboardOperations(contextmenuele.rowNode, 'delete', contextmenuele.colId)"><i class="fa fa-trash" aria-hidden="true"></i> Delete</li-->
					<li class="trash" ng-click="clipboardOperations('delete')"><i class="fa fa-trash" aria-hidden="true"></i> Delete </li>
					<li class="" ng-click="mergeCells('hyphen')"><i class="fa fa-solid fa-code-merge"></i>  Hyphen Merge</li>
					<li class="" ng-click="splitCells('hyphen')"><i class="fa fa-solid fa-code-merge"></i>  Hyphen Split</li>
				</ul> 
			</div>

			<div id="annoContextMenu" class="crop_pp" ng-show="contextmenu == 'annoContextMenu' || 1" style="display: none">
				<div class="crop_opp">Select</div>
				<div class="crop_opp">Cancel</div>
			</div>
		<!--/div-->

		<div style="/* display:flex;  */height: calc(100% - 50px);">
			<div ng-if="agconfig.sidebar" ng-style="{float: agconfig.sidebar}" class="sidebar"> </div>
			<div ag-grid="gridOptions" ng-if="agconfig.gridflg" class="ag-theme-alpine" style="height: 100%;" ng-style="{'-webkit-transform': 'scale('+style.zoom/100+')','-webkit-transform-origin': '0 0','width': 10000/style.zoom + '%','height': 10000/style.zoom + '%'}"></div>
		<div>
		<style>
		.nested_dropdown {
				margin: 0;
				padding: 0;
				list-style: none;
				/* width: 100px; */
				background-color: #0abf53;
			}

			.nested_dropdown li {
				position: relative;
			}

			.nested_dropdown li span {
				/* color: #ffffff; */
				text-align: center;
				text-decoration: none;
				display: block;
				/* padding: 10px; */
				border-radius: 6px
			}

			.nested_dropdown li ul {
				position: absolute;
				top: 100%;
				margin: 0;
				padding: 0;
				list-style: none;
				display: none;
				line-height: normal;
				background-color: #ccc;
				z-index: 100;
			}

			.nested_dropdown li ul li>* /* span:not(.geekmark) */ {
				text-align: left;
				/* color: #cccccc; */
				font-size: 14px;
				padding: 4px;
				display: block;
				white-space: nowrap;
				min-width: 120px;
				/* border: 1px solid; */
			}

			.nested_dropdown li ul li span:hover, .nested_dropdown ul li:hover {
				background-color: #bbb;
				color: #ffffff;
			}
			.nested_dropdown li ul li span:active {
				background-color: #aaa;
				color: #ffffff;
			}
	
			.nested_dropdown li ul li ul {
				display: none;
				left: 100%;
				top: 0;
			}
	
			/* ul li:hover>span {
				background-color: #0abf53;
				color: #ffffff !important;
			}
		*/
			ul li:hover>ul {
				display: block !important;
			}
			.ag-row-selected > .ag-cell {
				background: #bcdffc !important;
				}
			.toolbar {width: 100%; /* height: 40px; */ margin-bottom: 10px; background-color: #eee; display: flex;font-size: 12px ; /*flex-direction: columnmargin-left: 24% */}
			.toolbar>div {display: flex}
			.toolbar>div>* {height: 32px; margin: auto 10px; background-color: #ddd; padding: 0px 10px}
			.sidebar {height: 100%; width: 400px; background: #aaa}
			.jcenter {display: flex; justify-content: center}
			.header, .ag-header-cell, .ag-header-group-cell {
				background-color: #5E718D;
				border-width: 1px 0px 0px 1px;
				border-style: solid;
				border-color: #DADEE7;
				border-radius: 0;
				color: #FFFFFF;
				font-size: 16px;
				font-weight: 700;
				line-height: 24px;
			}
			.ag-header { border-bottom: none !important }
			.ag-header-row { height: 40px }
			.ag-header-group-cell-label {
				justify-content: center;
			}
			/* .ag-header-group-cell[aria-rowindex="1"] .ag-header-group-cell-label {
				justify-content: unset;
			} */
			/* .header-root .ag-header-group-cell-label { justify-content: unset; } */
			.ag-theme-alpine .ag-root-wrapper {
				border: none;
				
			}
			.ag-root, .ag-header-container, .ag-center-cols-container {
				box-shadow: 0px 1px 4px 0px #0E1F350F;
				border-radius: 16px;
			}
			.ag-center-cols-container {
				border-bottom: solid #096DD9 1px
			}
			.ag-header-container, .ag-center-cols-container {
				overflow: hidden
			}
			.ag-theme-alpine {
				/*--ag-header-height: 30px;
				--ag-header-foreground-color: white;
				--ag-header-background-color: #5E718D;
				--ag-header-border: 1px 0px 0px 1px;
				--ag-header-border: solid;
				--ag-header-border: #DADEE7;
				--ag-header-border-radius: 0;
				--ag-header-font-size: 16px;
				--ag-header-font-weight: 700;
				--ag-header-line-height: 24px;
				--ag-header-justify-content: center; */
				--ag-column-hover-color: #5e718d !important;
				/* --ag-row-hover-color: transparent; */
				--ag-row-cell-color: red;
				--ag-input-focus-border-color: green;
			}
			/* .ag-header-row[aria-rowindex="1"] {
				border-radius: 16px 16px 0 0;
			} */
			/* .ag-cell[aria-colindex="1"] {
				width: 568px;
				margin-left: 32px;
			} */
			.ag-header-row[aria-rowindex="4"] {
				/* border-radius: 0 0 16px 16px; */
			}
			/* .cell-span, .ag-cell-focus, .ag-row-selected, .ag-col-selected {
				background-color: #bcdffc !important;
			} */
			.ag-floating-filter-body { color: #262626; font-size: 12px }
			.ag-cell-focus {}
			.new-row {background-color: #ffd68c}
			/* .new-row.ag-row-selected {background-color: unset} */
			.edited-cell/* :not(.ag-cell-focus) */ {background-color: #FFA500 !important}
			.blue {background-color: blue; color: yellow}
			.red {background-color: red}
			.center {text-align: 'center'}
			/* .ag-icon-checkbox-checked{
				background: transparent url("https://www.ag-grid.com/example-assets/svg-icons/menu.svg") center/contain no-repeat;
				color: transparent;
			}  */
			.tree_parent {
				color: #262626 !important;
				background-color: #F2F4F7 !important;
				/* border-bottom: 1px solid #98A2B3 !important; */
				font-family: Inter;
				font-size: 14px;
				font-weight: 600;
				line-height: 21px;
				letter-spacing: 0em;
				text-align: left;
			}
			.child_blue {
				/* color: #0384FC !important;
				border-bottom: 1px solid #096DD9 !important; */
				font-weight: 600;
			}
			/* .child_grey {
				color: #262626 !important;
				background-color: #F2F4F7 !important;
				border-bottom: 1px solid #98A2B3 !important;
				font-weight: 600;
			} */
			.child, .child_blue, .child_grey{
				//styleName: 12 Px/Semi Bold;
				/* font-family: Inter !important;
				font-size: 12px !important;
				line-height: 18px !important;
				letter-spacing: 0em !important;
				text-align: left !important; */
			}
			.tree-margin {
				margin-left: 32px
			}

			/* .tree_parent.pblue {
				background-color: #EFF8FF !important;
				color: #096DD9 !important;
				border-bottom: 1px solid #096DD9 !important;
			} */
			.child_blue.pblue {
				color: #0384FC !important;
				border-bottom: 1px solid #096DD9 !important;
			}

			/* .tree_parent.pgreen {
				background-color: #e4fae4 !important;
				color: #04AA05 !important;
				border-bottom: 1px solid #04AA05 !important;
			} */
			.child_blue.pgreen {
				color: #04AA05 !important;
				border-bottom: 1px solid #04AA05 !important;
			}
			
			/* .tree_parent.pred {
				background-color: #fceaea !important;
				color: #D93309 !important;
				border-bottom: 1px solid #D93309 !important;
			} */
			.child_blue.pred {
				color: #D93309 !important;
				border-bottom: 1px solid #D93309 !important;
			}
				
  		/* .script { 
            display: block; 
            position: relative; 
            padding-left: 45px; 
            margin-bottom: 15px; 
            cursor: pointer; 
            font-size: 20px; 
        }  */
          
        /* Hide the default checkbox */ 
        input[type=checkbox]:not(.ag-input-field-input.ag-checkbox-input), input[type=radio] { 
            /* visibility: hidden; */
			display: none
        } 
          
        /* creating a custom checkbox based 
            on demand */ 
        .geekmark { 
            /* position: absolute; 
            // top: 0; 
            // left: 0;  */
			display: block;
			margin: auto;
            height: 16px; 
            width: 16px; 
			background: url('src/images/checkbox_unselected.svg') no-repeat; background-size: cover;
        } 

        /* specify the background color to be 
        shown when checkbox is checked */ 
        /* .script  */input:checked ~ .geekmark { 
			background: url('src/images/checkbox_selected_2.svg') no-repeat;
			background-size: cover;
        } 
          
        /* checkmark to be shown in checkbox */ 
        /* It is not be shown when not checked */ 
        .geekmark:after { 
            content: ""; 
            position: absolute; 
            display: none; 
        } 
          
        /* display checkmark when checked */ 
        /* .script  */input:checked ~ .geekmark:after { 
            display: block; 
        } 
          
     
				/* input[type=checkbox] {
					display: none;
				} */
				.label {
					/* border: 1px solid #000; */
					display: inline-block;
					padding: 3px;
				}
				input[type=checkbox]:checked + .label {
					/* background: #f00; */
					color: #ff9970;
				}
				input[type=checkbox] {
					background: url('src/images/checkbox_selected_2.svg')
				}
				 
				.display:hover {display: unset}
				/* .ag-theme-alpine .ag-column-hover {background-color: transparent !important} */
				
				/* .cellevent {display: none} */
				.ag-row-hover>.ag-column-hover.cellevent {background-color: #F4F3FF !important; color: #6938EF;}
				.ag-cell-focus.cellevent, .multicell {background-color: #EBE9FE !important; color: #5925DC; border: none !important}

				.ag-cell>span {display: flex}
				.ag-cell-wrapper>.ag-cell-value>span>div {
					overflow: hidden;
					text-overflow: ellipsis;
				}

				/* .cell-range {background-color: #dBd9eEaa !important; color: #6938EF;} */
				.cell-range-top {border-top: #6938EF 1px solid !important;}
				.cell-range-bottom {border-bottom: #6938EF 1px solid !important;}
				.cell-range-left {border-left: #6938EF 1px solid !important;}
				.cell-range-right {border-right: #6938EF 1px solid !important;}

				/* input[type="checkbox"]:checked+label {
					-webkit-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.51);
					-moz-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.51);
					box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.51);
					border: 1px solid $blue;
					color: $blue!important;
					font-weight: bold;
				  }

				  .select-option {
					height: 86px;
					width: 100%;
					border: 1px solid $light-grey;
					text-align: center;
					vertical-align: middle;
					font-family: $main-font;
					color: $grey;
					font-size: 14px;
					padding-top: 7px;
					border-radius: 3px;
				  }

				  .select-option:hover {
					border: 1px solid $blue;
				  }
				  
				  .select-option:hover {
					color: $blue;
				  }
				  
				  .select-option:hover path {
					fill: $blue;
				  }
				  
				  .product-icon {
					width: 50px;
					height: auto;
				  }
				  
				  input[type="checkbox"]:checked+label > svg > path{
					fill: blue;
				  } */


				  #dataslct input[type=checkbox] {
					display: none
				  }
				  /* #dataslct label  {
					display: inline-block;
				  } */
				  #dataslct input[type=checkbox]:checked ~ checked {
					background: url('src/images/checkbox_selected_2.svg')
					display: inline-block;
				  }
				 /*  #dataslct input[type=checkbox]:unchecked ~ unchecked {
					display: inline-block;
				  } */

				  #headerslct {
					background-image: url('src/images/checkbox_selected_2.svg')
				  }
				  .only {display: none; cursor: pointer;margin: 0px 10px;}
				  .onlyp:hover>.only {display: block;}


				  .ag-header-group-cell.ag-header-group-cell-with-group>div:not(.ag-header-cell-resize) {width: 100%;height: 100%;}

				.noselect {
					-webkit-touch-callout: none;
					-webkit-user-select: none;
					-khtml-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
					user-select: none;
				}

				 /*  * {
				  padding: 0;
				  margin: 0;
				  box-sizing: border-box;
				  font-family: 'Montserrat', sans-serif;
				} */
				body {
				  width: 100vw;
				  height: 100vh;
				  background: #f2f4f6;
				  overflow: hidden;
				}
				ul {
				  list-style: none;
				}
				.context-menu { 
				  position: absolute;
				  z-index: 100
				} 
				.menu {
				  display: flex;
				  flex-direction: column;
				  background-color: #fff;
				  border-radius: 10px;
				  box-shadow: 0 10px 20px rgb(64 64 64 / 5%);
				  padding: 10px 0;
				}
				.menu > li {
				  font: inherit;
				  border: 0;
				  padding: 10px 30px 10px 15px;
				  width: 100%;
				  display: flex;
				  align-items: center;
				  position: relative;
				  text-decoration: unset;
				  color: #000;
				  font-weight: 500;
				  transition: 0.5s linear;
				  -webkit-transition: 0.5s linear;
				  -moz-transition: 0.5s linear;
				  -ms-transition: 0.5s linear;
				  -o-transition: 0.5s linear;
				  cursor: pointer
				}
				.menu > li:hover {
				  background:#f1f3f7;
				  color: #4b00ff;
				}
				.menu > li > i {
				  padding-right: 10px;
				}
				.menu > li.trash:hover {
				  color: red;
				}

				/* body>:first-child {
					position: relative;
				} */
		
				.crop_pp {
					position: absolute;
					left: -64px;
					top: -36px;
					background: #333;
					width: 120px;
					align-items: center;
					border-radius: 4px;
					display: table;
					z-index: 1000;
				}
		
				.crop_opp {
					color: #fff;
					border-right: 1px solid #fff;
					/* padding: 5px 10px; */
					padding: 2px 0px;
					display: table-cell;
					vertical-align: middle;
					cursor: pointer;
					font-size: 12px;
					text-align: center;
					width: 60px;
				}
		
				.crop_pp .crop_opp:nth-child(4) {
					border: none;
				}
		
				.crop_pp:after {
					content: '';
					/* width: 10px;
					height: 10px;
					transform: rotate(45deg); */
					position: absolute;
					z-index: 20;
					/* bottom: -5px;
					background: #333; */
					left: calc(50% - 8px);

					width: 0; 
					height: 0; 
					border-left: 8px solid transparent;
					border-right: 8px solid transparent;
					
					border-top: 8px solid #333;
				}
		
				body {
					position: relative;
				}
		
				.mrk_lt,
				.mrk_rt {
					position: absolute;
					width: 2px;
					height: 23px;
					background: #607ad8;
				}
		
				.mrk_lt:before,
				.mrk_rt:before {
					content: '';
					width: 10px;
					height: 10px;
					position: absolute;
					z-index: 20;
					top: -10px;
					background: #607ad8;
					border-radius: 13px;
					left: -4px;
					z-index: 10;
				}
				.btn_trpnt {
					background-color: transparent
				}
				.btn_trpnt:hover {
					background-color: #dddddd
				}
				.input_dropdown {
					width: 42px
				}
				#canvas {
					position: absolute;
					z-index: 100;
					background-color: #aaaaaa44;
					border: 2px solid black;
				}
			</style>
		`,
		controller: 'AGGridController',
		scope: {
			'agconfig': '='
		},
		link: function (scope, elm, attrs, controller) {
			if (!$("#uigrid_min_css").length)
				$('head').append('<style id="uigrid_min_css"></style>').find('#uigrid_min_css').html(scope.uigrid_load_css)
		}
	}
});
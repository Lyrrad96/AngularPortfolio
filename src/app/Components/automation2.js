app.controller("automationCntrl", function ($scope, $rootScope, $http, $timeout, $location, $filter, $sce, tasAlert, tasService, uiGridConstants) {
    // var socket = io.connect();
    $scope.user = sessionStorage['user_id'] || 'TAS - UI';
    $scope.uid = sessionStorage['uid'] || '';
    $('#bodywrapper').show();
    console.log("Automation Display")
    $scope.silde_menu = true
    $scope.reviewflg = true
    $scope.prve_html_dd = 'Data/Documents'
    $scope.prve_html_bv = 'Batch'
    $scope.activebutton3 = 'Data/Documents'
    $scope.tabflg = 'Batch'
    $scope.revbc = ['Project 1', 'Batch 1']
    var rand = () => Math.floor(Math.random() * 2)

    // $scope.resizepr = {
    // 	parent_scope : $scope,
    // 	id	    	 : '#reviewPageResizer',
    // 	pid          : '#ddoc',
    // 	sid          : '#content_right',
    // 	eid          : '#content_left',
    // 	type         : 'w'
    // }
    var docids = [4865, 4765, 4638, 4865]
    $scope.tst_tbl_id_lst = Array.from({length: 1000}, (v, i) => {
        return {
            cnt: i,
            k: docids[rand()] + '_' + i,
            n: docids[rand()] + '_' + i,
        }
    })
    $scope.tst_doc_id_lst = Array.from({length: 1000}, (v, i) => {
        return {
            cnt: i,
            k: 'Doc ID ' + (1000+i),
            n: 'Doc ID ' + (1000+i),
            vm: $scope.tst_tbl_id_lst.map(t=>false),
            tbl_list: $scope.tst_tbl_id_lst.map(t=>t.k)//[4865, 4765, 4638, 4865]
        }
    })
    $scope.selected_bv_doc_id = $scope.tst_doc_id_lst[0].k
    $scope.selected_bv_tbl_id = $scope.tst_tbl_id_lst[0].k
    $scope.selected_bv_doc_ind = 0
    

// lazyLoad
    // var ind = 0
    // var inc = 20
    // var size = 100
    $scope.cachedLst = {
        submenu_list_ele_docs: {
            ind: 0,
            inc: 20,
            size: 100,
            parent: $scope.tst_doc_id_lst,
            loaded: $scope.tst_doc_id_lst.slice(0, 100)
        },
        submenu_list_ele_tbls: {
            ind: 0,
            inc: 20,
            size: 40,
            parent: $scope.tst_tbl_id_lst,
            loaded: $scope.tst_tbl_id_lst.slice(0, 40)
        },
        bv_right: {
            ind: 0,
            inc: 20,
            size: 40,
            parent: $scope.tst_doc_id_lst,
            loaded: $scope.tst_doc_id_lst.slice(0, 40)
        }
    }
    // $scope.cachedLst = $scope.tst_doc_id_lst.slice(0, size)

    $scope.loadDown = function(id) {
        var { ind, inc, size, loaded, parent } = $scope.cachedLst[id]
        console.log('%cautomation.js line:63 ind, inc, size, loaded, parent', 'color: #007acc;', ind, inc, size, loaded, parent);
        if(loaded.at(-1) == parent.at(-1)) {
            return
        }
        // ind = ind + inc
        // var inc = inc
        if (ind + inc > parent.length) {
            inc = parent.length - ind
        }
        console.log("Loading down", id)
        loaded = parent.slice(ind, inc + size + ind)
        // loaded = loaded.concat(parent.slice(ind, inc + ind))
        $scope.cachedLst[id].loaded = loaded
        console.log('%cautomation.js line:74 loaded, parent, parent.slice(ind, inc + ind)', 'color: #007acc;', ind, loaded, loaded.length, parent, parent.length, parent.slice(ind, inc + ind), parent.slice(ind, inc + ind).length);
        var len = loaded.length
        if(len > size) {
            $timeout(()=>{
                var last = $('#'+id).children().last()[0]
                console.log('%cautomation.js line:64 last, last.parentElement, last.parentElement.parentElement', 'color: #007acc;', $(id), last, last?.parentElement?.parentElement, last?.clientHeight, len, size);
                last?.parentElement.scrollBy(0, -(last.clientHeight + 16)*inc-32)
                // last.parentElement.parentElement.scrollBy(0, (last.clientHeight + 16)*inc+32)
            }, 2)
            $timeout(()=>{
                $scope.cachedLst[id].loaded = $scope.cachedLst[id].loaded.slice(len-size, len)
                console.log('%cautomation.js line:84 loaded, $scope.cachedLst', 'color: #007acc;', loaded, $scope.cachedLst);
                // var last = $('li#'+loaded.length-inc)[0]
                // last.scrollIntoView(false)
            }, 4)
        }
        $scope.cachedLst[id].ind = ind + inc
        // $timeout(()=>{
        // 	Object.assign($scope.cachedLst[id], {
        // 		ind: ind,
        // 		loaded: loaded
        // 	})
        // }, 6)
    }
    $scope.loadUp = function(id) {
        var { ind, inc, size, loaded, parent } = $scope.cachedLst[id]
        console.log('%cautomation.js line:78 loaded[0], parent[0]', 'color: #007acc;', loaded[0], parent[0], loaded[0] == parent[0], ind);
        if(loaded[0] == parent[0]) {
            return
        }
        // ind = ind - inc
        // var inc = inc
        if (ind + inc > parent.length) {
            inc = parent.length - ind
        }
        console.log("Loading up", id)
        loaded = parent.slice(ind - inc, ind).concat(loaded)
        $scope.cachedLst[id].loaded = loaded
        var len = loaded.length
        if(len > size) {
            $timeout(()=>{
                var last = $('#'+id).children().last()[0]
                console.log('%cautomation.js line:89 last, last.parentElement, last.parentElement.parentElement', 'color: #007acc;', $(id), last, last?.parentElement?.parentElement, last?.clientHeight, len, size);
                last?.parentElement.scrollBy(0, (last.clientHeight + 16)*inc)
                // last.parentElement.parentElement.scrollBy(0, (last.clientHeight + 16)*inc+32)
            }, 2)
            $timeout(()=>{
                $scope.cachedLst[id].loaded = $scope.cachedLst[id].loaded.slice(0, size)
                // var last = $('li#'+$scope.cachedLst.length-inc)[0]
                // last.scrollIntoView(false)
            }, 4)
        }
        $scope.cachedLst[id].ind = ind - inc
        // $timeout(()=>{
        // 	Object.assign($scope.cachedLst[id], {
        // 		ind: ind,
        // 		loaded: loaded
        // 	})
        // }, 6)
    }

    // function runAtSpecificTimeOfDay(hour, minutes, func) {
    // 	const twentyFourHours = 86400000;
    // 	const now = new Date();
    // 	let eta_ms = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minutes, 0, 0).getTime() - now;
    // 	if (eta_ms < 0) {
    // 		eta_ms += twentyFourHours;
    // 	}
    // 	setTimeout(function() {
    // 		//run once
    // 		func();
    // 		// run every 24 hours from now on
    // 		// setInterval(func, twentyFourHours);
    // 	}, eta_ms);
    // }
    // runAtSpecificTimeOfDay(11, 54, () => { alert('16:12') });
//


    $scope.gohome = (item) => (item == 'Project 1' || item == 'home') ? ($scope.reviewflg = false, $scope.silde_menu = false, $scope.activebutton = 'Projects') : ''

    $scope.menu_icon = function () {
        console.log("Datasisplay",)
        $scope.silde_menu = !$scope.silde_menu
    }
    $scope.project1_close = function () {
        $scope.silde_menu = false
    }
    $scope.Automation_datastr = [
        { "mainheader": 'Notice requirements on change of Investment Manager', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager", "date": "Date: 12-Jun-2022", "doc_id": "14785", "rid": '1', "checked": false },
        { "mainheader": 'Notice requirements on change of Investment Manager1', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Aug-2023", "doc_id": "14786", "rid": '2', "checked": false },
        { "mainheader": 'Investment Manager3', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-jun-2023", "doc_id": "14787", "rid": '3', "checked": false },
        { "mainheader": 'Investment Manager 4', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Jul-2023", "doc_id": "14788", "rid": '4', "checked": false },
        { "mainheader": 'Investment Manager 4', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Jul-2023", "doc_id": "14788", "rid": '5', "checked": false },
        { "mainheader": 'Investment Manager 4', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Jul-2023", "doc_id": "14788", "checked": false },
        { "mainheader": 'Investment Manager 4', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Jul-2023", "doc_id": "14788", "checked": false },
        { "mainheader": 'Manager5', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Aug-2023" }
    ]
    $scope.result = {
        'Automation_resultwhite': [
            { "mainheader": 'Notice requirements on change of Investment Manager', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager", "date": "Date: 12-Jun-2022", "color": '#ffffff' },
            { "mainheader": 'Notice requirements on change of Investment Manager1', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Aug-2023", "color": '#ffffff' },
            { "mainheader": 'Investment Manager3', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-jun-2023", "color": '#ffffff' },
            { "mainheader": 'Investment Manager 4', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Jul-2023", "color": '#ffffff' },
            { "mainheader": 'Investment Manager 4', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Jul-2023", "color": '#ffffff' },
            { "mainheader": 'Investment Manager 4', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Jul-2023", "color": '#ffffff' },
            { "mainheader": 'Investment Manager 4', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Jul-2023", "color": '#ffffff' },
            { "mainheader": 'Manager5', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Aug-2023", "color": '#ffffff' }
        ],
        'Automation_resultyellow': [
            { "mainheader": 'Notice requirements on change of Investment Manager', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager", "date": "Date: 12-Jun-2022", "color": '#FFFAEB' },
            { "mainheader": 'Notice requirements on change of Investment Manager1', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Aug-2023", "color": '#FFFAEB' },
            { "mainheader": 'Notice requirements on change of Investment Manager1', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Aug-2023", "color": '#FFFAEB' },
            { "mainheader": 'Notice requirements on change of Investment Manager1', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Aug-2023", "color": '#FFFAEB' },
            { "mainheader": 'Investment Manager3', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-jun-2023", "color": '#FFFAEB' },
            { "mainheader": 'Investment Manager 4', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Jul-2023", "color": '#FFFAEB' },
            { "mainheader": 'Manager5', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Aug-2023", "color": '#FFFAEB' }

        ],
        'Automation_resultgreen': [
            { "mainheader": 'Notice requirements on change of Investment Manager', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager", "date": "Date: 12-Jun-2022", "color": '#EDFDEC' },
            { "mainheader": 'Notice requirements on change of Investment Manager1', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Aug-2023", "color": '#EDFDEC' },
            { "mainheader": 'Notice requirements on change of Investment Manager1', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Aug-2023", "color": '#EDFDEC' },
            { "mainheader": 'Notice requirements on change of Investment Manager1', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Aug-2023", "color": '#EDFDEC' },
            { "mainheader": 'Investment Manager3', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-jun-2023", "color": '#EDFDEC' },
            { "mainheader": 'Investment Manager 4', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Jul-2023", "color": '#EDFDEC' },
            { "mainheader": 'Manager5', "subheader": "Refers to any notification requirements from parties involved in the event of change of Investment Manager1", "date": "Date: 28-Aug-2023", "color": '#EDFDEC' }
        ]

    }
    // For Automation result 
    $scope.Automation_reslt = {
        'gray': [
            { doc_id: '14785', table_id: '148', pgn: '1', tdco: '#F2F4F7', color: '#595959' },
            { doc_id: '14789', table_id: '123', pgn: '5', tdco: '#F2F4F7', color: '#595959' },
            { doc_id: '14799', table_id: '123', pgn: '5', tdco: '#F2F4F7', color: '#595959' },
            { doc_id: '14589', table_id: '123', pgn: '5', tdco: '#F2F4F7', color: '#595959' },
            { doc_id: '14489', table_id: '123', pgn: '5', tdco: '#F2F4F7', color: '#595959' },
            { doc_id: '14389', table_id: '123', pgn: '5', tdco: '#F2F4F7', color: '#595959' },
        ],
        'orange': [
            { doc_id: '14785', table_id: '148', pgn: '1', tdco: '#FFF5EB', color: '#F78008' },
            { doc_id: '14789', table_id: '123', pgn: '5', tdco: '#FFF5EB', color: '#F78008' },
            { doc_id: '14789', table_id: '123', pgn: '5', tdco: '#FFF5EB', color: '#F78008' },
            { doc_id: '14789', table_id: '123', pgn: '5', tdco: '#FFF5EB', color: '#F78008' },
            { doc_id: '14789', table_id: '123', pgn: '5', tdco: '#FFF5EB', color: '#F78008' },
            { doc_id: '14789', table_id: '123', pgn: '5', tdco: '#FFF5EB', color: '#F78008' },
        ], 'green': [
            { doc_id: '14785', table_id: '148', pgn: '1', tdco: '#EDFDEC', color: '#0E8450' },
            { doc_id: '14789', table_id: '123', pgn: '5', tdco: '#EDFDEC', color: '#0E8450' },
            { doc_id: '14789', table_id: '123', pgn: '5', tdco: '#EDFDEC', color: '#0E8450' },
            { doc_id: '14789', table_id: '123', pgn: '5', tdco: '#EDFDEC', color: '#0E8450' },
            { doc_id: '14789', table_id: '123', pgn: '5', tdco: '#EDFDEC', color: '#0E8450' },
            { doc_id: '14785', table_id: '148', pgn: '1', tdco: '#EDFDEC', color: '#0E8450' },
        ]
    }

    // Result
    $scope.garyresult_clk = function (item) {
        console.log("Item click row", item)
        $scope.helight_resilt = item['doc_id']
        console.log("Item click row", $scope.helight_resilt)

    }

    $scope.datadocument = function(item){
        console.log("Item click row", item)
        $scope.datadoc = item['doc_id']
        console.log("Item click row", $scope.helight_resilt)
    }
    $scope.show_hover=false
    $scope.hoverIn= function(){
        $scope.show_hover=true
    }
    $scope.hoverOut=function(){
        $scope.show_hover=false
    }



    /***********************************/
    $scope.logout_func = function () {
        sessionStorage.clear();
        window.location.href = "/login";
    }
    console.log("Automation Display", $scope.Automation_datastr, "\n")
    window.searchTable = function () {
        var input, filter, found, table, tr, td, i, j;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("div");
        for (i = 0; i < tr.length; i++) {
            // td = tr[i].getElementsByTagName("td");//typography1 
            td = tr[i].getElementsByClassName("typography1")
            for (j = 0; j < td.length; j++) {
                if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                }
            }
            if (found) {
                tr[i].style.display = "";
                found = false;
            } else {
                tr[i].style.display = "none";
            }
        }
    }
    $scope.review_autiomantion = function (pos) {
        console.log("pos", pos)
        $scope.reviewflg = true
        $scope.silde_menu = true
        $scope.activebutton3 = 'Data/Documents'
        $timeout(()=>{
            $scope.selected_bv_doc_value = $scope.tst_doc_id_lst[0].k
            $scope.selected_bv_tbl_id = $scope.tst_doc_id_lst[0]['tbl_list'][0]
        })

// alert("Review", pos)
    }
    $scope.activebutton1 = 'Routines'

    /***********************************/
    $scope.t_grid = {
        parent_scope: $scope,
        grid_id: 't_grid',
        grid_map_data: {},
        grid_data: [],
        grid_cb: 'tgrid_cb',
        selected: {},
        grid_col_group: false,
        grid_coldef: [],
        ttype_d: {},
    }
    /***********************************/
    $scope.init_func = function () {
        var pd = { 'cmd_id': 24 };
        tasService.ajax_request(pd, 'POST', function (res) {
            if (res['message'] == 'done') {
                $scope.get_sa_docs_lst();
                return
            }
            tasAlert.show('Error While Reading Suggestion Comments', 'error');
        });
    }
    $scope.helight_usersvg = false
    $scope.user_click = function () {
        console.log("Clik user")
        $scope.helight_usersvg = true
    }
    $scope.helight_settingsvg = false
    $scope.setting_click = function () {
        console.log("Clik setting")
        $scope.helight_settingsvg = true
    }
    $scope.helight_logoutsvg = false
    $scope.logout_click = function () {
        $scope.helight_logoutsvg = true
    }
    /***********************************/
    // $scope.init_func();
    $scope.project_drp1 = false
    $scope.project_name_show1 = function () {
        console.log("Project")
        $scope.activebutton = 'Projects'
        $scope.project_drp1 = true;
        var project = document.querySelector('#nav-tab div[data-bs-target="#nav-home"]')
        var firstTab = new bootstrap.Tab(project)

        firstTab.show()

    }
    $scope.project_drp = false
    $scope.project_show = function () {
        $scope.activebutton = 'Batches'
        console.log("batch")
        var project = document.querySelector('#nav-tab div[data-bs-target="#nav-profile"]')
        var firstTab = new bootstrap.Tab(project)
        firstTab.show()

    }
    /***********************************/
    $scope.sbt = function () {
        console.log("taxonomy batch")
        $scope.activebutton = 'Data/Documents'
        var project = document.querySelector('#nav-tab div[data-bs-target="#nav-contact"]')
        var firstTab = new bootstrap.Tab(project)

        firstTab.show()
    }
    $scope.operations = function () {
        console.log("Operations")
        $scope.activebutton3 = 'Operations'
        var project = document.querySelector('#nav-tab div[data-bs-target="#nav-contact"]')
        var firstTab = new bootstrap.Tab(project)

        firstTab.show()
    }
    $scope.ddr = function () {
        console.log("taxonomy batch")
        $scope.activebutton3 = 'Data/Documents'
        var project = document.querySelector('#nav-tab div[data-bs-target="#nav-contact"]')
        var firstTab = new bootstrap.Tab(project)

        firstTab.show()
    }
    $scope.Auto_Routine = function () {
        console.log("taxonomy batch")
        $scope.activebutton1 = 'Routines'
        var project = document.querySelector('#nav-tab div[data-bs-target="#nav-Routines"]')
        var firstTab = new bootstrap.Tab(project)

        firstTab.show()
    }
    $scope.Auto_Results = function () {
        console.log("taxonomy batch")
        $scope.activebutton1 = 'Results'
        var project = document.querySelector('#nav-tab div[data-bs-target="#nav-Results"]')
        var firstTab = new bootstrap.Tab(project)

        firstTab.show()
        $timeout(function () {
            $scope.result_view('Batch View')
        })
    }
    $scope.result_view = function (pos) {
        console.log("clicked action", pos)
        $scope.prve_html = pos;
        if (pos == 'Batch View') {
            var project = document.querySelector('#nav-tab div[data-bs-target="#nav-batch"]')
            var firstTab = new bootstrap.Tab(project)
            console.log("clicked action", pos)
            firstTab.show()

        } else {
            var project = document.querySelector('#nav-tab div[data-bs-target="#nav-Document"]')
            var firstTab = new bootstrap.Tab(project)
            firstTab.show()
            console.log("clicked action", pos)

        }
    }

    
    $scope.activebutton4 = 'Comparison'
    $scope.INC_Operations = () => $scope.activebutton4 = 'Operations'
    $scope.INC_Comparison = () => $scope.activebutton4 = 'Comparison'

    $scope.t_grid = []
    $scope.get_sa_docs_lst = function () {
        //var pd = {'cmd_id':55, 'bid':$scope.bselcted.k, 'user_id':$scope.user, 'project_id': $scope.bselcted.pid, 'taxo': $scope.t_grid.slt_taxo,};
        var pd = { 'cmd_id': 55, 'user_id': $scope.user, 'taxo': '', 'project_pid': sessionStorage["pid"], };
        console.log("project_id", pd)
        tasService.ajax_request(pd, 'POST', $scope.cb_sa_doc_id_lst);
    }
    //-----------------------------------------------------
    $scope.cb_sa_doc_id_lst = function (res) {
        $scope.t_grid = []
        if (res['message'].toLowerCase() == 'done') {
            $scope.activebutton = 'Projects'
            var data = res['data'] || {};
            console.log("SA DOCS RES :: ", data)
            $scope.sa_doc_id_lst = data
            $scope.selected_sa_doc_id = $scope.sa_doc_id_lst[0]['pid'];
            $scope.currentProjectId = $scope.sa_doc_id_lst[0]['pid']
            $scope.selected_sa_doc_value = $scope.sa_doc_id_lst[0]['k'];
            $scope.t_grid.push($scope.selected_sa_doc_value)
            $timeout(function(){
                $scope.bredcrum()
            },500)
            // $scope.project_show()
            // $scope.get_brokers();
        }
    }
    $scope.bredcrum = function(){
        var a = document.querySelectorAll('.breadcrumb-item')
        console.log(a.length)
        console.log("a[a.length-1]",a[a.length-1])
        a.forEach((ele,ind)=>{
            console.log('ele',ele,ind)
            ele.style.color="gray"
            if(ind+1==a.length){
                console.log('eleinside index',ele)
                ele.style.color="#1890FF"
            }
            
        })
    }
    // Select the project 
    $scope.sa_docs = function (ele, val, event) {
        $scope.t_grid = []
        $scope.selected_sa_doc_id = ele;
        $scope.currentProjectId = ele;
        $scope.selected_sa_doc_value = val;
        console.log("ele sa_docs", $scope.selected_sa_doc_id, '\n', $scope.selected_sa_doc_value)
        $scope.t_grid.push($scope.selected_sa_doc_value)
        $timeout(function(){
            $scope.bredcrum()
        },500)
        $scope.project_show()
        $scope.get_brokers();
    }
    $scope.bch_slct = function (ele, val, event, ind) {
        // $scope.t_grid = []
        $scope.selected_bv_doc_id = val;
        $scope.selected_bv_doc_ind = ind;
        $scope.currentProjectId = ele;
        $scope.selected_bv_doc_value = val;
        $scope.dd_tabs("Tables/Elements")
        $scope.bv_tabs("Data/Documents")
        // $scope.prve_html_dd = "Tables/Elements"
        // $scope.prve_html_bv = "Data/Documents"
        $scope.revbc[2] = val
        // $scope.tst_doc_id_lst = $scope.tst_tbl_id_lst
        $scope.cachedLst['docid'+ind] = {
            ind: 0,
            inc: 20,
            size: 40,
            parent: $scope.tst_doc_id_lst[ind]['tbl_list'],
            loaded: $scope.tst_doc_id_lst[ind]['tbl_list'].slice(0, 40)
        }
        console.log("ele bch_slct", $scope.selected_bv_doc_id, '\n', $scope.selected_bv_doc_value)
        // $scope.t_grid.push($scope.selected_bv_doc_value)
        // $scope.project_show()
        // $scope.get_brokers();
    }
    $scope.dd_tabs = function (pos) {
        console.log("clicked action", pos)
        $scope.prve_html_dd = pos;
        if (pos == 'Data/Documents') {
            var project = document.querySelector('#nav-sb-tab div[data-bs-target="#nav-sb-batch"]')
            var firstTab = new bootstrap.Tab(project)

            firstTab.show()

        } else {
            var project = document.querySelector('#nav-sb-tab div[data-bs-target="#nav-sb-Document"]')
            var firstTab = new bootstrap.Tab(project)

            firstTab.show()

        }
    }
    $scope.bv_tabs = function (pos) {
        console.log("clicked action", pos)
        $scope.prve_html_bv = pos;
        if (pos == 'Batch') {
            var project = document.querySelector('#nav-right-tab div[data-bs-target="#nav-right-batch"]')
            var firstTab = new bootstrap.Tab(project)

            firstTab.show()

        } else {
            var project = document.querySelector('#nav-right-tab div[data-bs-target="#nav-right-Document"]')
            var firstTab = new bootstrap.Tab(project)
            $scope.cachedLst['docid'+$scope.selected_bv_doc_ind] = {
                ind: 0,
                inc: 20,
                size: 40,
                parent: $scope.tst_doc_id_lst[$scope.selected_bv_doc_ind]['tbl_list'],
                loaded: $scope.tst_doc_id_lst[$scope.selected_bv_doc_ind]['tbl_list'].slice(0, 40)
            }
            firstTab.show()

        }
    }
    $scope.bv_open = []
    $scope.bv_docs = function (ele, val, event, ind) {
        // $scope.t_grid = []
        $scope.selected_bv_doc_id = val;
        $scope.selected_bv_doc_ind = ind;
        $scope.currentProjectId = ele;
        $scope.selected_bv_doc_value = val;
        
        console.log('%cautomation.js line:564 ind', 'color: #007acc;', ind);
        if($scope.bv_open.includes(val)){
            $scope.bv_open.splice($scope.bv_open.indexOf(val), 1)
            delete $scope.cachedLst['docid'+ind]
        }
        else{
            $scope.bv_open.push(val)
            $scope.cachedLst['docid'+ind] = {
                ind: 0,
                inc: 20,
                size: 40,
                parent: $scope.tst_doc_id_lst[ind]['tbl_list'],
                loaded: $scope.tst_doc_id_lst[ind]['tbl_list'].slice(0, 40)
            }
            $('#bv_right')[0].scrollTo({
                top: $('#bv_right').children()[ind - 1].offsetTop,
                behavior: "smooth"
            });
        }
        console.log("ele bv_docs", $scope.selected_bv_doc_id, '\n', $scope.selected_bv_doc_value, $scope.bv_open, ele, val)
        // $scope.t_grid.push($scope.selected_bv_doc_value)
        // $scope.project_show()
        // $scope.get_brokers();
    }
    $scope.bv_open_doc = function (val) {
        $scope.selected_bv_tbl_id = val
    }
    // $scope.toggle_viewmore = (event, ind1, ind2, obj, val) => {
    // 	event.preventDefault();
    // 	obj[ind1].vm[ind2] = val
    // 	event.stopPropagation()
    // }
    $scope.doc_pg = (pg) => {
        if(pg == 'next'){
            $scope.selected_bv_doc_ind += 1
            $scope.selected_bv_doc_id = $scope.tst_doc_id_lst[$scope.selected_bv_doc_ind].k
        }
        else if(pg == 'prev'){
            $scope.selected_bv_doc_ind -= 1
            $scope.selected_bv_doc_id = $scope.tst_doc_id_lst[$scope.selected_bv_doc_ind].k
        }
    }
    $scope.findinobj = (obj, val) => {
        var res = obj.find(t=>t.k==val)
        // console.log('%cautomation.js line:335 obj, val, res', 'color: #007acc;', obj, val, res);
        return res
    }

    /***********************************/
    $scope.get_brokers = function () {
        var pd = { 'cmd_id': 21, 'project_id': $scope.selected_sa_doc_id, 'session_batch': sessionStorage['batch'] };
        console.log("get_brokers", pd)
        tasService.ajax_request(pd, 'POST', $scope.init_func_cl_bk);
    }
    /***********************************/
    $scope.init_func_cl_bk = function (res) {
        console.log('trig in init_func_cl_bk', res)
        $scope.brokers_list = [];
        if (res['message'] == 'done') {
            // console.log("brokers_list :", res['data'])
            $scope.brokers_list = res['data'];
            console.log('brokers_list', $scope.brokers_list, sessionStorage["batch"])
            return;
        }

        tasAlert.show('Error While retriveing Brokers', 'error');
    }
    /***********************************/
    var tree_cell = "<div class=\"ui-grid-cell-contents without_padding {0}\" tmp2=\"{{$index}}\"   ng-class=\"{'act_row': row.entity['cid'] == grid.appScope.gconfig['cid'], 'act_cell':(row.entity['cid']+'_'+ col.field) == grid.appScope.gconfig['uid'], 'ui-grid-chk-act':  row.entity['checked'] == 'Y', 'temcnt':  row.entity['color']}\"><div class=\"open_close\" ng-repeat=\"vt in  grid.appScope.range_arr(row['entity']['$$treeLevel']+1) track by $index\" >" +
        "<span ng-if=\"($last && (row.treeNode.children.length > 0))\" ng-click=\"grid.appScope.collspase_grid(row,$event);$event.stopPropagation();\" ng-class=\"{'fa fa-minus': ( ( grid.options.showTreeExpandNoChildren && row.treeLevel > -1 ) || ( row.treeNode.children && row.treeNode.children.length > 0 ) ) && row.treeNode.state === 'expanded', 'fa fa-plus': ( ( grid.options.showTreeExpandNoChildren && row.treeLevel > -1 ) || ( row.treeNode.children && row.treeNode.children.length > 0 ) ) && row.treeNode.state === 'collapsed'}\" style=\"color: #000;\"></span>" +
        "</div><div title=\"{{COL_FIELD['v']}}\" class=\"flo_lef {{COL_FIELD['cls']}}\" level=\"{{row.entity['$$treeLevel']}}\" style=\"width:calc(81% - {{(row['entity']['$$treeLevel']+1)*30}}px)\" ng-click=\"grid.appScope.grid_val_call(row['entity'],col,'HGH')\"> <span style=\"color:#4c70ab !important\" class=\"tree_leaf\"ng-bind-html=\"COL_FIELD['v']\"></span>{1}</div>" + `
        <div class="edit_opttre" style="display:block;float: right;">
           <div class="del_icon" title="Add Taxo" style="color:blue">
           <i class="feather icon-plus" ng-click="grid.appScope.gconfig.parent_scope.add_taxo_level(row,$event)"></i>
            </div>
            <div class="del_icon" title="Level" style="color:#2d97e3;">
            <i class="fa fa-level-up" aria-hidden="true" ng-click="grid.appScope.gconfig.parent_scope.taxo_level(row,$event)"></i>
        
            </div>
        <div class="edit_xt" ng-click="grid.appScope.gconfig.parent_scope.text_edit_popup_taxo_pop(row,$event);$event.stopPropagation();" title="Edit Taxo">
            <i class="feather icon-edit"></i>
        </div>
      </div>` +
        "</div>";
    /***********************************/
    // Texonomy or document_id
    $scope.get_docs = function (b) {
        $scope.sbt()
        $scope.t_grid=[]
        $scope.t_grid.push($scope.selected_sa_doc_value)
        $scope.t_grid.push(b['k'])
        console.log('trig in get_docs', b, $scope.get_docs.caller)
        $scope.project_drp = false;
        let ses = JSON.stringify(b)
        sessionStorage.setItem("batch_data", ses);
        $scope.bselcted = b;
        //b['checked'] = true;
        var pd = { 'cmd_id': 22, 'user_id': $scope.user, bid: b['k'], 'project_id': $scope.bselcted.pid, 'docids': 'ALL', 'sessiontaxo_api': sessionStorage['taxo_api'] };
        console.log('kvk pd', pd)
        tasService.ajax_request(pd, 'POST', $scope.cb_bids);
        $scope.filtr_list_ds = []
        $timeout(function(){
            $scope.bredcrum()
        },500)
    }
    $scope.cb_bids = function (res) {
        console.log("inside cb_bids:::", res);
        $scope.taxonomy_drp = res
        console.log(">>>>>>get_docs Taxo", res, 'taxonomy_drp', $scope.taxonomy_drp)
        if ('message' in res && res['message'] == 'done') {
            $scope.blf = '';
            //res['data'] = JSON.stringify({"4931067":"767"})
            var pdata = res['data'];
            console.log(">>>>>>get_docs Taxo", pdata.length)
            $scope.taxo_names_select = res['data']
            if (pdata.length == 0) {
                $scope.batchd = '';

                $scope.rset_grid_f('t_grid');
                $scope.referDoc.ref = [];
                $scope.referDocr.ref = [];
                $scope.referDoc.path = 'src/no_ref_found.html';
                $scope.referDocr.path = 'src/no_ref_found.html';
                $scope.referDoc.scope.iframe_page_no_change($scope.referDoc);
                $scope.referDocr.scope.iframe_page_no_change($scope.referDocr);
            }
            res['headers'][0]['ct'] = String.format(tree_cell, '', res['headers'][0]['ad'])
            $scope.t_grid['grid_coldef'] = res['headers'] || [];
            console.log("COL_DEF", $scope.t_grid['grid_coldef'])
            $scope.t_grid['grid_coldef'].unshift({ k: 'checkbox', n: '', v_opt: 3 }) //ASHWINI add_checkbox under taxotree
            $scope.t_grid['grid_data'] = pdata;
            $scope.t_grid['selected'] = {};
            $scope.t_grid['cid'] = '';
            $scope.t_grid['uid'] = $scope.t_grid['grid_data'][0]['cid'] + '_' + (res['headers'] || [{ 'k': '' }])[0]['k'];
            //$scope.t_grid['grid_data'][0]['checked'] = 'Y'
            $scope.t_grid.slt_taxo = $scope.t_grid['grid_data'][0].taxo
            res['headers'][0]['ct'] = String.format(tree_cell, '', res['headers'][0]['ad'])

            //
            $timeout(function () {
                $scope.t_grid.scope.init_grid($scope.t_grid);
                // $scope.get_doc_details();
            });
            $timeout(function () {
                $scope.level_txo = []
                $scope.t_grid['grid_data'].forEach(ele => {
                    // console.log("DATA", ele, ele.lval['v'])
                    $scope.level_txo.push(ele.lval['v'])
                })
                $timeout(function () {
                    console.log("$scope.Scroll_tgrid", $scope.Scroll_tgrid)
                    // $scope.t_grid.scope.grid_scrl_oper({ 'opr': 'scrl', 'r_idx': $scope.Scroll_tgrid, 'c_idx': '' }, $scope.t_grid);
                })
            })

        }
        console.log("$scope.t_grid['selected'] ", $scope.t_grid['selected'], "\n", $scope.t_grid['grid_data'][5], '\n', $scope.t_grid.slt_taxo)
    }
    $scope.select_a = function () {
        $scope.select_drp = !$scope.select_drp
    }
    // onselect of routine helight 
    $scope.Selectroutincheck = function (item, event) {
        var check = document.querySelectorAll('#CheckDefault')
        console.log("Data",check)
        check.forEach((ele,ind)=>{
            console.log("ele",ele.checked)
            if(!ele.checked){
                var dm = ele.parentNode.parentNode.parentNode
                dm.classList.remove('chckroutin');
            }else{
                var dm = ele.parentNode.parentNode.parentNode
                $(dm).closest("#card_helight").addClass('chckroutin');
            }
        })
        console.log("checkbox",item)
        $scope.checkhelightcard = item.checked

    }
    $scope.select_b = function () {
        $scope.tbl_drp = !$scope.tbl_drp
    }
    $scope.gridclick = (event) => {
        // event.preventDefault()
        // event.stopPropagation()
        alert('test')
    }
    var t = 'text'
    $scope.clicked = (params) => {
        console.log('%cHello grid_component.js line:15 ', 'background: green; color: white; display: block;', params);
        params.clicked(params.value)
    }
    // function rowSpan(params) {
    // 	var athlete = params.data ? params.data.athlete : undefined;
    // 	console.log('%cautomation.js line:758 params, athlete', 'color: #007acc;', params, athlete);
    // 	if (athlete === 'Michael Phelps') {
    // 	  // have all Russia age columns width 2
    // 	  return 2;
    // 	} else if (athlete === 'Ryan Lochte') {
    // 	  // have all United States column width 4
    // 	  return 4;
    // 	} else {
    // 	  // all other rows should be just normal
    // 	  return 1;
    // 	}
    //   }

    var columnDefs = [
        
        {
            field: 'cellRenderer',
            headerName: 'super cellRenderer',
            hide: true,
            editable: false,
             cellRenderer: () => 'Value is <i style="color: #b729a9">' + t + '<span><img src="src/images/chevron_right.svg" alt="chevron_right"></span></i>',
            
        },
        {
            headerName: 'super Col',
            hide: true,
            children: [
                {
                    headerName: 'super subCol',
                    children: [{ field: 'athlete',
                    // colSpan: (params) => {
                    // 	// console.log('%cautomation.js line:877 params', 'color: #007acc;', params, params.data.section);
                    // 	// if (isHeaderRow(params)) {
                    // 	//   return 6;
                    // 	// } else if (isQuarterRow(params)) {
                    // 	  return 2;
                    // 	// } else {
                    // 	//   return 1;
                    // 	// }
                    // 	},
                        // rowSpan: (params)=>{
                        // 	var athlete = params.data ? params.data.athlete : undefined;
                        // 	console.log('%cautomation.js line:758 params, athlete', 'color: #007acc;', params, athlete, athlete === 'Michael Phelps');
                        // 	if (athlete === 'Michael Phelps') {
                        // 	// have all Russia age columns width 2
                        // 	return 2;
                        // 	} else if (athlete === 'Ryan Lochte') {
                        // 	// have all United States column width 4
                        // 	return 4;
                        // 	} else {
                        // 	// all other rows should be just normal
                        // 	return 1;
                        // 	}
                        // },
                        type: 'editableColumn',
                        
                    },
                    { field: 'age', maxWidth: 100,cellRenderer: () => {
                        // put the value in bold
                        return '<span style="background-color: #b7e453"><img src="src/images/chevron_right.svg" alt="chevron_right" ></span></i>';
                    }, hide: true, colspan: 10,
                        cellDataType: 'number',
                        filter: 'agNumberColumnFilter',
                    }]
                },
                {
                    headerName: 'super subCol',
                    children: [
                        // { field: 'athlete' },
                        { field: 'age', maxWidth: 100,cellRenderer: (params) => {
                                // put the value in bold
                                return `<span style="width: 100%; background: #${((Math.abs(1000-(params.value*1+params.value*10)))+'000').substring(0, 3)}; color: white">${params.value?params.value:''}</span>`
                            }, cellDataType: 'number', filter: 'agNumberColumnFilter',
                            
                            // onCellClicked: (params)=>alert(params.colDef.field + ' is ' + params.value),
                        }],
                        
                },
            ],
            
        },
        {
            headerName: 'super Col 1 ', children: [
                {
                    headerName: 'super sub Col 1 ', children: [
                        {
                            field: 'date',
                            // filter: 'agDateColumnFilter',
                            
                        },
                        {
                            headerName: 'Super sub sub col1', children: [
                                {
                                    field: 'country',
                                    // rowSpan: rowSpan
                                    hide: true,
                                    colSpan: params => params.data.country === 'Russia' ? 2 : 1,
                                    
                                },
                            ],
                            
                        },
                        // { field: 'sport' }
                    ],
                    cellRenderer: () => {
                        // put the value in bold
                        return '<span style="background-color: #b7e453"><img src="src/images/chevron_right.svg" alt="chevron_right" ></span></i>';
                    },
                    
                },
                {
                    headerName: 'super sub2 Col 1 ', children: [
                        {
                            headerName: 'super sub sub col1', children: [
                                { field: 'sport',
                                 },
                                { 	field: 'country',
                                
                                    // rowSpan: (params)=>{
                                    // 	var country = params.data ? params.data.country : undefined;
                                    // 	console.log('%cautomation.js line:758 params, athlete', 'color: #007acc;', params, country);
                                    // 	if (country === 'United States') {
                                    // 	// have all Russia age columns width 2
                                    // 	return 2;
                                    // 	// } else if (country === 'Ryan Lochte') {
                                    // 	// // have all United States column width 4
                                    // 	// return 4;
                                    // 	} else {
                                    // 	// all other rows should be just normal
                                    // 	return 1;
                                    // 	}
                                    // },
                                },
                            ],
                            
                        }
                    ],
            hide: true,
            
        }
            ]


        },
        {
            headerName: 'super Col 2', children: [
                {
                    headerName: 'super sub Col 2', children: [{ field: 'gold',
                     },
                    { field: 'silver',
                     }]
                }
            ],
            
        },
        {
            headerName: 'super 3', children: [
                {
                    headerName: 'super sub 3', children: [
                        { field: 'bronze',
                         },
                        { field: 'total', filter: false, rowspan: 4,
                         },
                    ]
                },
                {headerName: 'super sub 3',children:[
                { field: 'bronze',
                 },
                ]}


            ],
            

        },
    ]
    var columnDefssingle = [
        {
            field: 'gold',
            headerName: 'super cellRenderer',
             // cellRenderer: () => 'Value is <i style="color: #b729a9">' + t + '<span><img src="src/images/chevron_right.svg" alt="chevron_right"></span></i>'
        },
        {
            field: 'athlete',
            colspan: 2,
            rowspan: 4,
            colSpan: (params) => {
                console.log('%cautomation.js line:877 params', 'color: #007acc;', params, params.data.section);
                // if (isHeaderRow(params)) {
                //   return 6;
                // } else if (isQuarterRow(params)) {
                  return 2;
                // } else {
                //   return 1;
                // }
              },
            rowSpan: (params)=>{
                var athlete = params.data ? params.data.athlete : undefined;
                console.log('%cautomation.js line:758 params, athlete', 'color: #007acc;', params, athlete, athlete === 'Michael Phelps');
                if (athlete === 'Michael Phelps') {
                // have all Russia age columns width 2
                return 1;
                } else if (athlete === 'Ryan Lochte') {
                // have all United States column width 4
                return 4;
                } else {
                // all other rows should be just normal
                return 2;
                }
            },
        },
        {
            field: 'age',
            // maxWidth: 100,
            cellRenderer: () => {
                // put the value in bold
                return '<span style="background-color: #b7e453" ng-click="agconfig.parent_scope.gridclick($event)"><img src="src/images/chevron_right.svg" alt="chevron_right" ></span></i>';
            }, cellDataType: 'number'
        },
        {
            headerName: 'super subCol',
            field: 'athlete',
        },
        {
            field: 'age',
            // maxWidth: 100,
            cellRenderer: (params) => {
                // put the value in bold
                return `<span style="width: 100%; background: #${1000-(params.value+params.value*10)}; color: white">${params.value}</span>`
            },
            onCellClicked: (params)=>alert(params.colDef.field + ' is ' + params.value),
            cellDataType: 'number'
        },
        {
            field: 'gold',
            headerName: 'super cellRenderer',
             // cellRenderer: () => 'Value is <i style="color: #b729a9">' + t + '<span><img src="src/images/chevron_right.svg" alt="chevron_right"></span></i>'
        },
        {
            field: 'athlete'
        },
        {
            field: 'age',
            // maxWidth: 100,
            cellRenderer: () => {
                // put the value in bold
                return '<span style="background-color: #b7e453" ng-click="agconfig.parent_scope.gridclick($event)"><img src="src/images/chevron_right.svg" alt="chevron_right" ></span></i>';
            },
            cellDataType: 'number'
        },
        {
            headerName: 'super subCol',
            field: 'athlete',
        },
        {
            field: 'age',
            // maxWidth: 100,
            cellRenderer: (params) => {
                // put the value in bold
                return `<span style="width: 100%; background: #${1000-(params.value+params.value*10)}; color: white">${params.value}</span>`
            },
            onCellClicked: (params)=>alert(params.colDef.field + ' is ' + params.value),
            cellDataType: 'number'
        },
        {
            field: 'gold',
            headerName: 'super cellRenderer',
             // cellRenderer: () => 'Value is <i style="color: #b729a9">' + t + '<span><img src="src/images/chevron_right.svg" alt="chevron_right"></span></i>'
        },
        {
            field: 'athlete'
        },
        {
            field: 'age',
            // maxWidth: 100,
            cellRenderer: () => {
                // put the value in bold
                return '<span style="background-color: #b7e453" ng-click="agconfig.parent_scope.gridclick($event)"><img src="src/images/chevron_right.svg" alt="chevron_right" ></span></i>';
            }
        },
        {
            headerName: 'super subCol',
            field: 'athlete',
        },
        {
            field: 'age',
            // maxWidth: 100,
            cellRenderer: (params) => {
                // put the value in bold
                return `<span style="width: 100%; background: #${1000-(params.value+params.value*10)}; color: white">${params.value}</span>`
            },
            onCellClicked: (params)=>alert(params.colDef.field + ' is ' + params.value),
        },
        {
            field: 'gold',
            headerName: 'super cellRenderer',
             // cellRenderer: () => 'Value is <i style="color: #b729a9">' + t + '<span><img src="src/images/chevron_right.svg" alt="chevron_right"></span></i>'
        },
        {
            field: 'athlete'
        },
        {
            field: 'age',
            // maxWidth: 100,
            cellRenderer: () => {
                // put the value in bold
                return '<span style="background-color: #b7e453" ng-click="agconfig.parent_scope.gridclick($event)"><img src="src/images/chevron_right.svg" alt="chevron_right" ></span></i>';
            }
        },
        {
            headerName: 'super subCol',
            field: 'athlete',
        },
        {
            field: 'age',
            // maxWidth: 100,
            cellRenderer: (params) => {
                // put the value in bold
                return `<span style="width: 100%; background: #${1000-(params.value+params.value*10)}; color: white">${params.value}</span>`
            },
            onCellClicked: (params)=>alert(params.colDef.field + ' is ' + params.value),
        },
    ]
    var headerClass = (row, col, rowspan) => {
        var style = document.createElement('style');
        // style.type = 'text/css';
        var classname = `header-row-span-${row}-${col}-${rowspan}`
        style.innerHTML = `.${classname} { position: fixed; top: ${40*row}px; height: ${40*rowspan}px; z-index: 10 }`;
        document.getElementsByTagName('head')[0].appendChild(style);
        return classname
    }
   
    var newColumnDefs = [
        {
            field: 'companyName',
            headerName: 'Company Name: TAS Private Limited',
            headerHeight: 50,
            headerClass: () => 'header-root',
            editable: false,
            // headerGroupComponent: headerGroupSelect,
            children: [
                {
                    field: 'label',
                    headerName: 'Label / Description',
                    headerGroupComponent:
                            `
                            <div ref="eLabel" class="ag-header-cell-label" style="display: flex">
                                <i class="feather icon-plus" style="cursor: pointer;float: right" onclick="angular.element('.ag-theme-alpine').scope().addColumn(this)"></i>
                            </div>
                            `,
                    
                    headerClass: headerClass(1, 0, 3),
                    children: [
                        {
                            field: 'Col1',
                            headerName: 'Current System Value',
                            minWidth: 600,
                            maxWidth: 600,
                            // valueGetter: (params) => {
                            //     console.log('%cgrid_componen    t.js line:1168 params', 'color: #007acc;', params);
                            //     return params.data.Col1 + ' ' + params.data.Col2;
                            //   },
                            // valueSetter: params => {
                            //     console.log('%cgrid_component.js line:1168 params', 'color: #007acc;', params);
                            //     params.data['Col1'] = 'sdfs';
                            //     return true;
                            // },
                            // filter: 'agSetColumnFilter',
                            // pinned: 'left'
                            // children: [
                            // 	{
                            // 		field: 'Col1',
                            // 		headerName: '(Currency, Units)',
                            // 	}
                            // ]
                            // onCellClicked: (params) => alert(params.value.v)
                        }
                    ]
                },
                {
                    field: 'b1',
                    headerName: 'Broker - 1',
                    children: [
                        {
                            field: 'b1d1',
                            headerName: 'Document - 1',
                            children: [
                                {
                                    field: "FY2011",
                                    headerName: "FY2011",
                                    children: [
                                        {
                                            field: 'Col2',
                                            // tooltipField: 'Col2',
                                            tooltipComponentParams: (params) => console.log('%cgrid_component.js line:1625 params', 'color: #007acc;', params),

                                            headerName: '2011',
                                        }
                                    ]
                                },
                                {
                                    field: "FY2012",
                                    headerName: "FY2012",
                                    children: [
                                        {
                                            field: 'Col3',
                                            // tooltipField: 'Col3',
                                            headerName: '2012',
                                        }
                                    ]
                                },
                                {
                                    field: "FY2013",
                                    headerName: "FY2013",
                                    children: [
                                        {
                                            field: 'Col4',
                                            // tooltipField: 'Col4',
                                            headerName: '2013',
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            field: 'b1d2',
                            headerName: 'Document - 2',
                            children: [
                                {
                                    field: "FY2014",
                                    headerName: "FY2014",
                                    children: [
                                        {
                                            field: 'Col5',
                                            // tooltipField: 'Col5',
                                            headerName: '2014',
                                        }
                                    ]
                                },
                                {
                                    field: "FY2015",
                                    headerName: "FY2015",
                                    children: [
                                        {
                                            field: 'Col6',
                                            // tooltipField: 'Col6',
                                            headerName: '2015',
                                        }
                                    ]
                                },
                                {
                                    field: "FY2016",
                                    headerName: "FY2016",
                                    children: [
                                        {
                                            field: 'Col7',
                                            // tooltipField: 'Col7',
                                            headerName: '2016',
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {
                    field: 'b2',
                    headerName: 'Broker - 2',
                    children: [
                        {
                            field: 'b2d1',
                            headerName: 'Document - 1',
                            children: [
                                {
                                    field: "FY2017",
                                    headerName: "FY2017",
                                    children: [
                                        {
                                            field: 'Col8',
                                            // tooltipField: 'Col8',
                                            headerName: '2017',
                                        }
                                    ]
                                },
                                {
                                    field: "FY2018",
                                    headerName: "FY2018",
                                    children: [
                                        {
                                            field: 'Col9',
                                            // tooltipField: 'Col9',
                                            headerName: '2018',
                                        }
                                    ]
                                },
                                {
                                    field: "FY2019",
                                    headerName: "FY2019",
                                    children: [
                                        {
                                            field: 'Col10',
                                            // tooltipField: 'Col10',
                                            headerName: '2019',
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            field: 'b2d2',
                            headerName: 'Document - 2',
                            children: [
                                {
                                    field: "FY2020",
                                    headerName: "FY2020",
                                    children: [
                                        {
                                            field: 'Col11',
                                            // tooltipField: 'Col11',
                                            headerName: '2020',
                                        }
                                    ]
                                },
                                {
                                    field: "FY2021",
                                    headerName: "FY2021",
                                    children: [
                                        {
                                            field: 'Col12',
                                            // tooltipField: 'Col12',
                                            headerName: '2021',
                                        }
                                    ]
                                },
                                {
                                    field: "FY2022",
                                    headerName: "FY2022",
                                    children: [
                                        {
                                            field: 'Col13',
                                            // tooltipField: 'Col13',
                                            headerName: '2022',
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                },
            ]
        },
    ]
    var columnDefs = [
        {
          headerName: 'Name',
          valueGetter: (params) => {
            return params.data.firstName + ' ' + params.data.lastName;
          },
          valueSetter: (params) => {
            console.log('%cautomation.js line:1432 params', 'color: #007acc;', params);
            const fullName = params.newValue;
            const nameSplit = fullName.split(' ');
            const newFirstName = nameSplit[0];
            const newLastName = nameSplit[1];
            const data = params.data;
      
            if (data.firstName !== newFirstName || data.lastName !== newLastName || 1) {
              data.firstName = newFirstName;
              data.lastName = newLastName;
              // return true to tell grid that the value has changed, so it knows
              // to update the cell
              return true;
            } else {
              // return false, the grid doesn't need to update
              return false;
            }
          },
        },
        {
          headerName: 'A',
          field: 'a',
        },
        {
          headerName: 'B',
          valueGetter: (params) => {
            return params.data.Col4;
          },
          valueSetter: (params) => {
            console.log('%cautomation.js line:1432 params', 'color: #007acc;', params);
            const newVal = params.newValue;
            const valueChanged = params.data.b !== newVal;
            if (1) {
              params.data.b = newVal;
            }
            return valueChanged;
          },
          cellDataType: 'number',
        },
        {
          headerName: 'C.X',
          valueGetter: (params) => {
            if (params.data.c) {
              return params.data.c.x;
            } else {
              return undefined;
            }
          },
          valueSetter: (params) => {
            const newVal = params.newValue;
            if (!params.data.c) {
              params.data.c = {};
            }
      
            const valueChanged = params.data.c.x !== newVal;
            if (valueChanged) {
              params.data.c.x = newVal;
            }
            return valueChanged;
          },
          cellDataType: 'number',
        },
        {
          headerName: 'C.Y',
          valueGetter: (params) => {
            if (params.data.c) {
              return params.data.c.y;
            } else {
              return undefined;
            }
          },
          valueSetter: (params) => {
            const newVal = params.newValue;
            if (!params.data.c) {
              params.data.c = {};
            }
      
            const valueChanged = params.data.c.y !== newVal;
            if (valueChanged) {
              params.data.c.y = newVal;
            }
            return valueChanged;
          },
          cellDataType: 'number',
        },
      ];
    $scope.fx = () => alert('fx')

    // defaultColDef = JSON.stringify(defaultColDef)
    function defaultStyle (params) {
            console.log('%cautomation.js line:1049 params', 'color: #007acc;', params);
            if (params.colDef === $scope.aggridconfig.selectedColumn) {
                return {'background-color': '#b7e4ff'};
            }
            return { color: '#abc' };
    }
    function defaultRenderer (params) {
            console.log('%cgrid_component.js line:60 params', 'color: #007acc;', params);
            if(params.value == 1)
                return `<span style="background: yellow">${params.value}</span>`
            return `<span style="width: 100%">${params.value}</span>`
    }
    function onSelectionChanged(param) {
        // const selectedRows = $scope?.aggridconfig?.gridOptions.api.getSelectedRows();
        $scope.selectedRows = param
        console.log('%cgrid_component.js line:196 selectedRows', 'color: #007acc;', param);
    }
    $scope.aggridconfig = {
        parent_scope: $scope,
        // rowData: griddata,
        slno: true,
        selectedRows: [],
        selectedColumn: [],
        selectedColumns: {},
        selectedCells: [],
        selection: [],
        focusedHeader: '',
        rangeSelectedCells: [],
        gridflg: true,
        // rangeSelectedCells: {
        // 	startColumn: {},
        // 	startRow: {},
        // 	endRow: {},
        // 	columns: [],
        // 	// data: []
        // },
        // sidebar: 'left',
        rowNo: 0,
        colSelect: 'multiple',
        colGroupSelect: 'multiple',
        
        type: 'tree',
        treeDefaultOpen: 1,
        // treeicon: {
        //     // open: `<img src="src/images/checkbox_selected_2.svg"></i>`,
        //     // close: `<img src="src/images/checkbox_unselected.svg"></i>`,
        //     open: `<i class="fa fa-chevron-right"></i>`,
        //     close: `<i class="fa fa-chevron-down"></i>`
        // },

        headerRowNo: 6,
        checkSelect: true,
        addRow: true,
        addDup: true,
        addCol: true,
        // delRow: true,
        merge: true,
        colourPallete: 'pblue',
        toolbarTabs: 0,
        filter: true,
        toolbar: true,
        // cellStyle: {
            // "id == 'gold'":  {'background-color': 'gold'},
            // "id == 'silver'":  {'background-color': 'silver'},
            // "id == 'bronze'":  {'background-color': ' #cd7f32'},
        // },
        // cellStyle: (id) => {
        // 	var style = {}
        // 	if(id == 'gold') {Object.assign(style, {'background-color': 'gold'})}
        // 	return style
        // },
        // col1: newColumnDefs[0].field,
        
        // gridOptions:{
            // columnDefs: columnDefs,
            // columnDefs: newColumnDefs,
            headerHeight: 40,
            // defaultColDef: defaultColDef,
            enableSorting: true,
            // enableColResize: true,
            // enableRangeSelection: true,
            // rowDragManaged: true,
            rowSelection: 'multiple',
            
            // rowData: getData(),
            // isExternalFilterPresent: () => true,
            // doesExternalFilterPass: function(rowNode) { 
            // 	// console.log('%cgrid_component.js line:233 rowNode', 'color: #007acc;', rowNode, rowNode.parent.allLeafChildren.find(ch=>ch.data.name==rowNode.data.parent).data.folded, rowNode.data.parent);
            // 	if($scope.agconfig.type == 'tree')
            // 		return rowNode.parent.allLeafChildren.find(ch=>ch.data?.name==rowNode.data?.parent).data?.folded || rowNode.data?.type == 'parent'
            // 	else return true
            // },
            // editType: 'fullRow',
            // editable: true,
            // columnTypes: {
            // 	editableColumn: {
            // 	  editable: (params) => {
            // 		// editable condition
            // 		return true
            // 	  },
            // 	//   cellStyle: (params) => {
            // 	// 	if (isCellEditable(params)) {
            // 	// 	  return { backgroundColor: 'lightBlue' };
            // 	// 	}
            // 	//},
            // 	}
            // }
        // },
        // defaultStyle: defaultStyle,
        // defaultRenderer: defaultRenderer
    }

    var columnDefs = [
        {
            field: 'Col1',
            headerName: 'Label / Description',
            // maxWidth: 100,
            flex: 3
        },
        {
            field: 'Col2',
            headerName: 'General Partner',
            flex: 1
        },
        {
            field: 'Col3',
            headerName: 'Limited Partner',
            flex: 1
        },
      ];
    $scope.aggridfig = {
        parent_scope: $scope,
        // slno: true,
        selectedRows: [],
        selectedColumn: [],
        selectedColumns: {},
        selectedCells: [],
        selection: [],
        rangeSelectedCells: [],
        focusedHeader: '',
        headerRowNo: 1,
        gridflg: true,
        rowNo: 0,
        colSelect: 'multiple',
        colGroupSelect: 'multiple',
        // headerRowNo: 6,
        // checkSelect: true,
        // addRow: true,
        // addDup: true,
        // addCol: true,
        // merge: true,
        filter: true,
        // colourPallete: 'pblue',
        toolbarTabs: 0,
        columnDefs: columnDefs,
        headerHeight: 40,
        enableSorting: true,
        rowSelection: 'multiple',
    }

    // $scope.a = Array(1).fill($scope.aggridconfig)
    // var pd = { 'post_path': '/read_sample' };
    // tasService.ajax_request(pd, 'GET', function (res) {
    //     console.log('%cautomation.js line:1626 res', 'color: #007acc;', res);
    //     $scope.aggridconfig['rowData'] = res.data
    //     $scope.aggridconfig.scope.initGrid()
    // });
    // fetch('http://172.16.20.120:3010/write_json?file=sample_data_tree.json')
    // .then((response) => response.json())
    // .then((data) => console.log('%cautomation.js line:1685 data', 'color: #007acc;', data))
    
    // $timeout(()=>{
        // fetch('http://172.16.20.120:3010/getip')
        // .then((response) => response.text())
        // .then((data) => console.log('%cautomation.js line:1579 data', 'color: #007acc;', data))

        if($scope.aggridconfig.type == 'tree')
            fetch('http://172.16.20.120:3010/read_sample?file=sample_data_tree_resurcive.json')
                .then((response) => response.json())
                .then((data) => $scope.aggridconfig.scope.updateGrid(data, newColumnDefs))
                // .then((data) => $scope.aggridconfig['rowData'] = /* Array(2866).fill */(data)/* .flat().slice(0, 1000) */)
                // .then((data) => console.log('%cautomation.js line:1685 data', 'color: #007acc;', data))
                .then(() => $scope.aggridconfig.scope.initGrid($scope.aggridconfig))
        else
            fetch('http://172.16.20.120:3010/read_sample?file=sample_data.json')
                .then((response) => response.json())
                .then((data) => $scope.aggridconfig.scope.updateGrid(data, newColumnDefs))
                // .then((data) => $scope.aggridconfig['rowData'] = /* Array(2866).fill */(data)/* .flat().slice(0, 1000) */)
                // .then((data) => console.log('%cautomation.js line:1685 data', 'color: #007acc;', data))
                .then(() => $scope.aggridconfig.scope.initGrid($scope.aggridconfig))
    // }, 100)


    // fetch('http://172.16.20.120:3008/read_sample?file=sample_data.json')
    //     .then((response) => {console.log('%cHello automation.js line:1627 before data', 'background: green; color: white; display: block;', new Date()); return response})
    //     .then((response) => response.json())
    //     // .then((data) => $scope.a.map(aa=>aa['rowData'] = Array(2866).fill(data).flat().slice(0, 1000))/* .splice(5, 5) */)//.map(d=>{return {v: d}})/* Array.from({length: 1000}, (a, i) => data).flat() */)
    //     .then((data) => $scope.aggridconfig['rowData'] = Array(2866).fill(data).flat().slice(0, 1000)/* .splice(5, 5) */)//.map(d=>{return {v: d}})/* Array.from({length: 1000}, (a, i) => data).flat() */)
    //     // .then((data) => console.log('%cautomation.js line:1621 data.map(d=>{return {v: d}}', 'color: #007acc;', data, data.map(d=>{return {v: d.v}})))
    //     .then(() => console.log('%cHello automation.js line:1627 got data, before grid', 'background: green; color: white; display: block;', new Date()))
    //     // .then(() => $scope.a.map(aa=>aa.scope.initGrid(aa)))
    //     .then(() => $scope.aggridconfig.scope.initGrid($scope.aggridconfig))
    //     .then(() => console.log('%cHello automation.js line:1627 after grid', 'background: green; color: white; display: block;', new Date()))

    // fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        // .then((response) => response.json())
        // .then((data) => $scope.aggridconfig['rowData'] = data)
        // .then(() => $scope.aggridconfig.scope.initGrid())
// function getData() {
//   var rowData = [];
//   var firstNames = ['Niall', 'John', 'Rob', 'Alberto', 'Bas', 'Dimple', 'Sean'];
//   var lastNames = [
//     'Pink',
//     'Black',
//     'White',
//     'Brown',
//     'Smith',
//     'Smooth',
//     'Anderson',
//   ];

//   for (var i = 0; i < 100; i++) {
//     rowData.push({
//       a: Math.floor(Math.random() * 100),
//       b: Math.floor(Math.random() * 100),
//       firstName: firstNames[i % firstNames.length],
//       lastName: lastNames[i % lastNames.length],
//       c: {
//         x: Math.floor(Math.random() * 100),
//         y: Math.floor(Math.random() * 100),
//       },
//     });
//   }

//   return rowData;
// }
    // $scope.aggridconfig.defaultStyle = function (params) {
    // 	if (params.colDef === $scope.aggridconfig.selectedColumn) {
    // 		return {'background-color': '#b7e4ff'};
    // 	}
    // 	return { color: '#415A83' };
    // }
    // $scope.aggridconfig.defaultRenderer = (params) => {
    // 	console.log('%cgrid_component.js line:60 params', 'color: #007acc;', params);
    // 	if(params.value == 1)
    // 		return `<span style="background: yellow">${params.value}</span>`
    // 	return `<span style="width: 100%">${params.value}</span>`
    // }

});
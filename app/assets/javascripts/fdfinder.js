;(function($){
    $.fn.fdfinder = function(opts) {

        //Ana Seçiciler
        var fdfinder = $(this);
        var fdfinder_selector = fdfinder.selector;
        var $body = $("body");

        //Selector Ayarı
        if(fdfinder_selector!="#fdfinder"){
            $(this).css({"margin":"0","padding":"0","display": "block","height": "100%","width": "100%"}).append('<div id="fdfinder"></div>');
            fdfinder = fdfinder.find("#fdfinder");
            fdfinder_selector = fdfinder.selector
        }

        // Varsayılan Metinler
        var i18n = {
            empty_dir               :   'Directory empty',
            empty_file              :   'File empty',
            loading                 :   'Loading...',
            file_size	            :	'File Size',
            file_name           	:	'File Name',
            file_cdate	            :	'File Created Date',
            faild_process	        :	'Failed to process',
            access_not_head		    :	'Access not permitted',
            access_not_content	    :	'Access not premitted, Administrator only',
            bottom_file			    :	'{0} File ( {1} )',
            load_directory	        :  	'Loading Directory',
            read_permission	        :	'Read Permission',
            write_permission        :	'Write Permission',
            read_write_permission	:	'Read/Write Permission',
            directory	            :	'Directory',

            error   :
            {
                large_file  	        :	'Error: File excess of a given permitted File Size {0}',
                error_type	            :	'File Types not permitted:\n {0}.',
                load_error	            :	'Load error: "{0}".',
                select_file_error	    :	'Select file Error.',
                error_msg	            :	'Unexpected error',
                download_error	        :	'Download error: "{0}" Olabilir. \n  Please check the file name, there may be duplicate error',
                copy_error	            :	'Copy error: "{0}".',
                replace_error           :   'Replace error: "{0}".',
                duplicate_error	        :	'Duplicate error: "{0}".',
                rename_error	        :	'Rename error: "{0}".',
                edit_error	            :	'Edit Error.',
                delete_error_0	        :	'File can not be deleted, file not accessible.',
                delete_error_1	        :  	'Delete Error: "{0}".',
                new_directory_error_1	:	'File/Directory name has been used',
                new_directory_error_0	:	'New Directory Error: "{0}".'
            },

            dialog  :
            {
                info_h	                :	'Information',
                info_size	            :	'Size:',
                info_addres	            :	'Address:',
                info_url	            :	'Link:',
                info_cdate          	:	'Created Date:',
                info_mdate	            :	'Last Modified Date:',
                info_file_permission	:	'File Permission:',
                preview_h	            :	'Preview',
                preview_size	        :	'Size:',
                preview_addres	        :	'Addres:',
                preview_url	            :	'Link:',
                preview_cdate	        :	'Created Date:',
                preview_mdate	        :	'Last Modified Date:',
                file_replace_h	        :	'File Replace',
                file_replace_content	:	'File already exist: "{0}" do you want to replace it?',
                cancel	                :	'Cancel',
                ok	                    :	'OK',
                close	                :	'Close',
                delete	                :	'Delete',
                delete_h	            :	'{0} Delete',
                delete_content	        :	'{0} Are you sure you want to delete permanently?',
                settings_h	            :	'Settings',
                settings_icon_view	    :	'Icon View',
                settings_list_view	    :	'List View',
                settings_show_size	    :	'Show File Size',
                settings_show_date	    :	'Show File Created Date',
                sorter_h	            :	'Sorting',
                sorter_name	            :	'Sort by Name',
                sorter_size	            :	'Sort by Size',
                sorter_date	            :	'Sort by Date',
                sorter_kind	            :	'Sort by Type'
            },

            contextmenu :
            {
                file_open	        :	'Open',
                file_preview	    :	'Preview',
                file_download	    :   'Download',
                file_copy	        :	'Copy',
                file_cut	        :	'Cut',
                file_duplicate	    :	'Duplicate',
                file_rename	        :	'Rename',
                file_delete	        :   'Delete',
                file_info	        :	'Info',
                wrapper_paste	    :	'Paste',
                wrapper_list_view	:	'List View',
                wrapper_icon_view	:	'Icon View',
                wrapper_upload	    :	'File Upload',
                wrapper_newfolder	:	'Yeni Directory',
                wrapper_refresh	    :	'Refresh',
                wrapper_show_size	:	'Show / Hide Size',
                wrapper_show_date	:	'Show / Hide Date',
                wrapper_namesorter	:	'Sort By Name',
                wrapper_sizesorter	:	'Sort By Size',
                wrapper_datesorter	:	'Sory By Date',
                wrapper_kindsorter	:	'Sort By Type'
            },

            widget_menu	:
            {
                up_folder	:	'Üst Klasor',
                upload		:	'Upload',
                new_folder	:	'Yeni Klasor',
                refresh		:	'Refresh',
                download	:	'Download',
                info		:	'Info',
                preview		:	'Preview',
                edit		:	'Edit',
                copy		:	'Copy',
                cut			:	'Cut',
                paste		:	'Paste',
                duplicate	:	'Duplicate',
                rename		:	'Rename',
                delete		:	'Delete',
                settings	:	'Ayarlar',
                icon_view	:	'Icon View',
                list_view	:	'List View',
                show_size	:	'Size Göster',
                show_date	:	'Created Date Göster',
                sort		:	'Sırala',
                name_sorter	:	'Sort By Name',
                size_sorter	:	'Sort By Size',
                date_sorter	:	'Sory By Date',
                kind_sorter	:	'Sort By Type',
                about		:	'About'
            }
        };


        //Dil Seçimi
        if (typeof(opts.i18n)=="object"){
            opts.i18n = fnc.merge_options(i18n,opts.i18n);
        }else {opts.i18n = i18n; }


        //Cookies Objesi
        var Cookies = {
            setCookie : function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays*1000));
                var expires = "expires="+d.toUTCString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
            },

            getCookie :function (cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i=0; i<ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1);
                    if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
                }
                return "";
            }

        };


        //Sabit Fonksiyonlar Objesi
        var fnc =   {
            ajax_fnc    :   {

            },
            //fnc.prepend_dialog(opts.i18n.access_not_head,opts.i18n.access_not_content,{type:"p",dialog_class:'noclose danger',scope_class:'noclose'});
            prepend_dialog  :   function(head,content,opt){
                opt = opt || {};
                opt.scope_class = typeof (opt.scope_class)==="undefined" ? "" : " "+opt.scope_class;
                opt.dialog_class = typeof (opt.dialog_class)==="undefined" ? "" : " "+opt.dialog_class;
                var html = '<div class="dialog-scope'+opt.scope_class+'"></div><div style="display:none;" class="dialog'+opt.dialog_class+'"><h1>'+head+'</h1>';
                if (opt.type=="p"){html += '<p>'+content+'</p>'; }
                html += '</div>';
                fdfinder.prepend(html);
                fdfinder.find(".dialog").fadeIn(300);
                fdfinder.find(".dialog").ortala();
            },

            ripleClick  :   function (_class)
            {
                var ink, d, x, y;
                $body.on("click",_class,function(e){
                    if($(this).find(".ink").length === 0){
                        $(this).prepend("<span class='ink'></span>");
                    }
                    ink = $(this).find(".ink");
                    ink.removeClass("animate");
                    if(!ink.height() && !ink.width()){
                        d = Math.max($(this).outerWidth(), $(this).outerHeight());
                        ink.css({height: d, width: d});
                    }
                    x = e.pageX - $(this).offset().left - ink.width()/2;
                    y = e.pageY - $(this).offset().top - ink.height()/2;
                    ink.css({top: y+'px', left: x+'px'}).addClass("animate");
                    setTimeout(function(){ ink.remove(); fdfinder.find("span.ink").remove(); },600);
                });
            },

            merge_options   :   function(obj1,obj2){
                var obj3 = {};
                for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
                for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
                return obj3;
            },

            fdfinderresize  :   function()
            {
                fdfinder.find(".right").width(fdfinder.width()-fdfinder.find(".left").width()-15);
                fdfinder.find(".right .wrapper , .right .widget").width(fdfinder.find(".right").width()-10);
                fdfinder.find(".right").children(".wrapper").height(($body.height()-fdfinder.find(".widget").height())-43);
                fdfinder.find(".left").height($body.height()-35);
            },

            appendFiles :   function(data,type){
                type = type || "";
                if (type==""){
                    var element =ul_wrapper.find(".file_wrapper:last");
                }
                else{var element =type;}

                $.each(data.file,function(key,val){
                    var _style_type = "";
                    if (val.type == "image_file") { _style_type = "style=\"background:url('//"+val.url.replace("uploads","uploads/.thumbs")+"') no-repeat center 5px / 65% 60px \"";  }
                    element.append('<div '+_style_type+' data-kind="'+val.type+'" data-date="'+val.ctime+'" data-size="'+val.size+'" data-size_2="'+val.size_2+'" data-name="'+key+'" data-path="'+val.path+'" class="'+val.type+'"><span class="file_name">'+key+'</span><span class="file_size"'+is_show_size+'>'+val.size+'</span><span class="file_date"'+is_show_date+'>'+val.ctime+'</span></div>');
                });


                if (is_show_date == " style=\"display:block;\"" ){fdfinder.find(".right ul.wrapper li div").height(80+32+10);}
                if (is_show_size == " style=\"display:block;\"" ){fdfinder.find(".right ul.wrapper li div").height(80+16+10);}
                if (is_show_date == " style=\"display:block;\"" && is_show_size ==  " style=\"display:block;\"" ){fdfinder.find(".right ul.wrapper li div").height(80+16+32+10);}

            },

            getUrlParam :   function(paramName) {
                var reParam = new RegExp('(?:[\?&]|&)' + paramName + '=([^&]+)', 'i') ;
                var match = window.location.search.match(reParam) ;

                return (match && match.length > 1) ? match[1] : '' ;
            },

            sortable    :   function(type)
            {
                if (type=="name"){ fdfinder.find(".right ul.widget li a.name_sorter").removeClass("z_a").removeClass("a_z").trigger('click'); }
                if (type=="size"){ fdfinder.find(".right ul.widget li a.size_sorter").removeClass("z_a").removeClass("a_z").trigger('click'); }
                if (type=="date"){ fdfinder.find(".right ul.widget li a.date_sorter").removeClass("z_a").removeClass("a_z").trigger('click'); }
                if (type=="kind"){ fdfinder.find(".right ul.widget li a.kind_sorter").removeClass("z_a").removeClass("a_z").trigger('click'); }
            },

            toDate  :   function(date)
            {
                if (date!=null)
                {
                    var a = date.split("/");
                    return Date.parse(a[1]+"/"+a[0]+"/"+a[2]);
                }
            },

            toInt   :   function (size)
            {
                if (size!=null)
                {
                    return parseInt(size);
                }
            }

        };






        // Cookies Tanımlamaları
        Cookies.getCookie("fdfinder_size_show")==""?Cookies.setCookie("fdfinder_size_show","false",60*60*24*365):'';
        Cookies.getCookie("fdfinder_date_show")==""?Cookies.setCookie("fdfinder_date_show","false",60*60*24*365):'';
        Cookies.getCookie("fdfinder_sortable")==""?Cookies.setCookie("fdfinder_sortable","kind",60*60*24*365):'';
        Cookies.getCookie("fdfinder_view_type")==""?Cookies.setCookie("fdfinder_view_type","icon",60*60*24*365):'';



        //HTML'yi Upload
	fdfinder.append('<div class="left"><div id="all_folders">'+
        '<ul class="folders">'+
        '<li><a><span class="folder">'+opts.i18n.loading+'<span class="load"></span></span>'+
        '</a></li>'+
        '</div></div>'+
        '<div class="right">'+
        '<ul class="widget">'+
        '<li><a href="fdfinder:up" title="'+opts.i18n.widget_menu.up_folder+'" class="up_folder passive">'+opts.i18n.widget_menu.up_folder+'</a></li>'+
        '<li><a title="'+opts.i18n.widget_menu.upload+'" class="upload">'+
        '<form style="opacity:0;" id="file_upload" method="post" action="" enctype="multipart/form-data">'+
        '<input class="upload_field" name="fdfinder[upload][]" style="height:31px" multiple="multiple" type="file">'+
        '<input name="fdfinder[type]" value="upload" type="hidden">'+
        '<input name="fdfinder[path]" value="" type="hidden">'+
        '</form>'+
        '</a></li>'+
        '<li><a href="fdfinder:newfolder" title="'+opts.i18n.widget_menu.new_folder+'" class="new_folder">'+opts.i18n.widget_menu.new_folder+'</a></li>'+
        '<li><a href="fdfinder:refresh" title="'+opts.i18n.widget_menu.refresh+'" class="refresh">'+opts.i18n.widget_menu.refresh+'</a></li>'+
        '<li><a href="" title="'+opts.i18n.widget_menu.download+'" class="download passive">'+opts.i18n.widget_menu.download+'</a></li>'+
        '<li><a href="fdfinder:info" title="'+opts.i18n.widget_menu.info+'" class="info passive">'+opts.i18n.widget_menu.info+'</a><div>'+
        '<ul>'+
        '<li><a href="fdfinder:preview" title="'+opts.i18n.widget_menu.preview+'" class="preview passive">'+opts.i18n.widget_menu.preview+'</a></li>'+
        '</ul>'+
        '</div></li>'+
        '<li><a href="fdfinder:edit" title="'+opts.i18n.widget_menu.edit+'" class="edit passive">'+opts.i18n.widget_menu.edit+'</a><div>'+
        '<ul>'+
        '<li><a href="fdfinder:copy" title="'+opts.i18n.widget_menu.copy+'" class="copy passive">'+opts.i18n.widget_menu.copy+'</a></li>'+
        '<li><a href="fdfinder:cut" title="'+opts.i18n.widget_menu.cut+'" class="cut passive">'+opts.i18n.widget_menu.cut+'</a></li>'+
        '<li><a href="fdfinder:paste" title="'+opts.i18n.widget_menu.paste+'" class="paste passive">'+opts.i18n.widget_menu.paste+'</a></li>'+
        '<li><a href="fdfinder:duplicate" title="'+opts.i18n.widget_menu.duplicate+'" class="duplicate passive">'+opts.i18n.widget_menu.duplicate+'</a></li>'+
        '<li><a href="fdfinder:rename" title="'+opts.i18n.widget_menu.rename+'" class="rename passive">'+opts.i18n.widget_menu.rename+'</a></li>'+
        '<li><a href="fdfinder:edit" title="'+opts.i18n.widget_menu.edit+'" class="edit passive">'+opts.i18n.widget_menu.edit+'</a></li>'+
        '</ul>'+
        '</div></li>'+
        '<li><a href="fdfinder:delete" title="'+opts.i18n.widget_menu.delete+'" class="delete passive">'+opts.i18n.widget_menu.delete+'</a></li>'+
        '<li><a href="fdfinder:settings" title="'+opts.i18n.widget_menu.settings+'" class="settings">'+opts.i18n.widget_menu.settings+'</a><div>'+
        '<ul>'+
        '<li><a href="fdfinder:iconview" title="'+opts.i18n.widget_menu.icon_view+'" class="icon_view">'+opts.i18n.widget_menu.icon_view+'</a></li>'+
        '<li><a href="fdfinder:listview" title="'+opts.i18n.widget_menu.list_view+'" class="list_view">'+opts.i18n.widget_menu.list_view+'</a></li>'+
        '<li><a data-show="'+Cookies.getCookie("fdfinder_size_show")+'" href="fdfinder:showsize" title="'+opts.i18n.widget_menu.show_size+'" class="show_size">'+opts.i18n.widget_menu.show_size+'</a></li>'+
        '<li><a data-show="'+Cookies.getCookie("fdfinder_date_show")+'" href="fdfinder:showdate" title="'+opts.i18n.widget_menu.show_date+'" class="show_date">'+opts.i18n.widget_menu.show_date+'</a></li>'+
        '</ul>'+
        '</div></li>'+
        '<li><a href="fdfinder:sorting" title="'+opts.i18n.widget_menu.sort+'" class="sort">'+opts.i18n.widget_menu.sort+'</a><div>'+
        '<ul>'+
        '<li><a href="fdfinder:namesorter" title="'+opts.i18n.widget_menu.name_sorter+'" class="name_sorter">'+opts.i18n.widget_menu.name_sorter+'</a></li>'+
        '<li><a href="fdfinder:sizesorter" title="'+opts.i18n.widget_menu.size_sorter+'" class="size_sorter">'+opts.i18n.widget_menu.size_sorter+'</a></li>'+
        '<li><a href="fdfinder:datesorter" title="'+opts.i18n.widget_menu.date_sorter+'" class="date_sorter">'+opts.i18n.widget_menu.date_sorter+'</a></li>'+
        '<li><a href="fdfinder:kindsorter" title="'+opts.i18n.widget_menu.kind_sorter+'" class="kind_sorter">'+opts.i18n.widget_menu.kind_sorter+'</a></li>'+
        '</ul>'+
        '</div></li>'+
        '<li><a href="fdfinder:settings" title="'+opts.i18n.widget_menu.about+'" class="about">'+opts.i18n.widget_menu.about+'</a></li>'+
        '</ul>'+
        '<ul class="wrapper">'+
        '<li>'+opts.i18n.loading+'<span class="load"></span></li>'+
        '</ul>'+
        '</div>'+
        '<div class="clear"></div>'+
        '<ul class="bottom">'+opts.i18n.loading+'<span class="load"></span></ul>');

        //Görünüm Tipini Seç
        if (Cookies.getCookie("fdfinder_view_type")=="icon"){
            fdfinder.find(".right ul.widget li a.icon_view").addClass("passive");
            fdfinder.find(".right ul.wrapper").addClass("icon_view");
        }
        else{
            fdfinder.find(".right ul.widget li a.list_view").addClass("passive");
            fdfinder.find(".right ul.wrapper").addClass("list_view");
        }



        //File Size ve Date Görünüyormu
        var is_show_size = Cookies.getCookie("fdfinder_size_show")=="true"?" style=\"display:block;\"":"";
        var is_show_date = Cookies.getCookie("fdfinder_date_show")=="true"?" style=\"display:block;\"":"";




        //Çok Kullanılan Elementler
        var ul_folders = fdfinder.children(".left").children("#all_folders").children("ul.folders");
        var ul_wrapper = fdfinder.children(".right").children("ul.wrapper");



        //Dosyaları Upload
        $.ajax({url:opts.url,dataType:'json',type:'POST',success:function(_data) {
            //İzin Yoksa Hata Ver
            if (_data == "Access not allowed!") {

                fnc.prepend_dialog(opts.i18n.access_not_head,opts.i18n.access_not_content,{type:"p",dialog_class:'noclose danger',scope_class:'noclose'});
                fdfinder.find(".left #all_folders").html("");
                fdfinder.find(".right ul.wrapper").html("");
                fdfinder.find("ul.bottom").html("");
            }
            else{
                //İzin Varsa Dosyaları Upload
                if (fdfinder.find("ul.bottom li[data-path='fcdir:/']").size()===0){
                    fdfinder.find("ul.bottom").html("").append('<li data-path="fcdir:/">'+opts.i18n.bottom_file.format(_data[1],_data[2])+'</li>');}
                var data = _data[0];
                var main_file_path = data.main_file.path;

                var main_class = data.main_file.sub_dir ? " opened " : " ";
                ul_folders.html("").append('<li><a id="true" href="fcdir:/" data-show="true" class="active">' +
                '<span class="braca'+main_class+'"></span>'+
                '<span class="folder">'+main_file_path+'</span>'+
                '</a></li>');

                if($.isEmptyObject(data.directory) &&  $.isEmptyObject(data.file))
                {
                    ul_wrapper.html("").append('<li class="file_wrapper" data-show="true" data-path="fcdir:/">'+opts.i18n.empty_file+'</li>');
                }else
                {
                    ul_wrapper.html("").append('<li class="file_wrapper" data-show="true" data-path="fcdir:/"></li>');
                }

                ul_folders.children("li").append('<ul class="folders"></ul>');


                $.each(data.directory,function(key,val){
                    ul_wrapper.find(".file_wrapper:first").append('<div data-path="'+val.path+'" data-name="'+key+'" data-size="'+val.size+'" data-size_2="'+val.size_2+'" data-date="'+val.ctime+'" data-kind="'+val.type+'" class="directory"><span class="file_name">'+key+'</span><span class="file_size"'+is_show_size+'>'+val.size+'</span><span class="file_date"'+is_show_date+'>'+val.ctime+'</span></div>');

                    var ths_cls = val.sub_dir? " closed " : "";
                    ul_folders.children("li").children("ul.folders").append('<li><a href="'+val.path+'">'+
                    '<span class="braca'+ths_cls+'"></span>'+
                    '<span class="folder">'+key+'</span>'+
                    '</a></li>');
                });
                fnc.appendFiles(data);
                fnc.sortable(Cookies.getCookie("fdfinder_sortable"));
                if (Cookies.getCookie("fdfinder_view_type")=="list"){fdfinder.find(".right ul.wrapper li[data-show='true']").prepend('<div class="list_head"><span class="file_name">'+opts.i18n.file_name+'</span><span class="file_size">'+opts.i18n.file_size+'</span><span class="file_date">'+opts.i18n.file_cdate+'</span></div>');}
                if (fdfinder.find(".left #all_folders ul.folders li a.active").attr("href")!="fcdir:/"){ fdfinder.find(".right ul.widget li a.up_folder").removeClass("passive");}
                else{fdfinder.find(".right ul.widget li a.up_folder").addClass("passive");}
            }


        }});



        //Upload İnputu Seçilince Formu Submit Et
        $body.on("change",fdfinder_selector+" input.upload_field",function(){
            fdfinder.find("input[name='fdfinder[path]']").val(fdfinder.find(".left #all_folders ul li a.active").attr("href"));
            $(this).closest('form').trigger('submit');
        });




        //Form Submit Ediliyor
        $body.on("submit",fdfinder_selector+" form#file_upload",function(){
            var formData = new FormData(this);
            $.ajax({url:opts.url,dataType:'json',processData: false,contentType: false,type:'POST',data:formData,
                xhr: function () {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            if (fdfinder.find("#progress").length === 0) {
                                fdfinder.prepend($("<div><dt/><dd/></div>").attr("id", "progress"));
                            }
                            fdfinder.find("#progress").css({width: percentComplete * 100 + '%'});
                            if (percentComplete === 1) {
                                fdfinder.find("#progress").width("101%").delay(100).fadeOut(300, function() {
                                    $(this).remove();
                                });
                            }
                        }
                    }, false);
                    xhr.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            fdfinder.find('#progress').css({
                                width: percentComplete * 100 + '%'
                            });
                        }
                    }, false);
                    return xhr;
                },
                success:function(data) {
                    if (data[0]=="true"){
                        fdfinder.find(".right ul.widget li a.refresh").trigger("click");
                    }else{
                        if (data[1]=="0"){
                            fnc.prepend_dialog(opts.i18n.faild_process,opts.i18n.error.large_file.format(data[2]),{type:"p",dialog_class:'danger'});
                        }
                        if (data[1]=="-1"){
                            var txt = [];
                            $.each(data[2],function(k,v){
                                txt.push(v[0]);
                            });
                            fnc.prepend_dialog(opts.i18n.faild_process,opts.i18n.error.error_type.format(txt.join(", ")),{type:"p",dialog_class:'danger'});
                        }
                        else{
                            fnc.prepend_dialog(opts.i18n.faild_process,opts.i18n.error.load_error.format(data[2]),{type:"p",dialog_class:'danger'});
                        }
                    }
                }
            });

            //upload_files
            return false;
        });


        //Dosyalar Çift Tıklandığında (Seçilme İşlemi)
        $body.on("dblclick",fdfinder_selector+" .right ul.wrapper li div",function(){
            var path = $(this).attr("data-path");
            if (fdfinder.find(".left #all_folders ul.folders li a[href='"+path+"']").size()>0){
                fdfinder.find(".left #all_folders ul.folders li a[href='"+path+"']").trigger("click");
            }else{
                var data = 'fdfinder[path]='+path+'&fdfinder[type]=path_to_url';
                $.ajax({url:opts.url,dataType:'json',type:'POST',data:data,success:function(data) {
                    if (data[0]=="true"){ var url = "//"+data[1];
                        //CKEditor ise
                        var funcNum = fnc.getUrlParam('CKEditorFuncNum');
                        if (funcNum>0)
                        {
                            window.opener.CKEDITOR.tools.callFunction(funcNum, url);
                            window.close();
                        }else
                        {
                            //Değilse getFileCallback Fonksiyonunu Çağır
                            if (typeof (opts.getFileCallback) == "function" && opts.getFileCallback)
                            {
                                opts.getFileCallback(url);
                            }
                        }
                    }
                    else{
                        fnc.prepend_dialog(opts.i18n.faild_process,opts.i18n.error.select_file_error,{type:"p",dialog_class:'danger'});
                    }
                }});
            }
            if (fdfinder.find(".left #all_folders ul.folders li a.active").attr("href")!="fcdir:/"){ fdfinder.find(".right ul.widget li a.up_folder").removeClass("passive");}
            else{fdfinder.find(".right ul.widget li a.up_folder").addClass("passive");}
        });




        //Directory Ağacından Directory Seçildiğinde
        $body.on("click",fdfinder_selector+" ul.folders a",function(){
            var ths = $(this);
            var url = ths.attr("href");
            var id = ths.attr("id");
            var data_path = ths.attr("href");


            fdfinder.find(".right ul.wrapper li.file_wrapper").attr("data-show","false").hide();
            fdfinder.find(".right ul.wrapper li.file_wrapper[data-path='" + data_path + "']").attr("data-show","true").show();
            fdfinder.find("ul.folders li a").removeClass("active");
            ths.addClass("active").attr("data-show","true");
            fdfinder.find("ul.bottom li").hide();
            fdfinder.find("ul.bottom li[data-path='"+url+"']").show();



            if (id!="true" && id!="false"){

                if (ths.children("span.braca").hasClass("closed")){
                    ths.children("span.braca").removeClass("closed").addClass("opened");
                }

                ths.parent("li").append('<span class="folder_load">'+opts.i18n.load_directory+'</span>');

                var data = 'fdfinder[url]='+url+'&fdfinder[type]=all_file_list';
                $.ajax({url:opts.url,dataType:'json',type:'POST',data:data,success:function(_data) {

                    if (fdfinder.find("ul.bottom li[data-path='"+url+"']").size()===0){
                        fdfinder.find("ul.bottom").append('<li data-path="'+url+'">'+opts.i18n.bottom_file.format(_data[1],_data[2])+'</li>');}
                    else { fdfinder.find("ul.bottom li").hide(); fdfinder.find("ul.bottom li[data-path='"+url+"']").show();}

                    var data = _data[0];
                    if (!$.isEmptyObject(data.directory))
                    {
                        ths.parent("li").append("<ul class=\"folders\"></ul>");
                        $.each(data.directory,function(key,val){
                            var ths_cls = val.sub_dir? " closed " : "";
                            ths.parent("li").children("ul.folders").append('<li><a href="'+val.path+'">'+
                            '<span class="braca '+ths_cls+'"></span>'+
                            '<span class="folder">'+key+'</span>'+
                            '</a></li>');
                        });
                    }

                    if ($.isEmptyObject(data.directory) && $.isEmptyObject(data.file))
                    {
                        fdfinder.find(".right ul.wrapper li.file_wrapper").hide();
                        if (ul_wrapper.find("li.file_wrapper[data-path='"+data_path+"']").size()=="0"){
                            ul_wrapper.append('<li class="file_wrapper" data-show="true" data-path="'+data_path+'">'+opts.i18n.empty_dir+'</li>').show();
                        }else{
                            ul_wrapper.find("li.file_wrapper[data-path='"+data_path+"']").show();
                        }
                        ths.removeAttr("id").removeAttr("data-show");
                    }else {
                        fdfinder.find(".right ul.wrapper li.file_wrapper").hide();
                        if (ul_wrapper.find("li.file_wrapper[data-path='"+data_path+"']").size()=="0"){
                            ul_wrapper.append('<li class="file_wrapper" data-show="true" data-path="'+data_path+'"></li>').show();
                        }else{
                            ul_wrapper.find("li.file_wrapper[data-path='"+data_path+"']").show();
                        }

                        if (ul_wrapper.find(".file_wrapper:last").html()!=""){ul_wrapper.find(".file_wrapper:last").html("");}
                        $.each(data.directory,function(key,val){
                            ul_wrapper.find(".file_wrapper:last").append('<div data-path="'+val.path+'" data-name="'+key+'" data-size="'+val.size+'" data-size_2="'+val.size_2+'" data-kind="'+val.type+'" data-date="'+val.ctime+'" class="directory"><span class="file_name">'+key+'</span><span class"file_size"'+is_show_size+'>'+val.size+'</span><span class="file_date"'+is_show_date+'>'+val.ctime+'</span></div>');
                        });

                        fnc.appendFiles(data);
                        fnc.sortable(Cookies.getCookie("fdfinder_sortable"));
                        if (Cookies.getCookie("fdfinder_view_type")=="list"){fdfinder.find(".right ul.wrapper li[data-show='true']").prepend('<div class="list_head"><span class="file_name">'+opts.i18n.file_name+'</span><span class="file_size">'+opts.i18n.file_size+'</span><span class="file_date">'+opts.i18n.file_cdate+'</span></div>');}
                    }

                    ths.next("span.folder_load").remove();

                }});
                ths.attr("id","true");
            }

            if (fdfinder.find(".left #all_folders ul.folders li a.active").attr("href")!="fcdir:/"){ fdfinder.find(".right ul.widget li a.up_folder").removeClass("passive");}
            else{fdfinder.find(".right ul.widget li a.up_folder").addClass("passive");}
            return false;
        });


        //Dosyaya yada Directorye Tıklandığında
        $body.on("click",fdfinder_selector+" .right ul.wrapper li div",function(){
            var ths = $(this);
            if (ths.attr("class")!="list_head"){
                fdfinder.find(".right ul.wrapper li div").removeClass("active");
                ths.addClass("active");

                if (fdfinder.find("ul.bottom li[data-name='"+ths.attr("data-path")+"']").size()===0){
                    fdfinder.find("ul.bottom li").hide();
                    fdfinder.find("ul.bottom").append('<li style="display:block;" data-name="'+ths.attr("data-path")+'">'+ths.attr("data-name")+' ( '+ths.attr("data-size")+', '+ths.attr("data-date")+' )</li>');}
                else { fdfinder.find("ul.bottom li").hide(); fdfinder.find("ul.bottom li[data-name='"+ths.attr("data-path")+"']").show();}

                if (fdfinder.find(".right ul.wrapper li div.active").attr("data-new")!="new_folder")
                {if (fdfinder.find(".right ul.wrapper li div.active").attr("data-kind")=="image_file"){fdfinder.find(".right ul.widget li a.edit").removeClass("passive"); }
                    fdfinder.find(".right ul.widget li a.download , " +
                    ".right ul.widget li a.info , " +
                    ".right ul.widget li a.preview , " +
                        //".right ul.widget li a.edit , " +
                    ".right ul.widget li a.copy , " +
                    ".right ul.widget li a.cut , " +
                        //".right ul.widget li a.paste  , " +
                    ".right ul.widget li a.duplicate , " +
                    ".right ul.widget li a.rename , " +
                    ".right ul.widget li a.delete").removeClass("passive");
                }
            }

        });

        //Directory Ağacında Artı yada Eksiye Basıldığında
        $body.on("click",fdfinder_selector+' .left #all_folders ul.folders li a span.braca',function(){

            var ths = $(this);
            var _ths = $(this).parent("a");
            var id = _ths.attr("id");


            if (id=="true"){
                _ths.next("ul.folders").hide();
                _ths.attr("id","false");


            }
            else if(id=="false"){
                _ths.next("ul.folders").show();
                _ths.attr("id","true");

            }


            fdfinder.find("ul.folders li a").removeClass("active");
            _ths.addClass("active");

            if (ths.hasClass("closed")){
                ths.removeClass("closed").addClass("opened");
            }else {
                ths.removeClass("opened").addClass("closed");
            }

            if (fdfinder.find(".left #all_folders ul.folders li a.active").attr("href")!="fcdir:/"){ fdfinder.find(".right ul.widget li a.up_folder").removeClass("passive");}
            else{fdfinder.find(".right ul.widget li a.up_folder").addClass("passive");}
        });


        //File Size Show / Hide
        $body.on("click",fdfinder_selector+" .right ul.widget li a.show_size",function(){
            if (Cookies.getCookie('fdfinder_view_type')=="icon"){
                var show = $(this).attr("data-show");
                if (show=="false") {
                    fdfinder.find(".right ul.wrapper li div span.file_size").css({"display":"block"});
                    fdfinder.find(".right ul.wrapper li div").height(fdfinder.find(".right ul.wrapper li div").height()+16);
                    $(this).attr("data-show","true");
                    Cookies.setCookie("fdfinder_size_show","true",60*60*24*365);
                    is_show_size = fdfinder.find(".right ul.widget li a.show_size").attr("data-show")=="true"?" style=\"display:block;\"":"";
                }
                else {
                    fdfinder.find(".right ul.wrapper li div span.file_size").hide();
                    fdfinder.find(".right ul.wrapper li div").height(fdfinder.find(".right ul.wrapper li div").height()-16);
                    $(this).attr("data-show","false");
                    Cookies.setCookie("fdfinder_size_show","false",60*60*24*365);
                    is_show_size = fdfinder.find(".right ul.widget li a.show_size").attr("data-show")=="false"?" style=\"display:block;\"":"";
                }
            }
            return false;
        });


        //File Date Show / Hide
        $body.on("click",fdfinder_selector+" .right ul.widget li a.show_date",function(){
            if (Cookies.getCookie('fdfinder_view_type')=="icon"){
                var show = $(this).attr("data-show");
                if (show=="false") {
                    fdfinder.find(".right ul.wrapper li div span.file_date").css({"display":"block"});
                    fdfinder.find(".right ul.wrapper li div").height(fdfinder.find(".right ul.wrapper li div").height()+32);
                    $(this).attr("data-show","true");
                    Cookies.setCookie("fdfinder_date_show","true",60*60*24*365);
                    is_show_date = fdfinder.find(".right ul.widget li a.show_date").attr("data-show")=="true"?" style=\"display:block;\"":"";

                }
                else {
                    fdfinder.find(".right ul.wrapper li div span.file_date").hide();
                    fdfinder.find(".right ul.wrapper li div").height(fdfinder.find(".right ul.wrapper li div").height()-32);
                    $(this).attr("data-show","false");
                    Cookies.setCookie("fdfinder_date_show","false",60*60*24*365);
                    is_show_date = fdfinder.find(".right ul.widget li a.show_date").attr("data-show")=="false"?" style=\"display:block;\"":"";
                }
            }
            return false;
        });

        //Yeni Directory Oluşturma
        $body.on("click",fdfinder_selector+" .right ul.widget li a.new_folder",function(){
            var dir = fdfinder.find(".right ul.wrapper li[data-show='true']");
            if (dir.html()==opts.i18n.empty_dir){dir.html("");}
            fdfinder.find(".right ul.wrapper li div").removeClass("active");
            var html = '<div data-new="new_folder" data-path="" data-name="" data-size="0" data-size_2="0" data-date="" data-kind="_directory" class="active directory"><span class="file_name"><form id="new_directory"><input type="text" name="fdfinder[directory_name]" /><input type="hidden" name="fdfinder[type]" value="create_directory"/> <input type="hidden" name="fdfinder[path]" value="'+dir.attr("data-path")+'"></form></span><span class="file_size"></span><span class="file_date"></span></div>';
            if (Cookies.getCookie('fdfinder_view_type')=="list"){
                dir.find(".list_head").after(html);
            }else {
                dir.prepend(html);
            }
            dir.find("input").select();

            return false;
        });

        //Sayfa Refresh
        $body.on("click",fdfinder_selector+" .right ul.widget li a.refresh",function(){
            var left_wrapper = fdfinder.find(".left #all_folders ul li a.active");
            var right_wrapper =  fdfinder.find(".right  ul.wrapper li.file_wrapper[data-show='true']");
            if (right_wrapper.attr("data-path") == left_wrapper.attr("href")){
                var path = right_wrapper.attr("data-path");
                var data = "fdfinder[type]=refresh&fdfinder[path]="+path;
                left_wrapper.next("ul").html("")
                right_wrapper.html("")
                $.ajax({url:opts.url,dataType:'json',type:'POST',data:data,success:function(data) {

                    if ($.isEmptyObject(data.directory) && $.isEmptyObject(data.file))
                    {
                        right_wrapper.html(opts.i18n.empty_dir);
                    }else {
                        if (right_wrapper.html()!=""){right_wrapper.html("");}
                        $.each(data.directory,function(key,val){
                            var ths_cls = val.sub_dir? " closed " : "";
                            left_wrapper.next("ul.folders").append('<li><a href="'+val.path+'">'+
                            '<span class="braca '+ths_cls+'"></span>'+
                            '<span class="folder">'+key+'</span>'+
                            '</a></li>');

                            right_wrapper.append('<div data-path="'+val.path+'" data-kind="'+val.type+'" data-name="'+key+'" data-size="'+val.size+'" data-size_2="'+val.size_2+'" data-date="'+val.ctime+'" class="directory"><span class="file_name">'+key+'</span><span class="file_size"'+is_show_size+'>'+val.size+'</span><span class="file_date"'+is_show_date+'>'+val.ctime+'</span></div>');
                        });

                        fnc.appendFiles(data,right_wrapper);
                        fnc.sortable(Cookies.getCookie("fdfinder_sortable"));
                        if (Cookies.getCookie("fdfinder_view_type")=="list"){fdfinder.find(".right ul.wrapper li[data-show='true']").prepend('<div class="list_head"><span class="file_name">'+opts.i18n.file_name+'</span><span class="file_size">'+opts.i18n.file_size+'</span><span class="file_date">'+opts.i18n.file_cdate+'</span></div>');}
                    }
                }});
            }else {
                fnc.prepend_dialog(opts.i18n.faild_process,opts.i18n.error.error_msg,{type:"p",dialog_class:'danger'});
            }

            return false;
        });



        //File Download
        $body.on("click",fdfinder_selector+" .right ul.widget li a.download",function(){
            if (!$(this).hasClass("passive")){
                var path = fdfinder.find(".right ul.wrapper li div.active").attr("data-path").replace("fcdir:/","");
                var data = "fdfinder[type]=download&fdfinder[path]="+fdfinder.find(".right ul.wrapper li div.active").attr("data-path");
                $.ajax({
                    url: opts.url, dataType: 'json', type: 'POST', data: data, success: function (data) {

                        if (data[0]=="false"){
                            fnc.prepend_dialog(opts.i18n.faild_process,opts.i18n.error.download_error.format(data[2]),{type:"p",dialog_class:'danger'});
                        }
                        else{
                            window.open(location+"/download/"+data.file);
                            fdfinder.find(".right ul.widget li a.refresh").trigger("click");
                        }
                    }});
            }
            return false;
        });





        //Üst Dizin'e Çıkma
        $body.on("click",fdfinder_selector+" .right ul.widget li a.up_folder",function(){
            if (!$(this).hasClass("passive")){
                var up_path = fdfinder.find(".left  #all_folders ul.folders li a.active").attr("href").split("/");
                up_path.pop();
                var data_path = up_path.length > 1 ? up_path.join("/") : up_path[0]+"/";
                var ths = fdfinder.find(".left #all_folders ul.folders li a[href='"+data_path+"']");
                if (data_path=="fcdir:/"){$(this).addClass("passive");}
                fdfinder.find(".right ul.wrapper li.file_wrapper").attr("data-show","false").hide();
                fdfinder.find(".right ul.wrapper li.file_wrapper[data-path='" + data_path + "']").attr("data-show","true").show();
                fdfinder.find("ul.folders li a").removeClass("active");
                ths.addClass("active").attr("data-show","true");

                if (fdfinder.find("ul.bottom li[data-path='"+data_path+"']").size()===0){
                    fdfinder.find("ul.bottom li").hide();}
                else { fdfinder.find("ul.bottom li").hide(); fdfinder.find("ul.bottom li[data-path='"+data_path+"']").show();}

                fdfinder.find(".right ul.widget li a.refresh").trigger("click");
            }
            return false;
        });



        //File Info Göster
        $body.on("click",fdfinder_selector+" .right ul.widget li a.info",function(){
            if (!$(this).hasClass("passive")){
                var file = fdfinder.find(".right ul.wrapper li div.active");
                var kind = file.attr("data-kind");
                var data = "fdfinder[type]=info&fdfinder[file]="+file.attr("data-path")+"&kind="+kind;
                fnc.prepend_dialog(opts.i18n.dialog.info_h,opts.i18n.loading,{type:"p"});
                $.ajax({
                    url: opts.url, dataType: 'json', type: 'POST', data: data, success: function (data) {

                        var permissions="";
                        var _class = "";
                        if (data.permissions.read == "true"){ permissions = opts.i18n.read_permission; }
                        if (data.permissions.write == "true"){ permissions = opts.i18n.write_permission; }
                        if (data.permissions.write == "true" && data.permissions.read == "true"){ permissions = opts.i18n.read_write_permission; }
                        if (data.mime_type == "directory") { data.mime_type = opts.i18n.directory; _class = " directory"; }
                        else { _class = " "+file.removeClass("active").attr("class");
                            file.addClass("active");}
                        $(fdfinder_selector).find(".dialog").html('<h1>'+opts.i18n.dialog.info_h+'</h1>' +
                        '<div class="file_bg'+_class+'" style=\''+file.attr("style")+'\'></div>'+
                        '<span class="file_name">'+file.attr("data-name")+'</span><span class="file_type">'+data.mime_type+'</span>'+
                        '<ul class="file_info">' +
                        '<li><span>'+opts.i18n.dialog.info_size+'</span>'+data.size+'</li>' +
                        '<li><span>'+opts.i18n.dialog.info_addres+'</span>'+data.path+'</li>' +
                        '<li><span>'+opts.i18n.dialog.info_url+'</span><a target="_blank" href="//'+data.url+'">'+file.attr("data-name")+'</a></li>' +
                        '<li><span>'+opts.i18n.dialog.info_cdate+'</span>'+data.ctime+'</li>' +
                        '<li><span>'+opts.i18n.dialog.info_mdate+'</span>'+data.mtime+'</li>' +
                        '<li><span>'+opts.i18n.dialog.info_file_permission+'</span>'+permissions+'</li>' +
                        '</ul>' +
                        '<a href="#" class="close">'+opts.i18n.dialog.close+'</a>');
                        fnc.fdfinderresize();
                    }});
            }
            return false;
        });


        //Dosyayı Preview
        $body.on("click",fdfinder_selector+" .right ul.widget li a.preview",function(){
            if (!$(this).hasClass("passive")){
                var file = fdfinder.find(".right ul.wrapper li div.active");
                var kind = file.attr("data-kind");
                var data = "fdfinder[type]=preview&fdfinder[file]="+file.attr("data-path")+"&kind="+kind;
                $(fdfinder_selector).prepend('<div class="dialog-scope"></div>' +
                '<div style="display: none;" class="dialog"><h1>'+opts.i18n.dialog.preview_h+'</h1>' +
                '<p>'+opts.i18n.loading+'<span class="load"></span> </p>' +
                '</div>');
                fdfinder.find(".dialog").fadeIn(300);
                $.ajax({
                    url: opts.url, dataType: 'json', type: 'POST', data: data, success: function (data) {

                        var _class = "";
                        if (data.mime_type == "directory") { data.mime_type = opts.i18n.directory; _class = " directory"; }
                        else { _class = " "+file.removeClass("active").attr("class");
                            file.addClass("active");}

                        if (kind == "image_file"){
                            $(fdfinder_selector).find(".dialog").html('<h1>'+file.attr("data-name")+'</h1>' +
                            '<img style="width:'+$(window).width()/4+'px;" class="preview" src="//'+data.url+'" />' +
                            '<div class="clear"></div>'+
                            '<a href="#" class="close">'+opts.i18n.dialog.close+'</a>' +
                            '<div class="clear"></div>');
                            var img_width = fdfinder.find(".dialog img").width();
                            fdfinder.find(".dialog").css({"width":img_width+100+"px"});
                            fdfinder.find(".dialog").ortala();
                        }
                        else{
                            $(fdfinder_selector).find(".dialog").html('<h1>'+opts.i18n.dialog.preview_h+'</h1>' +
                            '<div class="file_bg'+_class+'" style="'+file.attr("style")+'"></div>'+
                            '<span class="file_name">'+file.attr("data-name")+'</span><span class="file_type">'+data.mime_type+'</span>'+
                            '<ul class="file_info">' +
                            '<li><span>'+opts.i18n.dialog.preview_size+'</span>'+data.size+'</li>' +
                            '<li><span>'+opts.i18n.dialog.preview_addres+'</span>'+data.path+'</li>' +
                            '<li><span>'+opts.i18n.dialog.preview_url+'</span><a target="_blank" href="//'+data.url+'">'+file.attr("data-name")+'</a></li>' +
                            '<li><span>'+opts.i18n.dialog.preview_cdate+'</span>'+data.ctime+'</li>' +
                            '<li><span>'+opts.i18n.dialog.preview_mdate+'</span>'+data.mtime+'</li>' +
                            '</ul>' +
                            '<a href="#" class="close">'+opts.i18n.dialog.close+'</a>');
                            fdfinder.find(".dialog").ortala();
                        }
                    }});
                fnc.fdfinderresize();
            }
            return false;
        });

        //File Copy
        $body.on("click",fdfinder_selector+" .right ul.widget li a.copy",function(){
            if (!$(this).hasClass("passive")){
                var file = fdfinder.find(".right ul.wrapper li div.active");
                var copy_file_path = file.attr("data-path");
                if (fdfinder.find("#copy_form").size()>0){ fdfinder.find("#copy_form").remove(); }
                fdfinder.append('<form id="copy_form"><input type="hidden" name="copy_file_path" value="'+copy_file_path+'" /><input type="hidden" name="copy_type" value="copy" /></form>');
                fdfinder.find(".right ul.widget li a.paste").removeClass("passive");
            }
            return false;
        });


        //File Cut
        $body.on("click",fdfinder_selector+" .right ul.widget li a.cut",function(){
            if (!$(this).hasClass("passive")){
                fdfinder.find(".right ul.wrapper li div").removeClass("cutting");
                var file = fdfinder.find(".right ul.wrapper li div.active");
                file.addClass("cutting");
                var copy_file_path = file.attr("data-path");
                if (fdfinder.find("#copy_form").size()>0){ fdfinder.find("#copy_form").remove(); }
                fdfinder.append('<form id="copy_form"><input type="hidden" name="copy_file_path" value="'+copy_file_path+'" /><input type="hidden" name="copy_type" value="cut" /></form>');
                fdfinder.find(".right ul.widget li a.paste").removeClass("passive");
            }
            return false;
        });

        //File Paste
        $body.on("click",fdfinder_selector+" .right ul.widget li a.paste",function(){
            var $ths = $(this);
            if (!$ths.hasClass("passive")){
                var $input = fdfinder.find("input[name='copy_file_path']");
                var $type = fdfinder.find("input[name='copy_type']").val();
                var copy_file_path = $input.val();
                var this_folder_path = fdfinder.find(".left #all_folders ul.folders li a.active").attr("href");
                var data;
                var data_input;
                if ($type=="copy"){
                    data = "fdfinder[type]=copy&fdfinder[copy_file_path]="+copy_file_path+"&fdfinder[this_folder_path]="+this_folder_path;
                    data_input = "fdfinder[type]=copy!&fdfinder[copy_file_path]="+copy_file_path+"&fdfinder[this_folder_path]="+this_folder_path;
                }
                if ($type=="cut") {
                    data = "fdfinder[type]=cut&fdfinder[cut_file_path]="+copy_file_path+"&fdfinder[this_folder_path]="+this_folder_path;
                    data_input = "fdfinder[type]=cut!&fdfinder[cut_file_path]="+copy_file_path+"&fdfinder[this_folder_path]="+this_folder_path;
                }

                $.ajax({
                    url: opts.url, dataType: 'json', type: 'POST', data: data, success: function (data){

                        if (data[0]=="true")
                        {if (fdfinder.find(".right ul.wrapper li div.cutting")){fdfinder.find(".right ul.wrapper li div.cutting").remove(); }
                            fdfinder.find(".right ul.widget li a.refresh").trigger("click");
                        }else {
                            if (data[1] == "0"){
                                $(fdfinder_selector).prepend('<div class="dialog-scope"></div>' +
                                '<div style="display: none;" class="dialog"><h1>'+opts.i18n.dialog.file_replace_h+'</h1>' +
                                '<p>'+opts.i18n.dialog.file_replace_content.format(copy_file_path.split("/").pop()) +
                                '<input type="hidden" name="data_input" value="'+data_input+'" /> </p>' +
                                '<a class="close" href="#">'+opts.i18n.dialog.cancel+'</a>' +
                                '<a class="btn file_copy_ok" href="#">'+opts.i18n.dialog.ok+'</a>' +
                                '</div>');
                                fdfinder.find(".dialog").fadeIn(300);
                                fdfinder.find(".dialog").ortala();
                            }
                            else{
                                fnc.prepend_dialog(opts.i18n.faild_process,opts.i18n.error.copy_error.format(data[2]),{type:"p",dialog_class:'danger'});
                            }
                        }
                    }});
                $input.remove();
                $ths.addClass("passive");

            }
            return false;
        });


        //File Paste ( Changing File with the same name )
        $body.on("click",fdfinder_selector+" .dialog a.file_copy_ok",function(){
            var data = fdfinder.find(".dialog input[name='data_input']").val();
            $.ajax({
                url: opts.url, dataType: 'json', type: 'POST', data: data, success: function (data){

                    if (data[0]=="true")
                    {if (fdfinder.find(".right ul.wrapper li div.cutting")){fdfinder.find(".right ul.wrapper li div.cutting").remove(); }
                        fdfinder.find(".right ul.widget li a.refresh").trigger("click");
                    }else {
                        fnc.prepend_dialog(opts.i18n.faild_process,opts.i18n.error.replace_error.format(data[2]),{type:"p",dialog_class:'danger'});
                    }
                }});
            return false;
        });



        //File Duplicate
        $body.on("click",fdfinder_selector+" .right ul.widget li a.duplicate",function(){
            if (!$(this).hasClass("passive")){
                var file_path = fdfinder.find(".right ul.wrapper li div.active").attr("data-path");
                var data = "fdfinder[type]=duplicate&fdfinder[file_path]="+file_path;
                $.ajax({
                    url: opts.url, dataType: 'json', type: 'POST', data: data, success: function (data){

                        if (data[0]=="true")
                        {
                            fdfinder.find(".right ul.widget li a.refresh").trigger("click");
                        }else
                        {
                            //Kopyası Oluşmname
                            fnc.prepend_dialog(opts.i18n.faild_process,opts.i18n.error.duplicate_error.format(data[2]),{type:"p",dialog_class:'danger'});
                        }
                    }});

            }
            return false;
        });



        //File Rename
        $body.on("click",fdfinder_selector+" .right ul.widget li a.rename",function(){
            if (!$(this).hasClass("passive")){
                var file = fdfinder.find(".right ul.wrapper li div.active");
                file.attr("data-rename","true");
                file.children("span.file_name").html('<form id="file_rename"><input type="text" id=\"file_name\" data-value="'+file.children("span.file_name").html()+'" name="fdfinder[file_name]" value="'+file.children("span.file_name").html()+'" /><input type="hidden" name="fdfinder[type]" value="file_rename"/> <input type="hidden" name="fdfinder[path]" value="'+file.attr("data-path")+'"></form>');

                var field = file.find("span.file_name form input[name='fdfinder[file_name]']");
                if (file.hasClass("directory")){
                    field.select();
                }else{

                    field[0].focus();
                    field[0].setSelectionRange(0,(field.val().length-(field.val().split(".").slice(-1).toString().length+1)));
                }


            }
            return false;
        });



        //File Rename Form Submit
        $body.on("submit",fdfinder_selector+" #file_rename",function(){
            var data = $(this).serialize();
            $.ajax({
                url: opts.url, dataType: 'json', type: 'POST', data: data, success: function (data) {
                    if (data[0]=="true"){
                        fdfinder.find(".right ul.widget li a.refresh").trigger("click");
                    }else {
                        //Bir hata meydana geldi name değiştirilemedi
                        fnc.prepend_dialog(opts.i18n.faild_process,opts.i18n.error.rename_error.format(data[2]),{type:"p",dialog_class:'danger'});
                    }
                }});
            return false;
        });


        //File Edit (pixlr)
        $body.on("click",fdfinder_selector+" .right ul.widget li a.edit",function(){
            if (!$(this).hasClass("passive")){
                var data = "fdfinder[type]=edit_file&fdfinder[file_path]="+fdfinder.find(".right ul.wrapper li div.active").attr("data-path");
                $.ajax({
                    url: opts.url, dataType: 'json', type: 'POST', data: data, success: function (data) {

                        if (data[0]=="false"){
                            fnc.prepend_dialog(opts.i18n.faild_process,opts.i18n.error.edit_error,{type:"p",dialog_class:'danger'});
                        }else {
                            window.open("http://apps.pixlr.com/editor/?s=c&image="+encodeURIComponent(data.url)+"&title="+encodeURIComponent(data.title));
                        }
                    }});
            }
            return false;
        });



        //File Delete
        $body.on("click",fdfinder_selector+" .right ul.widget li a.delete",function(){
            if (!$(this).hasClass("passive")){
                var file = fdfinder.find(".right ul.wrapper li div.active");
                var file_path = file.attr("data-path");
                if (fdfinder.find("form#delete_file_form").size()>0){fdfinder.find("form#delete_file_form").remove();}
                fdfinder.append('<form id="delete_file_form"><input name="file_path" value="'+file_path+'" type="hidden" /></form>');
                $(fdfinder_selector).prepend('<div class="dialog-scope"></div>' +
                '<div style="display: none;" class="dialog"><h1>'+opts.i18n.dialog.delete_h.format(file.attr("data-name"))+'</h1>' +
                '<p>'+opts.i18n.dialog.delete_content.format(file.attr("data-name"))+'</p>'+
                '<a class="close" href="#">'+opts.i18n.dialog.close+'</a>' +
                '<a class="btn file_delete" href="#">'+opts.i18n.dialog.delete+'</a>' +
                '</div>');
                fdfinder.find(".dialog").fadeIn(300);
                fdfinder.find(".dialog").ortala();
            }
            return false;
        });


        //File Delete Confirmation
        $body.on("click",fdfinder_selector+" .dialog a.file_delete",function(){
            var file_path = fdfinder.find("form#delete_file_form input[name='file_path']").val();
            var data = "fdfinder[type]=delete&fdfinder[file_path]="+file_path;
            fdfinder.find(".dialog a.close").trigger("click");
            $.ajax({
                url: opts.url, dataType: 'json', type: 'POST', data: data, success: function (data) {
                    if (data[0]=="true"){
                        fdfinder.find(".right ul.widget li a.refresh").trigger("click");
                    }else {
                        if (data[1]=="0"){
                            fnc.prepend_dialog(opts.i18n.faild_process,opts.i18n.error.delete_error_0,{type:"p",dialog_class:'danger'});
                        }
                        else {
                            fnc.prepend_dialog(opts.i18n.faild_process,opts.i18n.error.delete_error_1.format(data[2]),{type:"p",dialog_class:'danger'});
                        }
                    }
                }});
            return false;
        });




        //Ada Göre File Listeleme
        $body.on("click",fdfinder_selector+" .right ul.widget li a.name_sorter",function(){
            if (!$(this).hasClass("passive")){
                var $ul = fdfinder.find(".right ul.wrapper li.file_wrapper[data-show='true']"),
                    $li = $ul.find("div");
                if (!$(this).hasClass("z_a"))
                {
                    $li.sort(function(a,b){
                        var an = a.getAttribute('data-name'),
                            bn = b.getAttribute('data-name');
                        if(an > bn) { return 1;}
                        if(an < bn) {return -1;}
                        return 0;
                    });
                    $li.detach().appendTo($ul);
                    $(this).removeClass("a_z").addClass("z_a");
                }else {
                    $li.sort(function(a,b){
                        var an = a.getAttribute('data-name'),
                            bn = b.getAttribute('data-name');
                        if(an < bn) { return 1;}
                        if(an > bn) {return -1;}
                        return 0;
                    });
                    $li.detach().appendTo($ul);
                    $(this).removeClass("z_a").addClass("a_z");
                }
            }
            Cookies.setCookie("fdfinder_sortable","name",60*60*24*365);
            return false;
        });



        //Boyuta Göre File Listeleme
        $body.on("click",fdfinder_selector+" .right ul.widget li a.size_sorter",function(){
            if (!$(this).hasClass("passive")){
                var $ul = fdfinder.find(".right ul.wrapper li.file_wrapper[data-show='true']"),
                    $li = $ul.find("div");
                if (!$(this).hasClass("z_a"))
                {
                    $li.sort(function(a,b){
                        var an = fnc.toInt(a.getAttribute('data-size_2')),
                            bn = fnc.toInt(b.getAttribute('data-size_2'));
                        if(an < bn) { return 1;}
                        if(an > bn) {return -1;}
                        return 0;
                    });
                    $li.detach().appendTo($ul);
                    $(this).removeClass("a_z").addClass("z_a");
                }else {
                    $li.sort(function(a,b){
                        var an = fnc.toInt(a.getAttribute('data-size_2')),
                            bn = fnc.toInt(b.getAttribute('data-size_2'));
                        if(an > bn) { return 1;}
                        if(an < bn) {return -1;}
                        return 0;
                    });
                    $li.detach().appendTo($ul);
                    $(this).removeClass("z_a").addClass("a_z");
                }
            }
            Cookies.setCookie("fdfinder_sortable","size",60*60*24*365);
            return false;
        });



        //Date Göre File Listeleme
        $body.on("click",fdfinder_selector+" .right ul.widget li a.date_sorter",function(){
            if (!$(this).hasClass("passive")){
                var $ul = fdfinder.find(".right ul.wrapper li.file_wrapper[data-show='true']"),
                    $li = $ul.find("div");
                if (!$(this).hasClass("z_a"))
                {
                    $li.sort(function(a,b){
                        var an = fnc.toDate(a.getAttribute('data-date')),
                            bn = fnc.toDate(b.getAttribute('data-date'));
                        if(an > bn) { return 1;}
                        if(an < bn) {return -1;}
                        return 0;
                    });
                    $li.detach().appendTo($ul);
                    $(this).removeClass("a_z").addClass("z_a");
                }else {
                    $li.sort(function(a,b){
                        var an = fnc.toDate(a.getAttribute('data-date')),
                            bn = fnc.toDate(b.getAttribute('data-date'));
                        if(an < bn) { return 1;}
                        if(an > bn) {return -1;}
                        return 0;
                    });
                    $li.detach().appendTo($ul);
                    $(this).removeClass("z_a").addClass("a_z");
                }
            }
            Cookies.setCookie("fdfinder_sortable","date",60*60*24*365);
            return false;
        });

        //Türüne Göre File Listeleme
        $body.on("click",fdfinder_selector+" .right ul.widget li a.kind_sorter",function(){
            if (!$(this).hasClass("passive")){
                var $ul = fdfinder.find(".right ul.wrapper li.file_wrapper[data-show='true']"),
                    $li = $ul.find("div");
                if (!$(this).hasClass("z_a"))
                {
                    $li.sort(function(a,b){
                        var an = a.getAttribute('data-kind'),
                            bn = b.getAttribute('data-kind');
                        if(an > bn) { return 1;}
                        if(an < bn) {return -1;}
                        return 0;
                    });
                    $li.detach().appendTo($ul);
                    $(this).removeClass("a_z").addClass("z_a");
                }else {
                    $li.sort(function(a,b){
                        var an = a.getAttribute('data-kind'),
                            bn = b.getAttribute('data-kind');
                        if(an < bn) { return 1;}
                        if(an > bn) {return -1;}
                        return 0;
                    });
                    $li.detach().appendTo($ul);
                    $(this).removeClass("z_a").addClass("a_z");
                }
            }
            Cookies.setCookie("fdfinder_sortable","kind",60*60*24*365);
            return false;
        });




        //Icon View
        $body.on("click",fdfinder_selector+" .right ul.widget li a.icon_view",function(){
            if (!$(this).hasClass("passive")) {
                fdfinder.find(".right ul.wrapper").removeClass("list_view").addClass("icon_view");
                Cookies.setCookie("fdfinder_view_type","icon",60*60*24*365);
                $(this).addClass("passive");
                fdfinder.find(".right ul.widget li a.list_view").removeClass("passive");
                fdfinder.find(".right ul.wrapper li div.list_head").remove();
            }
            return false;
        });

        //List View
        $body.on("click",fdfinder_selector+" .right ul.widget li a.list_view",function(){
            if (!$(this).hasClass("passive")) {
                fdfinder.find(".right ul.wrapper li[data-show='true']").prepend('<div class="list_head"><span class="file_name">'+opts.i18n.file_name+'</span><span class="file_size">'+opts.i18n.file_size+'</span><span class="file_date">'+opts.i18n.file_cdate+'</span></div>');
                fdfinder.find(".right ul.wrapper").removeClass("icon_view").addClass("list_view");
                Cookies.setCookie("fdfinder_view_type","list",60*60*24*365);
                $(this).addClass("passive");
                fdfinder.find(".right ul.widget li a.icon_view").removeClass("passive");
            }
            return false;
        });






        //Ayarlar Menüsü
        $body.on("click",fdfinder_selector+" .right ul.widget li a.settings",function(){
            if (!$(this).hasClass("passive")){
                var list_type = Cookies.getCookie("fdfinder_view_type");
                var size_show = Cookies.getCookie("fdfinder_size_show");
                var date_show = Cookies.getCookie("fdfinder_date_show");

                var dialog_text = '<div class="dialog-scope"></div>' +
                    '<div style="display: none;" class="dialog"><h1>'+opts.i18n.dialog.settings_h+'</h1>' +
                    '<div class="content">';
                dialog_text += '<div><label><input type="radio" name="view" value="icon"';
                dialog_text += list_type == "icon" ? ' checked="checked" ' : '';
                dialog_text += ' /> '+opts.i18n.dialog.settings_icon_view+' </label></div>';
                dialog_text += '<div><label><input type="radio" name="view" value="list"';
                dialog_text += list_type == "list" ? ' checked="checked" ' : ''
                dialog_text += ' /> '+opts.i18n.dialog.settings_list_view+' </label></div>'
                dialog_text += '<div><label><input type="checkbox" name="size_show" value="true"'
                dialog_text += size_show == "true" ? ' checked="checked" ' : ''
                dialog_text +=' /> '+opts.i18n.dialog.settings_show_size+' </label></div>'
                dialog_text +='<div><label><input type="checkbox" name="date_show" value="true"'
                dialog_text += date_show == "true" ? ' checked="checked" ' : ''
                dialog_text +=' /> '+opts.i18n.dialog.settings_show_date+' </label></div>' +
                '</div>' +
                '<a class="close" href="#">'+opts.i18n.dialog.close+'</a>' +
                '</div>';
                $(fdfinder_selector).prepend(dialog_text);
                fdfinder.find(".dialog").fadeIn(300);
                fdfinder.find(".dialog").ortala();
            }
            return false;
        });


        //Ayarlar -> Tarih Göster İnputu Seçilirse
        $body.on("change",fdfinder_selector+" .dialog div.content div label input[name='date_show']",function(){
            fdfinder.find(".right ul.widget li a.show_date").trigger('click');
        });

        //Ayarlar -> Boyut Göster İnputu Seçilirse
        $body.on("change",fdfinder_selector+" .dialog div.content div label input[name='size_show']",function(){
            fdfinder.find(".right ul.widget li a.show_size").trigger('click');
        });

        //Ayarlar -> Görünüm Tipi Seçimi (Liste|Simge)
        $body.on("change",fdfinder_selector+" .dialog div.content div label input[name='view']",function(){
            var view_type = $(this).val();
            if (view_type=="icon"){ fdfinder.find(".right ul.widget li a.icon_view").trigger("click"); }
            if (view_type=="list"){ fdfinder.find(".right ul.widget li a.list_view").trigger("click");}
        });




        //Sıralama Menüsü
        $body.on("click",fdfinder_selector+" .right ul.widget li a.sort",function(){
            if (!$(this).hasClass("passive")){
                var sortable_type = Cookies.getCookie("fdfinder_sortable");
                var dialog_text = '<div class="dialog-scope"></div>' +
                    '<div style="display: none;" class="dialog"><h1>'+opts.i18n.dialog.sorter_h+'</h1>' +
                    '<div class="content">';
                dialog_text += '<div><label><input type="radio" name="sortable" value="name"';
                dialog_text += sortable_type == "name" ? ' checked="checked" ' : '';
                dialog_text += ' /> '+opts.i18n.dialog.sorter_name+' </label></div>';
                dialog_text += '<div><label><input type="radio" name="sortable" value="size"';
                dialog_text += sortable_type == "size" ? ' checked="checked" ' : ''
                dialog_text += ' /> '+opts.i18n.dialog.sorter_size+' </label></div>'
                dialog_text += '<div><label><input type="radio" name="sortable" value="date"'
                dialog_text +=sortable_type == "date" ? ' checked="checked" ' : ''
                dialog_text +=' /> '+opts.i18n.dialog.sorter_date+' </label></div>'
                dialog_text +='<div><label><input type="radio" name="sortable" value="kind"'
                dialog_text +=sortable_type == "kind" ? ' checked="checked" ' : ''
                dialog_text +=' /> '+opts.i18n.dialog.sorter_kind+' </label></div>' +
                '</div>' +
                '<a class="close" href="#">'+opts.i18n.dialog.close+'</a>' +
                '</div>';
                $(fdfinder_selector).prepend(dialog_text);
                fdfinder.find(".dialog").fadeIn(300);
                fdfinder.find(".dialog").ortala();
            }
            return false;
        });


        //Sıralama -> Sıralama Yöntemi Seçimi (İsim|Botur|Tarih|Tür)
        $body.on("change",fdfinder_selector+" .dialog div.content div label input[name='sortable']",function(){
            var sort_type = $(this).val();
            Cookies.setCookie("fdfinder_sortable",sort_type,60*60*24*365);
            fnc.sortable(sort_type);
            return false;
        });



        //Klavye Kontrolleri
        $(document).keyup(function(e) {
            //ESC Press
            if (e.keyCode == 27) {
                if (fdfinder.find(".dialog").size() > 0 || fdfinder.find(".dialog-scope").size() > 0)
                {
                    fdfinder.find(".dialog").fadeOut(300, function(){ fdfinder.find(".dialog-scope , .dialog").remove(); });
                }
                fdfinder.find("#ctxMenu").remove();
                fdfinder.find(".right ul.wrapper li[data-show='true'] div[data-new='new_folder']").remove();
                if (fdfinder.find(".right ul.wrapper li.file_wrapper[data-show='true']").html()==""){fdfinder.find(".right ul.wrapper li.file_wrapper[data-show='true']").html(opts.i18n.empty_dir);}
                var file = fdfinder.find(".right ul.wrapper li[data-show='true'] div[data-rename='true']");
                file.removeAttr("data-rename");
                file.children("span.file_name").html(file.find("form#file_rename input[name='fdfinder[file_name]']").attr("data-value"));
            }
            //F2 Press
            if(e.which == 113) {
                if (fdfinder.find(".right ul.wrapper li div.active")){
                    fdfinder.find(".right ul.widget li a.rename").trigger('click');
                }
                return false;
            }

        });

        //Hedef Dışı Tıklama Kontrolleri
        $("*").click(function(e){

            if (!$(e.target).is(fdfinder_selector+" ul#ctxMenu") && !$(e.target).is(fdfinder_selector+" ul#ctxMenu *") )
            {
                fdfinder.find("#ctxMenu").remove();
            }

            if (!$(e.target).is(fdfinder_selector+" .dialog") && !$(e.target).is(fdfinder_selector+" .dialog *") &&
                !$(e.target).is(fdfinder_selector+" .right ul.widget li a.icon_view") &&
                !$(e.target).is(fdfinder_selector+" .right ul.widget li a.list_view") &&
                !$(e.target).is(fdfinder_selector+" .right ul.widget li a.show_size") &&
                !$(e.target).is(fdfinder_selector+" .right ul.widget li a.show_date") &&
                !$(e.target).is(fdfinder_selector+" .right ul.widget li a.name_sorter") &&
                !$(e.target).is(fdfinder_selector+" .right ul.widget li a.size_sorter") &&
                !$(e.target).is(fdfinder_selector+" .right ul.widget li a.date_sorter") &&
                !$(e.target).is(fdfinder_selector+" .right ul.widget li a.kind_sorter") &&
                !$(e.target).is(fdfinder_selector+" "))
            {
                if (!fdfinder.find(".dialog").hasClass("noclose")){
                    fdfinder.find(".dialog").fadeOut(300, function(){ fdfinder.find(".dialog-scope , .dialog").remove(); });
                }
            }

            if (!$(e.target).is(fdfinder_selector+" .right ul.wrapper li[data-show='true'] div[data-new='new_folder']") && !$(e.target).is(fdfinder_selector+" .right ul.wrapper li[data-show='true'] div[data-new='new_folder'] *"))
            {
                fdfinder.find(".right ul.wrapper li[data-show='true'] div[data-new='new_folder']").remove();
                if (fdfinder.find(".right ul.wrapper li.file_wrapper[data-show='true']").html()==""){fdfinder.find(".right ul.wrapper li.file_wrapper[data-show='true']").html(opts.i18n.empty_dir);}
            }


            if (!$(e.target).is(fdfinder_selector+" .right ul.wrapper li[data-show='true'] div[data-rename='true']") && !$(e.target).is(fdfinder_selector+" .right ul.wrapper li[data-show='true'] div[data-rename='true'] *"))
            {
                var file = fdfinder.find(".right ul.wrapper li[data-show='true'] div[data-rename='true']");
                file.removeAttr("data-rename");
                file.children("span.file_name").html(file.find("form#file_rename input[name='fdfinder[file_name]']").attr("data-value"));
            }

            if (
                !$(e.target).is(fdfinder_selector+" .right ul.widget li a.download") &&
                !$(e.target).is(fdfinder_selector+" .right ul.widget li a.info") &&
                !$(e.target).is(fdfinder_selector+" .right ul.widget li a.preview") &&
                !$(e.target).is(fdfinder_selector+" .right ul.widget li a.edit") &&
                !$(e.target).is(fdfinder_selector+" .right ul.widget li a.copy") &&
                !$(e.target).is(fdfinder_selector+" .right ul.widget li a.cut") &&
                    //!$(e.target).is(fdfinder_selector+" .right ul.widget li a.paste") &&
                !$(e.target).is(fdfinder_selector+" .right ul.widget li a.duplicate") &&
                !$(e.target).is(fdfinder_selector+" .right ul.widget li a.rename") &&
                !$(e.target).is(fdfinder_selector+" .right ul.widget li a.delete") &&

                !$(e.target).is(fdfinder_selector+" ul#ctxMenu li") &&
                !$(e.target).is(fdfinder_selector+" ul#ctxMenu li *") &&


                !$(e.target).is(fdfinder_selector+" .right ul.wrapper li div") && !$(e.target).is(fdfinder_selector+" .right ul.wrapper li div *"))
            {
                fdfinder.find(".right ul.wrapper li div").removeClass("active");
                fdfinder.find(".right ul.widget li a.download , " +
                ".right ul.widget li a.info , " +
                ".right ul.widget li a.preview , " +
                    //".right ul.widget li a.edit , " +
                ".right ul.widget li a.copy , " +
                ".right ul.widget li a.cut , " +
                    //".right ul.widget li a.paste  , " +
                ".right ul.widget li a.duplicate , " +
                ".right ul.widget li a.rename , " +
                ".right ul.widget li a.delete").addClass("passive");

            }

        });


        //Sağ Tıklama Ayarı
        $("*").contextmenu(function(e){
            fdfinder.find("#ctxMenu").remove();
            if (!$(e.target).is(fdfinder_selector+" .right ul.wrapper li div.list_head") && !$(e.target).is(fdfinder_selector+" .right ul.wrapper li div.list_head *")){
                if ($(e.target).is(fdfinder_selector+" .right ul.wrapper li div") || $(e.target).is(fdfinder_selector+" .right ul.wrapper li div *")) {
                    if (typeof $(e.target).parent("div").attr("data-name") === "undefined") {
                        var file = $(e.target);
                    }else {
                        var file = $(e.target).parent("div");
                    }
                    file.trigger("click");
                    fdfinder.prepend('<ul id="ctxMenu"></ul>');
                    var ctxMenu = fdfinder.find("#ctxMenu");
                    var x = parseInt(e.pageX) - 20;
                    var y = parseInt(e.pageY) - 30;
                    var d_x = $(document).width();
                    var d_y = $(document).height();
                    var ctxW_x = ctxMenu.width();
                    var ctxH_y = ctxMenu.height();

                    if (x >= d_x - ctxW_x - 50) { x = d_x - ctxW_x - 50; }
                    if (y >= d_y - ctxH_y - 40) { y = d_y - ctxH_y - 40;}

                    //
                    ctxMenu.html('<li><a class="none">' + file.attr("data-name") + '</a></li><li class="hr">&nbsp;</li>'+
                    '<li><a href="fdfinder:open">'+opts.i18n.contextmenu.file_open+'</a></li>'+
                    '<li><a href="fdfinder:preview">'+opts.i18n.contextmenu.file_preview+'</a></li>'+
                    '<li><a href="fdfinder:download">'+opts.i18n.contextmenu.file_download+'</a></li>'+
                    '<li class="hr">&nbsp;</li>'+
                    '<li><a href="fdfinder:copy">'+opts.i18n.contextmenu.file_copy+'</a></li>'+
                    '<li><a href="fdfinder:cut">'+opts.i18n.contextmenu.file_cut+'</a></li>'+
                    '<li><a href="fdfinder:duplicate">'+opts.i18n.contextmenu.file_duplicate+'</a></li>'+
                    '<li><a href="fdfinder:rename">'+opts.i18n.contextmenu.file_rename+'</a></li>'+
                    '<li><a href="fdfinder:delete">'+opts.i18n.contextmenu.file_delete+'</a></li>'+
                    '<li class="hr">&nbsp;</li>'+
                    '<li><a href="fdfinder:info">'+opts.i18n.contextmenu.file_info+'</a></li>');

                    ctxMenu.css({"left": x + "px", "top": y + "px"});
                }

                if ($(e.target).is(fdfinder_selector+" .right ul.wrapper li[data-show='true']") || $(e.target).is(fdfinder_selector+" .right ul.wrapper")) {

                    fdfinder.prepend('<ul id="ctxMenu"></ul>');
                    var ctxMenu = fdfinder.find("#ctxMenu");
                    var x = parseInt(e.pageX) - 20;
                    var y = parseInt(e.pageY) - 30;
                    var d_x = $(document).width();
                    var d_y = $(document).height();
                    var ctxW_x = ctxMenu.width();
                    var ctxH_y = ctxMenu.height();

                    if (x >= d_x - ctxW_x - 50) { x = d_x - ctxW_x - 50; }
                    if (y >= d_y - ctxH_y - 40) { y = d_y - ctxH_y - 40;}


                    var paste;
                    if (fdfinder.find(".right ul.widget li a.paste").hasClass("passive")){
                        paste = '<li><a class="none" href="fdfinder:paste">'+opts.i18n.contextmenu.wrapper_paste+'</a></li>';
                    }else{paste = '<li><a href="fdfinder:paste">'+opts.i18n.contextmenu.wrapper_paste+'</a></li>';}

                    var view;
                    if (Cookies.getCookie("fdfinder_view_type")=="icon"){
                        view = '<li><a href="fdfinder:list_view">'+opts.i18n.contextmenu.wrapper_list_view+'</a></li>';
                    }else{
                        view = '<li><a href="fdfinder:icon_view">'+opts.i18n.contextmenu.wrapper_icon_view+'</a></li>';
                    }

                    ctxMenu.html('<li><a class="none">' + fdfinder.find(".right ul.wrapper li[data-show='true']").attr("data-path") + '</a></li><li class="hr">&nbsp;</li>'+
                    '<li><a href="fdfinder:upload">'+opts.i18n.contextmenu.wrapper_upload+'</a></li>'+
                    '<li><a href="fdfinder:newfolder">'+opts.i18n.contextmenu.wrapper_newfolder+'</a></li>'+
                    '<li><a href="fdfinder:refresh">'+opts.i18n.contextmenu.wrapper_refresh+'</a></li>'+
                    paste+
                    '<li class="hr">&nbsp;</li>'+
                    view+
                    '<li class="hr">&nbsp;</li>'+
                    '<li><a href="fdfinder:showsize">'+opts.i18n.contextmenu.wrapper_show_size+'</a></li>'+
                    '<li><a href="fdfinder:showdate">'+opts.i18n.contextmenu.wrapper_show_size+'</a></li>'+
                    '<li class="hr">&nbsp;</li>'+
                    '<li><a href="fdfinder:namesorter">'+opts.i18n.contextmenu.wrapper_namesorter+'</a></li>'+
                    '<li><a href="fdfinder:sizesorter">'+opts.i18n.contextmenu.wrapper_sizesorter+'</a></li>'+
                    '<li><a href="fdfinder:datesorter">'+opts.i18n.contextmenu.wrapper_datesorter+'</a></li>'+
                    '<li><a href="fdfinder:kindsorter">'+opts.i18n.contextmenu.wrapper_kindsorter+'</a></li>');


                    ctxMenu.css({"left": x + "px", "top": y + "px"});
                }
            }
            return false;
        });



        //Sağ Tıklama Menü Link Seçimi
        $body.on("click",fdfinder_selector+" ul#ctxMenu li a",function(){
            if ($(this).attr("class")=="none"){ return false; }else {
                fdfinder.find("ul#ctxMenu").remove();
                if ($(this).attr("href")=="fdfinder:open"){ fdfinder.find(".right ul.wrapper li div.active").trigger("dblclick");}
                if ($(this).attr("href")=="fdfinder:preview"){ fdfinder.find(".right ul.widget li a.preview").trigger("click"); }
                if ($(this).attr("href")=="fdfinder:download"){fdfinder.find(".right ul.widget li a.download").trigger("click");}
                if ($(this).attr("href")=="fdfinder:copy"){fdfinder.find(".right ul.widget li a.copy").trigger("click");}
                if ($(this).attr("href")=="fdfinder:cut"){fdfinder.find(".right ul.widget li a.cut").trigger("click");}
                if ($(this).attr("href")=="fdfinder:duplicate"){fdfinder.find(".right ul.widget li a.duplicate").trigger("click");}
                if ($(this).attr("href")=="fdfinder:rename"){fdfinder.find(".right ul.widget li a.rename").trigger("click");}
                if ($(this).attr("href")=="fdfinder:delete"){fdfinder.find(".right ul.widget li a.delete").trigger("click");}
                if ($(this).attr("href")=="fdfinder:info"){fdfinder.find(".right ul.widget li a.info").trigger("click");}

                if ($(this).attr("href")=="fdfinder:upload"){ fdfinder.find(".right ul.widget li a.upload input.upload_field").trigger("click");}
                if ($(this).attr("href")=="fdfinder:newfolder"){ fdfinder.find(".right ul.widget li a.new_folder").trigger("click");}
                if ($(this).attr("href")=="fdfinder:refresh"){ fdfinder.find(".right ul.widget li a.refresh").trigger("click");}
                if ($(this).attr("href")=="fdfinder:paste"){ fdfinder.find(".right ul.widget li a.paste").trigger("click");}
                if ($(this).attr("href")=="fdfinder:list_view"){ fdfinder.find(".right ul.widget li a.list_view").trigger("click");}
                if ($(this).attr("href")=="fdfinder:icon_view"){ fdfinder.find(".right ul.widget li a.icon_view").trigger("click");}

                if ($(this).attr("href")=="fdfinder:showdate"){ fdfinder.find(".right ul.widget li a.show_date").trigger("click");}
                if ($(this).attr("href")=="fdfinder:showsize"){ fdfinder.find(".right ul.widget li a.show_size").trigger("click");}

                if ($(this).attr("href")=="fdfinder:namesorter"){ fdfinder.find(".right ul.widget li a.name_sorter").trigger("click");}
                if ($(this).attr("href")=="fdfinder:sizesorter"){ fdfinder.find(".right ul.widget li a.size_sorter").trigger("click");}
                if ($(this).attr("href")=="fdfinder:datesorter"){ fdfinder.find(".right ul.widget li a.date_sorter").trigger("click");}
                if ($(this).attr("href")=="fdfinder:kindsorter"){ fdfinder.find(".right ul.widget li a.kind_sorter").trigger("click");}


                return false;
            }

        });



        //Yeni Directory Form Submit
        $body.on("submit",fdfinder_selector+" #new_directory",function(){
            var data = $(this).serialize();
            $.ajax({
                url: opts.url, dataType: 'json', type: 'POST', data: data, success: function (data) {

                    if (data[0]=="true"){
                        fdfinder.find(".right ul.widget li a.refresh").trigger("click");
                        fdfinder.find(".left #all_folders ul.folders li a[href='"+data[1].top_dir+"']").trigger("click");
                        fdfinder.find(".left #all_folders ul.folders li a[href='"+data[1].top_dir+"']").children("span.braca").addClass("closed");
                    }else {
                        if (data[1]=="-1"){
                            fnc.prepend_dialog(opts.i18n.faild_process,opts.i18n.error.new_directory_error_1,{type:"p",dialog_class:'danger'});
                        }
                        else {
                            fnc.prepend_dialog(opts.i18n.faild_process,opts.i18n.error.new_directory_error_0.format(data[2]),{type:"p",dialog_class:'danger'});
                        }
                    }
                }
            });
            return false;
        });

        //Dialog Kapatma Butonu
        $body.on("click",fdfinder_selector+" .dialog a.close",function(){
            fdfinder.find(".dialog").fadeOut(300, function(){ fdfinder.find(".dialog-scope , .dialog").remove(); });
            fnc.fdfinderresize();
            return false;
        });




        //About Sayfası
        $body.on("click",fdfinder_selector+" .right ul.widget li a.about",function(){
            return false;
        });




        //Görüntü Yükseklik Genişlik Ayarları
        fnc.fdfinderresize();
        $(window).resize(function(){ fnc.fdfinderresize(); fdfinder.find(".dialog").ortala(); });

        //Tıklama Efekti Ayarı
        fnc.ripleClick(fdfinder_selector+" .right ul.widget li a ,"+fdfinder_selector+" .right ul.wrapper li div ,"+fdfinder_selector+" .left #all_folders ul.folders li a span.folder");






        //String Objesi Metod Ekleme
        String.prototype.format = function() {
            var formatted = this;
            for (var i = 0; i < arguments.length; i++) {
                var regexp = new RegExp('\\{'+i+'\\}', 'gi');
                formatted = formatted.replace(regexp, arguments[i]);
            }
            return formatted;
        };

        //$ Genişletme Yeni Metod Ekleme
        $().__proto__.ortala = function(){
            this.css({
                left: ($(window).width()/2)-(this.width()/2),
                top: ($(window).height()/2)-(this.height()/2)
            });

        };

    };

})(jQuery);

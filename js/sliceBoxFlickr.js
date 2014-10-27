(function() {
	$.fn.sliceBoxFlickr = function(options) {
		this.each(function() {
			var opts = $.extend({
				show:100,
				usingFirst: true,
				rss : "",
				sliceCount: 7,
				disperseFactor:50,
				sequentialRotation:true,
				sequentialfactor:20,
				speed3d: 800
			}, options);

			// reference our selector
			var selector = $(this);

			var url = encodeURIComponent(opts.rss);
			var api = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q="+url+"&num="+opts.show+"&output=json_xml";
			$.getJSON(api, function(data){
				var entries = data.responseData.feed.entries;
				$.each(entries, function(i, photo){
				var src= photo.content.replace("_m","_z").match(/src=\"([^\"]*)/);
				var src = src[1];
				var title= photo.content.match(/alt=\"([^\"]*)/);
				var title = title[1];
				var $img = $("<img src='"+src+"' title='"+title+"'/>").addClass("loaded");
				$(selector).append($img);
				});

				if (opts.usingFirst) $(selector).find("img:first").remove();

				$(selector).slicebox({
					sliceCount: opts.sliceCount,
					disperseFactor:50,
					sequentialRotation:true,
					sequentialfactor:20,
					speed3d: 800

				});
				if (!Mordenizr.csstransforms3d) $('#sb-note').show();
			});
		});
	}
}(jQuery))
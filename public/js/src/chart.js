(function($) {


  var chart = {};

  //add the function chart() to jQuery object
  //called at $('div.chart').chart();
  //in views/streams/view.handlebars  
  $.fn.chart = function() {

      var el = this;
      var public_key = el.data('key');
      //el.data('key') => getting data-key attribute      
      var t_url = '/output/' + public_key + '.json';

      // JSONP request via AJAX
      var jsonData = $.ajax({
	url: t_url,
	dataType: 'jsonp',
      }).done(function (results) {
	//define chart creation function
        function getChart(dName, id_tag){
		var data = new google.visualization.DataTable();
		data.addColumn('datetime', 'Time');
		data.addColumn('number',dName);

		$.each(results, function (i, row) {
			data.addRow([ (new Date(row['timestamp'])), parseFloat(row[dName])
			]);
		});

		var chart = new google.visualization.LineChart($(id_tag).get(0));
		chart.draw(data);       
        }

	alert('complete data fetching by ajax.');

	//get keys. Remove timestamps
	var keys = [];      
	keys = Object.keys(results[0]).sort();
	keys.splice(keys.indexOf('timestamp'));
	alert(keys.length);
	keys.forEach(function(k,i) {
		//add id index
		id = public_key + '-' + i; 
		//add html
		var inHtml = '<div id=\"' + id + '\" style=\"width: 100%;\">Hola!</div>'; 
		alert(inHtml);
		$('div.add-chart').append(inHtml);
		//set chart             
		//getChart(k,'#' + id); 
	});		

      });
	

  };

}(jQuery));

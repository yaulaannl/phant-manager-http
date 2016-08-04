   function data_chart(){

 	//build url
        var public_key = $('div.chart').data('key');
        var t_url = '/output/' + public_key + '.json';

	//get and process data
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


        //get keys. Remove timestamps
        var keys = [];
        keys = Object.keys(results[0]).sort();
        keys.splice(keys.indexOf('timestamp'));
        keys.forEach(function(k,i) {
                //add id index
                id = public_key + '-' + i;
                //add html
                var inHtml = '<div class=\"row\">' + 
			  '<div class=\"col-md-10 col-md-offset-1\">' +
			    '<div id=\"' + id + '\" style=\"width: 100%;\"></div></div></div>';
                $('div.add-chart').append(inHtml);
                //set chart             
                getChart(k,'#' + id); 
        });
     });

    }



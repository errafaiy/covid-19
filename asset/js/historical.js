const api_url_hestori = 'https://corona.lmao.ninja/v3/covid-19/historical/morocco';
	
async function getHestorical() {
    var valChart = new Array();
        i=0;
    const   response = await fetch(api_url_hestori),
            data = await response.json();
            cases = data.timeline['cases'],
            deaths = data.timeline['deaths'],
            count = Object.keys(cases).length;

    $.each( cases, function( key, value ) {
        if(cases[''+key+'']!=0) {
            var col = "<tr><td>"+key+"</td><td>"+cases[''+key+'']+"</td><td>"+deaths[''+key+'']+"</td>/tr>";
            valChart[i]=[key,parseInt(cases[key]),parseInt(deaths[key])];
            $('.statistique').append(col);
            i++;
        }

    });
    //console.log(valChart);
    //chart script

    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawChart);

  function drawChart() {

    var chartdata = new google.visualization.DataTable();
    chartdata.addColumn('string', 'التاريخ');
    chartdata.addColumn('number', 'الحالات');
    chartdata.addColumn('number', 'الوفيات');

      //console.log(valChart);
      chartdata.addRows(valChart);
  
    

    var options = {
      width: '100%',
      height: '500px'
    };
	  
	var chart = new google.visualization.LineChart(document.getElementById('linechart_material'));
	  chart.draw(chartdata, google.charts.Line.convertOptions(options));
        //chart.draw(chartdata, options);


    //var chart = new google.visualization.ColumnChart(document.getElementById('linechart_material'));
    //chart = new google.visualization.LineChart(document.getElementById('linechart_material'));
    //chart.draw(chartdata, options); 

    //chart.draw(chartdata, google.charts.Line.convertOptions(options));
  }


}
getHestorical();

window.onload = (e) => {
	var ajax = new XMLHttpRequest();
	ajax.open("GET", "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%20455863&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", true);
	ajax.send();

	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			var data = ajax.responseText;
			data = JSON.parse(data);

			var title = data.query.results.channel.title.replace('Yahoo! Weather - ', '');
			var temp = fahrenheitForCelsius(data.query.results.channel.item.condition.temp);
			var numberCondition = data.query.results.channel.item.condition.code;
			var forecast = data.query.results.channel.item.forecast;
			document.querySelector('.location').innerHTML = title;
			document.querySelector('.temp').innerHTML = `${temp}°C ${getCondition(numberCondition)}`;
			document.querySelector('.min span').innerHTML = `${fahrenheitForCelsius(forecast[0].low)}°`;
			document.querySelector('.max span').innerHTML = `${fahrenheitForCelsius(forecast[0].high)}°`;
			document.querySelector('.sensation b').innerHTML = `${fahrenheitForCelsius(data.query.results.channel.wind.chill)}°`;
			document.querySelector('.vento b').innerHTML = `${data.query.results.channel.wind.speed}km/h`;
			document.querySelector('.humidade b').innerHTML = `${data.query.results.channel.atmosphere.humidity}%`;


			console.log(data);
		}
	}

}
function newLocal(text) {
	const base = 'https://query.yahooapis.com/v1/public/yql?q=select';
	let url = '* from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + text + '")&format=json&env=store://datatables.org/alltableswithkeys';

		url = encodeURIComponent(url);
	console.log(base + url);
}
function getCondition(number) {
	let res;
	number = parseInt(number);
	switch (number) {
		case 0:
			res = 'Tornado'
			break;
			case 1:
				res =  'Tempestade tropical'
				break;
			case 2:
				res =  'Furação'
				break;
			case 3:
				res =  'Tempestades severas'
				break;
			case 26:
				res =  'Nublado'
				break;
			case 27:
				res =  'Muito nublado'
				break;
			case 28:
				res =  'Muito nublado'
				break;
			case 29:
				res =  'Parcialmente nublado'
				break;
			case 30:
				res =  'Parcialmente nublado'
		default:
			res = 'Err'
	}
	return res;
}

function fahrenheitForCelsius(number) {
	return ((parseFloat(number) - 32) / 1.8).toFixed(1);
}

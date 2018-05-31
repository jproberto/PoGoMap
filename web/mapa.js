// Método que faz a inicialização do mapa com base nas informações salvas em cache ou, caso não for possível, na posição do navegador.
function iniciarMapa() {
	//verifica se usa cache
	if(typeof(Storage) != "undefined") {
		//se usar, ve se tem algo no cache
		if (getLatitudeCache() && getLongitudeCache()) {
			//se tiver, cria o mapa com isso
			criarMapa(getLatitudeCache(), getLongitudeCache());
		//se não tiver
		} else {
			//cria o mapa com a localização do navegador
			getPosicaoNavegador();
		}
	//se não usar
	} else {
		//cria o mapa com a localização do navegador
		getPosicaoNavegador();
	}
}

function setaPosicaoEmCache(latitude, longitude) {
	localStorage.latitudeRaidMap = latitude;
	localStorage.longitudeRaidMap = longitude;
}

function getLatitudeCache() {
	return localStorage.latitudeRaidMap;
}

function getLongitudeCache() {
	return localStorage.longitudeRaidMap;
}

//Método que tenta encontrar a posição do navegador e delega para outros métodos dependendo do resultado
function getPosicaoNavegador() {
	//Pegando localização do usuário
	if (window.navigator && window.navigator.geolocation) {
		var geolocation = window.navigator.geolocation;
		
		//Tenta buscar a localização do navegador. Se tiver sucesso chama a primeira função, se der erro, a segunda.
		geolocation.getCurrentPosition(sucessoPosicao, erroPosicao);
	} else {
		//TODO tratar erro
	}
}	

//Método chamado caso a posição do navegador seja obtida
function sucessoPosicao(posicao){
	console.log(posicao);
	var latitude = posicao.coords.latitude;
	var longitude = posicao.coords.longitude;
	
	//se usar cache, salva as informações da posição
	if(typeof(Storage) != "undefined") {
		setaPosicaoEmCache(latitude, longitude);
	}
	
	//Inicia o mapa passando a latitude e longitude do usuário para centralizar
	criarMapa(latitude, longitude);
}

//Método chamado caso a posição do navegador não seja obtida
function erroPosicao(error){
	//TODO tratar erro
	console.log(error);
	
	//Coordenadas do Rio de Janeiro
	var latitude = -22.9035;
	var longitude =	-43.2096
	
	//Como não consegue a posição, centraliza no Rio de Janeiro
	criarMapa(latitude, longitude);
}

//Cria o mapa centralizando nas coordenadas passadas
function criarMapa(latitude, longitude){
	//Opções do mapa
	var options = {
		zoom:14,
		center:{
			lat: parseFloat(latitude),
			lng: parseFloat(longitude)
		}
	}

	//Criando mapa com as opções definidas
	var mapa = new google.maps.Map(document.getElementById('mapa'), options);
	
	//Carrega os marcadores já salvos
	carregarMarcadores(mapa);
	
	//Adiciona um listener para criar novos marcadores com base no click do usuário
	google.maps.event.addListener(mapa, 'rightclick', function(event){
		//TODO modificar para outro método que salvará as informações em banco etc
		adicionarMarcador(mapa, {coordenadas:event.latLng});
	});
}

//Função que cria marcadores
function adicionarMarcador(mapa, marcador){
	var marker = new google.maps.Marker({
		position: marcador.coordenadas,
		map: mapa,
	});

	//Cria janela de informações do marcador
	var infoWindow = new google.maps.InfoWindow({
		content:marcador.conteudo
	});

	marker.addListener('click', function(){
		infoWindow.open(mapa, marker);
	});
}

function carregarMarcadores(mapa) {
	//TODO carregar os marcadores já salvos
	//TEMPORÁRIO: marcadores predefinidos
	var markers = [
        {
			coordenadas:{lat:-22.896597, lng:-43.119565},
			conteudo:'<h1>Marcador 1</h1>'
        },
        {
			coordenadas:{lat:-22.889366, lng: -43.125479},
			conteudo:'<h1>Marcador 2</h1>'
        },{
			coordenadas:{lat:-22.884380, lng: -43.119192},
			conteudo:'<h1>Marcador 3</h1>'
        },{
			coordenadas:{lat:-22.891595, lng: -43.120330},
			conteudo:'<h1>MArcador 4</h1>'
        }
      ];

      // Loop through markers
      for(var i = 0;i < markers.length;i++){
        // Add marker
        adicionarMarcador(mapa, markers[i]);
      }
}
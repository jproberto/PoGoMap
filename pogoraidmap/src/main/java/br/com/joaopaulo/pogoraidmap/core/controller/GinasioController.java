package br.com.joaopaulo.pogoraidmap.core.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Esse controlador é o responsável pela API pública usada para gerenciar as informações dos ginásios
 *
 */

@RestController
@RequestMapping("/ginasios")
public class GinasioController {

	public class ObjetoTeste {
		public Long		id;
		public String	content;
	}

	@RequestMapping(method = RequestMethod.GET)
	public ObjetoTeste teste() {
		//		return "{" +
		//				//	"{" +
		//						"\"nome\" : \"Castrioto\"," +
		//						"\"latitude\" : \"-22.884521\"," +
		//						"\"longitude\" : \"-43.120733\"" +
		////					"}," +
		////					"{" +
		////						"\"nome\" : \"Correios\"," +
		////						"\"latitude\" : \"-22.886490\"," +
		////						"\"longitude\" : \"-43.123003\"" +
		////					"}" +
		//				"}";

		ObjetoTeste obj = new ObjetoTeste();
		obj.id = 1845L;
		obj.content = "Hello, World";

		return obj;
	}
}
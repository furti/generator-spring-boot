package ${ basePackage };

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class TemplateController {

	@RequestMapping(value = "/**", method = RequestMethod.GET)
	public String home(HttpServletRequest request) {
		String path = request.getServletPath();

		if (request.getPathInfo() != null) {
			path += request.getPathInfo();
		}

		if ("/".equals(path)) {
			return "index";
		}

		return path;
	}
}

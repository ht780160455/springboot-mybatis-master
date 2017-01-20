package cn.no7player.controller;

import java.sql.SQLException;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import cn.no7player.DerbyTest;

@Controller
public class HelloController {

	@RequestMapping("/hello")
	public String greeting(@RequestParam(value = "name", required = false, defaultValue = "World") String name,
			Model model) {
		model.addAttribute("name", name);
		return "hello";
	}

	@RequestMapping("/jsontest")
	public String jsontest() throws Exception {
		throw new Exception();
	}

	@RequestMapping("/ok")
	public String newHtml()
			throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		// model.addAttribute("name", name);
		DerbyTest t = new DerbyTest();
		t.loadDriver();
		t.doIt();
		return "NewFile";
	}

}

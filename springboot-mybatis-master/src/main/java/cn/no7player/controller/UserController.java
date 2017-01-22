package cn.no7player.controller;

import cn.no7player.model.User;
import cn.no7player.service.UserService;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by zl on 2015/8/27.
 */
@Controller
public class UserController {

	private Logger logger = Logger.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	@RequestMapping("/getUserInfo")
	@ResponseBody
	public List<User> getUserInfo(Integer pageNum) {
		List<User> users = null;
		if (pageNum == null) {
			pageNum = 1;
		}
		users = userService.getUserInfo(pageNum);
		for (User user : users) {
			if (user != null) {
				System.out.println("user.getName():" + user.getZh());
				logger.info("user.getAge():" + user.getMm());
			}
		}
		return users;
	}
}

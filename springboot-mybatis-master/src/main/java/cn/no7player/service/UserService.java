package cn.no7player.service;

import cn.no7player.mapper.UserMapper;
import cn.no7player.model.User;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;

/**
 * Created by zl on 2015/8/27.
 */

@Service
public class UserService {

	@Autowired
	private UserMapper userMapper;

	public List<User> getUserInfo() {
		PageHelper.startPage(1, 10);
		List<User> users = userMapper.findUserInfo();
		return users;
	}
}

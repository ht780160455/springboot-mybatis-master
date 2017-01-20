package cn.no7player;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.tomcat.util.http.fileupload.ThresholdingOutputStream;

public class DerbyTest {
	private static String driver = "org.apache.derby.jdbc.EmbeddedDriver";
	private static String protocol = "jdbc:derby:";
	// String dbName = "E:\\Java\\Joy\\derby\\Derby_data\\firstdb";
	String dbName = "firstdb";

	public static void loadDriver() throws InstantiationException, IllegalAccessException, ClassNotFoundException {
		Class.forName(driver).newInstance();
		System.out.println("Loadedtheappropriatedriver");
	}

	public void doIt() throws SQLException {
		Connection conn = null;
		Statement s = null;
		//ResultSet rs = null;
		System.out.println("starting");
		conn = DriverManager.getConnection(protocol + dbName + ";create=true");
		System.out.println(conn);
		// System.out.println(dbName);
		System.out.println(System.getProperty("user.dir"));// user.dir指定了当前的路径

		s = conn.createStatement();
		// s.execute("drop table firsttable");
		s.execute("create table firsttable(id int primary key, name varchar(20))");
		// for (int i = 2; i < Integer.MAX_VALUE; i++) {
		// String sql = "insert into firsttable values(" + i + ", 'Hotpepper')";
		// s.execute(sql);
		// System.out.println(i);
		// }
		// rs = s.executeQuery("select * from firsttable");
		// while (rs.next()) {
		// System.out.println(rs.getInt(1));
		// System.out.println(rs.getString(2));
		// }

		conn.close();
		conn = null;
		s.close();
		s = null;
//		rs.close();
		//		rs = null;

	}

	// public static void main(String[] args)
	// throws SQLException, InstantiationException, IllegalAccessException,
	// ClassNotFoundException {
	// DerbyTest t = new DerbyTest();
	// loadDriver();
	// t.doIt();
	// // System.out.println();
	// }

}

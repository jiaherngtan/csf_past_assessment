package vttp2022.assessment.csf.orderbackend.repositories;

public class Queries {

    public static final String SQL_INSERT_ORDER = "INSERT INTO orders(name,email,pizza_size,thick_crust,sauce,toppings,comments) VALUES(?,?,?,?,?,?,?)";

    public static final String SQL_GET_ORDER_BY_EMAIL = "SELECT * FROM orders WHERE email = ?";

}

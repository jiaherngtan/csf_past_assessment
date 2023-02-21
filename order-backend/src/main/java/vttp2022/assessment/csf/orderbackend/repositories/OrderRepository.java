package vttp2022.assessment.csf.orderbackend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import vttp2022.assessment.csf.orderbackend.models.Order;

import static vttp2022.assessment.csf.orderbackend.repositories.Queries.*;

import java.util.LinkedList;
import java.util.List;

@Repository
public class OrderRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void createOrder(Order order) {
        // byte crustResult = 0;
        // if (order.isThickCrust())
        // crustResult = 1;
        jdbcTemplate.update(
                SQL_INSERT_ORDER,
                order.getName(),
                order.getEmail(),
                order.getSize(),
                order.isThickCrust(),
                order.getSauce(),
                order.getToppings().toString(),
                order.getComments());
    }

    public List<Order> getOrdersByEmail(String email) {

        final SqlRowSet rs = jdbcTemplate.queryForRowSet(
                SQL_GET_ORDER_BY_EMAIL, email);

        List<Order> orders = new LinkedList<>();

        while (rs.next()) {
            orders.add(Order.createOrder(rs));
        }

        return orders;
    }

}

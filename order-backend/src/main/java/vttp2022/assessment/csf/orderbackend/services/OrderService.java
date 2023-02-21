package vttp2022.assessment.csf.orderbackend.services;

import java.text.DecimalFormat;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;
import vttp2022.assessment.csf.orderbackend.repositories.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private PricingService priceSvc;

	@Autowired
	private OrderRepository orderRepository;

	// POST /api/order
	// Create a new order by inserting into orders table in pizzafactory database
	// IMPORTANT: Do not change the method's signature
	public void createOrder(Order order) {
		orderRepository.createOrder(order);
	}

	// GET /api/order/<email>/all
	// Get a list of orders for email from orders table in pizzafactory database
	// IMPORTANT: Do not change the method's signature
	public List<OrderSummary> getOrdersByEmail(String email) {
		// Use priceSvc to calculate the total cost of an order
		List<Order> orders = orderRepository.getOrdersByEmail(email);
		List<OrderSummary> orderSummaries = new LinkedList<>();

		for (Order order : orders) {
			Float cost = 0.0f;
			Float toppingsCost = 0.0f;
			Float crustCost = 0.0f;
			for (String topping : order.getToppings()) {
				toppingsCost += priceSvc.topping(topping);
			}
			if (order.isThickCrust())
				crustCost = priceSvc.thickCrust();
			else
				crustCost = priceSvc.thinCrust();

			System.out.println("Order.getSauce: " + order.getSauce());
			cost = priceSvc.size(order.getSize())
					+ priceSvc.sauce(order.getSauce())
					+ toppingsCost
					+ crustCost;

			// DecimalFormat df = new DecimalFormat("#.00");
			// String formattedFloat = df.format(cost);
			// System.out.println(formattedFloat);
			// Float formattedCost = Float.parseFloat(formattedFloat);
			// System.out.println(formattedCost);

			OrderSummary orderSummary = new OrderSummary();
			orderSummary.setOrderId(order.getOrderId());
			orderSummary.setName(order.getName());
			orderSummary.setEmail(order.getEmail());
			orderSummary.setAmount(cost);
			orderSummaries.add(orderSummary);
		}
		return orderSummaries;
	}
}

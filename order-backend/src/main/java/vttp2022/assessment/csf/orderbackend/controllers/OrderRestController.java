package vttp2022.assessment.csf.orderbackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;
import vttp2022.assessment.csf.orderbackend.services.OrderService;

@Controller
@RequestMapping("/api/order")
public class OrderRestController {

    @Autowired
    private OrderService orderService;

    @PostMapping(path = { "/", "" }, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin()
    private ResponseEntity<String> createOrder(@RequestBody Order order) {

        try {
            orderService.createOrder(order);
        } catch (Exception e) {
            e.printStackTrace();
        }

        JsonObject result = Json.createObjectBuilder()
                .add("status", "OK")
                .build();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(result.toString());
    }

    @GetMapping(path = "{email}/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin()
    public ResponseEntity<String> getOrdersByEmail(@PathVariable String email) {

        List<OrderSummary> orderSummaries = orderService.getOrdersByEmail(email);

        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        orderSummaries.stream()
                .forEach(v -> {
                    arrBuilder.add(v.toOrderSummary());
                });

        return ResponseEntity.ok(arrBuilder.build().toString());
    }

}

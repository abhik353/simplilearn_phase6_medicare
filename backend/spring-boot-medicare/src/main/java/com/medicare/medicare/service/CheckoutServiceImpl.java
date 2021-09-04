package com.medicare.medicare.service;

import com.medicare.medicare.dao.CustomerRepository;
import com.medicare.medicare.dto.Purchase;
import com.medicare.medicare.dto.PurchaseResponse;
import com.medicare.medicare.entity.Customer;
import com.medicare.medicare.entity.Order;
import com.medicare.medicare.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        Order order =purchase.getOrder();

        String trackingId = generateOrderTrackingId();
        order.setTrackingId(trackingId);

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        order.setShippingAddress(purchase.getShippingAddress());

        Customer customer = purchase.getCustomer();

        String email = customer.getEmail();

        Customer customerFromDb = customerRepository.findByEmail(email);

        if(customerFromDb != null){
            customer = customerFromDb;
        }

        customer.add(order);

        customerRepository.save(customer);

        return new PurchaseResponse(trackingId);
    }

    private String generateOrderTrackingId() {
        return UUID.randomUUID().toString();
    }
}

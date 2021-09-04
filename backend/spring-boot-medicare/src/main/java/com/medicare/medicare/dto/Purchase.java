package com.medicare.medicare.dto;

import com.medicare.medicare.entity.Address;
import com.medicare.medicare.entity.Customer;
import com.medicare.medicare.entity.Order;
import com.medicare.medicare.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;

    private Address shippingAddress;

    private Order order;

    private Set<OrderItem> orderItems;
}

package com.medicare.medicare.service;

import com.medicare.medicare.dto.Purchase;
import com.medicare.medicare.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}

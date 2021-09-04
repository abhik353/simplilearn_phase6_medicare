package com.medicare.medicare;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class AdminAccessFailTest {
    public static void main(String[] args){

        System.setProperty("webdriver.chrome.driver","D:\\medicareEcommerce\\backend\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:4200");
        System.out.println(driver.getTitle());
        WebElement loginLink = driver.findElement(By.name("loginBtn"));
        loginLink.click();

        WebElement username = driver.findElement(By.id("okta-signin-username"));
        WebElement password = driver.findElement(By.id("okta-signin-password"));
        WebElement loginBtn = driver.findElement(By.id("okta-signin-submit"));

        username.sendKeys("ax@g.com");
        password.sendKeys("xxx");
        loginBtn.click();
    }
}

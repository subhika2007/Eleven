package com.elegantsilks.store;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class StoreApiTest {
    @Autowired MockMvc mvc;

    @Test
    void returnsAll15FlyerProducts() throws Exception {
        mvc.perform(get("/api/products")).andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(15))
                .andExpect(jsonPath("$[0].name").value("Poonam Sarees"))
                .andExpect(jsonPath("$[0].price").value(399.0));
    }

    @Test
    void searchIsPartialAndCaseInsensitive() throws Exception {
        mvc.perform(get("/api/products/search").param("keyword", "POONAM"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].imagePath").value("/products/poonam-sarees.jpg"));
        mvc.perform(get("/api/products/search").param("keyword", "zzz"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    void productById_andCategory_andNotFound() throws Exception {
        mvc.perform(get("/api/products/4")).andExpect(jsonPath("$.name").value("Silk Cotton Blouse"))
                .andExpect(jsonPath("$.price").value(99.0));
        mvc.perform(get("/api/products/category/blouses")).andExpect(jsonPath("$.length()").value(2));
        mvc.perform(get("/api/products/999")).andExpect(status().isNotFound());
    }

    @Test
    void ordersAreSavedWithServerSidePrices() throws Exception {
        String body = """
            {"customerName":"Test","customerPhone":"9876543210","deliveryAddress":"Salem",
             "items":[{"productId":1,"quantity":2,"colour":"Magenta"},{"productId":4,"quantity":1}]}""";
        mvc.perform(post("/api/orders").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.totalAmount").value(897.0));
        mvc.perform(get("/api/orders/1")).andExpect(status().isOk())
                .andExpect(jsonPath("$.items.length()").value(2));
    }

    @Test
    void invalidOrderIsRejected() throws Exception {
        mvc.perform(post("/api/orders").contentType(MediaType.APPLICATION_JSON)
                .content("{\"customerName\":\"\",\"customerPhone\":\"1\",\"items\":[]}"))
                .andExpect(status().isBadRequest());
    }
}

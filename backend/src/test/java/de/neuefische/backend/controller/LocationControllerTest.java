package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.user.ImportMongoUserDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class LocationControllerTest {
    @Autowired
    MockMvc mvc;

    @Test
    @DirtiesContext
    @WithMockUser(username = "testuser", password = "testpassword")
    void getProfileDetails_thenReturnStatus200_andEmptyListForUserWithoutLocations() throws Exception {
        ImportMongoUserDTO newUserWithoutId = ImportMongoUserDTO.builder()
                .username("testuser")
                .fullname("testuser")
                .password("testpassword")
                .email("test@mail.de")
                .homecity("Berlin")
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonRequestBody = objectMapper.writeValueAsString(newUserWithoutId);

        mvc.perform(MockMvcRequestBuilders.post("/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequestBody)
                        .with(csrf()))
                .andExpect(status().isCreated());

        mvc.perform(MockMvcRequestBuilders.get("/locations/all/testuser")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            [
                            ]
                        """));
    }
}